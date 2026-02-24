// ============================================================
// app/actas/page.tsx — ACTAS Y PUBLICACIONES
// ============================================================

"use client";

import { useState } from "react";
import { useTheme } from "@/components/ThemeProvider";
import Link from "next/link";
import { ChevronRight, FileText, Download, Search, BookOpen, Calendar, User } from "lucide-react";
import FadeInSection from "@/components/ui/FadeInSection";

// Actas placeholder — se actualizan con datos reales
const ACTAS = [
    {
        year: "2025",
        title: "Actas del Coloquio: Inteligencia Artificial en Educación",
        edition: "Coloquio en Educación UC — Diciembre 2025",
        papers: 1,
        description: "Propuesta de un plan de formación docente en inteligencia artificial aplicada a la educación.",
        authors: ["Álvaro Salinas", "Magdalena Claro"],
        downloadAvailable: false,
    },
    {
        year: "2025",
        title: "Actas del Coloquio: Educación Artística Visual Intercultural",
        edition: "Coloquio en Educación UC — Julio 2025",
        papers: 1,
        description: "Desafíos y posibilidades para una educación artística visual que integre perspectivas interculturales.",
        authors: ["Verónica García-Lazo", "Guillermo Marini"],
        downloadAvailable: false,
    },
    {
        year: "2025",
        title: "Actas del III Coloquio Internacional Franco–Latinoamericano",
        edition: "Clínicas del Trabajo — Octubre 2025",
        papers: 12,
        description: "Reflexiones sobre el significado del trabajo con ejes sobre género, racialización, salud, sostenibilidad y desafíos ecológicos.",
        authors: ["Varios autores"],
        downloadAvailable: false,
    },
];

// Publicaciones asociadas placeholder
const PUBLICACIONES = [
    {
        title: "Inteligencia artificial y formación docente: Una revisión de la literatura",
        authors: "Salinas, Á., Claro, M.",
        journal: "Revista de Educación UC",
        year: "2025",
        type: "Artículo",
    },
    {
        title: "Interculturalidad y educación artística: Experiencias desde el sur",
        authors: "García-Lazo, V., Marini, G.",
        journal: "Pensamiento Educativo",
        year: "2025",
        type: "Capítulo",
    },
    {
        title: "Clínicas del trabajo en América Latina: Estado del arte",
        authors: "Varios autores",
        journal: "Cuadernos de Psicología del Trabajo",
        year: "2025",
        type: "Libro",
    },
];

const TYPE_COLORS: Record<string, string> = {
    "Artículo": "#2196F3",
    "Capítulo": "#4CAF50",
    "Libro": "#9C27B0",
};

export default function ActasPage() {
    const { dark } = useTheme();
    const [searchTerm, setSearchTerm] = useState("");
    const [activeTab, setActiveTab] = useState<"actas" | "publicaciones">("actas");

    const filteredActas = ACTAS.filter(a =>
        a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.authors.some(auth => auth.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const filteredPubs = PUBLICACIONES.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.authors.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                <span>Actas y publicaciones</span>
            </div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 700, marginBottom: 12 }}>
                Actas y Publicaciones
            </h1>
            <p style={{ fontSize: 18, opacity: 0.8, maxWidth: 600, lineHeight: 1.6 }}>
                Accede a las actas de coloquios anteriores y publicaciones derivadas de las investigaciones presentadas.
            </p>
            </div>
        </div>

        <div style={{ maxWidth: 800, margin: "0 auto", padding: "48px 24px" }}>

            {/* Buscador */}
            <FadeInSection>
            <div style={{
                position: "relative", marginBottom: 32,
            }}>
                <Search size={18} style={{
                position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)",
                color: dark ? "var(--color-dark-500)" : "var(--color-dark-400)",
                }} />
                <input
                type="text"
                placeholder="Buscar por título, autor o palabra clave..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                    width: "100%", height: 52, paddingLeft: 48, paddingRight: 16,
                    borderRadius: 12, fontSize: 15, fontFamily: "var(--font-body)",
                    border: `1px solid ${dark ? "var(--color-dark-700)" : "var(--color-dark-100)"}`,
                    backgroundColor: dark ? "var(--color-dark-800)" : "#FFFFFF",
                    color: dark ? "var(--color-dark-100)" : "var(--color-dark-700)",
                    outline: "none", transition: "border-color 0.2s",
                    boxSizing: "border-box",
                }}
                onFocus={(e) => { e.currentTarget.style.borderColor = dark ? "var(--color-accent)" : "var(--color-primary)"; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = dark ? "var(--color-dark-700)" : "var(--color-dark-100)"; }}
                />
            </div>
            </FadeInSection>

            {/* Tabs */}
            <FadeInSection delay={0.1}>
            <div style={{
                display: "flex", gap: 4, marginBottom: 32, padding: 4, borderRadius: 12,
                backgroundColor: dark ? "var(--color-dark-800)" : "#FFFFFF",
                border: `1px solid ${dark ? "var(--color-dark-700)" : "var(--color-dark-100)"}`,
            }}>
                {(["actas", "publicaciones"] as const).map((tab) => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    style={{
                    flex: 1, padding: "12px 20px", borderRadius: 8, border: "none",
                    cursor: "pointer", fontSize: 14, fontWeight: 600, fontFamily: "var(--font-body)",
                    transition: "all 0.2s",
                    backgroundColor: activeTab === tab ? (dark ? "var(--color-accent)" : "var(--color-primary)") : "transparent",
                    color: activeTab === tab ? "#FFFFFF" : (dark ? "var(--color-dark-400)" : "var(--color-dark-500)"),
                    }}
                >
                    {tab === "actas" ? "Actas de Coloquios" : "Publicaciones Derivadas"}
                </button>
                ))}
            </div>
            </FadeInSection>

            {/* ====== TAB: ACTAS ====== */}
            {activeTab === "actas" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {filteredActas.length === 0 ? (
                <p style={{ textAlign: "center", padding: 40, color: dark ? "var(--color-dark-500)" : "var(--color-dark-400)", fontSize: 15 }}>
                    No se encontraron actas con ese término de búsqueda.
                </p>
                ) : (
                filteredActas.map((acta, index) => (
                    <FadeInSection key={index} delay={index * 0.08}>
                    <div style={{
                        padding: 28, borderRadius: 16,
                        border: `1px solid ${dark ? "var(--color-dark-700)" : "var(--color-dark-100)"}`,
                        backgroundColor: dark ? "var(--color-dark-800)" : "#FFFFFF",
                        transition: "all 0.2s",
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.boxShadow = dark ? "0 4px 20px rgba(0,0,0,0.3)" : "var(--shadow-medium)"; }}
                    onMouseOut={(e) => { e.currentTarget.style.boxShadow = "none"; }}
                    >
                        <div style={{ display: "flex", gap: 20, alignItems: "flex-start", flexWrap: "wrap" }}>
                        {/* Ícono */}
                        <div style={{
                            width: 56, height: 56, borderRadius: 14, flexShrink: 0,
                            backgroundColor: dark ? "rgba(212,168,67,0.1)" : "var(--color-primary-50)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                        }}>
                            <FileText size={24} style={{ color: dark ? "var(--color-accent)" : "var(--color-primary)" }} />
                        </div>

                        {/* Contenido */}
                        <div style={{ flex: 1, minWidth: 250 }}>
                            {/* Tags */}
                            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 8 }}>
                            <span style={{
                                padding: "3px 10px", borderRadius: 6, fontSize: 12, fontWeight: 600,
                                backgroundColor: dark ? "rgba(212,168,67,0.1)" : "var(--color-accent-50)",
                                color: dark ? "var(--color-accent)" : "var(--color-accent-600)",
                            }}>
                                {acta.year}
                            </span>
                            <span style={{
                                padding: "3px 10px", borderRadius: 6, fontSize: 12, fontWeight: 500,
                                backgroundColor: dark ? "var(--color-dark-700)" : "var(--color-dark-50)",
                                color: dark ? "var(--color-dark-400)" : "var(--color-dark-500)",
                            }}>
                                {acta.papers} {acta.papers === 1 ? "ponencia" : "ponencias"}
                            </span>
                            </div>

                            <h3 style={{
                            fontFamily: "var(--font-display)", fontSize: 19, fontWeight: 700, lineHeight: 1.3,
                            color: dark ? "var(--color-dark-100)" : "var(--color-dark-700)",
                            marginBottom: 4,
                            }}>
                            {acta.title}
                            </h3>

                            <p style={{ fontSize: 13, color: dark ? "var(--color-dark-500)" : "var(--color-dark-400)", marginBottom: 10 }}>
                            {acta.edition}
                            </p>

                            <p style={{
                            fontSize: 14, lineHeight: 1.7, marginBottom: 12,
                            color: dark ? "var(--color-dark-400)" : "var(--color-dark-500)",
                            }}>
                            {acta.description}
                            </p>

                            {/* Autores */}
                            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: dark ? "var(--color-dark-400)" : "var(--color-dark-500)", marginBottom: 16 }}>
                            <User size={13} />
                            <span>{acta.authors.join(", ")}</span>
                            </div>

                            {/* Botón descarga */}
                            {acta.downloadAvailable ? (
                            <a href="#" style={{
                                display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 16px",
                                borderRadius: 8, fontSize: 13, fontWeight: 600,
                                backgroundColor: dark ? "rgba(212,168,67,0.1)" : "var(--color-primary-50)",
                                color: dark ? "var(--color-accent)" : "var(--color-primary)",
                                textDecoration: "none", transition: "all 0.2s",
                            }}>
                                <Download size={14} /> Descargar PDF
                            </a>
                            ) : (
                            <span style={{
                                display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 16px",
                                borderRadius: 8, fontSize: 13, fontWeight: 500,
                                backgroundColor: dark ? "var(--color-dark-700)" : "var(--color-dark-50)",
                                color: dark ? "var(--color-dark-500)" : "var(--color-dark-400)",
                            }}>
                                <Calendar size={14} /> Disponible próximamente
                            </span>
                            )}
                        </div>
                        </div>
                    </div>
                    </FadeInSection>
                ))
                )}
            </div>
            )}

            {/* ====== TAB: PUBLICACIONES ====== */}
            {activeTab === "publicaciones" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {filteredPubs.length === 0 ? (
                <p style={{ textAlign: "center", padding: 40, color: dark ? "var(--color-dark-500)" : "var(--color-dark-400)", fontSize: 15 }}>
                    No se encontraron publicaciones con ese término de búsqueda.
                </p>
                ) : (
                filteredPubs.map((pub, index) => (
                    <FadeInSection key={index} delay={index * 0.08}>
                    <div style={{
                        padding: 24, borderRadius: 14,
                        border: `1px solid ${dark ? "var(--color-dark-700)" : "var(--color-dark-100)"}`,
                        backgroundColor: dark ? "var(--color-dark-800)" : "#FFFFFF",
                        display: "flex", gap: 16, alignItems: "flex-start",
                        transition: "all 0.2s",
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.boxShadow = dark ? "0 4px 20px rgba(0,0,0,0.3)" : "var(--shadow-medium)"; }}
                    onMouseOut={(e) => { e.currentTarget.style.boxShadow = "none"; }}
                    >
                        {/* Ícono tipo */}
                        <div style={{
                        width: 44, height: 44, borderRadius: 10, flexShrink: 0,
                        backgroundColor: `${TYPE_COLORS[pub.type]}15`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        }}>
                        <BookOpen size={18} style={{ color: TYPE_COLORS[pub.type] }} />
                        </div>

                        <div style={{ flex: 1 }}>
                        {/* Tipo badge */}
                        <span style={{
                            display: "inline-block", padding: "2px 8px", borderRadius: 4, fontSize: 11, fontWeight: 600, marginBottom: 8,
                            backgroundColor: `${TYPE_COLORS[pub.type]}15`,
                            color: TYPE_COLORS[pub.type],
                        }}>
                            {pub.type}
                        </span>

                        <h4 style={{
                            fontSize: 16, fontWeight: 700, lineHeight: 1.4,
                            color: dark ? "var(--color-dark-100)" : "var(--color-dark-700)",
                            marginBottom: 6, fontFamily: "var(--font-body)",
                        }}>
                            {pub.title}
                        </h4>

                        <p style={{ fontSize: 13, color: dark ? "var(--color-dark-400)" : "var(--color-dark-500)", marginBottom: 2 }}>
                            {pub.authors}
                        </p>
                        <p style={{ fontSize: 13, fontStyle: "italic", color: dark ? "var(--color-dark-500)" : "var(--color-dark-400)" }}>
                            {pub.journal}, {pub.year}
                        </p>
                        </div>
                    </div>
                    </FadeInSection>
                ))
                )}
            </div>
            )}

            {/* CTA */}
            <FadeInSection delay={0.3}>
            <div style={{
                marginTop: 48, padding: 28, borderRadius: 16, textAlign: "center",
                backgroundColor: dark ? "var(--color-dark-800)" : "var(--color-primary-50)",
                border: `1px solid ${dark ? "var(--color-dark-700)" : "var(--color-primary-100)"}`,
            }}>
                <BookOpen size={28} style={{ color: "var(--color-accent)", marginBottom: 12 }} />
                <h3 style={{
                fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700,
                color: dark ? "var(--color-dark-100)" : "var(--color-primary)", marginBottom: 8,
                }}>
                ¿Quieres publicar tu investigación?
                </h3>
                <p style={{
                fontSize: 15, color: dark ? "var(--color-dark-400)" : "var(--color-dark-500)",
                maxWidth: 500, margin: "0 auto 20px", lineHeight: 1.6,
                }}>
                Los trabajos aceptados en el coloquio serán publicados en las actas oficiales.
                Los mejores serán invitados a enviar versiones extendidas para revistas indexadas.
                </p>
                <Link href="/convocatoria" style={{
                display: "inline-flex", alignItems: "center", gap: 8, height: 44, padding: "0 24px",
                backgroundColor: "var(--color-accent)", color: "#fff", fontSize: 14, fontWeight: 600,
                borderRadius: 10, textDecoration: "none",
                }}>
                Ver convocatoria
                </Link>
            </div>
            </FadeInSection>
        </div>
        </div>
    );
}