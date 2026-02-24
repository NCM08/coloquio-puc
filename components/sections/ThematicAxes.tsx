// ============================================================
// components/sections/ThematicAxes.tsx — EJES TEMÁTICOS (RESPONSIVE)
// ============================================================

"use client";

import { useState } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { ChevronDown, GraduationCap, Brain, Globe, Heart, Scale, Monitor, Sprout, BookOpen } from "lucide-react";
import FadeInSection from "@/components/ui/FadeInSection";

const EJES = [
    { icon: GraduationCap, title: "Políticas educativas y reforma curricular", description: "Análisis de las políticas públicas en educación, sus impactos en la práctica docente y los procesos de reforma curricular a nivel nacional e internacional." },
    { icon: Brain, title: "Neurociencia y aprendizaje", description: "Avances en neurociencia aplicada a la educación, estrategias de enseñanza basadas en evidencia y comprensión de los procesos cognitivos del aprendizaje." },
    { icon: Globe, title: "Internacionalización de la educación", description: "Experiencias de internacionalización curricular, movilidad académica, cooperación interinstitucional y perspectivas comparadas en educación." },
    { icon: Heart, title: "Inclusión y diversidad en el aula", description: "Estrategias pedagógicas para la atención a la diversidad, educación inclusiva, interculturalidad y equidad en el acceso al conocimiento." },
    { icon: Scale, title: "Ética y formación ciudadana", description: "Rol de la educación en la formación ética, ciudadanía activa, educación para la democracia y responsabilidad social." },
    { icon: Monitor, title: "Tecnología y educación digital", description: "Integración de tecnologías en la enseñanza, inteligencia artificial en educación, alfabetización digital y nuevas modalidades de aprendizaje." },
    { icon: Sprout, title: "Educación y sostenibilidad", description: "Educación ambiental, desarrollo sostenible, pedagogías para el cambio climático y formación de conciencia ecológica." },
    { icon: BookOpen, title: "Formación docente e identidad profesional", description: "Procesos de formación inicial y continua del profesorado, desarrollo profesional docente, identidad y bienestar del educador." },
];

export default function ThematicAxes() {
    const { dark } = useTheme();
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section style={{ padding: "96px 24px", backgroundColor: dark ? "var(--color-dark-800)" : "var(--color-dark-50)", transition: "background-color 0.3s" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <FadeInSection>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
                <p style={{ fontSize: 13, fontWeight: 600, textTransform: "uppercase", letterSpacing: 2, color: "var(--color-accent)", marginBottom: 12 }}>
                Áreas de investigación
                </p>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, lineHeight: 1.2, color: dark ? "var(--color-dark-100)" : "var(--color-primary)", marginBottom: 16 }}>
                Ejes Temáticos
                </h2>
                <p style={{ fontSize: 17, color: dark ? "var(--color-dark-400)" : "var(--color-dark-500)", maxWidth: 600, margin: "0 auto", lineHeight: 1.7 }}>
                El coloquio se organiza en torno a estos ejes que articulan las discusiones y presentaciones de los participantes.
                </p>
            </div>
            </FadeInSection>

            {/* FIX RESPONSIVE: minmax 280px en vez de 380px */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 12 }}>
            {EJES.map((eje, index) => {
                const Icon = eje.icon;
                const isOpen = openIndex === index;
                return (
                <FadeInSection key={index} delay={index * 0.06}>
                    <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    style={{
                        width: "100%", textAlign: "left", padding: 20, borderRadius: 12,
                        border: `1px solid ${isOpen ? (dark ? "var(--color-accent-700)" : "var(--color-primary-200)") : (dark ? "var(--color-dark-700)" : "var(--color-dark-100)")}`,
                        backgroundColor: isOpen ? (dark ? "rgba(212,168,67,0.05)" : "var(--color-primary-50)") : (dark ? "var(--color-dark-900)" : "#FFFFFF"),
                        cursor: "pointer", transition: "all 0.2s", fontFamily: "var(--font-body)",
                    }}
                    >
                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                        <div style={{
                        width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                        backgroundColor: isOpen ? (dark ? "rgba(212,168,67,0.15)" : "var(--color-primary-100)") : (dark ? "var(--color-dark-700)" : "var(--color-dark-50)"),
                        display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s",
                        }}>
                        <Icon size={20} style={{ color: isOpen ? (dark ? "var(--color-accent)" : "var(--color-primary)") : (dark ? "var(--color-dark-400)" : "var(--color-dark-500)") }} />
                        </div>
                        <span style={{
                        flex: 1, fontSize: 15, fontWeight: 600, lineHeight: 1.4,
                        color: isOpen ? (dark ? "var(--color-accent)" : "var(--color-primary)") : (dark ? "var(--color-dark-200)" : "var(--color-dark-700)"),
                        }}>
                        {eje.title}
                        </span>
                        <ChevronDown size={18} style={{ color: "var(--color-dark-400)", transform: isOpen ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s", flexShrink: 0 }} />
                    </div>
                    {isOpen && (
                        <p style={{
                        marginTop: 14, paddingTop: 14,
                        borderTop: `1px solid ${dark ? "var(--color-dark-700)" : "var(--color-dark-100)"}`,
                        fontSize: 14, lineHeight: 1.7,
                        color: dark ? "var(--color-dark-300)" : "var(--color-dark-500)",
                        }}>
                        {eje.description}
                        </p>
                    )}
                    </button>
                </FadeInSection>
                );
            })}
            </div>
        </div>
        </section>
    );
}