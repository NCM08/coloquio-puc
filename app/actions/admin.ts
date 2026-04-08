// ============================================================
// app/actions/admin.ts — SERVER ACTIONS DEL PANEL DE ADMIN
// ============================================================

"use server";

import { createClient } from "@supabase/supabase-js";

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
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[obtenerDatosDashboard]", error);
    throw new Error(`Error al obtener datos del dashboard: ${error.message}`);
  }

  return (data ?? []) as PerfilConRelaciones[];
}
