// ============================================================
// app/programa/page.tsx — PROGRAMA
// ============================================================

"use client";

import { useState } from "react";
import { useTheme } from "@/components/ThemeProvider";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

// ── Estructura de datos del cronograma (DDD) ─────────────────
type EventType = "keynote" | "session" | "break" | "social";

type ScheduleItem = {
  time: string;
  title: string;
  type: EventType;
};

const DAYS = [
  { label: "Lunes 9",      subtitle: "9 Nov · Pre-evento" },
  { label: "Martes 10",    subtitle: "10 Nov · Día 1" },
  { label: "Miércoles 11", subtitle: "11 Nov · Día 2" },
  { label: "Jueves 12",    subtitle: "12 Nov · Día 3" },
];

const SCHEDULE: Record<number, ScheduleItem[]> = {
  0: [
    {
      time: "09:00 – 13:00",
      title: "Historias de vida — 60 años de la Villa La Reina. Trabajo en el territorio.",
      type: "session",
    },
    {
      time: "13:00 – 15:00",
      title: "Almuerzo comunitario",
      type: "break",
    },
  ],
  1: [
    {
      time: "09:00 – 12:00",
      title: "Asamblea Nodo Sur (híbrida)",
      type: "session",
    },
    {
      time: "14:00 – 15:00",
      title: "Registro / acreditación",
      type: "break",
    },
    {
      time: "15:00 – 15:30",
      title: "Bienvenida",
      type: "keynote",
    },
    {
      time: "15:30 – 18:00",
      title: "Homenaje a Presidente RISC — Vincent de Gaulejac",
      type: "keynote",
    },
    {
      time: "18:00 – 20:00",
      title: "Cóctel de celebración",
      type: "social",
    },
  ],
  2: [
    {
      time: "09:00 – 10:30",
      title: "Conferencia 1 · \"Desintegración social en el mundo actual: acciones de resistencia y nuevos imaginarios posibles\"",
      type: "keynote",
    },
    {
      time: "11:00 – 12:15",
      title: "Mesas de trabajo paralelas",
      type: "session",
    },
    {
      time: "16:30 – 18:00",
      title: "Conferencia 2 · \"Transmisión de la Sociología Clínica y la Psicosociología latinoamericana de cara a la desintegración social\"",
      type: "keynote",
    },
    {
      time: "20:00",
      title: "Cena típica (inscripción voluntaria)",
      type: "social",
    },
  ],
  3: [
    {
      time: "09:00 – 10:30",
      title: "Conferencia 3 · \"Reconfigurando el vínculo universitario y escolar\"",
      type: "keynote",
    },
    {
      time: "11:00 – 12:15",
      title: "Mesas de trabajo paralelas",
      type: "session",
    },
    {
      time: "16:30 – 18:00",
      title: "Conferencia 4 · \"Nuevas repercusiones en el mundo del trabajo\"",
      type: "keynote",
    },
  ],
};

// Color de acento por tipo de evento
const TYPE_ACCENT: Record<EventType, string> = {
  keynote: "var(--color-accent)",
  session: "var(--color-primary)",
  break:   "var(--color-dark-300)",
  social:  "#4CAF50",
};

// ── Componente principal ──────────────────────────────────────
export default function ProgramaPage() {
  const { dark } = useTheme();
  const [activeDay, setActiveDay] = useState(0);

  const bg          = dark ? "var(--color-dark-900)" : "#F7F7F7";
  const cardBg      = dark ? "var(--color-dark-800)" : "#FFFFFF";
  const borderColor = dark ? "var(--color-dark-700)" : "#DDDDDD";
  const textPrimary = dark ? "var(--color-dark-100)" : "#424242";
  const textSecondary = dark ? "var(--color-dark-400)" : "#6B6B6B";
  const tabBg       = dark ? "var(--color-dark-800)" : "#FFFFFF";
  const tabBorder   = dark ? "var(--color-dark-700)" : "#DDDDDD";

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
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {SCHEDULE[activeDay].map((item, index) => {
            const accent = TYPE_ACCENT[item.type];
            const isBreak = item.type === "break";

            return (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 24,
                  padding: isBreak ? "16px 24px" : "24px 28px",
                  borderRadius: 14,
                  backgroundColor: isBreak
                    ? dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.025)"
                    : cardBg,
                  border: `1px solid ${isBreak ? "transparent" : borderColor}`,
                  borderLeft: `4px solid ${accent}`,
                  boxShadow: isBreak || dark ? "none" : "0 2px 10px rgba(0,0,0,0.05)",
                  opacity: isBreak ? 0.75 : 1,
                  transition: "all 0.2s",
                }}
              >
                {/* ── Hora (grande y en negrita) ─── */}
                <div
                  style={{
                    minWidth: 130,
                    flexShrink: 0,
                    fontFamily: "var(--font-display)",
                    fontSize: isBreak ? 18 : 22,
                    fontWeight: 800,
                    color: accent,
                    lineHeight: 1.2,
                    letterSpacing: "-0.5px",
                  }}
                >
                  {item.time}
                </div>

                {/* ── Separador vertical ─── */}
                <div
                  style={{
                    width: 1,
                    alignSelf: "stretch",
                    backgroundColor: dark ? "var(--color-dark-700)" : "#E5E5E5",
                    flexShrink: 0,
                  }}
                />

                {/* ── Título del evento ─── */}
                <div style={{ flex: 1 }}>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: isBreak ? 15 : 17,
                      fontWeight: isBreak ? 400 : 600,
                      color: isBreak ? textSecondary : textPrimary,
                      margin: 0,
                      lineHeight: 1.55,
                    }}
                  >
                    {item.title}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
