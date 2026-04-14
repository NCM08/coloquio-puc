// ============================================================
// components/ui/Chatbot.tsx — ASISTENTE IA DEL COLOQUIO
// ============================================================
// Chatbot flotante impulsado por Claude (Anthropic).
// Conectado a /api/chat con system prompt estricto del Coloquio.
// ============================================================

"use client";

import { useState, useRef, useEffect } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { MessageCircle, X, Send, Bot, User, Sparkles } from "lucide-react";

type Message = {
    role: "user" | "assistant";
    content: string;
};

const QUICK_SUGGESTIONS = [
    "📅 Fechas importantes",
    "📋 Envío de propuestas",
    "📍 Ubicación y contacto",
];

export default function Chatbot() {
    const { dark } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            role: "assistant",
            content: "¡Hola! Soy el asistente virtual del Coloquio. ¿En qué te puedo ayudar hoy?",
        },
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isLoading]);

    const sendMessage = async (text: string) => {
        if (!text.trim() || isLoading) return;

        const userMsg: Message = { role: "user", content: text.trim() };
        const updatedMessages = [...messages, userMsg];
        setMessages(updatedMessages);
        setInput("");
        setIsLoading(true);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: updatedMessages }),
            });

            const data = await res.json();

            if (!res.ok || data.error) {
                throw new Error(data.error || "Error en la respuesta");
            }

            setMessages(prev => [...prev, { role: "assistant", content: data.content }]);
        } catch {
            setMessages(prev => [
                ...prev,
                {
                    role: "assistant",
                    content:
                        "Lo siento, no pude procesar tu consulta en este momento. Por favor intenta de nuevo o escríbenos directamente a coloquio.sociologia.puc@gmail.com",
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage(input);
        }
    };

    // ── Brand tokens ──────────────────────────────────────────
    // Primary: Celeste UC #00adfc | Accent: Verde lima #5fba24
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

    const inputBg = dark ? "#212121" : "#f0f9ff";
    const inputBorder = dark ? "rgba(0,173,252,0.2)" : "rgba(0,173,252,0.25)";
    const inputColor = dark ? "#e0e0e0" : "#1a3a4a";
    const footerBorder = dark ? "rgba(0,173,252,0.1)" : "rgba(0,173,252,0.12)";

    const chipBorder = dark ? "rgba(0,173,252,0.2)" : "rgba(0,173,252,0.25)";
    const chipColor = dark ? "#9E9E9E" : "#616161";

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
                <Sparkles size={17} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 14, fontWeight: 700, margin: 0, lineHeight: 1.2 }}>
                    Asistente del Coloquio
                </p>
                <p style={{ fontSize: 11, opacity: 0.75, margin: 0, lineHeight: 1.3 }}>
                    Impulsado por IA · VIII Coloquio PUC 2026
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

                {/* Indicador de carga */}
                {isLoading && (
                <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
                    <div style={{
                    width: 26, height: 26, borderRadius: 8,
                    backgroundColor: botIconBg,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                    <Bot size={13} style={{ color: botIconColor }} />
                    </div>
                    <div style={{
                    padding: "9px 14px", borderRadius: 14, borderBottomLeftRadius: 4,
                    backgroundColor: botBubbleBg,
                    fontSize: 13.5, color: botBubbleColor, display: "flex", gap: 4, alignItems: "center",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                    }}>
                    <span style={{ animation: "dot-bounce 1.2s infinite 0s" }}>●</span>
                    <span style={{ animation: "dot-bounce 1.2s infinite 0.2s" }}>●</span>
                    <span style={{ animation: "dot-bounce 1.2s infinite 0.4s" }}>●</span>
                    </div>
                </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* ── Sugerencias rápidas ── */}
            {messages.length <= 2 && !isLoading && (
                <div style={{
                padding: "6px 14px 4px",
                display: "flex", gap: 6, flexWrap: "wrap",
                backgroundColor: msgAreaBg,
                borderTop: `1px solid ${footerBorder}`,
                }}>
                {QUICK_SUGGESTIONS.map((s) => (
                    <button
                    key={s}
                    onClick={() => sendMessage(s)}
                    style={{
                        padding: "5px 11px", borderRadius: 20, fontSize: 11.5, fontWeight: 500,
                        fontFamily: "var(--font-body)", cursor: "pointer",
                        border: `1px solid ${chipBorder}`,
                        backgroundColor: "transparent",
                        color: chipColor,
                        transition: "all 0.18s",
                    }}
                    onMouseOver={e => {
                        e.currentTarget.style.borderColor = "#00adfc";
                        e.currentTarget.style.color = "#00adfc";
                        e.currentTarget.style.backgroundColor = "rgba(0,173,252,0.07)";
                    }}
                    onMouseOut={e => {
                        e.currentTarget.style.borderColor = chipBorder;
                        e.currentTarget.style.color = chipColor;
                        e.currentTarget.style.backgroundColor = "transparent";
                    }}
                    >
                    {s}
                    </button>
                ))}
                </div>
            )}

            {/* ── Input ── */}
            <div style={{
                padding: "10px 12px",
                borderTop: `1px solid ${footerBorder}`,
                display: "flex", gap: 8, alignItems: "center",
                backgroundColor: panelBg,
                flexShrink: 0,
            }}>
                <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Escribe tu pregunta..."
                disabled={isLoading}
                style={{
                    flex: 1, height: 40, padding: "0 13px", borderRadius: 10,
                    border: `1.5px solid ${inputBorder}`,
                    backgroundColor: inputBg,
                    color: inputColor,
                    fontSize: 13.5, fontFamily: "var(--font-body)", outline: "none",
                    transition: "border-color 0.2s",
                }}
                onFocus={e => { e.currentTarget.style.borderColor = "#00adfc"; }}
                onBlur={e => { e.currentTarget.style.borderColor = inputBorder; }}
                />
                <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || isLoading}
                style={{
                    width: 40, height: 40, borderRadius: 10, border: "none",
                    backgroundColor: input.trim() && !isLoading
                    ? "#00adfc"
                    : dark ? "#303030" : "#E0E0E0",
                    color: input.trim() && !isLoading
                    ? "#fff"
                    : dark ? "#616161" : "#9E9E9E",
                    cursor: input.trim() && !isLoading ? "pointer" : "default",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "all 0.2s", flexShrink: 0,
                    boxShadow: input.trim() && !isLoading ? "0 2px 8px rgba(0,173,252,0.35)" : "none",
                }}
                >
                <Send size={16} />
                </button>
            </div>
            </div>
        )}

        <style>{`
            @keyframes dot-bounce {
                0%, 80%, 100% { opacity: 0.25; transform: scale(0.8); }
                40% { opacity: 1; transform: scale(1); }
            }
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
