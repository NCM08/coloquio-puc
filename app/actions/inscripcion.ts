// ============================================================
// app/actions/inscripcion.ts — SERVER ACTIONS DE INSCRIPCIÓN
// ============================================================

"use server";

import { createClient } from "@supabase/supabase-js";

// Cliente con privilegios de administrador — solo para server actions.
// La service_role key NUNCA se expone al frontend (no tiene prefijo NEXT_PUBLIC_).
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// ── Tipo de retorno ───────────────────────────────────────────
export interface ActionResult {
  success: boolean;
  message: string;
  inscripcionId?: string;
}

// ── Helper: sube un archivo a Supabase Storage ────────────────
async function subirArchivo(
  file: File,
  bucket: "comprobantes_pago"
): Promise<string> {
  const extension = file.name.split(".").pop() ?? "bin";
  const filePath  = `${Date.now()}_${Math.random().toString(36).slice(2)}.${extension}`;

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file, { contentType: file.type, upsert: false });

  if (error || !data) {
    throw new Error(
      `Error al subir archivo al bucket "${bucket}": ${error?.message ?? "respuesta vacía"}`
    );
  }

  return data.path;
}

// ── Server Action principal ───────────────────────────────────
export async function procesarInscripcion(
  formData: FormData
): Promise<ActionResult> {
  try {
    // ── Validación Turnstile ──────────────────────────────────
    const turnstileToken = formData.get("turnstile_token") as string;
    if (!turnstileToken) {
      return { success: false, message: "Fallo la validación de seguridad anti-bots." };
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
      return { success: false, message: "Fallo la validación de seguridad anti-bots." };
    }

    // a) Extraer y validar campos de texto
    const nombre                  = (formData.get("nombre")                  as string)?.trim();
    const apellidos               = (formData.get("apellidos")               as string)?.trim();
    const email                   = (formData.get("email")                   as string)?.trim().toLowerCase();
    const nacionalidad            = (formData.get("nacionalidad")            as string)?.trim();
    const calidad_asistencia      = (formData.get("calidad_asistencia")      as string)?.trim();
    const titulo_ponencia         = (formData.get("titulo_ponencia")         as string | null)?.trim() || null;
    const eje_tematico            = (formData.get("eje_tematico")            as string | null)?.trim() || null;
    const confirmacion_aprobacion = formData.get("confirmacion_aprobacion") === "true";

    if (!nombre || !apellidos || !email || !nacionalidad || !calidad_asistencia) {
      return { success: false, message: "Faltan campos obligatorios en el formulario." };
    }

    // Validar valor de calidad_asistencia contra la tabla oficial
    const calidades = [
      "Estudiante de pregrado - Asistente",
      "Estudiante de pregrado - Expositor",
      "Profesional de ciencias sociales/humanidades/artes - Asistente",
      "Profesional de ciencias sociales/humanidades/artes - Expositor",
      "Estudiante de posgrado - Asistente",
      "Estudiante de posgrado - Expositor",
      "Académico/a e investigador/a - Asistente",
      "Académico/a e investigador/a - Expositor",
    ];
    if (!calidades.includes(calidad_asistencia)) {
      return { success: false, message: "Perfil de participación no válido." };
    }

    const esExpositor = calidad_asistencia.includes("Expositor");

    const comprobantePago = formData.get("comprobante_pago") as File | null;

    if (!comprobantePago || comprobantePago.size === 0) {
      return { success: false, message: "El comprobante de pago es requerido." };
    }

    if (esExpositor) {
      if (!titulo_ponencia || !eje_tematico) {
        return { success: false, message: "Faltan datos de la ponencia para el expositor." };
      }
    }

    // b) Subir comprobante_pago
    const rutaComprobante = await subirArchivo(comprobantePago, "comprobantes_pago");

    // c) Insertar en tabla `perfiles`
    const { data: perfil, error: perfilError } = await supabase
      .from("perfiles")
      .insert({ nombre, apellidos, email, nacionalidad })
      .select("id")
      .single();

    if (perfilError || !perfil) {
      throw new Error(`Error al crear perfil: ${perfilError?.message}`);
    }
    const perfilId: string = perfil.id;

    // d) Si es expositor, insertar en `ponencias`
    let ponenciaId: string | null = null;
    if (esExpositor) {
      const { data: ponencia, error: ponenciaError } = await supabase
        .from("ponencias")
        .insert({
          autor_id:    perfilId,
          titulo:      titulo_ponencia,
          eje_tematico,
        })
        .select("id")
        .single();

      if (ponenciaError || !ponencia) {
        throw new Error(`Error al registrar ponencia: ${ponenciaError?.message}`);
      }
      ponenciaId = ponencia.id;
    }

    // e) Insertar en `inscripciones`
    const { data: inscripcion, error: inscripcionError } = await supabase
      .from("inscripciones")
      .insert({
        usuario_id:              perfilId,
        calidad_asistencia,
        ponencia_id:             ponenciaId,
        confirmacion_aprobacion: esExpositor ? confirmacion_aprobacion : null,
        estado:                  "pendiente",
      })
      .select("id")
      .single();

    if (inscripcionError || !inscripcion) {
      throw new Error(`Error al registrar inscripción: ${inscripcionError?.message}`);
    }
    const inscripcionId: string = inscripcion.id;

    // f) Insertar en `pagos`
    const { error: pagoError } = await supabase
      .from("pagos")
      .insert({
        inscripcion_id:  inscripcionId,
        comprobante_url: rutaComprobante,
        estado:          "por_verificar",
      });

    if (pagoError) {
      throw new Error(`Error al registrar pago: ${pagoError.message}`);
    }

    // g) Retornar éxito
    return {
      success: true,
      message: "Inscripción registrada exitosamente.",
      inscripcionId,
    };
  } catch (err: unknown) {
    const mensaje =
      err instanceof Error
        ? err.message
        : "Ocurrió un error inesperado. Intente nuevamente.";
    console.error("[procesarInscripcion]", err);
    return { success: false, message: mensaje };
  }
}
