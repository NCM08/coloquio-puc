// ============================================================
// components/ui/Chatbot.tsx — ASISTENTE FAQ DEL COLOQUIO
// ============================================================
// Chatbot flotante basado en preguntas frecuentes predefinidas.
// Sin llamadas a APIs externas — 100% client-side.
// ============================================================

"use client";

import { useState, useRef, useEffect } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { MessageCircle, X, Bot, User, HelpCircle } from "lucide-react";

type Message = {
    role: "user" | "assistant";
    content: string;
};

const FAQ: { question: string; answer: string }[] = [
    {
        question: "📅 ¿Cuándo y dónde es el evento?",
        answer:
            "El VIII Coloquio Internacional de Sociología Clínica y Psicosociología se realizará de forma presencial del 10 al 12 de noviembre de 2026 en el Campus San Joaquín de la Pontificia Universidad Católica de Chile (PUC), Santiago, Chile. Las actividades se desarrollarán en las facultades de Educación, Psicología y Trabajo Social.",
    },
    {
        question: "📋 ¿Cómo envío una propuesta?",
        answer:
            "Se aceptan ponencias (resumen máx. 500 palabras), mesas temáticas, posters académicos (máx. 300 palabras) e intervenciones artísticas/audiovisuales. Los archivos deben enviarse exclusivamente en formato Word (.doc o .docx) y ser estrictamente anónimos (sin metadatos de autoría). Los idiomas aceptados son Español y Portugués.",
    },
    {
        question: "🗓️ ¿Cuáles son los plazos importantes?",
        answer:
            "• Envío de propuestas: hasta el 8 de mayo de 2026.\n• Respuestas de aceptación: 8 de junio de 2026.\n• Agenda final: 8 de agosto de 2026.\n• Evento presencial: 10 al 12 de noviembre de 2026.",
    },
    {
        question: "📚 ¿Cuáles son los ejes temáticos?",
        answer:
            "El coloquio se titula \"Desintegración social en el mundo actual: acciones de resistencias y nuevos imaginarios posibles\". Convoca trabajos sobre sociología clínica, psicosociología, vínculos sociales, subjetividad, prácticas de resistencia y transformación social desde perspectivas críticas e interdisciplinarias.",
    },
    {
        question: "📬 ¿Cómo puedo contactarlos?",
        answer:
            "Puedes comunicarte con el equipo organizador a través de:\n• Correo: coloquio.sociologia.puc@gmail.com\n• Instagram: @coloquiosociologia_puc\n\nPara alojamiento, se recomiendan las zonas de Providencia y Ñuñoa, con conexión directa a la Línea 5 del Metro.",
    },
];

export default function Chatbot() {
    const { dark } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            role: "assistant",
            content:
                "¡Hola! Soy el asistente virtual del Coloquio. Selecciona una pregunta frecuente para obtener información instantánea.",
        },
    ]);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleQuestion = (faq: { question: string; answer: string }) => {
        setMessages(prev => [
            ...prev,
            { role: "user", content: faq.question },
            { role: "assistant", content: faq.answer },
        ]);
    };

    // ── Brand tokens ──────────────────────────────────────────
    const headerBg = dark
        ? "linear-gradient(135deg, #003350 0%, #005a8a 100%)"
        : "linear-gradient(135deg, #00adfc 0%, #008fd4 100%)";

    const panelBg = dark ? "#121212" : "#FFFFFF";
    const panelBorder = dark ? "rgba(0,173,252,0.15)" : "rgba(0,173,252,0.2)";
    const panelShadow = dark
        ? "0 16px 56px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,173,252,0.12)"
        : "0 16px 56px rgba(0,173,252,0.18), 0 0 0 1px rgba(0,173,252,0.12)";

    const msgAreaBg = dark ? "#1a1a1a" : "#f7fbff";
    const botBubbleBg = dark ? "#212121" : "#e8f6ff";
    const botBubbleColor = dark ? "#e0e0e0" : "#1a3a4a";
    const userBubbleBg = "#00adfc";
    const userBubbleColor = "#ffffff";

    const botIconBg = dark ? "rgba(0,173,252,0.15)" : "rgba(0,173,252,0.12)";
    const botIconColor = "#00adfc";
    const userIconBg = "#00adfc";

    const footerBorder = dark ? "rgba(0,173,252,0.1)" : "rgba(0,173,252,0.12)";

    const chipBg = dark ? "#1e1e1e" : "#f0f9ff";
    const chipBorder = dark ? "rgba(0,173,252,0.25)" : "rgba(0,173,252,0.3)";
    const chipColor = dark ? "#b0d8f5" : "#005a8a";

    const fabBg = "linear-gradient(135deg, #00adfc 0%, #008fd4 100%)";
    const fabShadow = "0 4px 20px rgba(0,173,252,0.45)";

    return (
        <>
        {/* ====== BOTÓN FLOTANTE ====== */}
        {!isOpen && (
            <button
            onClick={() => setIsOpen(true)}
            className="chatbot-fab"
            aria-label="Abrir asistente virtual"
            style={{
                position: "fixed", bottom: 24, right: 24, zIndex: 50,
                width: 60, height: 60, borderRadius: "50%", border: "none",
                background: fabBg,
                color: "#fff", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: fabShadow,
                transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseOver={e => {
                e.currentTarget.style.transform = "scale(1.08)";
                e.currentTarget.style.boxShadow = "0 6px 28px rgba(0,173,252,0.6)";
            }}
            onMouseOut={e => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = fabShadow;
            }}
            >
            <MessageCircle size={26} />
            </button>
        )}

        {/* ====== PANEL DEL CHAT ====== */}
        {isOpen && (
            <div
            className="chatbot-panel"
            style={{
                position: "fixed", bottom: 24, right: 24, zIndex: 50,
                width: 380, maxHeight: "72vh",
                borderRadius: 20, overflow: "hidden",
                border: `1px solid ${panelBorder}`,
                backgroundColor: panelBg,
                boxShadow: panelShadow,
                display: "flex", flexDirection: "column",
            }}
            >
            {/* ── Header ── */}
            <div style={{
                padding: "14px 16px",
                display: "flex", alignItems: "center", gap: 10,
                background: headerBg,
                color: "#fff",
                flexShrink: 0,
            }}>
                <div style={{
                width: 36, height: 36, borderRadius: 10,
                backgroundColor: "rgba(255,255,255,0.15)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
                }}>
                <HelpCircle size={17} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 14, fontWeight: 700, margin: 0, lineHeight: 1.2 }}>
                    Asistente del Coloquio
                </p>
                <p style={{ fontSize: 11, opacity: 0.75, margin: 0, lineHeight: 1.3 }}>
                    Preguntas frecuentes · VIII Coloquio PUC 2026
                </p>
                </div>
                <button
                onClick={() => setIsOpen(false)}
                title="Cerrar asistente"
                aria-label="Cerrar asistente"
                style={{
                    width: 34, height: 34, borderRadius: 8,
                    border: "1.5px solid rgba(255,255,255,0.3)",
                    backgroundColor: "rgba(255,255,255,0.12)",
                    color: "#fff", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, transition: "background-color 0.2s",
                }}
                onMouseOver={e => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.28)"; }}
                onMouseOut={e => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.12)"; }}
                >
                <X size={18} strokeWidth={2.5} />
                </button>
            </div>

            {/* ── Mensajes ── */}
            <div style={{
                flex: 1, overflowY: "auto", padding: "14px 14px 8px",
                display: "flex", flexDirection: "column", gap: 10,
                backgroundColor: msgAreaBg,
            }}>
                {messages.map((msg, index) => (
                <div key={index} style={{
                    display: "flex", gap: 8,
                    justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                    alignItems: "flex-end",
                }}>
                    {msg.role === "assistant" && (
                    <div style={{
                        width: 26, height: 26, borderRadius: 8, flexShrink: 0,
                        backgroundColor: botIconBg,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        marginBottom: 2,
                    }}>
                        <Bot size={13} style={{ color: botIconColor }} />
                    </div>
                    )}
                    <div style={{
                    maxWidth: "78%", padding: "9px 13px", borderRadius: 14,
                    fontSize: 13.5, lineHeight: 1.6, wordBreak: "break-word",
                    whiteSpace: "pre-wrap",
                    backgroundColor: msg.role === "user" ? userBubbleBg : botBubbleBg,
                    color: msg.role === "user" ? userBubbleColor : botBubbleColor,
                    borderBottomRightRadius: msg.role === "user" ? 4 : 14,
                    borderBottomLeftRadius: msg.role === "assistant" ? 4 : 14,
                    boxShadow: msg.role === "user"
                        ? "0 2px 8px rgba(0,173,252,0.25)"
                        : "0 1px 4px rgba(0,0,0,0.06)",
                    }}>
                    {msg.content}
                    </div>
                    {msg.role === "user" && (
                    <div style={{
                        width: 26, height: 26, borderRadius: 8, flexShrink: 0,
                        backgroundColor: userIconBg,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        marginBottom: 2,
                    }}>
                        <User size={13} style={{ color: "#fff" }} />
                    </div>
                    )}
                </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* ── Menú de preguntas frecuentes ── */}
            <div style={{
                padding: "10px 12px",
                borderTop: `1px solid ${footerBorder}`,
                display: "flex", flexDirection: "column", gap: 6,
                backgroundColor: panelBg,
                flexShrink: 0,
            }}>
                <p style={{
                    fontSize: 11, fontWeight: 600, margin: "0 0 2px",
                    color: dark ? "#616161" : "#9e9e9e",
                    textTransform: "uppercase", letterSpacing: "0.05em",
                }}>
                    Preguntas frecuentes
                </p>
                {FAQ.map((faq) => (
                <button
                    key={faq.question}
                    onClick={() => handleQuestion(faq)}
                    style={{
                    width: "100%", textAlign: "left",
                    padding: "8px 12px", borderRadius: 10,
                    border: `1px solid ${chipBorder}`,
                    backgroundColor: chipBg,
                    color: chipColor,
                    fontSize: 12.5, fontWeight: 500,
                    fontFamily: "var(--font-body)", cursor: "pointer",
                    transition: "all 0.18s",
                    }}
                    onMouseOver={e => {
                    e.currentTarget.style.borderColor = "#00adfc";
                    e.currentTarget.style.backgroundColor = "rgba(0,173,252,0.1)";
                    e.currentTarget.style.color = dark ? "#5fd4ff" : "#004f7a";
                    }}
                    onMouseOut={e => {
                    e.currentTarget.style.borderColor = chipBorder;
                    e.currentTarget.style.backgroundColor = chipBg;
                    e.currentTarget.style.color = chipColor;
                    }}
                >
                    {faq.question}
                </button>
                ))}
            </div>
            </div>
        )}

        <style>{`
            @media (max-width: 480px) {
                .chatbot-panel {
                    width: calc(100vw - 32px) !important;
                    bottom: 80px !important;
                    right: 16px !important;
                    max-height: 82vh !important;
                }
                .chatbot-fab {
                    bottom: 80px !important;
                    right: 16px !important;
                }
            }
        `}</style>
        </>
    );
}
