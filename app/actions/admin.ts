// ============================================================
// app/actions/admin.ts — SERVER ACTIONS DEL PANEL DE ADMIN
// ============================================================

"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { Resend } from "resend";
import PagoAprobadoEmail from "@/components/emails/PagoAprobadoEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

// Cliente con privilegios de administrador — solo para server actions.
// La service_role key NUNCA se expone al frontend (no tiene prefijo NEXT_PUBLIC_).
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// ── Tipos ─────────────────────────────────────────────────────

export interface PagoData {
  id: string;
  estado: "por_verificar" | "aprobado" | "rechazado" | null;
  comprobante_url: string | null;
  created_at: string;
}

export interface InscripcionData {
  id: string;
  calidad_asistencia: string | null;
  estado: string | null;
  ponencia_id: string | null;
  created_at: string;
  pagos: PagoData[];
}

export interface PonenciaData {
  id: string;
  titulo: string | null;
  eje_tematico: string | null;
}

export interface PerfilConRelaciones {
  id: string;
  nombre: string;
  apellidos: string | null;
  email: string;
  nacionalidad: string | null;
  created_at: string;
  inscripciones: InscripcionData[];
  ponencias: PonenciaData[];
}

// ── Query principal ───────────────────────────────────────────

export async function obtenerDatosDashboard(): Promise<PerfilConRelaciones[]> {
  const { data, error } = await supabase
    .from("perfiles")
    .select("*, inscripciones(*, pagos(*)), ponencias(*)")
    .order("creado_en", { ascending: false });

  if (error) {
    console.error("[obtenerDatosDashboard]", error);
    throw new Error(`Error al obtener datos del dashboard: ${error.message}`);
  }

  return (data ?? []) as PerfilConRelaciones[];
}

// ── Cambiar estado de pago ────────────────────────────────────

export type EstadoPago = "pendiente" | "por_verificar" | "aprobado" | "rechazado";

export async function cambiarEstadoPago(
  pagoId: string,
  nuevoEstado: EstadoPago
): Promise<void> {
  const { error } = await supabase
    .from("pagos")
    .update({ estado: nuevoEstado })
    .eq("id", pagoId);

  if (error) {
    console.error("[cambiarEstadoPago] Error al actualizar estado en DB:", error);
    throw new Error(`Error al actualizar estado de pago: ${error.message}`);
  }

  if (nuevoEstado === "aprobado") {
    try {
      const { data: pagoData, error: pagoError } = await supabase
        .from("pagos")
        .select("inscripciones(perfiles(email, nombre))")
        .eq("id", pagoId)
        .single();

      if (pagoError) {
        console.error("[cambiarEstadoPago] Error al obtener perfil para correo:", pagoError);
      } else {
        const perfil = (pagoData as any)?.inscripciones?.perfiles;
        const email: string | undefined = perfil?.email;
        const nombre: string = perfil?.nombre ?? "Participante";

        if (email) {
          await resend.emails.send({
            from: "Acme <onboarding@resend.dev>",
            to: email,
            subject: "Tu pago ha sido aprobado - Coloquio PUC",
            react: PagoAprobadoEmail({ nombre }),
          });
        }
      }
    } catch (emailErr) {
      console.error("[cambiarEstadoPago] Error al enviar correo de aprobación:", emailErr);
    }
  }

  revalidatePath("/admin");
}
