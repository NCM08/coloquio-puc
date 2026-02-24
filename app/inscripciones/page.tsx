// ============================================================
// app/inscripciones/page.tsx — INSCRIPCIONES
// ============================================================

"use client";

import { useState } from "react";
import { useTheme } from "@/components/ThemeProvider";
import Link from "next/link";
import { ChevronRight, ChevronDown, Check, AlertTriangle, ExternalLink } from "lucide-react";

const PLANES = [
    {
        title: "Asistente",
        subtitle: "Solo asistencia al evento",
        price: "$30.000",
        priceForeign: "USD $40",
        features: [
        "Acceso a todas las conferencias",
        "Acceso a sesiones de ponencias",
        "Material del coloquio",
        "Coffee breaks incluidos",
        "Certificado de asistencia",
        ],
        highlighted: false,
    },
    {
        title: "Expositor",
        subtitle: "Presentación + asistencia",
        price: "$50.000",
        priceForeign: "USD $65",
        features: [
        "Todo lo incluido en Asistente",
        "Presentación de ponencia o póster",
        "Publicación en actas del coloquio",
        "Certificado de expositor",
        "Cena de networking",
        ],
        highlighted: true,
    },
    {
        title: "Estudiante",
        subtitle: "Pregrado y postgrado",
        price: "$15.000",
        priceForeign: "USD $20",
        features: [
        "Acceso a todas las conferencias",
        "Acceso a sesiones de ponencias",
        "Material del coloquio",
        "Coffee breaks incluidos",
        "Certificado de asistencia",
        ],
        highlighted: false,
    },
];

const FAQ = [
    {
        q: "¿Cómo pago si soy extranjero?",
        a: "Aceptamos pagos internacionales vía transferencia bancaria en dólares o mediante PayPal. Al momento de inscribirse, seleccione la opción 'Pago internacional' y recibirá las instrucciones por correo.",
    },
    {
        q: "¿Puedo obtener factura?",
        a: "Sí, emitimos facturas y boletas según corresponda. Ingrese su RUT o documento de identidad al momento de la inscripción.",
    },
    {
        q: "¿Hay descuento por inscripción grupal?",
        a: "Sí, para grupos de 5 o más personas de la misma institución ofrecemos un 15% de descuento. Contáctenos a coloquio@uc.cl para coordinar.",
    },
    {
        q: "¿Qué pasa si necesito cancelar mi inscripción?",
        a: "Se puede solicitar devolución del 100% hasta 30 días antes del evento, y del 50% hasta 15 días antes. Después de esa fecha no se realizan devoluciones.",
    },
];

export default function InscripcionesPage() {
    const { dark } = useTheme();
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <div
        style={{
            backgroundColor: dark ? "var(--color-dark-900)" : "var(--color-dark-50)",
            minHeight: "100vh",
            transition: "background-color 0.3s",
        }}
        >
        {/* Page Header */}
        <div
            style={{
            padding: "48px 24px",
            backgroundColor: dark ? "var(--color-dark-800)" : "var(--color-primary)",
            color: "#FFFFFF",
            }}
        >
            <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, opacity: 0.6, marginBottom: 16 }}>
                <Link href="/" style={{ color: "#fff", textDecoration: "none" }}>Inicio</Link>
                <ChevronRight size={14} />
                <span>Inscripciones</span>
            </div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 700, marginBottom: 12 }}>
                Inscripciones
            </h1>
            <p style={{ fontSize: 18, opacity: 0.8, maxWidth: 600, lineHeight: 1.6 }}>
                Selecciona el tipo de inscripción que corresponda y completa tu registro.
            </p>
            </div>
        </div>

        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "64px 24px" }}>

            {/* Deadline banner */}
            <div
            style={{
                padding: 20,
                borderRadius: 12,
                backgroundColor: dark ? "rgba(251,140,0,0.08)" : "rgba(251,140,0,0.06)",
                border: "1px solid rgba(251,140,0,0.25)",
                display: "flex",
                gap: 12,
                alignItems: "center",
                marginBottom: 48,
            }}
            >
            <AlertTriangle size={20} style={{ color: "#FB8C00", flexShrink: 0 }} />
            <p style={{ fontSize: 15, color: dark ? "var(--color-dark-200)" : "var(--color-dark-600)" }}>
                <strong>Inscripción con tarifa preferencial</strong> hasta el 30 de septiembre de 2026.
                Después de esa fecha, los valores aumentan un 20%.
            </p>
            </div>

            {/* Pricing cards */}
            <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: 24,
                marginBottom: 64,
            }}
            >
            {PLANES.map((plan, index) => (
                <div
                key={index}
                style={{
                    borderRadius: 16,
                    border: plan.highlighted
                    ? `2px solid var(--color-accent)`
                    : `1px solid ${dark ? "var(--color-dark-700)" : "var(--color-dark-100)"}`,
                    backgroundColor: dark ? "var(--color-dark-800)" : "#FFFFFF",
                    overflow: "hidden",
                    position: "relative",
                    transition: "all 0.2s",
                }}
                >
                {/* Badge "Recomendado" */}
                {plan.highlighted && (
                    <div
                    style={{
                        padding: "6px 16px",
                        backgroundColor: "var(--color-accent)",
                        color: "#fff",
                        fontSize: 12,
                        fontWeight: 600,
                        textAlign: "center",
                        textTransform: "uppercase",
                        letterSpacing: 1,
                    }}
                    >
                    Recomendado
                    </div>
                )}

                <div style={{ padding: 32 }}>
                    <h3
                    style={{
                        fontFamily: "var(--font-display)",
                        fontSize: 24,
                        fontWeight: 700,
                        color: dark ? "var(--color-dark-100)" : "var(--color-dark-700)",
                        marginBottom: 4,
                    }}
                    >
                    {plan.title}
                    </h3>
                    <p style={{ fontSize: 14, color: dark ? "var(--color-dark-400)" : "var(--color-dark-500)", marginBottom: 20 }}>
                    {plan.subtitle}
                    </p>

                    {/* Precio */}
                    <div style={{ marginBottom: 8 }}>
                    <span
                        style={{
                        fontFamily: "var(--font-display)",
                        fontSize: 36,
                        fontWeight: 700,
                        color: plan.highlighted
                            ? "var(--color-accent)"
                            : dark ? "var(--color-dark-100)" : "var(--color-primary)",
                        }}
                    >
                        {plan.price}
                    </span>
                    <span style={{ fontSize: 14, color: dark ? "var(--color-dark-400)" : "var(--color-dark-400)", marginLeft: 4 }}>
                        CLP
                    </span>
                    </div>
                    <p style={{ fontSize: 13, color: dark ? "var(--color-dark-500)" : "var(--color-dark-400)", marginBottom: 24 }}>
                    Extranjeros: {plan.priceForeign}
                    </p>

                    {/* Features */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
                    {plan.features.map((feat, i) => (
                        <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                        <Check size={16} style={{ color: "#4CAF50", flexShrink: 0, marginTop: 2 }} />
                        <span style={{ fontSize: 14, color: dark ? "var(--color-dark-300)" : "var(--color-dark-500)", lineHeight: 1.5 }}>
                            {feat}
                        </span>
                        </div>
                    ))}
                    </div>

                    {/* CTA */}
                    <Link
                    href="#"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                        height: 48,
                        width: "100%",
                        borderRadius: 10,
                        fontSize: 15,
                        fontWeight: 600,
                        textDecoration: "none",
                        transition: "all 0.2s",
                        backgroundColor: plan.highlighted ? "var(--color-accent)" : "transparent",
                        color: plan.highlighted ? "#fff" : dark ? "var(--color-accent)" : "var(--color-primary)",
                        border: plan.highlighted ? "none" : `1px solid ${dark ? "var(--color-dark-600)" : "var(--color-primary-200)"}`,
                    }}
                    >
                    Inscribirse
                    <ExternalLink size={14} />
                    </Link>
                </div>
                </div>
            ))}
            </div>

            {/* FAQ */}
            <h2
            style={{
                fontFamily: "var(--font-display)",
                fontSize: 28,
                fontWeight: 700,
                color: dark ? "var(--color-dark-100)" : "var(--color-primary)",
                marginBottom: 20,
                textAlign: "center",
            }}
            >
            Preguntas frecuentes
            </h2>

            <div style={{ maxWidth: 700, margin: "0 auto", display: "flex", flexDirection: "column", gap: 8 }}>
            {FAQ.map((item, index) => (
                <button
                key={index}
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                style={{
                    width: "100%",
                    textAlign: "left",
                    padding: 20,
                    borderRadius: 12,
                    border: `1px solid ${dark ? "var(--color-dark-700)" : "var(--color-dark-100)"}`,
                    backgroundColor: dark ? "var(--color-dark-800)" : "#FFFFFF",
                    cursor: "pointer",
                    fontFamily: "var(--font-body)",
                    transition: "all 0.2s",
                }}
                >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ flex: 1, fontSize: 15, fontWeight: 600, color: dark ? "var(--color-dark-200)" : "var(--color-dark-700)" }}>
                    {item.q}
                    </span>
                    <ChevronDown
                    size={18}
                    style={{
                        color: "var(--color-dark-400)",
                        transform: openFaq === index ? "rotate(180deg)" : "rotate(0)",
                        transition: "transform 0.2s",
                    }}
                    />
                </div>
                {openFaq === index && (
                    <p style={{
                    marginTop: 12,
                    paddingTop: 12,
                    borderTop: `1px solid ${dark ? "var(--color-dark-700)" : "var(--color-dark-100)"}`,
                    fontSize: 14,
                    lineHeight: 1.7,
                    color: dark ? "var(--color-dark-400)" : "var(--color-dark-500)",
                    }}>
                    {item.a}
                    </p>
                )}
                </button>
            ))}
            </div>
        </div>
        </div>
    );
}