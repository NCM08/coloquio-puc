// ============================================================
// app/inscripciones/page.tsx — INSCRIPCIONES
// ============================================================

"use client";

import { useState } from "react";
import { useTheme } from "@/components/ThemeProvider";
import Link from "next/link";
import { ChevronRight, ChevronDown, Info, FileText, AlertCircle, MapPin, PauseCircle } from "lucide-react";

// ── Valores de inscripción ────────────────────────────────────
const TABLA_PRECIOS = [
  {
    categoria: "Estudiantes de pregrado",
    descripcion: null,
    asistente: 13000,
    expositor: 16000,
  },
  {
    categoria: "Egresados/as y profesionales de ciencias sociales, humanidades y artes",
    descripcion: null,
    asistente: 26000,
    expositor: 34000,
  },
  {
    categoria: "Estudiantes de posgrado",
    descripcion: "Magíster, Doctorado y postdoctorado",
    asistente: 38000,
    expositor: 54000,
  },
  {
    categoria: "Académicos/as e investigadores/as",
    descripcion: null,
    asistente: 55000,
    expositor: 80000,
  },
];

const FAQ = [
  {
    q: "¿Cómo pago si soy extranjero/a?",
    a: "Aceptamos pagos internacionales mediante transferencia bancaria a través de Global66. Los datos bancarios exactos se proporcionan de forma segura en el Paso 3 del Formulario de Inscripción. Para coordinar su pago internacional, escríbanos a congresosociologiaclinica.2026@gmail.com",
  },
  {
    q: "¿Puedo obtener factura o boleta?",
    a: "El coloquio no emite boletas oficiales. Una vez realizada su transferencia a través de Global66, se le entregará un comprobante de pago estándar, válido para procesos de validación y rendición ante su institución.",
  },
  {
    q: "¿Qué pasa si necesito cancelar mi inscripción?",
    a: "Toda inscripción y pago realizado es definitivo. No se realizarán devoluciones de dinero bajo ninguna circunstancia, independientemente del motivo de cancelación.",
  },
];

export default function InscripcionesPage() {
  const { dark } = useTheme();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const bg          = dark ? "var(--color-dark-900)" : "#F7F7F7";
  const cardBg      = dark ? "var(--color-dark-800)" : "#FFFFFF";
  const borderColor = dark ? "var(--color-dark-700)" : "#DDDDDD";
  const textPrimary = dark ? "var(--color-dark-100)" : "#424242";
  const textSecondary = dark ? "var(--color-dark-400)" : "#6B6B6B";
  const headerBg    = dark ? "var(--color-dark-700)" : "#EEF2F7";

  return (
    <div style={{ backgroundColor: bg, minHeight: "100vh", transition: "background-color 0.3s" }}>

      {/* ── Encabezado ────────────────────────────────────────── */}
      <div
        style={{
          padding: "48px 24px",
          backgroundColor: dark ? "var(--color-dark-800)" : "var(--color-primary)",
          color: "#FFFFFF",
        }}
      >
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, opacity: 0.7, marginBottom: 16 }}>
            <Link href="/" style={{ color: "#fff", textDecoration: "none" }}>Inicio</Link>
            <ChevronRight size={14} />
            <span>Inscripciones</span>
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(32px, 5vw, 48px)",
              fontWeight: 700,
              marginBottom: 12,
            }}
          >
            Inscripciones
          </h1>
          <p style={{ fontSize: 19, opacity: 0.85, maxWidth: 620, lineHeight: 1.65 }}>
            Seleccione el tipo de inscripción que corresponda y complete su registro.
            Los valores incluyen acceso completo al evento y certificado.
          </p>
        </div>
      </div>

      {/* ── Contenido principal ───────────────────────────────── */}
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "56px 24px" }}>

        {/* Banner: inscripciones pausadas */}
        <div
          style={{
            padding: "28px 32px",
            borderRadius: 14,
            backgroundColor: dark ? "rgba(220,38,38,0.10)" : "rgba(220,38,38,0.06)",
            border: "1.5px solid rgba(220,38,38,0.35)",
            display: "flex",
            gap: 18,
            alignItems: "flex-start",
            marginBottom: 48,
          }}
        >
          <PauseCircle size={28} style={{ color: "#DC2626", flexShrink: 0, marginTop: 2 }} />
          <div>
            <p
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: dark ? "#FCA5A5" : "#991B1B",
                margin: "0 0 6px 0",
                fontFamily: "var(--font-display)",
              }}
            >
              Inscripciones temporalmente deshabilitadas
            </p>
            <p style={{ fontSize: 16, color: textPrimary, lineHeight: 1.7, margin: 0 }}>
              Las inscripciones se encuentran temporalmente deshabilitadas mientras actualizamos
              nuestros aranceles.{" "}
              <strong>Pronto publicaremos los nuevos valores.</strong>
            </p>
          </div>
        </div>

        {/* ── Encabezado de sección ─────────────────────────────── */}
        <div style={{ marginBottom: 20 }}>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 26,
              fontWeight: 700,
              color: textPrimary,
              margin: "0 0 4px 0",
            }}
          >
            Tabla de valores
          </h2>
          <p style={{ fontSize: 15, color: textSecondary, margin: 0 }}>
            Los nuevos aranceles serán publicados próximamente
          </p>
        </div>

        {/* ── Tabla de precios ──────────────────────────────────── */}
        <div
          className="w-full overflow-x-auto shadow-md sm:rounded-lg"
          style={{
            border: `1px solid ${borderColor}`,
            backgroundColor: cardBg,
            boxShadow: dark ? "none" : "0 2px 12px rgba(0,0,0,0.06)",
            marginBottom: 52,
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 520 }}>
            <thead>
              <tr style={{ backgroundColor: headerBg }}>
                <th
                  style={{
                    padding: "18px 24px",
                    textAlign: "left",
                    fontSize: 15,
                    fontWeight: 700,
                    color: textPrimary,
                    borderBottom: `2px solid ${borderColor}`,
                    width: "50%",
                    whiteSpace: "nowrap",
                  }}
                >
                  Tipo de inscripción
                </th>
                <th
                  style={{
                    padding: "18px 20px",
                    textAlign: "center",
                    fontSize: 15,
                    fontWeight: 700,
                    color: textPrimary,
                    borderBottom: `2px solid ${borderColor}`,
                    borderLeft: `1px solid ${borderColor}`,
                    width: "25%",
                    lineHeight: 1.4,
                    whiteSpace: "nowrap",
                  }}
                >
                  Valor para asistentes
                  <br />
                  <span style={{ fontSize: 12, fontWeight: 400, color: textSecondary, whiteSpace: "normal" }}>
                    (no expositores)
                  </span>
                </th>
                <th
                  style={{
                    padding: "18px 20px",
                    textAlign: "center",
                    fontSize: 15,
                    fontWeight: 700,
                    color: textPrimary,
                    borderBottom: `2px solid ${borderColor}`,
                    borderLeft: `1px solid ${borderColor}`,
                    width: "25%",
                    whiteSpace: "nowrap",
                  }}
                >
                  Valor para expositores
                </th>
              </tr>
            </thead>

            <tbody>
              {TABLA_PRECIOS.map((fila, idx) => {
                const isLast = idx === TABLA_PRECIOS.length - 1;
                const rowBg  = idx % 2 !== 0
                  ? dark ? "rgba(255,255,255,0.025)" : "#FAFAFA"
                  : cardBg;

                return (
                  <tr key={idx} style={{ backgroundColor: rowBg }}>
                    {/* Categoría */}
                    <td
                      style={{
                        padding: "20px 24px",
                        borderBottom: isLast ? "none" : `1px solid ${borderColor}`,
                        verticalAlign: "middle",
                      }}
                    >
                      <p
                        style={{
                          fontSize: 17,
                          fontWeight: 600,
                          color: textPrimary,
                          margin: fila.descripcion ? "0 0 4px 0" : 0,
                          lineHeight: 1.45,
                        }}
                      >
                        {fila.categoria}
                      </p>
                      {fila.descripcion && (
                        <p style={{ fontSize: 14, color: textSecondary, margin: 0, lineHeight: 1.5 }}>
                          {fila.descripcion}
                        </p>
                      )}
                    </td>

                    {/* Asistente */}
                    <td
                      style={{
                        padding: "20px 20px",
                        textAlign: "center",
                        borderBottom: isLast ? "none" : `1px solid ${borderColor}`,
                        borderLeft: `1px solid ${borderColor}`,
                        verticalAlign: "middle",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: 16,
                          fontWeight: 600,
                          color: textSecondary,
                          fontStyle: "italic",
                        }}
                      >
                        Próximamente
                      </span>
                    </td>

                    {/* Expositor */}
                    <td
                      style={{
                        padding: "20px 20px",
                        textAlign: "center",
                        borderBottom: isLast ? "none" : `1px solid ${borderColor}`,
                        borderLeft: `1px solid ${borderColor}`,
                        verticalAlign: "middle",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: 16,
                          fontWeight: 600,
                          color: textSecondary,
                          fontStyle: "italic",
                        }}
                      >
                        Próximamente
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* ── Aviso seguro de datos bancarios ──────────────────── */}
        <div
          style={{
            padding: "32px 36px",
            borderRadius: 14,
            backgroundColor: dark ? "rgba(0,173,252,0.06)" : "#F0F9FF",
            border: `1.5px solid ${dark ? "rgba(0,173,252,0.3)" : "rgba(0,173,252,0.35)"}`,
            marginBottom: 52,
            display: "flex",
            gap: 18,
            alignItems: "flex-start",
          }}
        >
          <Info size={24} style={{ color: dark ? "#60C8F5" : "#0284C7", flexShrink: 0, marginTop: 2 }} />
          <div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 20,
                fontWeight: 700,
                color: textPrimary,
                margin: "0 0 10px 0",
              }}
            >
              Datos bancarios para transferencia
            </h2>
            <p style={{ fontSize: 15, color: textSecondary, margin: 0, lineHeight: 1.75 }}>
              Por motivos de seguridad, los datos exactos para realizar la transferencia bancaria (RUT y Número de Cuenta)
              se te proporcionarán de forma segura en el{" "}
              <strong style={{ color: textPrimary }}>Paso 3 del Formulario de Inscripción</strong>,
              una vez que hayas ingresado tus datos personales.
            </p>
          </div>
        </div>

        {/* ── Políticas de Pago y Condiciones importantes ──────── */}
        <div
          style={{
            padding: "32px 36px",
            borderRadius: 14,
            backgroundColor: dark ? "rgba(255,255,255,0.03)" : "#F8F9FB",
            border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "#E2E8F0"}`,
            marginBottom: 52,
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 22,
              fontWeight: 700,
              color: textPrimary,
              margin: "0 0 28px 0",
            }}
          >
            Políticas de Pago y Condiciones importantes
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            {/* Comprobantes */}
            <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
              <Info
                size={20}
                style={{ color: "var(--color-accent)", flexShrink: 0, marginTop: 2 }}
              />
              <div>
                <p style={{ fontSize: 16, fontWeight: 600, color: textPrimary, margin: "0 0 4px 0" }}>
                  Comprobantes de pago
                </p>
                <p style={{ fontSize: 15, color: textSecondary, margin: 0, lineHeight: 1.7 }}>
                  El coloquio no emite boletas oficiales. Una vez realizada su transferencia a{" "}
                  <strong style={{ color: textPrimary }}>Global66</strong>, se le entregará un comprobante de pago
                  estándar, el cual es válido para procesos de validación y rendición ante su institución.
                </p>
              </div>
            </div>

            <div
              style={{
                height: 1,
                backgroundColor: dark ? "rgba(255,255,255,0.07)" : "#E2E8F0",
              }}
            />

            {/* Inscripciones individuales */}
            <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
              <FileText
                size={20}
                style={{ color: "var(--color-accent)", flexShrink: 0, marginTop: 2 }}
              />
              <div>
                <p style={{ fontSize: 16, fontWeight: 600, color: textPrimary, margin: "0 0 4px 0" }}>
                  Inscripciones individuales
                </p>
                <p style={{ fontSize: 15, color: textSecondary, margin: 0, lineHeight: 1.7 }}>
                  Los valores indicados son por persona. No contamos con opciones de descuento por inscripción grupal.
                </p>
              </div>
            </div>

            <div
              style={{
                height: 1,
                backgroundColor: dark ? "rgba(255,255,255,0.07)" : "#E2E8F0",
              }}
            />

            {/* Política de cancelación */}
            <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
              <AlertCircle
                size={20}
                style={{ color: "#E53E3E", flexShrink: 0, marginTop: 2 }}
              />
              <div>
                <p style={{ fontSize: 16, fontWeight: 600, color: textPrimary, margin: "0 0 4px 0" }}>
                  Política de Cancelación — Sin devoluciones
                </p>
                <p style={{ fontSize: 15, color: textSecondary, margin: 0, lineHeight: 1.7 }}>
                  Toda inscripción y pago realizado es definitivo. En caso de cancelar su postulación o no poder
                  asistir al evento, <strong style={{ color: "#E53E3E" }}>no se realizarán devoluciones de dinero
                  bajo ninguna circunstancia</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Aviso: inscripciones pausadas (reemplaza CTA) ────── */}
        <div
          style={{
            textAlign: "center",
            marginBottom: 72,
            padding: "48px 32px",
            borderRadius: 20,
            backgroundColor: dark ? "rgba(220,38,38,0.08)" : "rgba(220,38,38,0.05)",
            border: "1.5px solid rgba(220,38,38,0.3)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
            <PauseCircle size={48} style={{ color: "#DC2626" }} />
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 24,
              fontWeight: 700,
              color: dark ? "#FCA5A5" : "#991B1B",
              margin: "0 0 12px 0",
            }}
          >
            Inscripciones temporalmente deshabilitadas
          </h2>
          <p
            style={{
              fontSize: 17,
              color: textSecondary,
              lineHeight: 1.7,
              maxWidth: 520,
              margin: "0 auto",
            }}
          >
            Las inscripciones se encuentran temporalmente deshabilitadas mientras actualizamos
            nuestros aranceles. Pronto publicaremos los nuevos valores.
          </p>
        </div>

        {/* ── Tarjeta Hospedaje ─────────────────────────────────── */}
        <div
          style={{
            padding: "32px 36px",
            borderRadius: 16,
            backgroundColor: dark ? "rgba(6,182,212,0.07)" : "#F0FDFE",
            border: `1.5px solid ${dark ? "rgba(6,182,212,0.25)" : "rgba(6,182,212,0.35)"}`,
            marginBottom: 48,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
            <MapPin size={24} style={{ color: "var(--color-vibrant-cyan)", flexShrink: 0 }} />
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 20,
                fontWeight: 600,
                color: textPrimary,
                margin: 0,
              }}
            >
              ¿Viajas desde fuera de Santiago?
            </h2>
          </div>
          <p style={{ fontSize: 16, color: textSecondary, lineHeight: 1.75, margin: "0 0 24px 0" }}>
            Hemos preparado una selección oficial de alojamientos seguros, verificados y con conexión directa en Metro
            al Campus San Joaquín de la Universidad Católica para facilitar tu estadía.
          </p>
          <Link
            href="/hospedaje"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 24px",
              borderRadius: 10,
              border: `1.5px solid ${dark ? "rgba(6,182,212,0.5)" : "rgba(6,182,212,0.6)"}`,
              backgroundColor: dark ? "rgba(6,182,212,0.12)" : "#FFFFFF",
              color: dark ? "var(--color-vibrant-cyan)" : "var(--color-primary)",
              fontSize: 15,
              fontWeight: 600,
              textDecoration: "none",
              fontFamily: "var(--font-body)",
              transition: "all 0.2s",
            }}
          >
            <MapPin size={16} />
            Ver opciones de alojamiento recomendadas
          </Link>
        </div>

        {/* ── Preguntas frecuentes ──────────────────────────────── */}
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 26,
            fontWeight: 700,
            color: textPrimary,
            marginBottom: 20,
          }}
        >
          Preguntas frecuentes
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {FAQ.map((item, index) => (
            <button
              key={index}
              onClick={() => setOpenFaq(openFaq === index ? null : index)}
              style={{
                width: "100%",
                textAlign: "left",
                padding: "20px 24px",
                borderRadius: 12,
                border: `1px solid ${borderColor}`,
                backgroundColor: cardBg,
                cursor: "pointer",
                fontFamily: "var(--font-body)",
                transition: "all 0.2s",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ flex: 1, fontSize: 17, fontWeight: 600, color: textPrimary, lineHeight: 1.45 }}>
                  {item.q}
                </span>
                <ChevronDown
                  size={20}
                  style={{
                    color: textSecondary,
                    flexShrink: 0,
                    transform: openFaq === index ? "rotate(180deg)" : "rotate(0)",
                    transition: "transform 0.2s",
                  }}
                />
              </div>
              {openFaq === index && (
                <p
                  style={{
                    marginTop: 14,
                    paddingTop: 14,
                    borderTop: `1px solid ${borderColor}`,
                    fontSize: 16,
                    lineHeight: 1.75,
                    color: textSecondary,
                    margin: "14px 0 0 0",
                  }}
                >
                  {item.a}
                </p>
              )}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}
