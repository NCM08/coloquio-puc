// ============================================================
// app/preguntas-frecuentes/page.tsx — FAQ
// ============================================================

"use client";

import { useState } from "react";
import { useTheme } from "@/components/ThemeProvider";
import Link from "next/link";
import { ChevronRight, ChevronDown, Mail } from "lucide-react";
import FadeInSection from "@/components/ui/FadeInSection";

type FAQCategory = {
    title: string;
    questions: { q: string; a: string }[];
};

const FAQ_DATA: FAQCategory[] = [
    {
        title: "Inscripción y pagos",
        questions: [
        { q: "¿Cuánto cuesta inscribirse?", a: "Los valores varían según categoría. Estudiantes de pregrado: $13.000 (asistente) / $16.000 (expositor). Egresados/as y profesionales: $26.000 / $34.000. Posgrado: $38.000 / $54.000. Académicos/as e investigadores/as: $55.000 / $80.000. Todos los valores en CLP e incluyen IVA. Inscripción temprana disponible hasta el 30 de septiembre de 2026." },
        { q: "¿Hay descuento por inscripción grupal?", a: "No. Los valores indicados son por persona y no existen descuentos por inscripción grupal." },
        { q: "¿Cómo pago si soy extranjero?", a: "El pago se realiza mediante transferencia bancaria a través de Global66. Datos: Titular: Romina Estivalia Díaz Meza, RUT: 17.188.251-6, Cuenta Vista N° 10327090. Para coordinar un pago internacional, escríbanos a congresosociologiaclinica.2026@gmail.com" },
        { q: "¿Puedo obtener factura?", a: "El coloquio no emite boletas oficiales. Una vez realizada su transferencia a Global66, se le entregará un comprobante de pago estándar, válido para procesos de validación y rendición ante su institución." },
        { q: "¿Qué pasa si necesito cancelar?", a: "Toda inscripción y pago realizado es definitivo. No se realizarán devoluciones de dinero bajo ninguna circunstancia, independientemente del motivo de cancelación." },
        ],
    },
    {
        title: "Envío de propuestas",
        questions: [
        { q: "¿Qué modalidades de participación existen?", a: "Los 4 formatos válidos para participar son: 1) Ponencias (15 a 20 min), 2) Mesas temáticas (60 a 90 min, 3-4 presentaciones), 3) Posters académicos, 4) Intervenciones artísticas y muestras audiovisuales (máx. 30 min)." },
        { q: "¿Cuál es la extensión mínima del resumen?", a: "Ponencias individuales: mínimo 500 palabras. Pósters: mínimo 300 palabras. Mesas temáticas: resumen general de la mesa más resúmenes individuales de cada participante." },
        { q: "¿En qué idiomas puedo enviar mi propuesta?", a: "Se aceptan propuestas en español y portugués. Las presentaciones durante el coloquio pueden realizarse en cualquiera de estos idiomas." },
        { q: "¿El envío es anónimo?", a: "Sí, todas las propuestas deben enviarse sin identificación de los autores para garantizar la revisión ciega por pares." },
        { q: "¿Cuándo sabré si mi propuesta fue aceptada?", a: "Las notificaciones de aceptación se enviarán el 8 de junio de 2026." },
        { q: "¿Puedo enviar más de una propuesta?", a: "Sí, puede enviar hasta dos propuestas como autor principal. No hay límite como coautor." },
        ],
    },
    {
        title: "Durante el evento",
        questions: [
        { q: "¿Dónde se realiza el coloquio?", a: "En el Campus San Joaquín de la Pontificia Universidad Católica de Chile, ubicado en Av. Vicuña Mackenna 4860, Macul, Santiago." },
        { q: "¿Cómo llego en transporte público?", a: "La estación de metro más cercana es San Joaquín (Línea 5), a 5 minutos caminando del campus. También hay múltiples líneas de buses." },
        { q: "¿Hay estacionamiento?", a: "Sí, el campus cuenta con estacionamiento para vehículos con acceso por Av. Vicuña Mackenna. El valor es de $2.000 CLP por día." },
        { q: "¿Hay modalidad online?", a: "Sí, el coloquio es presencial + online. Las conferencias magistrales y mesas redondas se transmitirán en vivo. Los asistentes online recibirán un link de acceso previo al evento." },
        { q: "¿Se entregarán certificados?", a: "Sí, se entregará certificado de asistencia a todos los participantes y certificado de expositor a quienes presenten ponencias o pósters." },
        ],
    },
    {
        title: "Publicaciones y actas",
        questions: [
        { q: "¿Se publican actas del coloquio?", a: "Sí, todos los trabajos aceptados serán publicados en las actas oficiales del coloquio con ISBN." },
        { q: "¿Hay posibilidad de publicar en revistas?", a: "Los mejores trabajos serán invitados a enviar versiones extendidas para su publicación en revistas académicas indexadas asociadas al coloquio." },
        { q: "¿Cuándo estarán disponibles las actas?", a: "Las actas se publican aproximadamente 3 meses después del evento, sujeto a la recepción de las versiones finales de los trabajos." },
        ],
    },
];

export default function FAQPage() {
    const { dark } = useTheme();
    const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

    const toggleItem = (key: string) => {
        setOpenItems(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div style={{
        backgroundColor: dark ? "var(--color-dark-900)" : "var(--color-dark-50)",
        minHeight: "100vh", transition: "background-color 0.3s",
        }}>
        {/* Header */}
        <div style={{ padding: "48px 24px", backgroundColor: dark ? "var(--color-dark-800)" : "var(--color-primary)", color: "#FFFFFF" }}>
            <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, opacity: 0.6, marginBottom: 16 }}>
                <Link href="/" style={{ color: "#fff", textDecoration: "none" }}>Inicio</Link>
                <ChevronRight size={14} />
                <span>Preguntas frecuentes</span>
            </div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 700, marginBottom: 12 }}>
                Preguntas Frecuentes
            </h1>
            <p style={{ fontSize: 18, opacity: 0.8, maxWidth: 600, lineHeight: 1.6 }}>
                Encuentra respuestas a las dudas más comunes sobre el coloquio.
            </p>
            </div>
        </div>

        <div style={{ maxWidth: 800, margin: "0 auto", padding: "64px 24px" }}>
            {FAQ_DATA.map((category, catIndex) => (
            <FadeInSection key={catIndex} delay={catIndex * 0.08}>
                <div style={{ marginBottom: 48 }}>
                {/* Título categoría */}
                <h2 style={{
                    fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700,
                    color: dark ? "var(--color-dark-100)" : "var(--color-primary)",
                    marginBottom: 16,
                }}>
                    {category.title}
                </h2>

                {/* Preguntas */}
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {category.questions.map((item, qIndex) => {
                    const key = `${catIndex}-${qIndex}`;
                    const isOpen = openItems[key] || false;
                    return (
                        <button
                        key={key}
                        onClick={() => toggleItem(key)}
                        style={{
                            width: "100%", textAlign: "left", padding: 20, borderRadius: 12,
                            border: `1px solid ${isOpen
                            ? (dark ? "var(--color-accent-700)" : "var(--color-primary-200)")
                            : (dark ? "var(--color-dark-700)" : "var(--color-dark-100)")}`,
                            backgroundColor: isOpen
                            ? (dark ? "rgba(212,168,67,0.05)" : "var(--color-primary-50)")
                            : (dark ? "var(--color-dark-800)" : "#FFFFFF"),
                            cursor: "pointer", fontFamily: "var(--font-body)", transition: "all 0.2s",
                        }}
                        >
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            <span style={{
                            flex: 1, fontSize: 15, fontWeight: 600, lineHeight: 1.4,
                            color: isOpen
                                ? (dark ? "var(--color-accent)" : "var(--color-primary)")
                                : (dark ? "var(--color-dark-200)" : "var(--color-dark-700)"),
                            }}>
                            {item.q}
                            </span>
                            <ChevronDown size={18} style={{
                            color: "var(--color-dark-400)", flexShrink: 0,
                            transform: isOpen ? "rotate(180deg)" : "rotate(0)",
                            transition: "transform 0.2s",
                            }} />
                        </div>
                        {isOpen && (
                            <p style={{
                            marginTop: 12, paddingTop: 12,
                            borderTop: `1px solid ${dark ? "var(--color-dark-700)" : "var(--color-dark-100)"}`,
                            fontSize: 14, lineHeight: 1.7,
                            color: dark ? "var(--color-dark-300)" : "var(--color-dark-500)",
                            }}>
                            {item.a}
                            </p>
                        )}
                        </button>
                    );
                    })}
                </div>
                </div>
            </FadeInSection>
            ))}

            {/* CTA contacto */}
            <FadeInSection delay={0.3}>
            <div style={{
                padding: 32, borderRadius: 16, textAlign: "center",
                backgroundColor: dark ? "var(--color-dark-800)" : "var(--color-primary-50)",
                border: `1px solid ${dark ? "var(--color-dark-700)" : "var(--color-primary-100)"}`,
            }}>
                <Mail size={28} style={{ color: "var(--color-accent)", marginBottom: 12 }} />
                <h3 style={{
                fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700,
                color: dark ? "var(--color-dark-100)" : "var(--color-primary)", marginBottom: 8,
                }}>
                ¿No encontraste tu respuesta?
                </h3>
                <p style={{
                fontSize: 15, color: dark ? "var(--color-dark-400)" : "var(--color-dark-500)",
                maxWidth: 400, margin: "0 auto 20px", lineHeight: 1.6,
                }}>
                Escríbenos y te responderemos a la brevedad.
                </p>
                <a href="mailto:congresosociologiaclinica.2026@gmail.com" style={{
                display: "inline-flex", alignItems: "center", gap: 8, height: 48, padding: "0 24px",
                backgroundColor: "var(--color-accent)", color: "#fff", fontSize: 15, fontWeight: 600,
                borderRadius: 10, textDecoration: "none",
                }}>
                <Mail size={16} /> congresosociologiaclinica.2026@gmail.com
                </a>
            </div>
            </FadeInSection>
        </div>
        </div>
    );
}