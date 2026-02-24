// ============================================================
// components/ui/Chatbot.tsx — ASISTENTE IA DEL COLOQUIO
// ============================================================
//
// Chatbot flotante que responde preguntas sobre el coloquio.
// Usa un sistema de respuestas basado en keywords para funcionar
// sin API externa (ideal para el prototipo).
// En producción se conectaría a la API de Claude.
// ============================================================

"use client";

import { useState, useRef, useEffect } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { MessageCircle, X, Send, Bot, User, Sparkles } from "lucide-react";

type Message = {
    role: "user" | "assistant";
    content: string;
};

// Base de conocimiento del coloquio
const KNOWLEDGE_BASE = {
    fechas: "El Coloquio de Educación y Pedagogía se realizará del 15 al 17 de octubre de 2026 en el Campus San Joaquín de la PUC. La convocatoria abre el 1 de junio, el cierre de propuestas es el 15 de agosto, las notificaciones de aceptación se envían el 15 de septiembre, y las inscripciones cierran el 1 de octubre de 2026.",
    inscripcion: "Hay tres tipos de inscripción: Expositor ($50.000 CLP / USD $65), Asistente ($30.000 CLP / USD $40), y Estudiante ($15.000 CLP / USD $20). Hay tarifa preferencial hasta el 30 de septiembre. Para grupos de 5+ personas de la misma institución hay 15% de descuento. Contactar a coloquio@uc.cl.",
    propuestas: "Se aceptan propuestas en 4 modalidades: Ponencia individual (20 min, resumen mín. 500 palabras), Simposio temático (90 min, 3-4 presentaciones), Póster (resumen mín. 300 palabras), y Mesa redonda (60 min, 3-5 panelistas). Las propuestas deben enviarse de forma anónima (revisión ciega por pares) en español o portugués.",
    ejes: "Los 8 ejes temáticos son: 1) Políticas educativas y reforma curricular, 2) Neurociencia y aprendizaje, 3) Internacionalización de la educación, 4) Inclusión y diversidad en el aula, 5) Ética y formación ciudadana, 6) Tecnología y educación digital, 7) Educación y sostenibilidad, 8) Formación docente e identidad profesional.",
    ubicacion: "El coloquio se realiza en el Campus San Joaquín de la PUC, Av. Vicuña Mackenna 4860, Macul, Santiago, Chile. La estación de metro más cercana es San Joaquín (Línea 5), a 5 minutos caminando. Hay estacionamiento disponible ($2.000 CLP/día).",
    certificados: "Se entrega certificado de asistencia a todos los participantes inscritos y certificado de expositor a quienes presenten ponencias o pósters. Los trabajos aceptados se publican en las actas oficiales del coloquio con ISBN.",
    online: "El coloquio es presencial + online. Las conferencias magistrales y mesas redondas se transmiten en vivo. Los asistentes online reciben un link de acceso previo al evento.",
    cancelacion: "Devolución del 100% hasta 30 días antes del evento, 50% hasta 15 días antes. Después no hay devoluciones, pero se puede transferir la inscripción a otra persona.",
    contacto: "Para consultas escribir a coloquio@uc.cl o llamar al +56 2 2354 0000. El coloquio es organizado por la Facultad de Educación de la Pontificia Universidad Católica de Chile.",
    publicaciones: "Los trabajos aceptados se publican en las actas oficiales con ISBN. Los mejores trabajos son invitados a enviar versiones extendidas para publicación en revistas académicas indexadas. Las actas se publican aproximadamente 3 meses después del evento.",
    conferencistas: "Los conferencistas magistrales confirmados son: Dra. María González (U. de Chile, Políticas Educativas), Dr. Carlos Mendoza (UBA, Neurociencia Educativa), y Dra. Ana Beatriz Silva (USP, Inclusión Educativa). Además participan 12 panelistas invitados de Chile, Argentina, Brasil, México, Colombia y Uruguay.",
};

function findAnswer(question: string): string {
    const q = question.toLowerCase();

    // Saludos
    if (q.match(/hola|buenos|buenas|hey|saludos/))
        return "¡Hola! 👋 Soy el asistente virtual del Coloquio de Educación y Pedagogía PUC 2026. ¿En qué puedo ayudarte? Puedo responder sobre fechas, inscripciones, envío de propuestas, ejes temáticos, conferencistas y más.";

    // Fechas
    if (q.match(/fecha|cuando|cuándo|calendario|plazo|deadline/))
        return KNOWLEDGE_BASE.fechas;

    // Inscripción y precios
    if (q.match(/inscri|precio|costo|cuanto|cuánto|valor|pago|pagar|tarifa|descuento|grupo/))
        return KNOWLEDGE_BASE.inscripcion;

    // Propuestas
    if (q.match(/propuesta|enviar|envío|ponencia|poster|póster|simposio|mesa redonda|modalidad|resumen|abstract/))
        return KNOWLEDGE_BASE.propuestas;

    // Ejes temáticos
    if (q.match(/eje|temático|tematico|tema|área|area|investigación|investigacion/))
        return KNOWLEDGE_BASE.ejes;

    // Ubicación
    if (q.match(/dónde|donde|ubicación|ubicacion|dirección|direccion|campus|llegar|metro|transporte|estacionamiento/))
        return KNOWLEDGE_BASE.ubicacion;

    // Certificados
    if (q.match(/certificado|diploma|constancia|acreditación/))
        return KNOWLEDGE_BASE.certificados;

    // Online
    if (q.match(/online|virtual|remoto|streaming|transmisión|transmision|híbrido|hibrido/))
        return KNOWLEDGE_BASE.online;

    // Cancelación
    if (q.match(/cancel|devoluci|reembolso|anular/))
        return KNOWLEDGE_BASE.cancelacion;

    // Contacto
    if (q.match(/contacto|correo|email|teléfono|telefono|comunicar/))
        return KNOWLEDGE_BASE.contacto;

    // Publicaciones
    if (q.match(/publicaci|actas|revista|isbn|indexad/))
        return KNOWLEDGE_BASE.publicaciones;

    // Conferencistas
    if (q.match(/conferencista|expositor|speaker|keynote|magistral|invitado|panelista/))
        return KNOWLEDGE_BASE.conferencistas;

    // Idiomas
    if (q.match(/idioma|lengua|inglés|ingles|portugués|portugues|español/))
        return "Se aceptan propuestas en español y portugués. Las presentaciones durante el coloquio pueden realizarse en cualquiera de estos idiomas.";

    // Gracias
    if (q.match(/gracias|thank|agradec/))
        return "¡De nada! Si tienes más preguntas sobre el coloquio, no dudes en consultarme. También puedes escribir a coloquio@uc.cl para consultas más específicas. 😊";

    // Default
    return "No tengo información específica sobre eso, pero puedo ayudarte con: fechas del coloquio, inscripciones y precios, envío de propuestas, ejes temáticos, conferencistas, ubicación, certificados, y modalidad online. ¿Sobre cuál de estos temas te gustaría saber?";
}

function getTypingDelay() {
    return 600 + Math.random() * 800;
}

// Sugerencias rápidas
const QUICK_SUGGESTIONS = [
    "¿Cuáles son las fechas?",
    "¿Cuánto cuesta inscribirse?",
    "¿Cómo envío una propuesta?",
    "¿Dónde se realiza?",
];

export default function Chatbot() {
    const { dark } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
        role: "assistant",
        content: "¡Hola! 👋 Soy el asistente virtual del Coloquio de Educación y Pedagogía PUC 2026. ¿En qué puedo ayudarte?",
        },
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = (text: string) => {
        if (!text.trim()) return;

        const userMsg: Message = { role: "user", content: text.trim() };
        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setIsTyping(true);

        // Simular delay de "pensando"
        const delay = getTypingDelay();
        setTimeout(() => {
        const answer = findAnswer(text);
        setMessages(prev => [...prev, { role: "assistant", content: answer }]);
        setIsTyping(false);
        }, delay);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage(input);
        }
    };

    return (
        <>
        {/* ====== BOTÓN FLOTANTE ====== */}
        {!isOpen && (
            <button
            onClick={() => setIsOpen(true)}
            className="chatbot-fab"
            style={{
                position: "fixed", bottom: 24, right: 24, zIndex: 100,
                width: 60, height: 60, borderRadius: "50%", border: "none",
                background: "linear-gradient(135deg, var(--color-accent), var(--color-accent-600))",
                color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 4px 20px rgba(212,168,67,0.4)",
                transition: "all 0.3s",
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
                position: "fixed", bottom: 24, right: 24, zIndex: 100,
                width: 380, maxHeight: "70vh",
                borderRadius: 20, overflow: "hidden",
                border: `1px solid ${dark ? "var(--color-dark-700)" : "var(--color-dark-100)"}`,
                backgroundColor: dark ? "var(--color-dark-900)" : "#FFFFFF",
                boxShadow: dark ? "0 12px 48px rgba(0,0,0,0.5)" : "0 12px 48px rgba(0,0,0,0.15)",
                display: "flex", flexDirection: "column",
            }}
            >
            {/* Header */}
            <div style={{
                padding: "16px 20px", display: "flex", alignItems: "center", gap: 12,
                background: dark
                ? "linear-gradient(135deg, var(--color-dark-800), var(--color-dark-700))"
                : "linear-gradient(135deg, var(--color-primary), var(--color-primary-600))",
                color: "#fff",
            }}>
                <div style={{
                width: 36, height: 36, borderRadius: 10,
                backgroundColor: "rgba(255,255,255,0.15)",
                display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                <Sparkles size={18} />
                </div>
                <div style={{ flex: 1 }}>
                <p style={{ fontSize: 15, fontWeight: 700 }}>Asistente del Coloquio</p>
                <p style={{ fontSize: 11, opacity: 0.7 }}>Powered by IA · Responde al instante</p>
                </div>
                <button
                onClick={() => setIsOpen(false)}
                style={{
                    width: 32, height: 32, borderRadius: 8, border: "none",
                    backgroundColor: "rgba(255,255,255,0.1)", color: "#fff",
                    cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                }}
                >
                <X size={16} />
                </button>
            </div>

            {/* Messages */}
            <div style={{
                flex: 1, overflowY: "auto", padding: 16,
                display: "flex", flexDirection: "column", gap: 12,
                maxHeight: "45vh",
            }}>
                {messages.map((msg, index) => (
                <div key={index} style={{
                    display: "flex", gap: 8,
                    justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                }}>
                    {msg.role === "assistant" && (
                    <div style={{
                        width: 28, height: 28, borderRadius: 8, flexShrink: 0,
                        backgroundColor: dark ? "rgba(212,168,67,0.15)" : "var(--color-primary-50)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                        <Bot size={14} style={{ color: dark ? "var(--color-accent)" : "var(--color-primary)" }} />
                    </div>
                    )}
                    <div style={{
                    maxWidth: "80%", padding: "10px 14px", borderRadius: 14,
                    fontSize: 14, lineHeight: 1.6,
                    backgroundColor: msg.role === "user"
                        ? "var(--color-accent)"
                        : dark ? "var(--color-dark-800)" : "var(--color-dark-50)",
                    color: msg.role === "user"
                        ? "#fff"
                        : dark ? "var(--color-dark-200)" : "var(--color-dark-600)",
                    borderBottomRightRadius: msg.role === "user" ? 4 : 14,
                    borderBottomLeftRadius: msg.role === "assistant" ? 4 : 14,
                    }}>
                    {msg.content}
                    </div>
                    {msg.role === "user" && (
                    <div style={{
                        width: 28, height: 28, borderRadius: 8, flexShrink: 0,
                        backgroundColor: "var(--color-accent)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                        <User size={14} style={{ color: "#fff" }} />
                    </div>
                    )}
                </div>
                ))}

                {/* Typing indicator */}
                {isTyping && (
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <div style={{
                    width: 28, height: 28, borderRadius: 8,
                    backgroundColor: dark ? "rgba(212,168,67,0.15)" : "var(--color-primary-50)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                    <Bot size={14} style={{ color: dark ? "var(--color-accent)" : "var(--color-primary)" }} />
                    </div>
                    <div style={{
                    padding: "10px 14px", borderRadius: 14, borderBottomLeftRadius: 4,
                    backgroundColor: dark ? "var(--color-dark-800)" : "var(--color-dark-50)",
                    fontSize: 14, color: dark ? "var(--color-dark-400)" : "var(--color-dark-400)",
                    }}>
                    Escribiendo...
                    </div>
                </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Quick suggestions (solo si hay pocos mensajes) */}
            {messages.length <= 2 && (
                <div style={{
                padding: "0 16px 8px", display: "flex", gap: 6, flexWrap: "wrap",
                }}>
                {QUICK_SUGGESTIONS.map((suggestion) => (
                    <button
                    key={suggestion}
                    onClick={() => sendMessage(suggestion)}
                    style={{
                        padding: "6px 12px", borderRadius: 20, fontSize: 12, fontWeight: 500,
                        fontFamily: "var(--font-body)", cursor: "pointer",
                        border: `1px solid ${dark ? "var(--color-dark-700)" : "var(--color-dark-100)"}`,
                        backgroundColor: "transparent",
                        color: dark ? "var(--color-dark-300)" : "var(--color-dark-500)",
                        transition: "all 0.2s",
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.borderColor = dark ? "var(--color-accent)" : "var(--color-primary)";
                        e.currentTarget.style.color = dark ? "var(--color-accent)" : "var(--color-primary)";
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.borderColor = dark ? "var(--color-dark-700)" : "var(--color-dark-100)";
                        e.currentTarget.style.color = dark ? "var(--color-dark-300)" : "var(--color-dark-500)";
                    }}
                    >
                    {suggestion}
                    </button>
                ))}
                </div>
            )}

            {/* Input */}
            <div style={{
                padding: 12, borderTop: `1px solid ${dark ? "var(--color-dark-700)" : "var(--color-dark-100)"}`,
                display: "flex", gap: 8, alignItems: "center",
            }}>
                <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Escribe tu pregunta..."
                style={{
                    flex: 1, height: 42, padding: "0 14px", borderRadius: 10,
                    border: `1px solid ${dark ? "var(--color-dark-700)" : "var(--color-dark-100)"}`,
                    backgroundColor: dark ? "var(--color-dark-800)" : "var(--color-dark-50)",
                    color: dark ? "var(--color-dark-100)" : "var(--color-dark-700)",
                    fontSize: 14, fontFamily: "var(--font-body)", outline: "none",
                }}
                />
                <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || isTyping}
                style={{
                    width: 42, height: 42, borderRadius: 10, border: "none",
                    backgroundColor: input.trim() ? "var(--color-accent)" : (dark ? "var(--color-dark-700)" : "var(--color-dark-100)"),
                    color: input.trim() ? "#fff" : (dark ? "var(--color-dark-500)" : "var(--color-dark-400)"),
                    cursor: input.trim() ? "pointer" : "default",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "all 0.2s",
                }}
                >
                <Send size={16} />
                </button>
            </div>
            </div>
        )}

        {/* Responsive */}
        <style>{`
            @media (max-width: 480px) {
            .chatbot-panel {
                width: calc(100vw - 32px) !important;
                bottom: 16px !important;
                right: 16px !important;
                max-height: 80vh !important;
            }
            .chatbot-fab {
                bottom: 16px !important;
                right: 16px !important;
            }
            }
        `}</style>
        </>
    );
}