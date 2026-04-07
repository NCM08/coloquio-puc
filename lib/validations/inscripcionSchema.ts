// ============================================================
// lib/validations/inscripcionSchema.ts — ESQUEMAS ZOD DE INSCRIPCIÓN
// ============================================================

import { z } from "zod";

// ── Constantes de validación de archivos ─────────────────────
const MAX_PONENCIA_BYTES = 25 * 1024 * 1024; // 25 MB
const MAX_PAGO_BYTES     = 10 * 1024 * 1024; // 10 MB

const TIPOS_PONENCIA = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const TIPOS_PAGO = [
  "application/pdf",
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

// ── Valores exactos de calidad_asistencia (tabla oficial) ─────
export const CALIDADES_ASISTENCIA = [
  "Estudiante de pregrado - Asistente",
  "Estudiante de pregrado - Expositor",
  "Profesional de ciencias sociales/humanidades/artes - Asistente",
  "Profesional de ciencias sociales/humanidades/artes - Expositor",
  "Estudiante de posgrado - Asistente",
  "Estudiante de posgrado - Expositor",
  "Académico/a e investigador/a - Asistente",
  "Académico/a e investigador/a - Expositor",
] as const;

export type CalidadAsistencia = (typeof CALIDADES_ASISTENCIA)[number];

// ── Paso 1: Datos personales ──────────────────────────────────
export const personalSchema = z.object({
  nombre: z
    .string()
    .trim()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(80, "El nombre no puede superar los 80 caracteres")
    .regex(/^[a-zA-ZÀ-ÿ\s']+$/, "Solo se permiten letras, espacios y apóstrofes"),
  apellidos: z
    .string()
    .trim()
    .min(3, "Los apellidos deben tener al menos 3 caracteres")
    .max(120, "Los apellidos no pueden superar los 120 caracteres")
    .regex(/^[a-zA-ZÀ-ÿ\s']+$/, "Solo se permiten letras, espacios y apóstrofes"),
  email: z
    .string()
    .email("Ingrese un correo electrónico válido (ej. nombre@dominio.com)"),
  nacionalidad: z
    .string()
    .trim()
    .min(4, "Ingrese su nacionalidad")
    .max(80, "La nacionalidad no puede superar los 80 caracteres")
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Solo se permiten letras"),
});

// ── Paso 2: Asistencia ────────────────────────────────────────
export const asistenciaSchema = z.object({
  calidad_asistencia: z.enum(CALIDADES_ASISTENCIA, {
    message: "Seleccione su perfil de participación",
  }),
  titulo_ponencia:  z.string().optional(),
  eje_tematico:     z.string().optional(),
  archivo_ponencia: z.custom<FileList>().optional(),
});

// ── Paso 3: Pago ──────────────────────────────────────────────
export const pagoSchema = z.object({
  comprobante_pago: z.custom<FileList>(
    (val) => typeof window !== "undefined" && val instanceof FileList,
    { message: "El comprobante de pago es requerido" }
  ).superRefine((fileList, ctx) => {
    if (!fileList || fileList.length === 0) {
      ctx.addIssue({ code: "custom", message: "El comprobante de pago es requerido" });
      return;
    }
    const file = fileList[0];
    if (!TIPOS_PAGO.includes(file.type)) {
      ctx.addIssue({ code: "custom", message: "Solo se aceptan imágenes (JPG, PNG, WEBP) o PDF" });
    }
    if (file.size > MAX_PAGO_BYTES) {
      ctx.addIssue({ code: "custom", message: "El comprobante no debe superar los 10 MB" });
    }
  }),
});

// ── Esquema completo con refinamientos condicionales ──────────
export const inscripcionSchema = z
  .object({
    // Paso 1
    nombre:       personalSchema.shape.nombre,
    apellidos:    personalSchema.shape.apellidos,
    email:        personalSchema.shape.email,
    nacionalidad: personalSchema.shape.nacionalidad,

    // Paso 2
    calidad_asistencia: asistenciaSchema.shape.calidad_asistencia,
    titulo_ponencia:    z.string().optional(),
    eje_tematico:       z.string().optional(),
    archivo_ponencia:   z.custom<FileList>().optional(),

    // Paso 3
    comprobante_pago: z.custom<FileList>().optional(),
  })
  .superRefine((data, ctx) => {
    const esExpositor = data.calidad_asistencia?.includes("Expositor");

    // Validaciones adicionales para expositores
    if (esExpositor) {
      if (!data.titulo_ponencia || data.titulo_ponencia.trim().length < 5) {
        ctx.addIssue({
          code: "custom",
          path: ["titulo_ponencia"],
          message: "El título de la ponencia es requerido (mínimo 5 caracteres)",
        });
      }
      if (!data.eje_tematico || data.eje_tematico.trim().length < 3) {
        ctx.addIssue({
          code: "custom",
          path: ["eje_tematico"],
          message: "El eje temático es requerido (mínimo 3 caracteres)",
        });
      }
      if (!data.archivo_ponencia || data.archivo_ponencia.length === 0) {
        ctx.addIssue({
          code: "custom",
          path: ["archivo_ponencia"],
          message: "El documento de la ponencia es requerido",
        });
      } else {
        const file = data.archivo_ponencia[0];
        if (!TIPOS_PONENCIA.includes(file.type)) {
          ctx.addIssue({
            code: "custom",
            path: ["archivo_ponencia"],
            message: "Solo se aceptan archivos PDF o Word (.doc, .docx)",
          });
        }
        if (file.size > MAX_PONENCIA_BYTES) {
          ctx.addIssue({
            code: "custom",
            path: ["archivo_ponencia"],
            message: "El archivo no debe superar los 25 MB",
          });
        }
      }
    }

    // Validación del comprobante de pago
    if (!data.comprobante_pago || data.comprobante_pago.length === 0) {
      ctx.addIssue({
        code: "custom",
        path: ["comprobante_pago"],
        message: "El comprobante de pago es requerido",
      });
    } else {
      const file = data.comprobante_pago[0];
      if (!TIPOS_PAGO.includes(file.type)) {
        ctx.addIssue({
          code: "custom",
          path: ["comprobante_pago"],
          message: "Solo se aceptan imágenes (JPG, PNG, WEBP) o PDF",
        });
      }
      if (file.size > MAX_PAGO_BYTES) {
        ctx.addIssue({
          code: "custom",
          path: ["comprobante_pago"],
          message: "El comprobante no debe superar los 10 MB",
        });
      }
    }
  });

export type InscripcionFormData = z.infer<typeof inscripcionSchema>;

// ── Campos por paso (para trigger parcial en RHF) ─────────────
export const CAMPOS_POR_PASO = {
  1: ["nombre", "apellidos", "email", "nacionalidad"] as const,
  2: ["calidad_asistencia", "titulo_ponencia", "eje_tematico", "archivo_ponencia"] as const,
  3: ["comprobante_pago"] as const,
} as const;
