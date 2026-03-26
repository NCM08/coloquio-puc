// ============================================================
// app/convocatoria/page.tsx — CONVOCATORIA (Sprint 4)
// ============================================================

"use client";

import { useState } from "react";
import { useTheme } from "@/components/ThemeProvider";
import Link from "next/link";
import {
  ChevronDown,
  ChevronRight,
  FileText,
  Users,
  Presentation,
  CheckCircle,
  BookOpen,
  AlertTriangle,
  Globe,
  Clock,
  Briefcase,
  GraduationCap,
  Heart,
  Monitor,
  MapPin,
  Navigation,
  Flame,
  CalendarDays,
} from "lucide-react";

// ── Ejes Temáticos ────────────────────────────────────────────
const EJES = [
  {
    icon: Briefcase,
    title: "Mutaciones civilizatorias, transformaciones del mundo del trabajo",
    description:
      "Ponencias con diagnóstico y propuestas sobre los cambios civilizatorios que reconfiguran el trabajo, los vínculos sociales y las formas de vida, con pistas para acciones de resistencia y transformación de imaginarios.",
  },
  {
    icon: GraduationCap,
    title: "Descomposición de la escuela, la universidad y de los sistemas educativos",
    description:
      "Análisis y propuestas frente a la crisis de las instituciones educativas: sus lógicas de descomposición, los desafíos para su transformación y las experiencias que abren caminos alternativos.",
  },
  {
    icon: Heart,
    title: "Claves y acciones desde el feminismo",
    description:
      "Contribuciones feministas al pensamiento crítico y a la acción transformadora: diagnósticos, propuestas y prácticas que desafían las estructuras patriarcales en la educación y en la vida social.",
  },
  {
    icon: Globe,
    title: "Colonialidad, pueblos indígenas y afrodescendientes",
    description:
      "Reflexiones sobre colonialidad del saber y del poder, epistemologías otras, y las luchas y aportes de los pueblos indígenas y afrodescendientes por la transformación educativa y social.",
  },
  {
    icon: Monitor,
    title: "Nuevas tecnologías digitales: dilemas, ventajas y encrucijadas",
    description:
      "Examen crítico de las tecnologías digitales en la educación y la sociedad: sus promesas, sus riesgos y las encrucijadas éticas y políticas que plantean.",
  },
  {
    icon: MapPin,
    title: "Militancias y territorios",
    description:
      "Experiencias de militancia y organización territorial como espacios de formación política y pedagógica, con propuestas para articular la acción educativa con la transformación de los territorios.",
  },
  {
    icon: Navigation,
    title: "Desplazamientos, migración e interculturalidad",
    description:
      "Diagnósticos y propuestas sobre los desplazamientos forzados y la migración, los desafíos de la interculturalidad y las posibilidades de construir convivencias y pedagogías desde la diversidad.",
  },
  {
    icon: Flame,
    title: "Juventudes: entre la pulsión de vida y de muerte",
    description:
      "Lecturas críticas y propuestas de acción sobre las condiciones de vida de las juventudes contemporáneas: sus expresiones, sus resistencias y las tensiones entre la pulsión de vida y las fuerzas que la amenazan.",
  },
];

// ── Modalidades de Participación ─────────────────────────────
const MODALIDADES = [
  {
    icon: Presentation,
    title: "Ponencia individual",
    description:
      "Presentación oral de 20 minutos sobre resultados de investigación, seguida de 10 minutos de discusión.",
    requirements:
      "Resumen de 500 palabras mínimo, indicando eje temático, metodología y principales hallazgos.",
  },
  {
    icon: Users,
    title: "Simposio temático",
    description:
      "Sesión de 90 minutos con 3–4 presentaciones articuladas en torno a un tema común, con moderador.",
    requirements:
      "Propuesta conjunta con resumen general del simposio y resúmenes individuales de cada ponencia.",
  },
  {
    icon: FileText,
    title: "Póster",
    description:
      "Presentación visual en formato póster con sesión dedicada para discusión con los asistentes.",
    requirements:
      "Resumen de 300 palabras con objetivos, metodología y resultados preliminares.",
  },
  {
    icon: BookOpen,
    title: "Mesa redonda",
    description:
      "Espacio de diálogo de 60 minutos con 3–5 panelistas, inspirado en la Sociología Clínica, la Psicosociología y los Ejes Temáticos del coloquio.",
    requirements:
      "Propuesta con tema, justificación, lista de panelistas confirmados y preguntas orientadoras.",
  },
];

// ── Agenda del Proceso (5 hitos) ──────────────────────────────
const AGENDA = [
  {
    fecha: "27 de Marzo de 2026",
    titulo: "Apertura de las convocatorias",
    descripcion:
      "Inicio oficial del período de recepción. A partir de esta fecha, los/as investigadores/as pueden ingresar sus propuestas a través del formulario habilitado.",
    color: "var(--color-primary)",
    bg: "rgba(0,173,252,0.08)",
    border: "rgba(0,173,252,0.25)",
  },
  {
    fecha: "8 de Mayo de 2026",
    titulo: "Cierre de la recepción de ponencias",
    descripcion:
      "Fecha límite para el ingreso de resúmenes al sistema. Pasada esta fecha no se aceptarán nuevas propuestas.",
    color: "#FB8C00",
    bg: "rgba(251,140,0,0.07)",
    border: "rgba(251,140,0,0.25)",
  },
  {
    fecha: "20 de Mayo de 2026",
    titulo: "Plazo máximo para el envío de propuestas",
    descripcion:
      "Último plazo para que los/as autores/as suban el documento completo de propuesta (ponencia, simposio o póster) en el sistema.",
    color: "#F57C00",
    bg: "rgba(245,124,0,0.07)",
    border: "rgba(245,124,0,0.25)",
  },
  {
    fecha: "8 de Junio de 2026",
    titulo: "Entrega de la respuesta (Aceptación / Rechazo)",
    descripcion:
      "El comité científico comunica los resultados de la revisión ciega por pares. Cada autor/a recibirá la decisión por correo electrónico.",
    color: "var(--color-accent)",
    bg: "rgba(95,186,36,0.07)",
    border: "rgba(95,186,36,0.25)",
  },
  {
    fecha: "8 de Agosto de 2026",
    titulo: "Entrega de la agenda final del coloquio",
    descripcion:
      "Publicación de la programación definitiva con horarios, salas, sesiones y expositores confirmados para los tres días del evento.",
    color: "var(--color-vibrant-purple)",
    bg: "rgba(88,65,179,0.07)",
    border: "rgba(88,65,179,0.25)",
  },
];

// ── Requisitos ────────────────────────────────────────────────
const REQUISITOS = [
  {
    icon: AlertTriangle,
    type: "warning" as const,
    title: "Envío anónimo obligatorio",
    text: "Todas las propuestas deben enviarse sin identificación de los autores para garantizar la revisión ciega por pares.",
  },
  {
    icon: Globe,
    type: "info" as const,
    title: "Idiomas aceptados",
    text: "Se aceptan propuestas en español y portugués. Las presentaciones durante el coloquio pueden realizarse en cualquiera de estos idiomas.",
  },
  {
    icon: Clock,
    type: "warning" as const,
    title: "Extensión mínima",
    text: "Los resúmenes de ponencias individuales deben tener un mínimo de 500 palabras. Pósters mínimo 300 palabras.",
  },
];

// ─────────────────────────────────────────────────────────────
export default function ConvocatoriaPage() {
  const { dark } = useTheme();
  const [openModalidad, setOpenModalidad] = useState<number | null>(0);

  const bg            = dark ? "var(--color-dark-900)" : "#F7F7F7";
  const cardBg        = dark ? "var(--color-dark-800)" : "#FFFFFF";
  const borderColor   = dark ? "var(--color-dark-700)" : "#DDDDDD";
  const textPrimary   = dark ? "var(--color-dark-100)" : "#424242";
  const textSecondary = dark ? "var(--color-dark-400)" : "#6B6B6B";

  return (
    <div style={{ backgroundColor: bg, minHeight: "100vh", transition: "background-color 0.3s" }}>

      {/* ====== ENCABEZADO ====================================== */}
      <div
        style={{
          padding: "48px 24px",
          backgroundColor: dark ? "var(--color-dark-800)" : "var(--color-primary)",
          color: "#FFFFFF",
        }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, opacity: 0.65, marginBottom: 16 }}>
            <Link href="/" style={{ color: "#fff", textDecoration: "none" }}>Inicio</Link>
            <ChevronRight size={14} />
            <span>Convocatoria</span>
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
            Convocatoria
          </h1>
          <p style={{ fontSize: "clamp(16px, 2.5vw, 19px)", opacity: 0.85, maxWidth: 680, lineHeight: 1.7, margin: 0 }}>
            Invitamos a la comunidad nacional e internacional a participar en el{" "}
            <strong>VIII Coloquio Internacional de Sociología Clínica y Psicosociología</strong>,
            10, 11 y 12 de noviembre de 2026, Campus San Joaquín, PUC, Santiago, Chile.
          </p>
        </div>
      </div>

      {/* ====== CONTENIDO PRINCIPAL ============================= */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "64px 24px 80px" }}>

        {/* ─── Sección: Sobre la convocatoria ─────────────────── */}
        <section style={{ marginBottom: 72 }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700, color: dark ? "var(--color-dark-100)" : "var(--color-primary)", marginBottom: 20 }}>
            Sobre la convocatoria
          </h2>
          {[
            "Este Coloquio Internacional pretende ser un espacio de encuentro y reflexión dialogada, desde una perspectiva interdisciplinaria anclada en la Sociología Clínica y la Psicosociología, en torno al proceso de desintegración social que caracteriza al mundo contemporáneo.",
            "Nuestro propósito es promover un análisis de la actualidad, describiendo y comprendiendo los procesos de desintegración social, y también proponer acciones de resistencia y nuevos imaginarios posibles, distintos de aquellos que sostienen exclusivamente la polarización o el imperio de lo instantáneo. Esperamos contribuir al debate sobre la recomposición del lazo social para la sociedad del mañana.",
            "En continuidad con los coloquios anteriores, buscamos fomentar el intercambio entre diversos mundos: académico, asociativo, artístico, entre otros. Esperamos recibir reportes de investigaciones, experiencias, reflexiones y propuestas prácticas de innovación, experimentación, cambio y transformación ancladas en la Sociología Clínica y la Psicosociología.",
          ].map((p, i) => (
            <p key={i} style={{ fontSize: 17, lineHeight: 1.8, color: textSecondary, marginBottom: 16 }}>
              {p}
            </p>
          ))}
        </section>

        {/* ─── Sección 1: Ejes Temáticos ──────────────────────── */}
        <section style={{ marginBottom: 72 }}>
          <div style={{ marginBottom: 28 }}>
            <p style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: "var(--color-accent)", marginBottom: 8 }}>
              Sección 1
            </p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700, color: dark ? "var(--color-dark-100)" : "var(--color-primary)", margin: "0 0 8px 0" }}>
              Ejes Temáticos
            </h2>
            <p style={{ fontSize: 16, color: textSecondary, lineHeight: 1.65, maxWidth: 680 }}>
              Las propuestas deben inscribirse en uno de los ocho ejes temáticos definidos a partir del trabajo de{" "}
              <strong style={{ color: textPrimary }}>Vincent de Gaulejac</strong> y el equipo organizador.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))",
              gap: 16,
            }}
          >
            {EJES.map((eje, i) => {
              const Icon = eje.icon;
              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: 16,
                    padding: "20px 22px",
                    borderRadius: 14,
                    border: `1px solid ${borderColor}`,
                    backgroundColor: cardBg,
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 11,
                      backgroundColor: dark ? "rgba(0,173,252,0.1)" : "var(--color-primary-50)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={21} style={{ color: "var(--color-primary)" }} />
                  </div>
                  <div>
                    <p style={{ fontSize: 16, fontWeight: 700, color: textPrimary, marginBottom: 6, lineHeight: 1.35 }}>
                      {eje.title}
                    </p>
                    <p style={{ fontSize: 14, color: textSecondary, lineHeight: 1.65, margin: 0 }}>
                      {eje.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ─── Requisitos ─────────────────────────────────────── */}
        <section style={{ marginBottom: 72 }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700, color: dark ? "var(--color-dark-100)" : "var(--color-primary)", marginBottom: 18 }}>
            Requisitos importantes
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {REQUISITOS.map((req, i) => {
              const Icon = req.icon;
              const isWarning = req.type === "warning";
              return (
                <div
                  key={i}
                  style={{
                    padding: "18px 20px",
                    borderRadius: 12,
                    border: `1px solid ${isWarning ? "rgba(251,140,0,0.3)" : (dark ? "var(--color-dark-700)" : "var(--color-primary-100)")}`,
                    backgroundColor: isWarning
                      ? dark ? "rgba(251,140,0,0.05)" : "rgba(251,140,0,0.04)"
                      : dark ? "rgba(0,61,124,0.05)" : "var(--color-primary-50)",
                    display: "flex",
                    gap: 14,
                    alignItems: "flex-start",
                  }}
                >
                  <Icon size={20} style={{ color: isWarning ? "#FB8C00" : "var(--color-primary)", flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <p style={{ fontSize: 15, fontWeight: 600, color: dark ? "var(--color-dark-100)" : "var(--color-dark-700)", marginBottom: 4 }}>
                      {req.title}
                    </p>
                    <p style={{ fontSize: 14, lineHeight: 1.65, color: textSecondary, margin: 0 }}>
                      {req.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ─── Sección 2: Modalidades de Participación ────────── */}
        <section style={{ marginBottom: 72 }}>
          <div style={{ marginBottom: 28 }}>
            <p style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: "var(--color-accent)", marginBottom: 8 }}>
              Sección 2
            </p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700, color: dark ? "var(--color-dark-100)" : "var(--color-primary)", margin: 0 }}>
              Modalidades de Participación
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {MODALIDADES.map((mod, i) => {
              const Icon = mod.icon;
              const isOpen = openModalidad === i;
              return (
                <button
                  key={i}
                  onClick={() => setOpenModalidad(isOpen ? null : i)}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    padding: "20px 22px",
                    borderRadius: 12,
                    border: `1px solid ${isOpen ? (dark ? "rgba(0,173,252,0.4)" : "var(--color-primary-200)") : borderColor}`,
                    backgroundColor: isOpen ? (dark ? "rgba(0,173,252,0.06)" : "var(--color-primary-50)") : cardBg,
                    cursor: "pointer",
                    transition: "all 0.2s",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div
                      style={{
                        width: 42,
                        height: 42,
                        borderRadius: 10,
                        backgroundColor: isOpen
                          ? dark ? "rgba(0,173,252,0.15)" : "var(--color-primary-100)"
                          : dark ? "var(--color-dark-700)" : "var(--color-dark-50)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={20} style={{ color: isOpen ? "var(--color-primary)" : (dark ? "var(--color-dark-400)" : "var(--color-dark-500)") }} />
                    </div>
                    <span style={{ flex: 1, fontSize: 17, fontWeight: 600, color: isOpen ? (dark ? "var(--color-primary-300)" : "var(--color-primary)") : textPrimary }}>
                      {mod.title}
                    </span>
                    <ChevronDown size={18} style={{ color: textSecondary, transform: isOpen ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s", flexShrink: 0 }} />
                  </div>

                  {isOpen && (
                    <div style={{ marginTop: 16, paddingTop: 16, borderTop: `1px solid ${borderColor}` }}>
                      <p style={{ fontSize: 16, lineHeight: 1.75, color: textSecondary, marginBottom: 12 }}>
                        {mod.description}
                      </p>
                      <div
                        style={{
                          padding: "10px 14px",
                          borderRadius: 8,
                          backgroundColor: dark ? "var(--color-dark-900)" : "var(--color-dark-50)",
                          display: "flex",
                          gap: 8,
                          alignItems: "flex-start",
                        }}
                      >
                        <CheckCircle size={15} style={{ color: "#4CAF50", flexShrink: 0, marginTop: 2 }} />
                        <p style={{ fontSize: 14, lineHeight: 1.65, color: textSecondary, margin: 0 }}>
                          {mod.requirements}
                        </p>
                      </div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {/* ─── Sección 3: Agenda del Proceso ──────────────────── */}
        <section>
          <div style={{ marginBottom: 40 }}>
            <p style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: "var(--color-accent)", marginBottom: 8 }}>
              Sección 3 — La más importante
            </p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700, color: dark ? "var(--color-dark-100)" : "var(--color-primary)", margin: "0 0 10px 0" }}>
              Agenda del Proceso
            </h2>
            <p style={{ fontSize: 16, color: textSecondary, lineHeight: 1.65, maxWidth: 620 }}>
              Calendario oficial de hitos desde la apertura de la convocatoria hasta la
              publicación de la agenda final del coloquio.
            </p>
          </div>

          {/* ── Timeline vertical ─────────────────────────────── */}
          <div style={{ position: "relative" }}>

            {/* Línea vertical de fondo */}
            <div
              style={{
                position: "absolute",
                left: 27,
                top: 0,
                bottom: 0,
                width: 3,
                borderRadius: 2,
                background: dark
                  ? "linear-gradient(to bottom, rgba(0,173,252,0.4), rgba(88,65,179,0.4))"
                  : "linear-gradient(to bottom, var(--color-primary-200), var(--color-vibrant-purple))",
                opacity: 0.5,
                zIndex: 0,
              }}
            />

            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {AGENDA.map((hito, i) => {
                const isLast = i === AGENDA.length - 1;
                return (
                  <div key={i} style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>

                    {/* Icono del hito */}
                    <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <div
                        style={{
                          width: 56,
                          height: 56,
                          borderRadius: "50%",
                          backgroundColor: dark ? "var(--color-dark-900)" : "#FFFFFF",
                          boxShadow: `0 0 0 100px ${hito.bg} inset, 0 2px 12px ${hito.bg}`,
                          border: `2.5px solid ${hito.border}`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          position: "relative",
                          zIndex: 10,
                          flexShrink: 0,
                        }}
                      >
                        <CalendarDays size={26} style={{ color: hito.color }} />
                      </div>

                      {/* Espacio entre hitos */}
                      {!isLast && (
                        <div
                          style={{
                            width: 3,
                            height: 40,
                            backgroundColor: "transparent",
                          }}
                        />
                      )}
                    </div>

                    {/* Contenido del hito */}
                    <div
                      style={{
                        flex: 1,
                        paddingBottom: isLast ? 0 : 40,
                        paddingTop: 6,
                      }}
                    >
                      {/* Fecha */}
                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 8,
                          padding: "5px 14px",
                          borderRadius: 20,
                          backgroundColor: hito.bg,
                          border: `1px solid ${hito.border}`,
                          marginBottom: 10,
                        }}
                      >
                        <span style={{ fontSize: 14, fontWeight: 700, color: hito.color, letterSpacing: 0.3 }}>
                          {hito.fecha}
                        </span>
                      </div>

                      {/* Número y título */}
                      <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 8 }}>
                        <span
                          style={{
                            fontFamily: "var(--font-display)",
                            fontSize: 13,
                            fontWeight: 700,
                            color: hito.color,
                            opacity: 0.65,
                            letterSpacing: 1,
                            textTransform: "uppercase",
                            flexShrink: 0,
                          }}
                        >
                          Hito {i + 1}
                        </span>
                      </div>
                      <h3
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "clamp(19px, 2.5vw, 22px)",
                          fontWeight: 700,
                          color: textPrimary,
                          marginBottom: 10,
                          lineHeight: 1.3,
                        }}
                      >
                        {hito.titulo}
                      </h3>
                      <p style={{ fontSize: 16, lineHeight: 1.75, color: textSecondary, margin: 0 }}>
                        {hito.descripcion}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Hito final: El Coloquio */}
            <div
              style={{
                marginTop: 32,
                padding: "28px 32px",
                borderRadius: 16,
                background: dark
                  ? "linear-gradient(135deg, rgba(0,173,252,0.12), rgba(88,65,179,0.12))"
                  : "linear-gradient(135deg, var(--color-primary-50), rgba(88,65,179,0.06))",
                border: `1.5px solid ${dark ? "rgba(0,173,252,0.25)" : "var(--color-primary-200)"}`,
                display: "flex",
                alignItems: "center",
                gap: 20,
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  backgroundColor: "var(--color-primary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  boxShadow: "var(--shadow-medium)",
                }}
              >
                <CalendarDays size={28} style={{ color: "#fff" }} />
              </div>
              <div style={{ flex: 1, minWidth: 200 }}>
                <p style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, color: "var(--color-primary)", marginBottom: 6 }}>
                  Evento principal
                </p>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(20px, 3vw, 26px)", fontWeight: 700, color: textPrimary, marginBottom: 4 }}>
                  10, 11 y 12 de Noviembre de 2026
                </h3>
                <p style={{ fontSize: 16, color: textSecondary, margin: 0, lineHeight: 1.6 }}>
                  VIII Coloquio Internacional — Campus San Joaquín, Pontificia Universidad Católica de Chile, Santiago.
                </p>
              </div>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}
