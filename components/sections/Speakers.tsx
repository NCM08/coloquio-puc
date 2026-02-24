// ============================================================
// components/sections/Speakers.tsx — CONFERENCISTAS (ANIMADO)
// ============================================================

"use client";

import { useState } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { MapPin, ChevronDown } from "lucide-react";
import FadeInSection from "@/components/ui/FadeInSection";

const SPEAKERS = [
    { name: "Dra. María González", institution: "Universidad de Chile", country: "Chile", area: "Políticas Educativas", bio: "Doctora en Educación por la Universidad de Cambridge. Investigadora principal en políticas educativas comparadas con más de 20 años de experiencia en el campo. Ha publicado extensamente sobre reforma curricular en América Latina.", initials: "MG" },
    { name: "Dr. Carlos Mendoza", institution: "Universidad de Buenos Aires", country: "Argentina", area: "Neurociencia Educativa", bio: "PhD en Neurociencias Cognitivas por MIT. Lidera el Laboratorio de Aprendizaje y Neurociencia en la UBA. Su investigación se centra en los mecanismos cerebrales del aprendizaje y la memoria en contextos educativos.", initials: "CM" },
    { name: "Dra. Ana Beatriz Silva", institution: "Universidade de São Paulo", country: "Brasil", area: "Inclusión Educativa", bio: "Profesora titular de la USP, especialista en educación inclusiva y diversidad. Coordina la red latinoamericana de investigación en inclusión educativa y ha asesorado a múltiples gobiernos de la región.", initials: "AS" },
    { name: "Dr. Roberto Flores", institution: "UNAM", country: "México", area: "Tecnología Educativa", bio: "Investigador del Instituto de Investigaciones sobre la Universidad y la Educación de la UNAM. Experto en inteligencia artificial aplicada a la educación y transformación digital de instituciones educativas.", initials: "RF" },
];

export default function Speakers() {
    const { dark } = useTheme();
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    return (
        <section style={{ padding: "96px 24px", backgroundColor: dark ? "var(--color-dark-800)" : "var(--color-dark-50)", transition: "background-color 0.3s" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <FadeInSection>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
                <p style={{ fontSize: 13, fontWeight: 600, textTransform: "uppercase", letterSpacing: 2, color: "var(--color-accent)", marginBottom: 12 }}>Expositores invitados</p>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, lineHeight: 1.2, color: dark ? "var(--color-dark-100)" : "var(--color-primary)", marginBottom: 16 }}>
                Conferencistas Magistrales
                </h2>
                <p style={{ fontSize: 17, color: dark ? "var(--color-dark-400)" : "var(--color-dark-500)", maxWidth: 500, margin: "0 auto", lineHeight: 1.7 }}>
                Destacados académicos nacionales e internacionales compartirán sus investigaciones y experiencias.
                </p>
            </div>
            </FadeInSection>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
            {SPEAKERS.map((speaker, index) => {
                const isExpanded = expandedIndex === index;
                return (
                <FadeInSection key={index} delay={index * 0.12}>
                    <div
                    style={{
                        borderRadius: 16,
                        border: `1px solid ${dark ? "var(--color-dark-700)" : "var(--color-dark-100)"}`,
                        backgroundColor: dark ? "var(--color-dark-900)" : "#FFFFFF",
                        overflow: "hidden",
                        transition: "all 0.2s",
                        height: "100%",
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = dark ? "0 8px 32px rgba(0,0,0,0.3)" : "var(--shadow-large)"; }}
                    onMouseOut={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                    >
                    <div style={{
                        height: 200,
                        background: dark ? "linear-gradient(135deg, var(--color-dark-700), var(--color-dark-800))" : "linear-gradient(135deg, var(--color-primary-50), var(--color-primary-100))",
                        display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                        <div style={{
                        width: 80, height: 80, borderRadius: "50%",
                        backgroundColor: dark ? "var(--color-dark-600)" : "var(--color-primary-200)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700,
                        color: dark ? "var(--color-dark-200)" : "var(--color-primary)",
                        }}>
                        {speaker.initials}
                        </div>
                    </div>

                    <div style={{ padding: 24 }}>
                        <span style={{
                        display: "inline-block", padding: "4px 10px", borderRadius: 6, fontSize: 12, fontWeight: 600, marginBottom: 12,
                        backgroundColor: dark ? "rgba(212,168,67,0.1)" : "var(--color-accent-50)",
                        color: dark ? "var(--color-accent)" : "var(--color-accent-600)",
                        }}>
                        {speaker.area}
                        </span>

                        <h3 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, color: dark ? "var(--color-dark-100)" : "var(--color-dark-700)", marginBottom: 4, lineHeight: 1.3 }}>
                        {speaker.name}
                        </h3>
                        <p style={{ fontSize: 14, color: dark ? "var(--color-dark-400)" : "var(--color-dark-500)", marginBottom: 4 }}>{speaker.institution}</p>
                        <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13, color: dark ? "var(--color-dark-500)" : "var(--color-dark-400)", marginBottom: 12 }}>
                        <MapPin size={13} /><span>{speaker.country}</span>
                        </div>

                        <button
                        onClick={() => setExpandedIndex(isExpanded ? null : index)}
                        style={{ display: "flex", alignItems: "center", gap: 4, background: "none", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: "var(--font-body)", color: dark ? "var(--color-accent)" : "var(--color-primary)", padding: 0 }}
                        >
                        {isExpanded ? "Ver menos" : "Ver biografía"}
                        <ChevronDown size={14} style={{ transform: isExpanded ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }} />
                        </button>

                        {isExpanded && (
                        <p style={{ marginTop: 12, fontSize: 14, lineHeight: 1.7, color: dark ? "var(--color-dark-300)" : "var(--color-dark-500)" }}>
                            {speaker.bio}
                        </p>
                        )}
                    </div>
                    </div>
                </FadeInSection>
                );
            })}
            </div>
        </div>
        </section>
    );
}