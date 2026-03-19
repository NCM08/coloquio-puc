// ============================================================
// app/conferencistas/page.tsx — CONFERENCISTAS COMPLETA
// ============================================================

"use client";

import { useState } from "react";
import { useTheme } from "@/components/ThemeProvider";
import Link from "next/link";
import { ChevronRight, ChevronDown, MapPin, ExternalLink, Globe, Mail } from "lucide-react";
import FadeInSection from "@/components/ui/FadeInSection";

// --- CONFERENCISTAS MAGISTRALES (cards grandes) ---
const KEYNOTES = [
    {
        name: "Vincent de Gaulejac",
        institution: "Université Paris-Diderot",
        country: "Francia",
        area: "Sociología Clínica",
        talk: "Desintegración social en el mundo actual: acciones de resistencia y nuevos imaginarios posibles",
        bio: "Presidente de la Red Internacional de Sociología Clínica (RISC) y fundador de la Sociología Clínica. Profesor emérito de la Universidad Paris-Diderot (Paris 7). Su obra articula sociología, psicoanálisis y psicosociología para comprender cómo las estructuras sociales se inscriben en la subjetividad de las personas. Participa en las Sesiones 2 y 3 del coloquio.",
        initials: "VG",
        day: "Mar 10 · Sesión 2 · Mié 11 · Sesión 3",
    },
    {
        name: "Ana María Araujo",
        institution: "",
        country: "Uruguay",
        area: "Psicosociología",
        talk: "Desintegración social en el mundo actual: acciones de resistencia y nuevos imaginarios posibles",
        bio: "Referente latinoamericana de la Sociología Clínica y la Psicosociología. Participa en la Conferencia 1 (Sesión 3) y presenta su libro \"Les chemins de l'exil. Les luttes d'une femme d'amérique latine\" (Sesión 10).",
        initials: "AA",
        day: "Mié 11 · Sesiones 3 y 10",
    },
    {
        name: "Teresa Carreteiro",
        institution: "",
        country: "Brasil",
        area: "Psicosociología",
        talk: "Desintegración social en el mundo actual: acciones de resistencia y nuevos imaginarios posibles",
        bio: "Investigadora en Psicosociología y Sociología Clínica. Participa en la Conferencia 1 del coloquio (Sesión 3).",
        initials: "TC",
        day: "Mié 11 · Sesión 3",
    },
    {
        name: "Ana Correa",
        institution: "",
        country: "Argentina",
        area: "Sociología Clínica",
        talk: "Desintegración social en el mundo actual: acciones de resistencia y nuevos imaginarios posibles",
        bio: "Investigadora en Sociología Clínica. Participa en la Conferencia 1 del coloquio (Sesión 3).",
        initials: "AC",
        day: "Mié 11 · Sesión 3",
    },
    {
        name: "Dariela Sharim",
        institution: "Pontificia Universidad Católica de Chile",
        country: "Chile",
        area: "Psicología y Vínculo Social",
        talk: "Reconfigurando el vínculo universitario y escolar",
        bio: "Académica de la Pontificia Universidad Católica de Chile. Participa en la Conferencia 3 del coloquio (Sesión 8).",
        initials: "DS",
        day: "Jue 12 · Sesión 8",
    },
    {
        name: "Fernando Yzaguirre",
        institution: "",
        country: "",
        area: "Vínculo Universitario y Escolar",
        talk: "Reconfigurando el vínculo universitario y escolar",
        bio: "Participa en la Conferencia 3 del coloquio (Sesión 8).",
        initials: "FY",
        day: "Jue 12 · Sesión 8",
    },
    {
        name: "María Aparecida Penso",
        institution: "",
        country: "Brasil",
        area: "Vínculo Universitario y Escolar",
        talk: "Reconfigurando el vínculo universitario y escolar",
        bio: "Investigadora brasileña. Participa en la Conferencia 3 del coloquio (Sesión 8).",
        initials: "MP",
        day: "Jue 12 · Sesión 8",
    },
];

// --- PANELISTAS Y EXPOSITORES INVITADOS ---
const SPEAKERS = [
    { name: "Matheus", institution: "", country: "", area: "Mundo del Trabajo", initials: "M" },
    { name: "Magda Garcés", institution: "", country: "", area: "Mundo del Trabajo", initials: "MG" },
    { name: "Marcelo Balboa", institution: "", country: "", area: "Mundo del Trabajo", initials: "MB" },
    { name: "Melisa Herranz", institution: "", country: "", area: "Mundo del Trabajo", initials: "MH" },
];

// Áreas únicas para el filtro
const ALL_AREAS = ["Todos", ...Array.from(new Set([...KEYNOTES.map(k => k.area), ...SPEAKERS.map(s => s.area)]))];

export default function ConferencistasPage() {
    const { dark } = useTheme();
    const [expandedKeynote, setExpandedKeynote] = useState<number | null>(null);
    const [filterArea, setFilterArea] = useState("Todos");

    const filteredSpeakers = filterArea === "Todos"
        ? SPEAKERS
        : SPEAKERS.filter(s => s.area === filterArea);

    return (
        <div style={{
        backgroundColor: dark ? "var(--color-dark-900)" : "var(--color-dark-50)",
        minHeight: "100vh",
        transition: "background-color 0.3s",
        }}>
        {/* Page Header */}
        <div style={{ padding: "48px 24px", backgroundColor: dark ? "var(--color-dark-800)" : "var(--color-primary)", color: "#FFFFFF" }}>
            <div style={{ maxWidth: 1000, margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, opacity: 0.6, marginBottom: 16 }}>
                <Link href="/" style={{ color: "#fff", textDecoration: "none" }}>Inicio</Link>
                <ChevronRight size={14} />
                <span>Conferencistas</span>
            </div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 700, marginBottom: 12 }}>
                Conferencistas
            </h1>
            <p style={{ fontSize: 18, opacity: 0.8, maxWidth: 600, lineHeight: 1.6 }}>
                Académicos e investigadores de Chile y Latinoamérica que compartirán sus conocimientos y experiencias.
            </p>
            </div>
        </div>

        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "64px 24px" }}>

            {/* ====== CONFERENCIAS MAGISTRALES ====== */}
            <FadeInSection>
            <div style={{ marginBottom: 48 }}>
                <p style={{ fontSize: 13, fontWeight: 600, textTransform: "uppercase", letterSpacing: 2, color: "var(--color-accent)", marginBottom: 8 }}>
                Conferencias magistrales
                </p>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 700, color: dark ? "var(--color-dark-100)" : "var(--color-primary)" }}>
                Expositores Principales
                </h2>
            </div>
            </FadeInSection>

            <div style={{ display: "flex", flexDirection: "column", gap: 24, marginBottom: 80 }}>
            {KEYNOTES.map((speaker, index) => {
                const isExpanded = expandedKeynote === index;
                return (
                <FadeInSection key={index} delay={index * 0.1}>
                    <div style={{
                    display: "flex", gap: 0, borderRadius: 20, overflow: "hidden",
                    border: `1px solid ${dark ? "var(--color-dark-700)" : "var(--color-dark-100)"}`,
                    backgroundColor: dark ? "var(--color-dark-800)" : "#FFFFFF",
                    flexWrap: "wrap",
                    transition: "all 0.2s",
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.boxShadow = dark ? "0 8px 32px rgba(0,0,0,0.3)" : "var(--shadow-large)"; }}
                    onMouseOut={(e) => { e.currentTarget.style.boxShadow = "none"; }}
                    >
                    {/* Avatar lateral */}
                    <div style={{
                        width: 220, minHeight: 220, flexShrink: 0,
                        background: dark
                        ? "linear-gradient(135deg, var(--color-dark-700), var(--color-dark-900))"
                        : `linear-gradient(135deg, var(--color-primary-50), var(--color-primary-100))`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                        <div style={{
                        width: 100, height: 100, borderRadius: "50%",
                        backgroundColor: dark ? "var(--color-dark-600)" : "var(--color-primary-200)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 700,
                        color: dark ? "var(--color-dark-200)" : "var(--color-primary)",
                        }}>
                        {speaker.initials}
                        </div>
                    </div>

                    {/* Info */}
                    <div style={{ flex: 1, padding: 32, minWidth: 280 }}>
                        {/* Tag + día */}
                        <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap", marginBottom: 12 }}>
                        <span style={{
                            padding: "4px 10px", borderRadius: 6, fontSize: 12, fontWeight: 600,
                            backgroundColor: dark ? "rgba(212,168,67,0.1)" : "var(--color-accent-50)",
                            color: dark ? "var(--color-accent)" : "var(--color-accent-600)",
                        }}>
                            {speaker.area}
                        </span>
                        <span style={{ fontSize: 13, color: dark ? "var(--color-dark-500)" : "var(--color-dark-400)" }}>
                            {speaker.day}
                        </span>
                        </div>

                        <h3 style={{
                        fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700,
                        color: dark ? "var(--color-dark-100)" : "var(--color-dark-700)",
                        marginBottom: 4, lineHeight: 1.3,
                        }}>
                        {speaker.name}
                        </h3>

                        <p style={{ fontSize: 15, color: dark ? "var(--color-dark-400)" : "var(--color-dark-500)", marginBottom: 2 }}>
                        {speaker.institution}
                        </p>
                        <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13, color: dark ? "var(--color-dark-500)" : "var(--color-dark-400)", marginBottom: 16 }}>
                        <MapPin size={13} /><span>{speaker.country}</span>
                        </div>

                        {/* Título de la conferencia */}
                        <div style={{
                        padding: 16, borderRadius: 10, marginBottom: 16,
                        backgroundColor: dark ? "rgba(212,168,67,0.05)" : "var(--color-accent-50)",
                        border: `1px solid ${dark ? "rgba(212,168,67,0.15)" : "var(--color-accent-100)"}`,
                        }}>
                        <p style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, color: "var(--color-accent)", marginBottom: 4 }}>
                            Conferencia
                        </p>
                        <p style={{
                            fontSize: 16, fontWeight: 600, lineHeight: 1.4,
                            fontFamily: "var(--font-display)",
                            color: dark ? "var(--color-dark-100)" : "var(--color-dark-700)",
                        }}>
                            &ldquo;{speaker.talk}&rdquo;
                        </p>
                        </div>

                        {/* Bio expandible */}
                        <button
                        onClick={() => setExpandedKeynote(isExpanded ? null : index)}
                        style={{
                            display: "flex", alignItems: "center", gap: 4, background: "none", border: "none",
                            cursor: "pointer", fontSize: 14, fontWeight: 600, fontFamily: "var(--font-body)",
                            color: dark ? "var(--color-accent)" : "var(--color-primary)", padding: 0,
                        }}
                        >
                        {isExpanded ? "Ver menos" : "Ver biografía completa"}
                        <ChevronDown size={14} style={{ transform: isExpanded ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }} />
                        </button>

                        {isExpanded && (
                        <p style={{ marginTop: 12, fontSize: 15, lineHeight: 1.7, color: dark ? "var(--color-dark-300)" : "var(--color-dark-500)" }}>
                            {speaker.bio}
                        </p>
                        )}
                    </div>
                    </div>
                </FadeInSection>
                );
            })}
            </div>

            {/* ====== PANELISTAS E INVITADOS ====== */}
            <FadeInSection>
            <div style={{ marginBottom: 32 }}>
                <p style={{ fontSize: 13, fontWeight: 600, textTransform: "uppercase", letterSpacing: 2, color: "var(--color-accent)", marginBottom: 8 }}>
                Panelistas e invitados
                </p>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 700, color: dark ? "var(--color-dark-100)" : "var(--color-primary)", marginBottom: 20 }}>
                Expositores Invitados
                </h2>
            </div>
            </FadeInSection>

            {/* Filtro por área */}
            <FadeInSection delay={0.1}>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 32 }}>
                {ALL_AREAS.map((area) => (
                <button
                    key={area}
                    onClick={() => setFilterArea(area)}
                    style={{
                    padding: "8px 16px", borderRadius: 8, fontSize: 13, fontWeight: 500,
                    fontFamily: "var(--font-body)", cursor: "pointer", transition: "all 0.2s",
                    border: filterArea === area
                        ? `1px solid ${dark ? "var(--color-accent)" : "var(--color-primary)"}`
                        : `1px solid ${dark ? "var(--color-dark-700)" : "var(--color-dark-100)"}`,
                    backgroundColor: filterArea === area
                        ? dark ? "rgba(212,168,67,0.1)" : "var(--color-primary-50)"
                        : "transparent",
                    color: filterArea === area
                        ? dark ? "var(--color-accent)" : "var(--color-primary)"
                        : dark ? "var(--color-dark-400)" : "var(--color-dark-500)",
                    }}
                >
                    {area}
                </button>
                ))}
            </div>
            </FadeInSection>

            {/* Grid de speakers */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
            {filteredSpeakers.map((speaker, index) => (
                <FadeInSection key={speaker.name} delay={index * 0.05}>
                <div style={{
                    padding: 24, borderRadius: 16, textAlign: "center",
                    border: `1px solid ${dark ? "var(--color-dark-700)" : "var(--color-dark-100)"}`,
                    backgroundColor: dark ? "var(--color-dark-800)" : "#FFFFFF",
                    transition: "all 0.2s", height: "100%",
                }}
                onMouseOver={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = dark ? "0 4px 20px rgba(0,0,0,0.3)" : "var(--shadow-medium)"; }}
                onMouseOut={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                >
                    <div style={{
                    width: 64, height: 64, borderRadius: "50%", margin: "0 auto 16px",
                    backgroundColor: dark ? "var(--color-dark-700)" : "var(--color-primary-50)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700,
                    color: dark ? "var(--color-dark-300)" : "var(--color-primary)",
                    }}>
                    {speaker.initials}
                    </div>

                    <h3 style={{ fontSize: 15, fontWeight: 700, color: dark ? "var(--color-dark-100)" : "var(--color-dark-700)", marginBottom: 4, fontFamily: "var(--font-body)" }}>
                    {speaker.name}
                    </h3>
                    <p style={{ fontSize: 13, color: dark ? "var(--color-dark-400)" : "var(--color-dark-500)", marginBottom: 4 }}>
                    {speaker.institution}
                    </p>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 4, fontSize: 12, color: dark ? "var(--color-dark-500)" : "var(--color-dark-400)", marginBottom: 10 }}>
                    <MapPin size={11} /><span>{speaker.country}</span>
                    </div>
                    <span style={{
                    display: "inline-block", padding: "3px 8px", borderRadius: 6, fontSize: 11, fontWeight: 600,
                    backgroundColor: dark ? "rgba(212,168,67,0.1)" : "var(--color-accent-50)",
                    color: dark ? "var(--color-accent)" : "var(--color-accent-600)",
                    }}>
                    {speaker.area}
                    </span>
                </div>
                </FadeInSection>
            ))}
            </div>

            {/* CTA final */}
            <FadeInSection delay={0.2}>
            <div style={{
                marginTop: 64, padding: 32, borderRadius: 16, textAlign: "center",
                backgroundColor: dark ? "var(--color-dark-800)" : "var(--color-primary-50)",
                border: `1px solid ${dark ? "var(--color-dark-700)" : "var(--color-primary-100)"}`,
            }}>
                <Globe size={28} style={{ color: "var(--color-accent)", marginBottom: 12 }} />
                <h3 style={{
                fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700,
                color: dark ? "var(--color-dark-100)" : "var(--color-primary)", marginBottom: 8,
                }}>
                ¿Quieres ser expositor?
                </h3>
                <p style={{ fontSize: 15, color: dark ? "var(--color-dark-400)" : "var(--color-dark-500)", maxWidth: 500, margin: "0 auto 20px", lineHeight: 1.6 }}>
                Envía tu propuesta de ponencia o póster antes del cierre de la convocatoria.
                </p>
                <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <Link href="/convocatoria" style={{
                    display: "inline-flex", alignItems: "center", gap: 8, height: 48, padding: "0 24px",
                    backgroundColor: "var(--color-accent)", color: "#fff", fontSize: 15, fontWeight: 600,
                    borderRadius: 10, textDecoration: "none",
                }}>
                    Ver convocatoria <ExternalLink size={14} />
                </Link>
                <Link href="mailto:coloquio@uc.cl" style={{
                    display: "inline-flex", alignItems: "center", gap: 8, height: 48, padding: "0 24px",
                    border: `1px solid ${dark ? "var(--color-dark-600)" : "var(--color-primary-200)"}`,
                    color: dark ? "var(--color-dark-200)" : "var(--color-primary)",
                    fontSize: 15, fontWeight: 500, borderRadius: 10, textDecoration: "none",
                }}>
                    <Mail size={14} /> Contactar
                </Link>
                </div>
            </div>
            </FadeInSection>
        </div>
        </div>
    );
}