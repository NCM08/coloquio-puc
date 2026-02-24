// ============================================================
// app/ediciones-anteriores/page.tsx — EDICIONES ANTERIORES
// ============================================================

"use client";

import { useTheme } from "@/components/ThemeProvider";
import Link from "next/link";
import { ChevronRight, Calendar, MapPin, Users, ExternalLink } from "lucide-react";
import FadeInSection from "@/components/ui/FadeInSection";

const EDICIONES = [
    {
        year: "2025",
        title: "Inteligencia artificial en educación: propuesta de un plan de formación docente",
        date: "10 de diciembre de 2025",
        location: "Sala CEPPE UC Profesora Mabel Condemarín, Campus San Joaquín",
        presenter: "Álvaro Salinas — Profesor Asociado, Facultad de Educación UC",
        commentator: "Magdalena Claro — Profesora Asociada, Facultad de Educación UC",
        description: "Coloquio centrado en la propuesta de un plan de formación docente en inteligencia artificial aplicada a la educación, explorando las implicancias pedagógicas de la IA para el profesorado.",
        link: "https://www.uc.cl/agenda/actividad/coloquio-en-educacion-uc-inteligencia-artificial-en-educacion-propuesta-de-un-plan-de-formacion-docente",
        type: "Coloquio en Educación UC",
    },
    {
        year: "2025",
        title: "Desafíos y posibilidades para una educación artística visual intercultural",
        date: "30 de julio de 2025",
        location: "Sala CEPPE UC Profesora Mabel Condemarín, Campus San Joaquín",
        presenter: "Verónica García-Lazo — Académica, Facultad de Educación UC",
        commentator: "Guillermo Marini — Académico, Facultad de Educación UC",
        description: "Reflexión sobre los desafíos y oportunidades para una educación artística visual que integre perspectivas interculturales en el contexto educativo chileno y latinoamericano.",
        link: "https://www.uc.cl/agenda/actividad/coloquio-en-educacion-uc-desafios-y-posibilidades-para-una-educacion-artistica-visual-intercultural",
        type: "Coloquio en Educación UC",
    },
    {
        year: "2025",
        title: "III Coloquio Internacional Franco–Latinoamericano: Clínicas del Trabajo",
        date: "23 – 24 de octubre de 2025",
        location: "Auditorio Juan de Castro, Facultad de Ciencias Sociales, Campus San Joaquín",
        presenter: "Investigadores de América Latina y Europa",
        commentator: "",
        description: "Coloquio internacional de dos días sobre el significado del trabajo, con ejes temáticos sobre género, racialización, salud, sostenibilidad, transformaciones del capitalismo y desafíos ecológicos y políticos. Organizado en conjunto por la Escuela de Psicología, la Escuela de Trabajo Social y la Facultad de Educación.",
        link: "https://www.uc.cl/agenda/actividad/iii-coloquio-internacional-franco-latinoamericano-clinicas-del-trabajo-ceremonia-de-inauguracion",
        type: "Coloquio Internacional",
    },
];

export default function EdicionesAnterioresPage() {
    const { dark } = useTheme();

    return (
        <div style={{
        backgroundColor: dark ? "var(--color-dark-900)" : "var(--color-dark-50)",
        minHeight: "100vh",
        transition: "background-color 0.3s",
        }}>
        {/* Page Header */}
        <div style={{ padding: "48px 24px", backgroundColor: dark ? "var(--color-dark-800)" : "var(--color-primary)", color: "#FFFFFF" }}>
            <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, opacity: 0.6, marginBottom: 16 }}>
                <Link href="/" style={{ color: "#fff", textDecoration: "none" }}>Inicio</Link>
                <ChevronRight size={14} />
                <span>Ediciones anteriores</span>
            </div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 700, marginBottom: 12 }}>
                Ediciones Anteriores
            </h1>
            <p style={{ fontSize: 18, opacity: 0.8, maxWidth: 600, lineHeight: 1.6 }}>
                Conoce los coloquios realizados previamente por la Facultad de Educación UC.
            </p>
            </div>
        </div>

        <div style={{ maxWidth: 800, margin: "0 auto", padding: "64px 24px" }}>

            {/* Intro */}
            <FadeInSection>
            <p style={{
                fontSize: 17, lineHeight: 1.8, marginBottom: 48,
                color: dark ? "var(--color-dark-300)" : "var(--color-dark-500)",
            }}>
                La Facultad de Educación de la Pontificia Universidad Católica de Chile
                organiza regularmente coloquios académicos que reúnen a investigadores
                y profesionales para discutir temas relevantes del campo educativo.
                A continuación se presentan las ediciones recientes.
            </p>
            </FadeInSection>

            {/* Timeline de ediciones */}
            <div style={{ position: "relative" }}>
            {/* Línea vertical */}
            <div style={{
                position: "absolute", left: 15, top: 8, bottom: 8, width: 2,
                backgroundColor: dark ? "var(--color-dark-700)" : "var(--color-dark-100)",
            }} />

            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
                {EDICIONES.map((ed, index) => (
                <FadeInSection key={index} delay={index * 0.1} direction="left">
                    <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
                    {/* Punto del timeline */}
                    <div style={{
                        width: 32, height: 32, borderRadius: 10, flexShrink: 0, zIndex: 1,
                        backgroundColor: dark ? "var(--color-dark-700)" : "var(--color-primary-50)",
                        border: `2px solid ${dark ? "var(--color-dark-600)" : "var(--color-primary-100)"}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                        <Calendar size={14} style={{ color: dark ? "var(--color-dark-300)" : "var(--color-primary)" }} />
                    </div>

                    {/* Card */}
                    <div style={{
                        flex: 1, padding: 28, borderRadius: 16,
                        border: `1px solid ${dark ? "var(--color-dark-700)" : "var(--color-dark-100)"}`,
                        backgroundColor: dark ? "var(--color-dark-800)" : "#FFFFFF",
                        transition: "all 0.2s",
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.boxShadow = dark ? "0 4px 20px rgba(0,0,0,0.3)" : "var(--shadow-medium)"; }}
                    onMouseOut={(e) => { e.currentTarget.style.boxShadow = "none"; }}
                    >
                        {/* Tags */}
                        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
                        <span style={{
                            padding: "3px 10px", borderRadius: 6, fontSize: 12, fontWeight: 600,
                            backgroundColor: dark ? "rgba(212,168,67,0.1)" : "var(--color-accent-50)",
                            color: dark ? "var(--color-accent)" : "var(--color-accent-600)",
                        }}>
                            {ed.year}
                        </span>
                        <span style={{
                            padding: "3px 10px", borderRadius: 6, fontSize: 12, fontWeight: 500,
                            backgroundColor: dark ? "var(--color-dark-700)" : "var(--color-dark-50)",
                            color: dark ? "var(--color-dark-400)" : "var(--color-dark-500)",
                        }}>
                            {ed.type}
                        </span>
                        </div>

                        {/* Título */}
                        <h3 style={{
                        fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, lineHeight: 1.3,
                        color: dark ? "var(--color-dark-100)" : "var(--color-dark-700)",
                        marginBottom: 12,
                        }}>
                        {ed.title}
                        </h3>

                        {/* Descripción */}
                        <p style={{
                        fontSize: 15, lineHeight: 1.7, marginBottom: 16,
                        color: dark ? "var(--color-dark-400)" : "var(--color-dark-500)",
                        }}>
                        {ed.description}
                        </p>

                        {/* Detalles */}
                        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
                        <div style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 14, color: dark ? "var(--color-dark-400)" : "var(--color-dark-500)" }}>
                            <Calendar size={14} style={{ marginTop: 3, flexShrink: 0, color: dark ? "var(--color-dark-500)" : "var(--color-dark-400)" }} />
                            <span>{ed.date}</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 14, color: dark ? "var(--color-dark-400)" : "var(--color-dark-500)" }}>
                            <MapPin size={14} style={{ marginTop: 3, flexShrink: 0, color: dark ? "var(--color-dark-500)" : "var(--color-dark-400)" }} />
                            <span>{ed.location}</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 14, color: dark ? "var(--color-dark-400)" : "var(--color-dark-500)" }}>
                            <Users size={14} style={{ marginTop: 3, flexShrink: 0, color: dark ? "var(--color-dark-500)" : "var(--color-dark-400)" }} />
                            <div>
                            <span style={{ fontWeight: 600 }}>Presenta:</span> {ed.presenter}
                            {ed.commentator && (
                                <><br /><span style={{ fontWeight: 600 }}>Comenta:</span> {ed.commentator}</>
                            )}
                            </div>
                        </div>
                        </div>

                        {/* Link externo */}
                        <a
                        href={ed.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: "inline-flex", alignItems: "center", gap: 6,
                            fontSize: 14, fontWeight: 600,
                            color: dark ? "var(--color-accent)" : "var(--color-primary)",
                            textDecoration: "none",
                        }}
                        >
                        Ver en Agenda UC <ExternalLink size={13} />
                        </a>
                    </div>
                    </div>
                </FadeInSection>
                ))}
            </div>
            </div>

            {/* Nota final */}
            <FadeInSection delay={0.3}>
            <div style={{
                marginTop: 48, padding: 24, borderRadius: 12, textAlign: "center",
                backgroundColor: dark ? "var(--color-dark-800)" : "var(--color-primary-50)",
                border: `1px solid ${dark ? "var(--color-dark-700)" : "var(--color-primary-100)"}`,
            }}>
                <p style={{
                fontSize: 15, lineHeight: 1.6,
                color: dark ? "var(--color-dark-300)" : "var(--color-dark-500)",
                }}>
                ¿Participaste en alguna edición anterior?{" "}
                <Link href="/#hero" style={{ color: dark ? "var(--color-accent)" : "var(--color-primary)", fontWeight: 600, textDecoration: "none" }}>
                    Inscríbete en el próximo coloquio →
                </Link>
                </p>
            </div>
            </FadeInSection>
        </div>
        </div>
    );
}