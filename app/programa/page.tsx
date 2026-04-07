// ============================================================
// app/programa/page.tsx — PROGRAMA
// ============================================================

"use client";

import { useState } from "react";
import { useTheme } from "@/components/ThemeProvider";
import Link from "next/link";
import { ChevronRight, ChevronDown } from "lucide-react";

// ── Estructura de datos del cronograma ───────────────────────
type EventType = "keynote" | "session" | "break" | "lunch" | "social";

type ScheduleItem = {
  time: string;
  title: string;
  type: EventType;
  description?: string;
};

const DAYS = [
  { label: "Martes 10",    subtitle: "10 Nov · Día 1" },
  { label: "Miércoles 11", subtitle: "11 Nov · Día 2" },
  { label: "Jueves 12",    subtitle: "12 Nov · Día 3" },
];

const SCHEDULE: Record<number, ScheduleItem[]> = {
  0: [
    {
      time: "09:00 – 12:00",
      title: "Asamblea Nodo Sur (híbrida)",
      type: "session",
      description: "Lugar: Sala UC [por definir].",
    },
    {
      time: "12:00 – 14:00",
      title: "Almuerzo libre",
      type: "lunch",
    },
    {
      time: "14:00 – 15:00",
      title: "Registro / acreditación",
      type: "break",
    },
    {
      time: "15:00 – 15:30",
      title: "Sesión 1. Bienvenida",
      type: "keynote",
    },
    {
      time: "15:30 – 18:00",
      title: "Sesión 2. Homenaje a Presidente RISC — Vincent de Gaulejac",
      type: "keynote",
      description:
        "El sentido del homenaje es que sea animado, implicado, donde las artes nos movilicen y nos permitan reconocer el trabajo realizado todos estos años por Vincent, al mismo tiempo que las siguientes generaciones toman la posta del desarrollo de la Sociología Clínica.",
    },
    {
      time: "18:00 – 20:00",
      title: "Conferencia de Vincent de Gaulejac (tema libre) · Cóctel de celebración",
      type: "social",
    },
  ],
  1: [
    {
      time: "09:00 – 10:30",
      title: 'Sesión 3. Conferencia 1. "Desintegración social en el mundo actual: acciones de resistencia y nuevos imaginarios posibles"',
      type: "keynote",
      description:
        "Ponentes: Vincent de Gaulejac, Ana María Araujo, Teresa Carreteiro y Patricia Guerrero.",
    },
    {
      time: "10:30 – 11:00",
      title: "Pausa · Coffee Break",
      type: "break",
    },
    {
      time: "11:00 – 12:15",
      title: "Sesión 4. Mesas de trabajo paralelas",
      type: "session",
    },
    {
      time: "12:15 – 13:00",
      title: "Sesión 5. Presentación de libro del grupo de Historias de vida",
      type: "session",
    },
    {
      time: "13:00 – 14:30",
      title: "Almuerzo",
      type: "lunch",
    },
    {
      time: "14:30 – 16:00",
      title: "Sesión 6. [Por definir] / Mesas de trabajo paralelas",
      type: "session",
    },
    {
      time: "16:00 – 16:30",
      title: "Pausa · Coffee Break",
      type: "break",
    },
    {
      time: "16:30 – 18:00",
      title: 'Sesión 7. Conferencia 2. "Transmisión de la Sociología clínica y la Psicosociología latinoamericana de cara a la desintegración social"',
      type: "keynote",
      description:
        "Ponentes: un representante por país (Argentina, Brasil, Chile, Colombia, España, México y Uruguay).",
    },
    {
      time: "20:00",
      title: "Cena típica (inscripción voluntaria)",
      type: "social",
    },
  ],
  2: [
    {
      time: "09:00 – 10:30",
      title: "Sesión 8. Conferencia 3. Reconfigurando el vínculo universitario y escolar",
      type: "keynote",
      description:
        "Ponentes: Dariela Sharim, Fernando Yzaguirre, María Aparecida Penso, Johnny Orrejuela y Virginia Masse.",
    },
    {
      time: "10:30 – 11:00",
      title: "Pausa · Coffee Break",
      type: "break",
    },
    {
      time: "11:00 – 12:15",
      title: "Sesión 9. Mesa Bienestar en la escuela CELITED / Mesas paralelas",
      type: "session",
    },
    {
      time: "12:15 – 13:00",
      title: 'Sesión 10. Presentación del libro de Ana María Araujo "Les chemins de l\'exil. Les luttes d\'une femme d\'amérique latine"',
      type: "session",
    },
    {
      time: "13:00 – 14:30",
      title: "Almuerzo",
      type: "lunch",
    },
    {
      time: "14:30 – 16:00",
      title: 'Sesión 11. Conferencia 4. "Nuevas repercusiones en el mundo del trabajo"',
      type: "keynote",
      description:
        "Ponentes: Matheus Viana, Julio Neffa, Ana Massa, Antonio Stecher. Comenta: Vincent de Gaulejac.",
    },
    {
      time: "16:00 – 16:30",
      title: "Pausa · Coffee Break",
      type: "break",
    },
    {
      time: "16:30 – 18:00",
      title: 'Sesión 12. Conferencia 5. Cierre "Desafíos en la construcción social"',
      type: "keynote",
      description:
        "Ponentes: Magdalena Garcés, Pedro y Ana Correa, Betty Weisz.",
    },
    {
      time: "18:00 – 20:00",
      title: "Convivencia · Lugar: UC (patios)",
      type: "social",
    },
  ],
};

// ── Color de acento por tipo de evento ───────────────────────
const TYPE_ACCENT: Record<EventType, string> = {
  keynote: "var(--color-accent)",
  session: "var(--color-primary)",
  break:   "#9CA3AF",
  lunch:   "#9CA3AF",
  social:  "#4CAF50",
};

// ── Componente principal ──────────────────────────────────────
export default function ProgramaPage() {
  const { dark } = useTheme();
  const [activeDay, setActiveDay]       = useState(0);
  const [expanded,  setExpanded]        = useState<Set<string>>(new Set());

  const toggleExpanded = (key: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const bg             = dark ? "var(--color-dark-900)" : "#F7F7F7";
  const cardBg         = dark ? "var(--color-dark-800)" : "#FFFFFF";
  const borderColor    = dark ? "var(--color-dark-700)" : "#DDDDDD";
  const textPrimary    = dark ? "var(--color-dark-100)" : "#424242";
  const textSecondary  = dark ? "var(--color-dark-400)" : "#6B6B6B";
  const tabBg          = dark ? "var(--color-dark-800)" : "#FFFFFF";
  const tabBorder      = dark ? "var(--color-dark-700)" : "#DDDDDD";

  return (
    <div style={{ backgroundColor: bg, minHeight: "100vh", transition: "background-color 0.3s" }}>

      {/* ── Encabezado ─────────────────────────────────────────── */}
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
            <span>Programa</span>
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(32px, 5vw, 48px)",
              fontWeight: 700,
              marginBottom: 12,
            }}
          >
            Programa
          </h1>
          <p style={{ fontSize: 19, opacity: 0.85, maxWidth: 620, lineHeight: 1.65 }}>
            9 al 12 de noviembre 2026 · Campus San Joaquín, PUC, Santiago, Chile.
          </p>
        </div>
      </div>

      {/* ── Contenido principal ────────────────────────────────── */}
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "48px 24px" }}>

        {/* ── Pestañas de días ───────────────────────────────────── */}
        <div
          style={{
            display: "flex",
            gap: 4,
            marginBottom: 40,
            padding: 4,
            borderRadius: 14,
            backgroundColor: tabBg,
            border: `1px solid ${tabBorder}`,
            boxShadow: dark ? "none" : "0 2px 8px rgba(0,0,0,0.06)",
            flexWrap: "wrap",
          }}
        >
          {DAYS.map((day, index) => {
            const isActive = activeDay === index;
            return (
              <button
                key={index}
                onClick={() => setActiveDay(index)}
                style={{
                  flex: "1 1 auto",
                  padding: "14px 20px",
                  borderRadius: 10,
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "var(--font-body)",
                  transition: "all 0.2s",
                  backgroundColor: isActive
                    ? dark ? "var(--color-accent)" : "var(--color-primary)"
                    : "transparent",
                  color: isActive
                    ? "#FFFFFF"
                    : dark ? "var(--color-dark-300)" : "var(--color-dark-500)",
                  boxShadow: isActive
                    ? dark ? "var(--shadow-accent)" : "0 2px 8px rgba(0,173,252,0.25)"
                    : "none",
                }}
              >
                <div style={{ fontSize: 16, fontWeight: 700, lineHeight: 1.2 }}>{day.label}</div>
                <div style={{ fontSize: 12, opacity: 0.75, marginTop: 2 }}>{day.subtitle}</div>
              </button>
            );
          })}
        </div>

        {/* ── Tarjetas de eventos ────────────────────────────────── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {SCHEDULE[activeDay].map((item, index) => {
            const key          = `${activeDay}-${index}`;
            const isExpanded   = expanded.has(key);
            const accent       = TYPE_ACCENT[item.type];
            const isSubdued    = item.type === "break" || item.type === "lunch";
            const isExpandable = !!item.description;

            return (
              <div
                key={key}
                style={{
                  borderRadius: 14,
                  backgroundColor: isSubdued
                    ? dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.025)"
                    : cardBg,
                  border: isSubdued
                    ? `1px solid transparent`
                    : `1px solid ${borderColor}`,
                  borderLeft: `4px solid ${accent}`,
                  boxShadow: isSubdued || dark ? "none" : "0 2px 10px rgba(0,0,0,0.05)",
                  opacity: isSubdued ? 0.78 : 1,
                  overflow: "hidden",
                  transition: "all 0.2s",
                }}
              >
                {/* ── Fila principal (siempre visible) ── */}
                <div
                  onClick={isExpandable ? () => toggleExpanded(key) : undefined}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 20,
                    padding: isSubdued ? "14px 22px" : "22px 26px",
                    cursor: isExpandable ? "pointer" : "default",
                  }}
                >
                  {/* Hora */}
                  <div
                    style={{
                      minWidth: 130,
                      flexShrink: 0,
                      fontFamily: "var(--font-display)",
                      fontSize: isSubdued ? 16 : 20,
                      fontWeight: 800,
                      color: accent,
                      lineHeight: 1.2,
                      letterSpacing: "-0.5px",
                    }}
                  >
                    {item.time}
                  </div>

                  {/* Separador vertical */}
                  <div
                    style={{
                      width: 1,
                      alignSelf: "stretch",
                      backgroundColor: dark ? "var(--color-dark-700)" : "#E5E5E5",
                      flexShrink: 0,
                    }}
                  />

                  {/* Título */}
                  <div style={{ flex: 1 }}>
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: isSubdued ? 14 : 16,
                        fontWeight: isSubdued ? 400 : 600,
                        color: isSubdued ? textSecondary : textPrimary,
                        margin: 0,
                        lineHeight: 1.55,
                      }}
                    >
                      {item.title}
                    </p>
                  </div>

                  {/* Chevron (solo si es expandible) */}
                  {isExpandable && (
                    <div
                      style={{
                        flexShrink: 0,
                        color: textSecondary,
                        transition: "transform 0.25s",
                        transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                    >
                      <ChevronDown size={18} />
                    </div>
                  )}
                </div>

                {/* ── Panel colapsable ── */}
                {isExpandable && (
                  <div
                    style={{
                      maxHeight: isExpanded ? 200 : 0,
                      overflow: "hidden",
                      transition: "max-height 0.3s ease",
                    }}
                  >
                    <div
                      style={{
                        padding: "0 26px 20px 176px",
                        fontSize: 14,
                        color: textSecondary,
                        lineHeight: 1.7,
                        fontStyle: "italic",
                        borderTop: `1px solid ${dark ? "rgba(255,255,255,0.06)" : "#F0F0F0"}`,
                        paddingTop: 14,
                      }}
                    >
                      {item.description}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
