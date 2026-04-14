// ============================================================
// components/sections/ImportantDates.tsx — FECHAS (ANIMADO)
// ============================================================

"use client";

import { useTheme } from "@/components/ThemeProvider";
import { CalendarCheck, Send, CheckCircle, UserPlus, Mic } from "lucide-react";
import FadeInSection from "@/components/ui/FadeInSection";

// ── Editar aquí para actualizar fechas y descripciones ────────
const timelineData = [
    {
        icon: CalendarCheck,
        date: "27 de Marzo 2026",
        title: "Apertura de convocatoria",
        description: "Inicio oficial del período de recepción de ponencias, simposios, pósters y mesas redondas para el VIII Coloquio.",
        iconColor: "#0d9488",
        iconBg: "#f0fdfa",
        iconBgDark: "#134e4a",
        iconBorder: "#99f6e4",
        iconBorderDark: "#0f766e",
        titleColor: "#0f766e",
        titleColorDark: "#2dd4bf",
        dateColor: "#0f766e",
        dateColorDark: "#5eead4",
        dateBg: "#f0fdfa",
        dateBorder: "#99f6e4",
    },
    {
        icon: Send,
        date: "8 de Mayo 2026",
        title: "Cierre de recepción de ponencias",
        description: "Fecha límite para el ingreso de resúmenes y propuestas al sistema de evaluación por pares.",
        iconColor: "#d97706",
        iconBg: "#fffbeb",
        iconBgDark: "#451a03",
        iconBorder: "#fde68a",
        iconBorderDark: "#92400e",
        titleColor: "#b45309",
        titleColorDark: "#fbbf24",
        dateColor: "#b45309",
        dateColorDark: "#fcd34d",
        dateBg: "#fffbeb",
        dateBorder: "#fde68a",
    },
    {
        icon: CheckCircle,
        date: "8 de Junio 2026",
        title: "Notificación de aceptación",
        description: "Comunicación oficial de resultados del proceso de revisión ciega: aceptación o rechazo de cada propuesta.",
        iconColor: "#059669",
        iconBg: "#ecfdf5",
        iconBgDark: "#064e3b",
        iconBorder: "#6ee7b7",
        iconBorderDark: "#065f46",
        titleColor: "#047857",
        titleColorDark: "#34d399",
        dateColor: "#047857",
        dateColorDark: "#6ee7b7",
        dateBg: "#ecfdf5",
        dateBorder: "#6ee7b7",
    },
    {
        icon: UserPlus,
        date: "8 de Agosto 2026",
        title: "Agenda final del coloquio",
        description: "Publicación de la agenda definitiva con horarios, salas y expositores confirmados.",
        iconColor: "#7c3aed",
        iconBg: "#f5f3ff",
        iconBgDark: "#2e1065",
        iconBorder: "#c4b5fd",
        iconBorderDark: "#5b21b6",
        titleColor: "#6d28d9",
        titleColorDark: "#a78bfa",
        dateColor: "#6d28d9",
        dateColorDark: "#c4b5fd",
        dateBg: "#f5f3ff",
        dateBorder: "#c4b5fd",
    },
    {
        icon: Mic,
        date: "10-12 Noviembre 2026",
        title: "Coloquio",
        description: "Tres días de conferencias, ponencias, mesas redondas y networking en el Campus San Joaquín de la Pontificia Universidad Católica de Chile, Santiago.",
        iconColor: "#ffffff",
        iconBg: "var(--color-accent)",
        iconBgDark: "var(--color-accent)",
        iconBorder: "transparent",
        iconBorderDark: "transparent",
        titleColor: "var(--color-accent)",
        titleColorDark: "var(--color-accent)",
        dateColor: "var(--color-accent)",
        dateColorDark: "var(--color-accent)",
        dateBg: "transparent",
        dateBorder: "transparent",
    },
];

export default function ImportantDates() {
    const { dark } = useTheme();

    return (
        <section style={{ padding: "96px 24px", backgroundColor: dark ? "var(--color-dark-900)" : "#FFFFFF", transition: "background-color 0.3s" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <FadeInSection>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
                <p style={{ fontSize: 13, fontWeight: 600, textTransform: "uppercase", letterSpacing: 2, color: "var(--color-accent)", marginBottom: 12 }}>Calendario</p>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, lineHeight: 1.2, color: dark ? "var(--color-dark-100)" : "var(--color-primary)" }}>
                Fechas Importantes
                </h2>
            </div>
            </FadeInSection>

            <div style={{ position: "relative" }}>
            {/* Timeline vertical line — tinted with brand primary */}
            <div style={{
                position: "absolute", left: 23, top: 0, bottom: 0, width: 2,
                backgroundColor: dark ? "var(--color-primary-800)" : "var(--color-primary-200)",
            }} />

            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
                {timelineData.map((item, index) => {
                const Icon = item.icon;
                return (
                    <FadeInSection key={index} delay={index * 0.12} direction="left">
                    <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
                        {/* Icon node — dynamic color per step */}
                        <div style={{
                        width: 48, height: 48, borderRadius: 14,
                        backgroundColor: dark ? item.iconBgDark : item.iconBg,
                        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, zIndex: 1,
                        border: `2px solid ${dark ? item.iconBorderDark : item.iconBorder}`,
                        }}>
                        <Icon size={20} style={{ color: item.iconColor }} />
                        </div>

                        <div style={{ flex: 1, padding: "4px 0 32px" }}>
                        {/* Date label — pill style */}
                        <span style={{
                            display: "inline-block",
                            fontSize: 12, fontWeight: 700,
                            textTransform: "uppercase", letterSpacing: 0.8,
                            color: dark ? item.dateColorDark : item.dateColor,
                            backgroundColor: dark ? "transparent" : item.dateBg,
                            border: dark ? "none" : `1px solid ${item.dateBorder}`,
                            borderRadius: 6, padding: dark ? "0" : "2px 8px",
                            marginBottom: 6,
                        }}>
                            {item.date}
                        </span>
                        {/* Title — dynamic color per step */}
                        <h3 style={{
                            fontFamily: "var(--font-display)", fontSize: index === timelineData.length - 1 ? 22 : 20, fontWeight: 700, marginBottom: 6, lineHeight: 1.3,
                            color: dark ? item.titleColorDark : item.titleColor,
                        }}>
                            {item.title}
                        </h3>
                        <p style={{ fontSize: 15, lineHeight: 1.6, color: dark ? "var(--color-dark-400)" : "var(--color-dark-500)" }}>
                            {item.description}
                        </p>
                        </div>
                    </div>
                    </FadeInSection>
                );
                })}
            </div>
            </div>
        </div>
        </section>
    );
}
