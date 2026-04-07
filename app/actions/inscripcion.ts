// ============================================================
// app/actions/inscripcion.ts — SERVER ACTIONS DE INSCRIPCIÓN
// ============================================================

"use server";

import { supabase } from "@/lib/supabase";

// ── Tipo de retorno ───────────────────────────────────────────
export interface ActionResult {
  success: boolean;
  message: string;
  inscripcionId?: string;
}

// ── Helper: sube un archivo a Supabase Storage ────────────────
async function subirArchivo(
  file: File,
  bucket: "documentos_ponencias" | "comprobantes_pago"
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
    const nombre             = (formData.get("nombre")             as string)?.trim();
    const apellidos          = (formData.get("apellidos")          as string)?.trim();
    const email              = (formData.get("email")              as string)?.trim().toLowerCase();
    const nacionalidad       = (formData.get("nacionalidad")       as string)?.trim();
    const calidad_asistencia = (formData.get("calidad_asistencia") as string)?.trim();
    const categoria          = (formData.get("categoria")          as string)?.trim();
    const titulo_ponencia    = (formData.get("titulo_ponencia")    as string | null)?.trim() || null;
    const eje_tematico       = (formData.get("eje_tematico")       as string | null)?.trim() || null;

    if (!nombre || !apellidos || !email || !nacionalidad || !calidad_asistencia || !categoria) {
      return { success: false, message: "Faltan campos obligatorios en el formulario." };
    }

    // Validar enums
    const calidades = ["asistente", "expositor"];
    if (!calidades.includes(calidad_asistencia)) {
      return { success: false, message: "Rol de participación no válido." };
    }
    const categorias = ["pregrado", "profesional", "posgrado", "academico"];
    if (!categorias.includes(categoria)) {
      return { success: false, message: "Categoría no válida." };
    }

    const archivoPonencia = formData.get("archivo_ponencia") as File | null;
    const comprobantePago = formData.get("comprobante_pago") as File | null;

    if (!comprobantePago || comprobantePago.size === 0) {
      return { success: false, message: "El comprobante de pago es requerido." };
    }

    if (calidad_asistencia === "expositor") {
      if (!titulo_ponencia || !eje_tematico) {
        return { success: false, message: "Faltan datos de la ponencia para el expositor." };
      }
      if (!archivoPonencia || archivoPonencia.size === 0) {
        return { success: false, message: "El documento de ponencia es requerido para expositores." };
      }
    }

    // b) Subir archivo_ponencia (si es expositor)
    let rutaPonencia: string | null = null;
    if (calidad_asistencia === "expositor" && archivoPonencia) {
      rutaPonencia = await subirArchivo(archivoPonencia, "documentos_ponencias");
    }

    // c) Subir comprobante_pago
    const rutaComprobante = await subirArchivo(comprobantePago, "comprobantes_pago");

    // d) Insertar en tabla `perfiles`
    const { data: perfil, error: perfilError } = await supabase
      .from("perfiles")
      .insert({ nombre, apellidos, email, nacionalidad })
      .select("id")
      .single();

    if (perfilError || !perfil) {
      throw new Error(`Error al crear perfil: ${perfilError?.message}`);
    }
    const perfilId: string = perfil.id;

    // e) Si es expositor, insertar en `ponencias`
    let ponenciaId: string | null = null;
    if (calidad_asistencia === "expositor" && rutaPonencia) {
      const { data: ponencia, error: ponenciaError } = await supabase
        .from("ponencias")
        .insert({
          autor_id:    perfilId,
          titulo:      titulo_ponencia,
          eje_tematico,
          archivo_url: rutaPonencia,
        })
        .select("id")
        .single();

      if (ponenciaError || !ponencia) {
        throw new Error(`Error al registrar ponencia: ${ponenciaError?.message}`);
      }
      ponenciaId = ponencia.id;
    }

    // f) Insertar en `inscripciones`
    const { data: inscripcion, error: inscripcionError } = await supabase
      .from("inscripciones")
      .insert({
        usuario_id:         perfilId,
        calidad_asistencia,
        categoria,
        ponencia_id:        ponenciaId,
        estado:             "pendiente",
      })
      .select("id")
      .single();

    if (inscripcionError || !inscripcion) {
      throw new Error(`Error al registrar inscripción: ${inscripcionError?.message}`);
    }
    const inscripcionId: string = inscripcion.id;

    // g) Insertar en `pagos`
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

    // h) Retornar éxito
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
