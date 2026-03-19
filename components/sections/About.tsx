// ============================================================
// components/sections/About.tsx — SOBRE EL COLOQUIO (ANIMADO)
// ============================================================

"use client";

import { useTheme } from "@/components/ThemeProvider";
import { BookOpen, Users, Globe } from "lucide-react";
import FadeInSection from "@/components/ui/FadeInSection";

const HIGHLIGHTS = [
    {
        icon: Users,
        number: "500+",
        label: "Participantes",
        description: "Investigadores internacionales",
    },
    {
        icon: Globe,
        number: "25+",
        label: "Países",
        description: "De América y Europa",
    },
    {
        icon: BookOpen,
        number: "8",
        label: "Ejes temáticos",
        description: "Áreas de investigación",
    },
    ];

export default function About() {
    const { dark } = useTheme();

    return (
        <section
        style={{
            padding: "96px 24px",
            backgroundColor: dark ? "var(--color-dark-900)" : "#FFFFFF",
            transition: "background-color 0.3s",
        }}
        >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div
            style={{
                display: "flex",
                gap: 64,
                alignItems: "flex-start",
                flexWrap: "wrap",
            }}
            >
            {/* Columna de texto — entra desde la izquierda */}
            <FadeInSection direction="left" style={{ flex: "1 1 480px", minWidth: 300 }}>
                <p
                style={{
                    fontSize: 13,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: 2,
                    color: "var(--color-accent)",
                    marginBottom: 12,
                }}
                >
                Sobre el coloquio
                </p>

                <h2
                style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(28px, 4vw, 40px)",
                    fontWeight: 700,
                    lineHeight: 1.2,
                    marginBottom: 24,
                    color: dark ? "var(--color-dark-100)" : "var(--color-primary)",
                }}
                >
                Desintegración social:{" "}
                <span style={{ color: "var(--color-vibrant-cyan)" }}>acciones de resistencia y nuevos imaginarios</span>
                </h2>

                <p
                style={{
                    fontSize: 17,
                    lineHeight: 1.8,
                    color: dark ? "var(--color-dark-300)" : "var(--color-dark-500)",
                    marginBottom: 20,
                    maxWidth: 540,
                }}
                >
                Este Coloquio Internacional es un espacio de encuentro y reflexión dialogada,
                desde una perspectiva interdisciplinaria anclada en la <strong>Sociología Clínica
                y la Psicosociología</strong>, en torno al proceso de desintegración social que
                caracteriza al mundo contemporáneo.
                </p>

                <p
                style={{
                    fontSize: 17,
                    lineHeight: 1.8,
                    color: dark ? "var(--color-dark-300)" : "var(--color-dark-500)",
                    marginBottom: 20,
                    maxWidth: 540,
                }}
                >
                A nivel global, la polarización se ha instalado como norma, la violencia alimenta
                la confrontación y el otro es cada vez menos reconocido en su alteridad. Las
                estructuras sociales conocidas hacen crisis frente a la acumulación de problemas
                y dinámicas de desintegración social.
                </p>

                <p
                style={{
                    fontSize: 17,
                    lineHeight: 1.8,
                    color: dark ? "var(--color-dark-300)" : "var(--color-dark-500)",
                    maxWidth: 540,
                }}
                >
                El <strong>VIII Coloquio Internacional</strong> propone analizar estos procesos,
                describir y comprender la desintegración social, y también <strong>proponer acciones
                de resistencia y nuevos imaginarios posibles</strong> que contribuyan a la
                recomposición del lazo social.
                </p>
            </FadeInSection>

            {/* Columna de highlights — cada card entra con delay escalonado */}
            <div
                style={{
                flex: "0 1 360px",
                display: "flex",
                flexDirection: "column",
                gap: 16,
                minWidth: 280,
                }}
            >
                {HIGHLIGHTS.map((item, index) => {
                const Icon = item.icon;
                return (
                    <FadeInSection key={item.label} direction="right" delay={index * 0.15}>
                    <div
                        style={{
                        padding: 24,
                        borderRadius: 16,
                        border: `1px solid ${dark ? "var(--color-dark-700)" : "var(--color-dark-100)"}`,
                        backgroundColor: dark ? "var(--color-dark-800)" : "var(--color-dark-50)",
                        display: "flex",
                        alignItems: "center",
                        gap: 20,
                        transition: "all 0.2s",
                        cursor: "default",
                        }}
                        onMouseOver={(e) => {
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow = dark
                            ? "0 4px 20px rgba(0,0,0,0.3)"
                            : "var(--shadow-medium)";
                        }}
                        onMouseOut={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "none";
                        }}
                    >
                        <div
                        style={{
                            width: 48,
                            height: 48,
                            borderRadius: 12,
                            backgroundColor: dark
                            ? "rgba(212,168,67,0.1)"
                            : "var(--color-primary-50)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                        }}
                        >
                        <Icon
                            size={22}
                            style={{
                            color: dark ? "var(--color-accent)" : "var(--color-primary)",
                            }}
                        />
                        </div>
                        <div>
                        <div
                            style={{
                            fontFamily: "var(--font-display)",
                            fontSize: 28,
                            fontWeight: 700,
                            color: dark ? "var(--color-accent)" : "var(--color-primary)",
                            lineHeight: 1,
                            }}
                        >
                            {item.number}
                        </div>
                        <div
                            style={{
                            fontSize: 14,
                            fontWeight: 600,
                            color: dark ? "var(--color-dark-200)" : "var(--color-dark-600)",
                            marginTop: 2,
                            }}
                        >
                            {item.label}
                        </div>
                        <div
                            style={{
                            fontSize: 13,
                            color: "var(--color-dark-400)",
                            }}
                        >
                            {item.description}
                        </div>
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