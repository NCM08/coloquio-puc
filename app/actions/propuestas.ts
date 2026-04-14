"use server";

import { createClient } from "@supabase/supabase-js";
import { enviarCorreo } from "@/lib/mailer";
import ConfirmacionPropuestaEmail from "@/components/emails/ConfirmacionPropuestaEmail";

// Cliente con privilegios de administrador — solo para server actions.
// La service_role key NUNCA se expone al frontend (no tiene prefijo NEXT_PUBLIC_).
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function enviarPropuesta(formData: FormData) {
  try {
    // ── Validación Turnstile ──────────────────────────────────
    const turnstileToken = formData.get("turnstile_token") as string;
    if (!turnstileToken) {
      return { error: "Fallo la validación de seguridad anti-bots." };
    }
    const tsResponse = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: new URLSearchParams({
        secret:   process.env.TURNSTILE_SECRET_KEY ?? "",
        response: turnstileToken,
      }),
    });
    const tsData = await tsResponse.json();
    if (!tsData.success) {
      return { error: "Fallo la validación de seguridad anti-bots." };
    }

    const nombre      = (formData.get("nombre")      as string)?.trim();
    const correo      = (formData.get("correo")      as string)?.trim().toLowerCase();
    const institucion = (formData.get("institucion") as string)?.trim();
    const eje         = (formData.get("eje")         as string)?.trim();
    const archivo     = formData.get("archivo")     as File;

    if (!nombre || !correo || !institucion || !eje || !archivo || archivo.size === 0) {
      return { error: "Todos los campos son obligatorios." };
    }

    // ── Subir archivo al bucket "documentos_ponencias" ───────────
    // (Must happen before the DB transaction — Storage is not transactional)
    const extension     = archivo.name.split(".").pop();
    const nombreArchivo = `propuesta_${Date.now()}.${extension}`;

    const { error: uploadError } = await supabase.storage
      .from("documentos_ponencias")
      .upload(nombreArchivo, archivo, {
        contentType: archivo.type,
        upsert: false,
      });

    if (uploadError) {
      console.error("Error al subir archivo:", uploadError);
      return { error: "No se pudo subir el archivo. Por favor, inténtelo nuevamente." };
    }

    const { data: urlData } = supabase.storage
      .from("documentos_ponencias")
      .getPublicUrl(nombreArchivo);

    const archivo_url = urlData.publicUrl;

    // ── Atomic DB transaction: upsert perfil + insert propuesta ──
    const { error: dbError } = await supabase.rpc("insert_perfil_con_propuesta", {
      p_nombre:      nombre,
      p_correo:      correo,
      p_institucion: institucion,
      p_eje:         eje,
      p_archivo_url: archivo_url,
    });

    if (dbError) {
      console.error("Error en transacción DB:", dbError);
      return { error: "No se pudo registrar la propuesta. Por favor, inténtelo nuevamente." };
    }

    // ── Enviar correo de confirmación (no bloquea si falla) ───
    try {
      await enviarCorreo({
        to: correo,
        subject: "Hemos recibido tu propuesta - Coloquio PUC",
        reactComponent: ConfirmacionPropuestaEmail({ nombre }),
      });
    } catch (emailErr) {
      console.error("[enviarPropuesta] Error al enviar correo de confirmación:", emailErr);
    }

    return { success: true };
  } catch (err) {
    console.error("Error inesperado en enviarPropuesta:", err);
    return { error: "Ocurrió un error inesperado. Por favor, inténtelo nuevamente." };
  }
}
