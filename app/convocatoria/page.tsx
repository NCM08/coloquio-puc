// ============================================================
// app/convocatoria/page.tsx — CONVOCATORIA
// ============================================================

"use client";

import { useState } from "react";
import { useTheme } from "@/components/ThemeProvider";
import Link from "next/link";
import {
    ChevronDown, ChevronRight, FileText, Users, Presentation,
    AlertTriangle, CheckCircle, Download, Globe, Clock, BookOpen
} from "lucide-react";

// --- MODALIDADES DE PARTICIPACIÓN ---
const MODALIDADES = [
    {
        icon: Presentation,
        title: "Ponencia individual",
        description: "Presentación oral de 20 minutos sobre resultados de investigación, seguida de 10 minutos de discusión.",
        requirements: "Resumen de 500 palabras mínimo, indicando eje temático, metodología y principales hallazgos.",
    },
    {
        icon: Users,
        title: "Simposio temático",
        description: "Sesión de 90 minutos con 3-4 presentaciones articuladas en torno a un tema común, con moderador.",
        requirements: "Propuesta conjunta con resumen general del simposio y resúmenes individuales de cada ponencia.",
    },
    {
        icon: FileText,
        title: "Póster",
        description: "Presentación visual en formato póster con sesión dedicada para discusión con los asistentes.",
        requirements: "Resumen de 300 palabras con objetivos, metodología y resultados preliminares.",
    },
    {
        icon: BookOpen,
        title: "Mesa redonda",
        description: "Espacio de diálogo de 60 minutos con 3-5 panelistas, inspirado en la Sociología Clínica, la Psicosociología y los Ejes Temáticos del coloquio.",
        requirements: "Propuesta con tema, justificación, lista de panelistas confirmados y preguntas orientadoras.",
    },
];

// --- REQUISITOS IMPORTANTES ---
const REQUISITOS = [
    {
        icon: AlertTriangle,
        type: "warning" as const,
        title: "Envío anónimo obligatorio",
        text: "Todas las propuestas deben enviarse sin identificación de los autores para garantizar la revisión ciega por pares.",
    },
    {
        icon: Globe,
        type: "info" as const,
        title: "Idiomas aceptados",
        text: "Se aceptan propuestas en español y portugués. Las presentaciones durante el coloquio pueden realizarse en cualquiera de estos idiomas.",
    },
    {
        icon: Clock,
        type: "warning" as const,
        title: "Extensión mínima",
        text: "Los resúmenes de ponencias individuales deben tener un mínimo de 500 palabras. Pósters mínimo 300 palabras.",
    },
];

export default function ConvocatoriaPage() {
    const { dark } = useTheme();
    const [openModalidad, setOpenModalidad] = useState<number | null>(0);

    return (
        <div
        style={{
            backgroundColor: dark ? "var(--color-dark-900)" : "var(--color-dark-50)",
            minHeight: "100vh",
            transition: "background-color 0.3s",
        }}
        >
        {/* ====== PAGE HEADER ====== */}
        <div
            style={{
            padding: "48px 24px",
            backgroundColor: dark ? "var(--color-dark-800)" : "var(--color-primary)",
            color: "#FFFFFF",
            }}
        >
            <div style={{ maxWidth: 800, margin: "0 auto" }}>
            {/* Breadcrumbs */}
            <div
                style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontSize: 13,
                opacity: 0.6,
                marginBottom: 16,
                }}
            >
                <Link href="/" style={{ color: "#fff", textDecoration: "none" }}>
                Inicio
                </Link>
                <ChevronRight size={14} />
                <span>Convocatoria</span>
            </div>

            <h1
                style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(32px, 5vw, 48px)",
                fontWeight: 700,
                lineHeight: 1.15,
                marginBottom: 12,
                }}
            >
                Convocatoria
            </h1>
            <p style={{ fontSize: 18, opacity: 0.8, maxWidth: 600, lineHeight: 1.6 }}>
                Invitamos a la comunidad nacional e internacional a participar en el
                VIII Coloquio Internacional de Sociología Clínica y Psicosociología,
                10, 11 y 12 de noviembre de 2026, Campus San Joaquín, PUC, Santiago, Chile.
            </p>
            </div>
        </div>

        {/* ====== CONTENIDO ====== */}
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "64px 24px" }}>

            {/* --- SECCIÓN: Descripción --- */}
            <div style={{ marginBottom: 64 }}>
            <h2
                style={{
                fontFamily: "var(--font-display)",
                fontSize: 28,
                fontWeight: 700,
                color: dark ? "var(--color-dark-100)" : "var(--color-primary)",
                marginBottom: 20,
                }}
            >
                Sobre la convocatoria
            </h2>

            {/* Texto alineado a la izquierda, párrafos cortos */}
            <p
                style={{
                fontSize: 17,
                lineHeight: 1.8,
                color: dark ? "var(--color-dark-300)" : "var(--color-dark-500)",
                marginBottom: 16,
                }}
            >
                Este Coloquio Internacional pretende ser un espacio de encuentro y reflexión
                dialogada, desde una perspectiva interdisciplinaria anclada en la Sociología
                Clínica y la Psicosociología, en torno al proceso de desintegración social que
                caracteriza al mundo contemporáneo.
            </p>
            <p
                style={{
                fontSize: 17,
                lineHeight: 1.8,
                color: dark ? "var(--color-dark-300)" : "var(--color-dark-500)",
                marginBottom: 16,
                }}
            >
                Nuestro propósito es promover un análisis de la actualidad, describiendo y
                comprendiendo los procesos de desintegración social, y también proponer
                <strong> acciones de resistencia y nuevos imaginarios posibles</strong>, distintos
                de aquellos que sostienen exclusivamente la polarización o el imperio de lo
                instantáneo. Esperamos contribuir al debate sobre la recomposición del lazo
                social para la sociedad del mañana.
            </p>
            <p
                style={{
                fontSize: 17,
                lineHeight: 1.8,
                color: dark ? "var(--color-dark-300)" : "var(--color-dark-500)",
                marginBottom: 16,
                }}
            >
                En continuidad con los coloquios anteriores, buscamos fomentar el intercambio
                entre diversos mundos: académico, asociativo, artístico, entre otros. Esperamos
                recibir reportes de investigaciones, experiencias, reflexiones y propuestas
                prácticas de innovación, experimentación, cambio y transformación ancladas en
                la Sociología Clínica y la Psicosociología.
            </p>
            <p
                style={{
                fontSize: 17,
                lineHeight: 1.8,
                color: dark ? "var(--color-dark-300)" : "var(--color-dark-500)",
                }}
            >
                En cada uno de los ejes temáticos se espera recibir ponencias con diagnóstico,
                pero por sobre todo con <strong>propuestas y pistas para crear acciones de
                resistencia y transformación de imaginarios</strong>. Las propuestas serán
                evaluadas mediante revisión ciega por pares.
            </p>
            </div>

            {/* --- SECCIÓN: Requisitos importantes (callout boxes) --- */}
            <div style={{ marginBottom: 64 }}>
            <h2
                style={{
                fontFamily: "var(--font-display)",
                fontSize: 28,
                fontWeight: 700,
                color: dark ? "var(--color-dark-100)" : "var(--color-primary)",
                marginBottom: 20,
                }}
            >
                Requisitos importantes
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {REQUISITOS.map((req, index) => {
                const Icon = req.icon;
                const isWarning = req.type === "warning";
                return (
                    <div
                    key={index}
                    style={{
                        padding: 20,
                        borderRadius: 12,
                        border: `1px solid ${
                        isWarning
                            ? dark ? "rgba(251,140,0,0.3)" : "rgba(251,140,0,0.3)"
                            : dark ? "var(--color-dark-700)" : "var(--color-primary-100)"
                        }`,
                        backgroundColor: isWarning
                        ? dark ? "rgba(251,140,0,0.05)" : "rgba(251,140,0,0.04)"
                        : dark ? "rgba(0,61,124,0.05)" : "var(--color-primary-50)",
                        display: "flex",
                        gap: 16,
                        alignItems: "flex-start",
                    }}
                    >
                    <Icon
                        size={20}
                        style={{
                        color: isWarning ? "#FB8C00" : "var(--color-primary)",
                        flexShrink: 0,
                        marginTop: 2,
                        }}
                    />
                    <div>
                        <p
                        style={{
                            fontSize: 15,
                            fontWeight: 600,
                            color: dark ? "var(--color-dark-100)" : "var(--color-dark-700)",
                            marginBottom: 4,
                        }}
                        >
                        {req.title}
                        </p>
                        <p
                        style={{
                            fontSize: 14,
                            lineHeight: 1.6,
                            color: dark ? "var(--color-dark-400)" : "var(--color-dark-500)",
                        }}
                        >
                        {req.text}
                        </p>
                    </div>
                    </div>
                );
                })}
            </div>
            </div>

            {/* --- SECCIÓN: Modalidades (acordeón) --- */}
            <div style={{ marginBottom: 64 }}>
            <h2
                style={{
                fontFamily: "var(--font-display)",
                fontSize: 28,
                fontWeight: 700,
                color: dark ? "var(--color-dark-100)" : "var(--color-primary)",
                marginBottom: 20,
                }}
            >
                Modalidades de participación
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {MODALIDADES.map((mod, index) => {
                const Icon = mod.icon;
                const isOpen = openModalidad === index;
                return (
                    <button
                    key={index}
                    onClick={() => setOpenModalidad(isOpen ? null : index)}
                    style={{
                        width: "100%",
                        textAlign: "left",
                        padding: 20,
                        borderRadius: 12,
                        border: `1px solid ${
                        isOpen
                            ? dark ? "var(--color-accent-700)" : "var(--color-primary-200)"
                            : dark ? "var(--color-dark-700)" : "var(--color-dark-100)"
                        }`,
                        backgroundColor: isOpen
                        ? dark ? "rgba(212,168,67,0.05)" : "var(--color-primary-50)"
                        : dark ? "var(--color-dark-800)" : "#FFFFFF",
                        cursor: "pointer",
                        transition: "all 0.2s",
                        fontFamily: "var(--font-body)",
                    }}
                    >
                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                        <div
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: 10,
                            backgroundColor: isOpen
                            ? dark ? "rgba(212,168,67,0.15)" : "var(--color-primary-100)"
                            : dark ? "var(--color-dark-700)" : "var(--color-dark-50)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                        }}
                        >
                        <Icon
                            size={20}
                            style={{
                            color: isOpen
                                ? dark ? "var(--color-accent)" : "var(--color-primary)"
                                : dark ? "var(--color-dark-400)" : "var(--color-dark-500)",
                            }}
                        />
                        </div>

                        <span
                        style={{
                            flex: 1,
                            fontSize: 16,
                            fontWeight: 600,
                            color: isOpen
                            ? dark ? "var(--color-accent)" : "var(--color-primary)"
                            : dark ? "var(--color-dark-200)" : "var(--color-dark-700)",
                        }}
                        >
                        {mod.title}
                        </span>

                        <ChevronDown
                        size={18}
                        style={{
                            color: "var(--color-dark-400)",
                            transform: isOpen ? "rotate(180deg)" : "rotate(0)",
                            transition: "transform 0.2s",
                        }}
                        />
                    </div>

                    {isOpen && (
                        <div style={{ marginTop: 16, paddingTop: 16, borderTop: `1px solid ${dark ? "var(--color-dark-700)" : "var(--color-dark-100)"}` }}>
                        <p
                            style={{
                            fontSize: 15,
                            lineHeight: 1.7,
                            color: dark ? "var(--color-dark-300)" : "var(--color-dark-500)",
                            marginBottom: 12,
                            }}
                        >
                            {mod.description}
                        </p>
                        <div
                            style={{
                            padding: 12,
                            borderRadius: 8,
                            backgroundColor: dark ? "var(--color-dark-900)" : "var(--color-dark-50)",
                            display: "flex",
                            gap: 8,
                            alignItems: "flex-start",
                            }}
                        >
                            <CheckCircle size={16} style={{ color: "#4CAF50", flexShrink: 0, marginTop: 2 }} />
                            <p style={{ fontSize: 13, lineHeight: 1.6, color: dark ? "var(--color-dark-400)" : "var(--color-dark-500)" }}>
                            {mod.requirements}
                            </p>
                        </div>
                        </div>
                    )}
                    </button>
                );
                })}
            </div>
            </div>

            {/* --- SECCIÓN: Plantillas y envío --- */}
            <div
            style={{
                padding: 32,
                borderRadius: 16,
                backgroundColor: dark
                ? "var(--color-dark-800)"
                : "var(--color-primary)",
                color: "#FFFFFF",
                textAlign: "center",
            }}
            >
            <Download size={32} style={{ marginBottom: 16, opacity: 0.8 }} />
            <h3
                style={{
                fontFamily: "var(--font-display)",
                fontSize: 24,
                fontWeight: 700,
                marginBottom: 8,
                color: "#FFFFFF",
                }}
            >
                ¿Listo para enviar tu propuesta?
            </h3>
            <p
                style={{
                fontSize: 16,
                opacity: 0.8,
                marginBottom: 24,
                maxWidth: 500,
                margin: "0 auto 24px",
                lineHeight: 1.6,
                }}
            >
                Descarga la plantilla oficial y envía tu propuesta
                antes de la fecha límite.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <Link
                href="#"
                style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    height: 48,
                    padding: "0 24px",
                    backgroundColor: "var(--color-accent)",
                    color: "#fff",
                    fontSize: 15,
                    fontWeight: 600,
                    borderRadius: 10,
                    textDecoration: "none",
                }}
                >
                <Download size={16} />
                Descargar plantilla
                </Link>
                <Link
                href="/envio-propuestas"
                style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    height: 48,
                    padding: "0 24px",
                    backgroundColor: "rgba(255,255,255,0.15)",
                    color: "#fff",
                    fontSize: 15,
                    fontWeight: 500,
                    borderRadius: 10,
                    border: "1px solid rgba(255,255,255,0.25)",
                    textDecoration: "none",
                }}
                >
                Enviar propuesta
                </Link>
            </div>
            </div>
        </div>
        </div>
    );
}