// ============================================================
// app/inscripciones/page.tsx — INSCRIPCIONES
// ============================================================

"use client";

import { useState } from "react";
import { useTheme } from "@/components/ThemeProvider";
import Link from "next/link";
import { ChevronRight, ChevronDown, AlertTriangle, ExternalLink, Info, RefreshCw } from "lucide-react";

// ── Tipo de cambio referencial ────────────────────────────────
const CLP_POR_USD = 950;

function clpToUsd(clp: number): string {
  return `~USD $${Math.round(clp / CLP_POR_USD).toLocaleString("es-CL")}`;
}

function formatClp(clp: number): string {
  return `$${clp.toLocaleString("es-CL")}`;
}

// ── Valores reales de inscripción ─────────────────────────────
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
    a: "Aceptamos pagos internacionales vía transferencia bancaria en dólares o mediante PayPal. Al momento de inscribirse, seleccione la opción 'Pago internacional' y recibirá las instrucciones por correo.",
  },
  {
    q: "¿Puedo obtener factura o boleta?",
    a: "Sí, emitimos facturas y boletas según corresponda. Ingrese su RUT o documento de identidad al momento de la inscripción.",
  },
  {
    q: "¿Hay descuento por inscripción grupal?",
    a: "Sí, para grupos de 5 o más personas de la misma institución ofrecemos un 15% de descuento. Contáctenos a coloquio@uc.cl para coordinar.",
  },
  {
    q: "¿Qué pasa si necesito cancelar mi inscripción?",
    a: "Se puede solicitar devolución del 100% hasta 30 días antes del evento, y del 50% hasta 15 días antes. Después de esa fecha no se realizan devoluciones.",
  },
];

export default function InscripcionesPage() {
  const { dark } = useTheme();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showUsd, setShowUsd] = useState(false);

  const bg          = dark ? "var(--color-dark-900)" : "#F7F7F7";
  const cardBg      = dark ? "var(--color-dark-800)" : "#FFFFFF";
  const borderColor = dark ? "var(--color-dark-700)" : "#DDDDDD";
  const textPrimary = dark ? "var(--color-dark-100)" : "#424242";
  const textSecondary = dark ? "var(--color-dark-400)" : "#6B6B6B";
  const headerBg    = dark ? "var(--color-dark-700)" : "#EEF2F7";
  const accentColor = "var(--color-accent)";

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

        {/* Banner inscripción temprana */}
        <div
          style={{
            padding: "18px 24px",
            borderRadius: 12,
            backgroundColor: dark ? "rgba(251,140,0,0.08)" : "rgba(251,140,0,0.06)",
            border: "1px solid rgba(251,140,0,0.3)",
            display: "flex",
            gap: 14,
            alignItems: "flex-start",
            marginBottom: 48,
          }}
        >
          <AlertTriangle size={22} style={{ color: "#FB8C00", flexShrink: 0, marginTop: 2 }} />
          <p style={{ fontSize: 16, color: textPrimary, lineHeight: 1.65, margin: 0 }}>
            <strong>Inscripción temprana</strong> disponible hasta el{" "}
            <strong>30 de septiembre de 2026</strong>. Pasada esa fecha se aplicará un recargo.
          </p>
        </div>

        {/* ── Encabezado de sección + botón conversión ─────────── */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 16,
            marginBottom: 20,
          }}
        >
          <div>
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
              Valores en pesos chilenos (CLP) — incluyen IVA
            </p>
          </div>

          {/* Botón conversión CLP ↔ USD */}
          <button
            onClick={() => setShowUsd(!showUsd)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 20px",
              borderRadius: 10,
              border: `1.5px solid ${showUsd ? accentColor : borderColor}`,
              backgroundColor: showUsd
                ? dark ? "rgba(var(--color-accent-rgb),0.12)" : "rgba(13,71,161,0.06)"
                : cardBg,
              color: showUsd ? accentColor : textSecondary,
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "var(--font-body)",
              transition: "all 0.2s",
              whiteSpace: "nowrap",
            }}
          >
            <RefreshCw size={15} style={{ transition: "transform 0.3s", transform: showUsd ? "rotate(180deg)" : "none" }} />
            {showUsd ? "Ver en CLP" : "Ver en USD"}
          </button>
        </div>

        {/* Nota tipo de cambio (solo visible en modo USD) */}
        {showUsd && (
          <div
            style={{
              display: "flex",
              gap: 8,
              alignItems: "center",
              padding: "10px 16px",
              borderRadius: 8,
              backgroundColor: dark ? "rgba(255,255,255,0.04)" : "#F0F4FA",
              border: `1px solid ${borderColor}`,
              marginBottom: 16,
            }}
          >
            <Info size={14} style={{ color: textSecondary, flexShrink: 0 }} />
            <p style={{ fontSize: 13, color: textSecondary, margin: 0, lineHeight: 1.5 }}>
              Conversión referencial usando tipo de cambio de{" "}
              <strong style={{ color: textPrimary }}>1 USD = {CLP_POR_USD.toLocaleString("es-CL")} CLP</strong>.
              El valor exacto puede variar al momento del pago.
            </p>
          </div>
        )}

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

                const valAsistente = showUsd ? clpToUsd(fila.asistente) : formatClp(fila.asistente);
                const valExpositor = showUsd ? clpToUsd(fila.expositor) : formatClp(fila.expositor);

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
                          fontSize: 20,
                          fontWeight: 700,
                          color: textPrimary,
                          transition: "all 0.2s",
                        }}
                      >
                        {valAsistente}
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
                          fontSize: 20,
                          fontWeight: 700,
                          color: accentColor,
                          transition: "all 0.2s",
                        }}
                      >
                        {valExpositor}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* ── Botón de inscripción ──────────────────────────────── */}
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <Link
            href="#"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "18px 40px",
              borderRadius: 12,
              backgroundColor: "var(--color-accent)",
              color: "#FFFFFF",
              fontFamily: "var(--font-display)",
              fontSize: 19,
              fontWeight: 700,
              textDecoration: "none",
              transition: "opacity 0.2s",
              letterSpacing: 0.3,
            }}
          >
            Ir al formulario de inscripción
            <ExternalLink size={18} />
          </Link>
          <p style={{ fontSize: 15, color: textSecondary, marginTop: 14 }}>
            El formulario abre en una nueva ventana. Tenga a mano su credencial institucional.
          </p>
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
