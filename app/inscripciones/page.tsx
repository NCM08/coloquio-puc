// ============================================================
// app/inscripciones/page.tsx — INSCRIPCIONES
// ============================================================

"use client";

import { useState } from "react";
import { useTheme } from "@/components/ThemeProvider";
import Link from "next/link";
import { ChevronRight, ChevronDown, AlertTriangle, ExternalLink, Info } from "lucide-react";

// ── Precios temporales ────────────────────────────────────────
// Reemplazar con valores reales antes del lanzamiento
const TABLA_PRECIOS = [
  {
    categoria: "Estudiantes de Pregrado",
    descripcion: "Con credencial universitaria vigente",
    preventa: "$XX.000 CLP",
    regular: "$XX.000 CLP",
    notas: null,
  },
  {
    categoria: "Estudiantes de Posgrado",
    descripcion: "Magíster, Doctorado y postdoctorado",
    preventa: "$XX.000 CLP",
    regular: "$XX.000 CLP",
    notas: null,
  },
  {
    categoria: "Expositores",
    descripcion: "Presentación de ponencia o póster",
    preventa: "$XX.000 CLP",
    regular: "$XX.000 CLP",
    notas: "Incluye certificado de expositor y publicación en actas",
  },
  {
    categoria: "Asistentes / Público General",
    descripcion: "Académicos/as, investigadores/as y público interesado",
    preventa: "$XX.000 CLP",
    regular: "$XX.000 CLP",
    notas: null,
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

  const bg = dark ? "var(--color-dark-900)" : "#F7F7F7";
  const cardBg = dark ? "var(--color-dark-800)" : "#FFFFFF";
  const borderColor = dark ? "var(--color-dark-700)" : "#DDDDDD";
  const textPrimary = dark ? "var(--color-dark-100)" : "#424242";
  const textSecondary = dark ? "var(--color-dark-400)" : "#6B6B6B";
  const headerBg = dark ? "var(--color-dark-700)" : "#EEF2F7";
  const accentColor = "var(--color-accent)";

  return (
    <div style={{ backgroundColor: bg, minHeight: "100vh", transition: "background-color 0.3s" }}>

      {/* ── Encabezado de página ──────────────────────────────── */}
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
            Seleccione el tipo de inscripción que corresponda y complete su registro. Los valores
            incluyen acceso completo al evento, material del coloquio y certificado.
          </p>
        </div>
      </div>

      {/* ── Contenido principal ───────────────────────────────── */}
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "56px 24px" }}>

        {/* Banner preventa */}
        <div
          style={{
            padding: "20px 24px",
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
          <p style={{ fontSize: 17, color: textPrimary, lineHeight: 1.6, margin: 0 }}>
            <strong>Inscripción con tarifa preferencial (preventa)</strong> disponible hasta el{" "}
            <strong>30 de septiembre de 2026</strong>. Pasada esa fecha se aplica el valor regular.
          </p>
        </div>

        {/* ── Tabla de valores ─────────────────────────────────── */}
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 28,
            fontWeight: 700,
            color: textPrimary,
            marginBottom: 8,
          }}
        >
          Tabla de valores
        </h2>
        <p style={{ fontSize: 16, color: textSecondary, marginBottom: 28, lineHeight: 1.6 }}>
          Todos los valores están expresados en pesos chilenos (CLP) e incluyen IVA.
        </p>

        {/* Tabla responsive: scroll horizontal en móvil */}
        <div
          style={{
            overflowX: "auto",
            borderRadius: 14,
            border: `1px solid ${borderColor}`,
            backgroundColor: cardBg,
            boxShadow: dark ? "none" : "0 2px 12px rgba(0,0,0,0.06)",
            marginBottom: 56,
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              minWidth: 560,
            }}
          >
            {/* Encabezado */}
            <thead>
              <tr style={{ backgroundColor: headerBg }}>
                <th
                  style={{
                    padding: "18px 24px",
                    textAlign: "left",
                    fontSize: 16,
                    fontWeight: 700,
                    color: textPrimary,
                    borderBottom: `2px solid ${borderColor}`,
                    width: "45%",
                  }}
                >
                  Tipo de inscripción
                </th>
                <th
                  style={{
                    padding: "18px 24px",
                    textAlign: "center",
                    fontSize: 16,
                    fontWeight: 700,
                    color: textPrimary,
                    borderBottom: `2px solid ${borderColor}`,
                    borderLeft: `1px solid ${borderColor}`,
                    width: "27.5%",
                  }}
                >
                  Preventa
                  <br />
                  <span style={{ fontSize: 13, fontWeight: 400, color: textSecondary }}>
                    hasta 30 sept. 2026
                  </span>
                </th>
                <th
                  style={{
                    padding: "18px 24px",
                    textAlign: "center",
                    fontSize: 16,
                    fontWeight: 700,
                    color: textPrimary,
                    borderBottom: `2px solid ${borderColor}`,
                    borderLeft: `1px solid ${borderColor}`,
                    width: "27.5%",
                  }}
                >
                  Valor Regular
                </th>
              </tr>
            </thead>

            {/* Filas */}
            <tbody>
              {TABLA_PRECIOS.map((fila, idx) => {
                const isLast = idx === TABLA_PRECIOS.length - 1;
                const isEven = idx % 2 === 0;
                const rowBg = isEven
                  ? cardBg
                  : dark ? "rgba(255,255,255,0.025)" : "#FAFAFA";

                return (
                  <tr key={idx} style={{ backgroundColor: rowBg }}>
                    {/* Categoría */}
                    <td
                      style={{
                        padding: "20px 24px",
                        borderBottom: isLast ? "none" : `1px solid ${borderColor}`,
                        verticalAlign: "top",
                      }}
                    >
                      <p
                        style={{
                          fontSize: 18,
                          fontWeight: 700,
                          color: textPrimary,
                          margin: "0 0 4px 0",
                          lineHeight: 1.4,
                        }}
                      >
                        {fila.categoria}
                      </p>
                      <p
                        style={{
                          fontSize: 15,
                          color: textSecondary,
                          margin: 0,
                          lineHeight: 1.5,
                        }}
                      >
                        {fila.descripcion}
                      </p>
                      {fila.notas && (
                        <div
                          style={{
                            display: "flex",
                            gap: 6,
                            alignItems: "flex-start",
                            marginTop: 8,
                            padding: "8px 10px",
                            borderRadius: 8,
                            backgroundColor: dark
                              ? "rgba(var(--color-accent-rgb), 0.08)"
                              : "rgba(13, 71, 161, 0.05)",
                          }}
                        >
                          <Info size={14} style={{ color: accentColor, flexShrink: 0, marginTop: 2 }} />
                          <span style={{ fontSize: 13, color: textSecondary, lineHeight: 1.5 }}>
                            {fila.notas}
                          </span>
                        </div>
                      )}
                    </td>

                    {/* Preventa */}
                    <td
                      style={{
                        padding: "20px 24px",
                        textAlign: "center",
                        borderBottom: isLast ? "none" : `1px solid ${borderColor}`,
                        borderLeft: `1px solid ${borderColor}`,
                        verticalAlign: "middle",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: 22,
                          fontWeight: 700,
                          color: accentColor,
                          display: "block",
                        }}
                      >
                        {fila.preventa}
                      </span>
                    </td>

                    {/* Valor Regular */}
                    <td
                      style={{
                        padding: "20px 24px",
                        textAlign: "center",
                        borderBottom: isLast ? "none" : `1px solid ${borderColor}`,
                        borderLeft: `1px solid ${borderColor}`,
                        verticalAlign: "middle",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: 22,
                          fontWeight: 700,
                          color: textPrimary,
                          display: "block",
                        }}
                      >
                        {fila.regular}
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
            fontSize: 28,
            fontWeight: 700,
            color: textPrimary,
            marginBottom: 24,
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
                <span
                  style={{
                    flex: 1,
                    fontSize: 17,
                    fontWeight: 600,
                    color: textPrimary,
                    lineHeight: 1.45,
                  }}
                >
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
