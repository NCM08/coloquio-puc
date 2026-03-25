// ============================================================
// components/sections/ImportantDates.tsx — FECHAS (ANIMADO)
// ============================================================

"use client";

import { useTheme } from "@/components/ThemeProvider";
import { CalendarCheck, Send, CheckCircle, UserPlus, Mic } from "lucide-react";
import FadeInSection from "@/components/ui/FadeInSection";

const DATES = [
    { icon: CalendarCheck, date: "27 de Marzo 2026", title: "Apertura de convocatoria", description: "Inicio oficial del período de recepción de ponencias, simposios, pósters y mesas redondas para el VIII Coloquio." },
    { icon: Send, date: "8 de Mayo 2026", title: "Cierre de recepción de ponencias", description: "Fecha límite para el ingreso de resúmenes y propuestas al sistema de evaluación por pares." },
    { icon: CheckCircle, date: "8 de Junio 2026", title: "Notificación de aceptación", description: "Comunicación oficial de resultados del proceso de revisión ciega: aceptación o rechazo de cada propuesta." },
    { icon: UserPlus, date: "8 de Agosto 2026", title: "Agenda final del coloquio", description: "Publicación de la agenda definitiva con horarios, salas y expositores confirmados." },
    { icon: Mic, date: "10-12 Noviembre 2026", title: "Coloquio", description: "Tres días de conferencias, ponencias, mesas redondas y networking en el Campus San Joaquín de la Pontificia Universidad Católica de Chile, Santiago." },
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
            <div style={{ position: "absolute", left: 23, top: 0, bottom: 0, width: 2, backgroundColor: dark ? "var(--color-dark-700)" : "var(--color-dark-100)" }} />

            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
                {DATES.map((item, index) => {
                const Icon = item.icon;
                const isLast = index === DATES.length - 1;
                return (
                    <FadeInSection key={index} delay={index * 0.12} direction="left">
                    <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
                        <div style={{
                        width: 48, height: 48, borderRadius: 14,
                        backgroundColor: isLast ? "var(--color-accent)" : (dark ? "var(--color-dark-700)" : "var(--color-primary-50)"),
                        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, zIndex: 1,
                        border: isLast ? "none" : `2px solid ${dark ? "var(--color-dark-600)" : "var(--color-primary-100)"}`,
                        }}>
                        <Icon size={20} style={{ color: isLast ? "#fff" : (dark ? "var(--color-dark-300)" : "var(--color-primary)") }} />
                        </div>
                        <div style={{ flex: 1, padding: "4px 0 32px" }}>
                        <p style={{ fontSize: 13, fontWeight: 600, color: isLast ? "var(--color-accent)" : "var(--color-dark-400)", marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>
                            {item.date}
                        </p>
                        <h3 style={{
                            fontFamily: "var(--font-display)", fontSize: isLast ? 22 : 20, fontWeight: 700, marginBottom: 6, lineHeight: 1.3,
                            color: isLast ? (dark ? "var(--color-accent)" : "var(--color-primary)") : (dark ? "var(--color-dark-100)" : "var(--color-dark-700)"),
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