// ============================================================
// components/sections/ThematicAxes.tsx — EJES TEMÁTICOS (RESPONSIVE)
// ============================================================

"use client";

import { useState } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { ChevronDown, Briefcase, GraduationCap, Heart, Globe, Monitor, MapPin, Navigation, Flame } from "lucide-react";
import FadeInSection from "@/components/ui/FadeInSection";

const EJES = [
    { icon: Briefcase, title: "Mutaciones civilizatorias, transformaciones del mundo del trabajo", description: "Ponencias con diagnóstico y propuestas sobre los profundos cambios civilizatorios que reconfiguran el trabajo, los vínculos sociales y las formas de vida, con pistas para acciones de resistencia y transformación de imaginarios." },
    { icon: GraduationCap, title: "Descomposición de la escuela, la universidad y de los sistemas educativos", description: "Análisis y propuestas frente a la crisis de las instituciones educativas: sus lógicas de descomposición, los desafíos para su transformación y las experiencias que abren caminos alternativos." },
    { icon: Heart, title: "Claves y acciones desde el feminismo", description: "Contribuciones feministas al pensamiento crítico y a la acción transformadora: diagnósticos, propuestas y prácticas que desafían las estructuras patriarcales en la educación y en la vida social." },
    { icon: Globe, title: "Colonialidad, pueblos indígenas y afrodescendientes", description: "Reflexiones y propuestas sobre colonialidad del saber y del poder, epistemologías otras, y las luchas y aportes de los pueblos indígenas y afrodescendientes por la transformación educativa y social." },
    { icon: Monitor, title: "Nuevas tecnologías digitales: dilemas, ventajas y encrucijadas", description: "Examen crítico de las tecnologías digitales en la educación y la sociedad: sus promesas, sus riesgos y las encrucijadas éticas y políticas que plantean, con propuestas para una apropiación emancipadora." },
    { icon: MapPin, title: "Militancias y territorios", description: "Experiencias de militancia y organización territorial como espacios de formación política y pedagógica, con propuestas para articular la acción educativa con la transformación de los territorios." },
    { icon: Navigation, title: "Desplazamientos, migración e interculturalidad", description: "Diagnósticos y propuestas sobre los desplazamientos forzados y la migración, los desafíos de la interculturalidad y las posibilidades de construir convivencias y pedagogías desde la diversidad." },
    { icon: Flame, title: "Juventudes: entre la pulsión de vida y de muerte", description: "Lecturas críticas y propuestas de acción sobre las condiciones de vida de las juventudes contemporáneas: sus expresiones, sus resistencias y las tensiones entre la pulsión de vida y las fuerzas que la amenazan." },
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

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
            {EJES.map((eje, index) => {
                const Icon = eje.icon;
                const isOpen = openIndex === index;
                return (
                <FadeInSection key={index} delay={index * 0.06} style={{ height: "100%" }}>
                    <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    style={{
                        width: "100%", height: "100%", textAlign: "left", padding: 20, borderRadius: 12,
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