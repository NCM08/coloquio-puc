"use server";

import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import ConfirmacionPropuestaEmail from "@/components/emails/ConfirmacionPropuestaEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

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

    // ── Upsert en tabla `perfiles` — evita duplicados por email ──
    const { data: perfil, error: perfilError } = await supabase
      .from("perfiles")
      .upsert({ nombre, email: correo }, { onConflict: "email" })
      .select("id")
      .single();

    if (perfilError || !perfil) {
      console.error("Error al procesar perfil:", perfilError);
      return { error: "No se pudo procesar el perfil. Por favor, inténtelo nuevamente." };
    }

    // Generar nombre de archivo único
    const extension     = archivo.name.split(".").pop();
    const nombreArchivo = `propuesta_${Date.now()}.${extension}`;

    // Subir archivo al bucket "documentos_ponencias"
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

    // Obtener URL pública del archivo subido
    const { data: urlData } = supabase.storage
      .from("documentos_ponencias")
      .getPublicUrl(nombreArchivo);

    const archivo_url = urlData.publicUrl;

    // Insertar registro en la tabla "propuestas"
    const { error: dbError } = await supabase.from("propuestas").insert({
      nombre,
      correo,
      institucion,
      eje,
      archivo_url,
    });

    if (dbError) {
      console.error("Error al insertar propuesta:", dbError);
      return { error: "No se pudo registrar la propuesta. Por favor, inténtelo nuevamente." };
    }

    // ── Enviar correo de confirmación (no bloquea si falla) ───
    try {
      await resend.emails.send({
        from: "Coloquio PUC <onboarding@resend.dev>",
        to: correo,
        subject: "Hemos recibido tu propuesta - Coloquio PUC",
        react: ConfirmacionPropuestaEmail({ nombre }),
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
