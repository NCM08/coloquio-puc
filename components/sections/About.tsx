// ============================================================
// components/sections/About.tsx — SOBRE EL COLOQUIO (ANIMADO)
// ============================================================

"use client";

import { useTheme } from "@/components/ThemeProvider";
import { BookOpen, Users, Lightbulb } from "lucide-react";
import FadeInSection from "@/components/ui/FadeInSection";

const HIGHLIGHTS = [
    {
        icon: BookOpen,
        number: "50+",
        label: "Ponencias",
        description: "Presentaciones de investigación",
    },
    {
        icon: Users,
        number: "300+",
        label: "Participantes",
        description: "De Chile y Latinoamérica",
    },
    {
        icon: Lightbulb,
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
                Un espacio de encuentro{" "}
                <span style={{ color: "var(--color-accent)" }}>académico</span>
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
                El Coloquio de Educación y Pedagogía de la Pontificia Universidad
                Católica de Chile reúne a investigadores, académicos y profesionales
                de la educación en torno a los desafíos contemporáneos del campo
                educativo.
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
                Este espacio busca promover el diálogo interdisciplinario, compartir
                avances de investigación y fortalecer redes de colaboración entre
                instituciones nacionales e internacionales.
                </p>

                <p
                style={{
                    fontSize: 17,
                    lineHeight: 1.8,
                    color: dark ? "var(--color-dark-300)" : "var(--color-dark-500)",
                    maxWidth: 540,
                }}
                >
                Convocamos a la comunidad académica a participar activamente
                en la construcción de conocimiento educativo desde la investigación
                y la práctica docente.
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