// ============================================================
// app/actions/inscripcionActions.ts — SERVER ACTIONS
// ============================================================
// Ejecutadas exclusivamente en el servidor (Next.js 15).
// Reciben FormData con archivos, los suben a Supabase Storage
// y realizan las inserciones en la base de datos.
// ============================================================

"use server";

import { createClient } from "@supabase/supabase-js";

// ── Cliente Supabase del lado del servidor ────────────────────
// Usa las variables de entorno (disponibles en el servidor).
function getSupabaseServer() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error("Faltan las credenciales de Supabase en el entorno.");
  }
  return createClient(url, key);
}

// ── Tipos de respuesta ────────────────────────────────────────
export interface ActionResult {
  success: boolean;
  error?: string;
  inscripcionId?: string;
}

// ── Helper: Sube un archivo a un bucket de Supabase Storage ──
export async function uploadFileToSupabase(
  file: File,
  bucket: "documentos_ponencias" | "comprobantes_pago"
): Promise<string> {
  const supabase = getSupabaseServer();

  // Nombre único para evitar colisiones
  const timestamp  = Date.now();
  const extension  = file.name.split(".").pop() ?? "bin";
  const filePath   = `${timestamp}_${Math.random().toString(36).slice(2)}.${extension}`;

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file, {
      contentType: file.type,
      upsert: false,
    });

  if (error || !data) {
    throw new Error(
      `Error al subir archivo al bucket "${bucket}": ${error?.message ?? "respuesta vacía"}`
    );
  }

  return data.path;
}

// ── Server Action principal: procesa la inscripción completa ──
export async function submitInscripcion(
  formData: FormData
): Promise<ActionResult> {
  try {
    const supabase = getSupabaseServer();

    // ── 1. Extraer campos de texto ───────────────────────────
    const nombre             = (formData.get("nombre")             as string)?.trim();
    const apellidos          = (formData.get("apellidos")          as string)?.trim();
    const email              = (formData.get("email")              as string)?.trim().toLowerCase();
    const nacionalidad       = (formData.get("nacionalidad")       as string)?.trim();
    const calidad_asistencia = (formData.get("calidad_asistencia") as string)?.trim();
    const titulo_ponencia    = (formData.get("titulo_ponencia")    as string | null)?.trim() || null;
    const eje_tematico       = (formData.get("eje_tematico")       as string | null)?.trim() || null;

    // ── 2. Extraer archivos ──────────────────────────────────
    const archivoPonencia  = formData.get("archivo_ponencia")  as File | null;
    const comprobantePago  = formData.get("comprobante_pago")  as File | null;

    // ── 3. Validación básica del servidor ────────────────────
    if (!nombre || !apellidos || !email || !nacionalidad || !calidad_asistencia) {
      return { success: false, error: "Faltan campos obligatorios en el formulario." };
    }
    if (!comprobantePago || comprobantePago.size === 0) {
      return { success: false, error: "El comprobante de pago es requerido." };
    }
    if (calidad_asistencia === "expositor") {
      if (!titulo_ponencia || !eje_tematico) {
        return { success: false, error: "Faltan datos de la ponencia para el expositor." };
      }
      if (!archivoPonencia || archivoPonencia.size === 0) {
        return { success: false, error: "El documento de ponencia es requerido para expositores." };
      }
    }

    // ── 4. Subir archivos a Supabase Storage ─────────────────
    let rutaPonencia: string | null = null;
    if (calidad_asistencia === "expositor" && archivoPonencia) {
      rutaPonencia = await uploadFileToSupabase(archivoPonencia, "documentos_ponencias");
    }
    const rutaComprobante = await uploadFileToSupabase(comprobantePago, "comprobantes_pago");

    // ── 5. Insertar en la tabla `perfiles` ───────────────────
    const { data: perfil, error: perfilError } = await supabase
      .from("perfiles")
      .insert({
        nombre,
        apellidos,
        email,
        nacionalidad,
      })
      .select("id")
      .single();

    if (perfilError || !perfil) {
      throw new Error(`Error al crear perfil: ${perfilError?.message}`);
    }
    const perfilId: string = perfil.id;

    // ── 6. Insertar en la tabla `ponencias` (si es expositor) ─
    let ponenciaId: string | null = null;
    if (calidad_asistencia === "expositor" && rutaPonencia) {
      const { data: ponencia, error: ponenciaError } = await supabase
        .from("ponencias")
        .insert({
          perfil_id:      perfilId,
          titulo:         titulo_ponencia,
          eje_tematico,
          archivo_url:    rutaPonencia,
        })
        .select("id")
        .single();

      if (ponenciaError || !ponencia) {
        throw new Error(`Error al registrar ponencia: ${ponenciaError?.message}`);
      }
      ponenciaId = ponencia.id;
    }

    // ── 7. Insertar en la tabla `inscripciones` ───────────────
    const { data: inscripcion, error: inscripcionError } = await supabase
      .from("inscripciones")
      .insert({
        perfil_id:          perfilId,
        ponencia_id:        ponenciaId,
        calidad_asistencia,
        estado:             "pendiente",
      })
      .select("id")
      .single();

    if (inscripcionError || !inscripcion) {
      throw new Error(`Error al registrar inscripción: ${inscripcionError?.message}`);
    }
    const inscripcionId: string = inscripcion.id;

    // ── 8. Insertar en la tabla `pagos` ──────────────────────
    const { error: pagoError } = await supabase
      .from("pagos")
      .insert({
        inscripcion_id:   inscripcionId,
        comprobante_url:  rutaComprobante,
        estado:           "por_verificar",
      });

    if (pagoError) {
      throw new Error(`Error al registrar pago: ${pagoError.message}`);
    }

    return { success: true, inscripcionId };
  } catch (err: unknown) {
    const mensaje =
      err instanceof Error
        ? err.message
        : "Ocurrió un error inesperado. Intente nuevamente.";
    console.error("[submitInscripcion]", err);
    return { success: false, error: mensaje };
  }
}
