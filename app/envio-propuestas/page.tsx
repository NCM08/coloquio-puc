// ============================================================
// app/envio-propuestas/page.tsx — ENVÍO DE PROPUESTAS
// ============================================================

"use client";

import { useState, useRef } from "react";
import { useTheme } from "@/components/ThemeProvider";
import Link from "next/link";
import {
  ChevronRight,
  FileText,
  FileUp,
  Send,
  CheckCircle,
  Briefcase,
  GraduationCap,
  Heart,
  Globe,
  Monitor,
  MapPin,
  Navigation,
  Flame,
} from "lucide-react";
import { enviarPropuesta } from "@/app/actions/propuestas";
import { Turnstile } from "@marsidev/react-turnstile";

// ── Ejes Temáticos (alineados con ThematicAxes) ───────────────
const EJES_TEMATICOS = [
  { icon: Briefcase, label: "Mutaciones civilizatorias, transformaciones del mundo del trabajo" },
  { icon: GraduationCap, label: "Descomposición de la escuela, la universidad y de los sistemas educativos" },
  { icon: Heart, label: "Claves y acciones desde el feminismo" },
  { icon: Globe, label: "Colonialidad, pueblos indígenas y afrodescendientes" },
  { icon: Monitor, label: "Nuevas tecnologías digitales: dilemas, ventajas y encrucijadas" },
  { icon: MapPin, label: "Militancias y territorios" },
  { icon: Navigation, label: "Desplazamientos, migración e interculturalidad" },
  { icon: Flame, label: "Juventudes: entre la pulsión de vida y de muerte" },
];

// ── Pasos del Stepper ─────────────────────────────────────────
const PASOS = [
  {
    numero: 1,
    titulo: "Prepara tu documento",
    descripcion:
      "Redacta tu propuesta siguiendo los lineamientos de uno de los Ejes Temáticos del coloquio. La propuesta debe enviarse de forma anónima (sin datos de autoría en el cuerpo del texto).",
    detalle: "Mínimo 300 palabras para pósters · Mínimo 500 palabras para ponencias individuales",
  },
  {
    numero: 2,
    titulo: "Formato del archivo",
    descripcion:
      "El archivo debe estar en formato PDF o Word (.docx). Asegúrate de que el documento no supere los 10 MB y que no contenga información de identificación en el cuerpo del texto.",
    detalle: "Formatos aceptados: PDF (.pdf) · Word (.docx)",
  },
  {
    numero: 3,
    titulo: "Completa y envía",
    descripcion:
      "Rellena el formulario con tus datos personales y de contacto. Selecciona el Eje Temático correspondiente, adjunta tu archivo y haz clic en «Enviar Propuesta».",
    detalle: "Los campos marcados con * son obligatorios",
  },
];

export default function EnvioPropuestasPage() {
  const { dark } = useTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [archivoNombre, setArchivoNombre] = useState<string | null>(null);
  const [archivoFile, setArchivoFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);

  // Estados del formulario
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  // Colores contextuales
  const bg           = dark ? "var(--color-dark-900)" : "#F7F7F7";
  const cardBg       = dark ? "var(--color-dark-800)" : "#FFFFFF";
  const borderColor  = dark ? "var(--color-dark-700)" : "#DDDDDD";
  const textPrimary  = dark ? "var(--color-dark-100)" : "#424242";
  const textSecondary = dark ? "var(--color-dark-400)" : "#6B6B6B";
  const inputBg      = dark ? "var(--color-dark-900)" : "#FAFAFA";
  const labelColor   = dark ? "var(--color-dark-200)" : "#303030";
  const accentColor  = "var(--color-accent)";
  const primaryColor = "var(--color-primary)";

  // ── Manejadores de archivo ──────────────────────────────────
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setArchivoNombre(file.name);
      setArchivoFile(file);
    }
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setArchivoNombre(file.name);
      setArchivoFile(file);
    }
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragOver(true);
  }

  function handleDragLeave() {
    setDragOver(false);
  }

  // ── Envío del formulario ────────────────────────────────────
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);

    // Si el archivo fue soltado via drag & drop, asegurar que esté en el FormData
    if (archivoFile) {
      formData.set("archivo", archivoFile);
    }

    if (turnstileToken) {
      formData.set("turnstile_token", turnstileToken);
    }

    const result = await enviarPropuesta(formData);

    setIsSubmitting(false);

    if (result.error) {
      setError(result.error);
    } else if (result.success) {
      setSuccess(true);
    }
  }

  // ── Estilos reutilizables ───────────────────────────────────
  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "14px 16px",
    borderRadius: 10,
    border: `1.5px solid ${borderColor}`,
    backgroundColor: inputBg,
    color: textPrimary,
    fontSize: 17,
    fontFamily: "var(--font-body)",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: 16,
    fontWeight: 600,
    color: labelColor,
    marginBottom: 8,
  };

  const fieldStyle: React.CSSProperties = {
    marginBottom: 28,
  };

  return (
    <div style={{ backgroundColor: bg, minHeight: "100vh", transition: "background-color 0.3s" }}>

      {/* ── Encabezado ──────────────────────────────────────── */}
      <div
        style={{
          padding: "48px 24px",
          backgroundColor: dark ? "var(--color-dark-800)" : primaryColor,
          color: "#FFFFFF",
        }}
      >
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          {/* Breadcrumb */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 14,
              opacity: 0.7,
              marginBottom: 16,
            }}
          >
            <Link href="/" style={{ color: "#fff", textDecoration: "none" }}>Inicio</Link>
            <ChevronRight size={14} />
            <span>Envío de Propuestas</span>
          </div>

          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(32px, 5vw, 48px)",
              fontWeight: 700,
              lineHeight: 1.15,
              marginBottom: 14,
            }}
          >
            Envío de Propuestas
          </h1>
          <p
            style={{
              fontSize: 19,
              opacity: 0.85,
              maxWidth: 640,
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            Siga los tres pasos indicados a continuación, complete sus datos y
            adjunte su documento. Las propuestas serán evaluadas mediante
            revisión ciega por pares.
          </p>
        </div>
      </div>

      {/* ── Contenido principal ────────────────────────────── */}
      <div style={{ maxWidth: 820, margin: "0 auto", padding: "56px 24px" }}>

        {/* ════ STEPPER ════════════════════════════════════════ */}
        <section style={{ marginBottom: 64 }}>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 26,
              fontWeight: 700,
              color: textPrimary,
              marginBottom: 32,
            }}
          >
            Instrucciones paso a paso
          </h2>

          {/* Contenedor del stepper */}
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {PASOS.map((paso, idx) => {
              const isLast = idx === PASOS.length - 1;
              return (
                <div key={paso.numero} style={{ display: "flex", gap: 24 }}>

                  {/* Línea vertical + círculo numerado */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      flexShrink: 0,
                    }}
                  >
                    {/* Círculo */}
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: "50%",
                        backgroundColor: accentColor,
                        color: "#FFFFFF",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: "var(--font-display)",
                        fontSize: 20,
                        fontWeight: 700,
                        flexShrink: 0,
                        boxShadow: "var(--shadow-accent)",
                        zIndex: 1,
                      }}
                    >
                      {paso.numero}
                    </div>
                    {/* Línea de unión */}
                    {!isLast && (
                      <div
                        style={{
                          width: 2,
                          flex: 1,
                          minHeight: 32,
                          backgroundColor: dark ? "var(--color-dark-700)" : "#DDDDDD",
                          margin: "4px 0",
                        }}
                      />
                    )}
                  </div>

                  {/* Contenido del paso */}
                  <div
                    style={{
                      paddingBottom: isLast ? 0 : 36,
                      paddingTop: 4,
                      flex: 1,
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: 20,
                        fontWeight: 700,
                        color: textPrimary,
                        marginBottom: 8,
                        lineHeight: 1.3,
                      }}
                    >
                      {paso.titulo}
                    </h3>
                    <p
                      style={{
                        fontSize: 17,
                        lineHeight: 1.75,
                        color: textSecondary,
                        marginBottom: 10,
                      }}
                    >
                      {paso.descripcion}
                    </p>
                    {/* Detalle técnico */}
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        padding: "8px 14px",
                        borderRadius: 8,
                        backgroundColor: dark ? "rgba(0,173,252,0.08)" : "var(--color-primary-50)",
                        border: `1px solid ${dark ? "rgba(0,173,252,0.2)" : "var(--color-primary-100)"}`,
                      }}
                    >
                      <CheckCircle size={15} style={{ color: primaryColor, flexShrink: 0 }} />
                      <span
                        style={{
                          fontSize: 14,
                          color: dark ? "var(--color-primary-300)" : "var(--color-primary-700)",
                          fontWeight: 500,
                          lineHeight: 1.5,
                        }}
                      >
                        {paso.detalle}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ════ FORMULARIO / ÉXITO ═════════════════════════════ */}
        <section>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 26,
              fontWeight: 700,
              color: textPrimary,
              marginBottom: 8,
            }}
          >
            Formulario de postulación
          </h2>
          <p style={{ fontSize: 17, color: textSecondary, marginBottom: 36, lineHeight: 1.65 }}>
            Complete todos los campos marcados con <strong style={{ color: "#D32F2F" }}>*</strong>.
            Sus datos de contacto son confidenciales y no se incluirán en el proceso de revisión.
          </p>

          {/* ── Pantalla de Éxito ── */}
          {success ? (
            <div
              style={{
                backgroundColor: cardBg,
                borderRadius: 16,
                border: `1px solid ${borderColor}`,
                padding: "64px 40px",
                boxShadow: dark ? "none" : "0 2px 16px rgba(0,0,0,0.06)",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  backgroundColor: dark ? "rgba(95,186,36,0.12)" : "rgba(95,186,36,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 28px",
                }}
              >
                <CheckCircle size={44} style={{ color: accentColor }} />
              </div>

              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(26px, 4vw, 36px)",
                  fontWeight: 700,
                  color: textPrimary,
                  marginBottom: 16,
                  lineHeight: 1.2,
                }}
              >
                ¡Propuesta enviada con éxito!
              </h3>

              <p
                style={{
                  fontSize: 18,
                  color: textSecondary,
                  lineHeight: 1.75,
                  maxWidth: 520,
                  margin: "0 auto 12px",
                }}
              >
                Muchas gracias por su postulación al Coloquio. Hemos recibido su propuesta
                correctamente y la hemos registrado en nuestro sistema.
              </p>
              <p
                style={{
                  fontSize: 18,
                  color: textSecondary,
                  lineHeight: 1.75,
                  maxWidth: 520,
                  margin: "0 auto 40px",
                }}
              >
                En los próximos días recibirá un correo de confirmación con información
                sobre el proceso de evaluación y los próximos pasos.
              </p>

              <Link
                href="/"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "14px 36px",
                  borderRadius: 12,
                  backgroundColor: accentColor,
                  color: "#FFFFFF",
                  fontFamily: "var(--font-display)",
                  fontSize: 18,
                  fontWeight: 700,
                  textDecoration: "none",
                  boxShadow: "var(--shadow-accent)",
                  letterSpacing: 0.3,
                }}
              >
                Volver al inicio
              </Link>
            </div>
          ) : (
            /* ── Formulario ── */
            <form
              onSubmit={handleSubmit}
              style={{
                backgroundColor: cardBg,
                borderRadius: 16,
                border: `1px solid ${borderColor}`,
                padding: "40px 36px",
                boxShadow: dark ? "none" : "0 2px 16px rgba(0,0,0,0.06)",
              }}
            >
              {/* ── Datos personales ── */}
              <fieldset style={{ border: "none", padding: 0, margin: "0 0 36px 0" }}>
                <legend
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 18,
                    fontWeight: 700,
                    color: dark ? "var(--color-primary-300)" : primaryColor,
                    marginBottom: 24,
                    paddingBottom: 10,
                    borderBottom: `2px solid ${dark ? "var(--color-dark-700)" : "var(--color-primary-100)"}`,
                    width: "100%",
                  }}
                >
                  Datos del autor / autora
                </legend>

                {/* Nombre completo */}
                <div style={fieldStyle}>
                  <label htmlFor="nombre" style={labelStyle}>
                    Nombre completo <span style={{ color: "#D32F2F" }}>*</span>
                  </label>
                  <input
                    id="nombre"
                    name="nombre"
                    type="text"
                    required
                    placeholder="Ej.: María González Pérez"
                    style={inputStyle}
                    autoComplete="name"
                  />
                </div>

                {/* Correo electrónico */}
                <div style={fieldStyle}>
                  <label htmlFor="correo" style={labelStyle}>
                    Correo electrónico <span style={{ color: "#D32F2F" }}>*</span>
                  </label>
                  <input
                    id="correo"
                    name="correo"
                    type="email"
                    required
                    placeholder="Ej.: maria.gonzalez@universidad.cl"
                    style={inputStyle}
                    autoComplete="email"
                  />
                  <p style={{ fontSize: 14, color: textSecondary, marginTop: 6, lineHeight: 1.5 }}>
                    Recibirá la confirmación de recepción en este correo.
                  </p>
                </div>

                {/* Institución */}
                <div style={{ ...fieldStyle, marginBottom: 0 }}>
                  <label htmlFor="institucion" style={labelStyle}>
                    Institución de afiliación <span style={{ color: "#D32F2F" }}>*</span>
                  </label>
                  <input
                    id="institucion"
                    name="institucion"
                    type="text"
                    required
                    placeholder="Ej.: Pontificia Universidad Católica de Chile"
                    style={inputStyle}
                    autoComplete="organization"
                  />
                </div>
              </fieldset>

              {/* ── Eje Temático ── */}
              <fieldset style={{ border: "none", padding: 0, margin: "0 0 36px 0" }}>
                <legend
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 18,
                    fontWeight: 700,
                    color: dark ? "var(--color-primary-300)" : primaryColor,
                    marginBottom: 24,
                    paddingBottom: 10,
                    borderBottom: `2px solid ${dark ? "var(--color-dark-700)" : "var(--color-primary-100)"}`,
                    width: "100%",
                  }}
                >
                  Eje Temático
                </legend>

                <div style={fieldStyle}>
                  <label htmlFor="eje" style={labelStyle}>
                    Seleccione el Eje Temático de su propuesta <span style={{ color: "#D32F2F" }}>*</span>
                  </label>
                  <div style={{ position: "relative" }}>
                    <select
                      id="eje"
                      name="eje"
                      required
                      defaultValue=""
                      style={{
                        ...inputStyle,
                        appearance: "none",
                        paddingRight: 44,
                        cursor: "pointer",
                      }}
                    >
                      <option value="" disabled>— Elija un eje temático —</option>
                      {EJES_TEMATICOS.map((eje, i) => (
                        <option key={i} value={eje.label}>
                          {eje.label}
                        </option>
                      ))}
                    </select>
                    {/* Flecha decorativa del select */}
                    <div
                      style={{
                        position: "absolute",
                        right: 14,
                        top: "50%",
                        transform: "translateY(-50%)",
                        pointerEvents: "none",
                        color: textSecondary,
                      }}
                    >
                      ▼
                    </div>
                  </div>
                  <p style={{ fontSize: 14, color: textSecondary, marginTop: 8, lineHeight: 1.5 }}>
                    Si su propuesta abarca más de un eje, elija el más representativo.
                    Puede indicar los ejes secundarios en el documento adjunto.
                  </p>
                </div>
              </fieldset>

              {/* ── Archivo ── */}
              <fieldset style={{ border: "none", padding: 0, margin: "0 0 44px 0" }}>
                <legend
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 18,
                    fontWeight: 700,
                    color: dark ? "var(--color-primary-300)" : primaryColor,
                    marginBottom: 24,
                    paddingBottom: 10,
                    borderBottom: `2px solid ${dark ? "var(--color-dark-700)" : "var(--color-primary-100)"}`,
                    width: "100%",
                  }}
                >
                  Documento de propuesta
                </legend>

                <label htmlFor="archivo" style={labelStyle}>
                  Subir archivo <span style={{ color: "#D32F2F" }}>*</span>
                </label>

                {/* Zona drag & drop */}
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    border: `2.5px dashed ${dragOver ? accentColor : borderColor}`,
                    borderRadius: 14,
                    padding: "40px 24px",
                    textAlign: "center",
                    cursor: "pointer",
                    backgroundColor: dragOver
                      ? dark ? "rgba(95,186,36,0.06)" : "rgba(95,186,36,0.04)"
                      : dark ? "var(--color-dark-900)" : "#FAFAFA",
                    transition: "all 0.2s",
                    userSelect: "none",
                  }}
                >
                  <input
                    id="archivo"
                    name="archivo"
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    required={!archivoFile}
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                    aria-label="Subir archivo de propuesta (PDF o Word)"
                  />

                  {archivoNombre ? (
                    <>
                      <CheckCircle
                        size={40}
                        style={{ color: accentColor, marginBottom: 12 }}
                      />
                      <p
                        style={{
                          fontSize: 18,
                          fontWeight: 700,
                          color: accentColor,
                          marginBottom: 6,
                          wordBreak: "break-all",
                        }}
                      >
                        {archivoNombre}
                      </p>
                      <p style={{ fontSize: 15, color: textSecondary }}>
                        Archivo seleccionado. Haga clic para cambiarlo.
                      </p>
                    </>
                  ) : (
                    <>
                      <FileUp
                        size={44}
                        style={{
                          color: dark ? "var(--color-dark-500)" : "var(--color-dark-300)",
                          marginBottom: 16,
                        }}
                      />
                      <p
                        style={{
                          fontSize: 18,
                          fontWeight: 600,
                          color: textPrimary,
                          marginBottom: 8,
                        }}
                      >
                        Arrastre su archivo aquí
                      </p>
                      <p style={{ fontSize: 16, color: textSecondary, marginBottom: 20 }}>
                        o haga clic para buscarlo en su computador
                      </p>

                      {/* Botón buscar archivo */}
                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 8,
                          padding: "12px 28px",
                          borderRadius: 10,
                          backgroundColor: dark ? "var(--color-dark-700)" : "var(--color-dark-100)",
                          color: textPrimary,
                          fontSize: 16,
                          fontWeight: 600,
                          fontFamily: "var(--font-body)",
                          border: `1.5px solid ${borderColor}`,
                          cursor: "pointer",
                        }}
                      >
                        <FileText size={18} />
                        Buscar archivo
                      </div>

                      <p style={{ fontSize: 14, color: textSecondary, marginTop: 16 }}>
                        Formatos aceptados: <strong>PDF</strong> o <strong>Word (.docx)</strong> · Máximo 10 MB
                      </p>
                    </>
                  )}
                </div>
              </fieldset>

              {/* ── Turnstile anti-bot ── */}
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
                <Turnstile
                  siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                  onSuccess={(token) => setTurnstileToken(token)}
                  onExpire={() => setTurnstileToken(null)}
                  onError={() => setTurnstileToken(null)}
                />
              </div>

              {/* ── Botón de envío ── */}
              <div style={{ textAlign: "center" }}>
                <button
                  type="submit"
                  disabled={isSubmitting || !turnstileToken}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 12,
                    width: "100%",
                    maxWidth: 480,
                    minHeight: 56,
                    padding: "0 40px",
                    borderRadius: 12,
                    border: "none",
                    backgroundColor: accentColor,
                    color: "#FFFFFF",
                    fontFamily: "var(--font-display)",
                    fontSize: 20,
                    fontWeight: 700,
                    cursor: (isSubmitting || !turnstileToken) ? "not-allowed" : "pointer",
                    letterSpacing: 0.3,
                    boxShadow: "var(--shadow-accent)",
                    transition: "opacity 0.2s, box-shadow 0.2s",
                    opacity: (isSubmitting || !turnstileToken) ? 0.7 : 1,
                  }}
                  onMouseEnter={(e) => {
                    if (!isSubmitting && turnstileToken) {
                      (e.currentTarget as HTMLButtonElement).style.boxShadow = "var(--shadow-accent-hover)";
                      (e.currentTarget as HTMLButtonElement).style.opacity = "0.93";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSubmitting && turnstileToken) {
                      (e.currentTarget as HTMLButtonElement).style.boxShadow = "var(--shadow-accent)";
                      (e.currentTarget as HTMLButtonElement).style.opacity = "1";
                    }
                  }}
                >
                  <Send size={22} />
                  {isSubmitting ? "Enviando Propuesta..." : "Enviar Propuesta"}
                </button>

                {/* Mensaje de error */}
                {error && (
                  <div
                    style={{
                      marginTop: 16,
                      padding: "12px 20px",
                      borderRadius: 10,
                      backgroundColor: dark ? "rgba(211,47,47,0.12)" : "#FFF5F5",
                      border: "1.5px solid #D32F2F",
                      color: "#D32F2F",
                      fontSize: 16,
                      fontWeight: 500,
                      lineHeight: 1.5,
                      maxWidth: 480,
                      margin: "16px auto 0",
                    }}
                  >
                    {error}
                  </div>
                )}

                <p style={{ fontSize: 15, color: textSecondary, marginTop: 16, lineHeight: 1.6 }}>
                  Al enviar, confirma que su propuesta cumple con todos los requisitos
                  de la convocatoria.{" "}
                  <Link
                    href="/convocatoria"
                    style={{ color: dark ? "var(--color-primary-300)" : primaryColor, textDecoration: "underline" }}
                  >
                    Ver convocatoria completa
                  </Link>
                  .
                </p>
              </div>
            </form>
          )}
        </section>

      </div>
    </div>
  );
}
