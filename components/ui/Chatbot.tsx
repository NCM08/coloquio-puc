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

// Base de conocimiento del coloquio — actualizada Operación Rastrillo 2026
const KNOWLEDGE_BASE = {
    fechas: `Las fechas clave del VIII Coloquio Internacional de Sociología Clínica 2026 son:\n\n📅 27 de marzo 2026 — Apertura de convocatorias (¡YA ABIERTA!)\n📝 8 de mayo 2026 — Cierre de recepción de ponencias\n🗓️ 20 de mayo 2026 — Plazo máximo de envío de propuestas\n✅ 8 de junio 2026 — Notificación de aceptación\n📋 8 de agosto 2026 — Publicación de la agenda final\n🎤 10, 11 y 12 de noviembre de 2026 — Coloquio\n\nEl evento se realiza en el Campus San Joaquín, Pontificia Universidad Católica de Chile (PUC), Macul, Santiago, Chile.`,
    pagos: `Los pagos se realizan mediante transferencia bancaria a través de Global66.\n\n🔒 Por motivos de seguridad, el RUT y el Número de Cuenta exactos solo se proporcionan en el Paso 3 del Formulario de Inscripción, una vez que hayas ingresado y validado tus datos personales.\n\nPolíticas importantes:\n• No existen descuentos grupales.\n• No se realizan devoluciones de dinero por cancelación.\n• No se emiten boletas oficiales. Solo se entrega un comprobante de pago válido para rendiciones institucionales.\n\nPara iniciar tu inscripción y recibir los datos bancarios, accede al Formulario de Inscripción en la sección correspondiente del sitio.\n\nPara consultas sobre pagos, escriba a: congresosociologiaclinica.2026@gmail.com`,
    propuestas: `La fase de inscripción y recepción de propuestas YA ESTÁ ABIERTA desde el 27 de marzo de 2026.\n\nEl plazo límite para envío de propuestas es el 20 de mayo de 2026.\n\nLos 4 formatos válidos para participar son:\n1. Ponencias (15 a 20 minutos)\n2. Mesas temáticas (60 a 90 minutos, 3-4 presentaciones)\n3. Posters académicos\n4. Intervenciones artísticas y muestras audiovisuales\n\nTodas las propuestas se envían de forma anónima para revisión ciega por pares. Se aceptan propuestas en español y portugués. Para más detalles, escriba a congresosociologiaclinica.2026@gmail.com`,
    ejes: `Los 8 ejes temáticos oficiales del coloquio son:\n\n1. Mutaciones civilizatorias, transformaciones del mundo del trabajo\n2. Descomposición de la escuela, la universidad y de los sistemas educativos\n3. Claves y acciones desde el feminismo\n4. Colonialidad, pueblos indígenas y afrodescendientes\n5. Nuevas tecnologías digitales: dilemas, ventajas y encrucijadas\n6. Militancias y territorios\n7. Desplazamientos, migración e interculturalidad\n8. Juventudes: entre la pulsión de vida y de muerte\n\nPara información detallada consulte a congresosociologiaclinica.2026@gmail.com`,
    ubicacion: "El coloquio se realiza los días 10, 11 y 12 de noviembre de 2026 en el Campus San Joaquín, Pontificia Universidad Católica de Chile (PUC), Av. Vicuña Mackenna 4860, Macul, Santiago, Chile. La estación de metro más cercana es San Joaquín (Línea 5).",
    certificados: "Se entrega certificado de participación y de expositor según corresponda. Los trabajos aceptados se publican en las actas oficiales del coloquio con ISBN.",
    online: "Para consultas sobre modalidad presencial u online, escriba a congresosociologiaclinica.2026@gmail.com",
    contacto: "Para cualquier consulta, escriba al comité oficial: congresosociologiaclinica.2026@gmail.com\n\nHorario de atención: lunes a viernes de 9:00 a 18:00 hrs.",
    publicaciones: "Los trabajos aceptados se publican en las actas oficiales con ISBN. Para más información escriba a congresosociologiaclinica.2026@gmail.com",
    conferencistas: "Los conferencistas confirmados incluyen a Vincent de Gaulejac (Francia, Presidente RISC), Ana María Araujo (Uruguay), Teresa Carreteiro (Brasil), Ana Correa (Argentina), Dariela Sharim (PUC Chile) y María Aparecida Penso (Brasil), entre otros.",
};

function findAnswer(question: string): string {
    const q = question.toLowerCase();

    // Saludos
    if (q.match(/hola|buenos|buenas|hey|saludos/))
        return "¡Bienvenido/a! 👋 Soy el Asistente Virtual Oficial del VIII Coloquio Internacional de Sociología Clínica (10, 11 y 12 de noviembre de 2026, Campus San Joaquín, PUC, Santiago, Chile). La fase de inscripción y recepción de propuestas YA está abierta. ¿En qué puedo ayudarle?";

    // Fechas
    if (q.match(/fecha|cuando|cuándo|calendario|plazo|deadline|apertura|convocatoria|agenda/))
        return KNOWLEDGE_BASE.fechas;

    // Pagos y política de pagos
    if (q.match(/pago|pagar|global66|global 66|banco|transferencia|cuenta|rut|tarifa|precio|costo|cuanto|cuánto|valor|descuento|grupo|boleta|factura|comprobante|devoluci|reembolso|cancel|anular/))
        return KNOWLEDGE_BASE.pagos;

    // Propuestas y ponencias
    if (q.match(/propuesta|enviar|envío|ponencia|poster|póster|mesa temática|mesa redonda|intervención|artística|modalidad|resumen|abstract|inscri|formato|participar/))
        return KNOWLEDGE_BASE.propuestas;

    // Ejes temáticos
    if (q.match(/eje|temático|tematico|tema|área|area|investigación|investigacion/))
        return KNOWLEDGE_BASE.ejes;

    // Ubicación
    if (q.match(/dónde|donde|ubicación|ubicacion|dirección|direccion|campus|llegar|metro|transporte|sede/))
        return KNOWLEDGE_BASE.ubicacion;

    // Certificados
    if (q.match(/certificado|diploma|constancia|acreditación/))
        return KNOWLEDGE_BASE.certificados;

    // Online / modalidad
    if (q.match(/online|virtual|remoto|streaming|transmisión|transmision|híbrido|hibrido|presencial/))
        return KNOWLEDGE_BASE.online;

    // Contacto
    if (q.match(/contacto|correo|email|comunicar|escribir|consulta/))
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
        return "¡Con mucho gusto! Si tiene alguna otra consulta, no dude en escribirnos. También puede contactar al comité directamente en congresosociologiaclinica.2026@gmail.com 😊";

    // Default — nunca inventar información
    return "No cuento con información específica sobre eso en este momento. Le recomiendo escribir directamente al comité organizador para obtener una respuesta precisa:\n\n📧 congresosociologiaclinica.2026@gmail.com\n\nTambién puedo ayudarle con: fechas clave, pagos y políticas, envío de propuestas, ejes temáticos o datos de contacto.";
}

function getTypingDelay() {
    return 600 + Math.random() * 800;
}

// Sugerencias rápidas — Sprint 5
const QUICK_SUGGESTIONS = [
    "📅 Ver fechas importantes",
    "💳 ¿Cómo funciona el pago?",
    "✉️ Correo de contacto",
];

export default function Chatbot() {
    const { dark } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
        role: "assistant",
        content: "¡Bienvenido/a! 👋 Soy el Asistente Virtual Oficial del VIII Coloquio Internacional de Sociología Clínica (10, 11 y 12 de noviembre de 2026 · Campus San Joaquín, PUC, Santiago, Chile). 🟢 La fase de inscripción y recepción de propuestas YA está abierta. Puedo orientarle sobre fechas, pagos, propuestas y contacto. ¿En qué puedo ayudarle?",
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
                position: "fixed", bottom: 24, right: 24, zIndex: 50,
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
                position: "fixed", bottom: 24, right: 24, zIndex: 50,
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
                title="Cerrar asistente"
                aria-label="Cerrar asistente"
                style={{
                    width: 40, height: 40, borderRadius: 10, border: "2px solid rgba(255,255,255,0.3)",
                    backgroundColor: "rgba(255,255,255,0.15)", color: "#fff",
                    cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "background-color 0.2s",
                    flexShrink: 0,
                }}
                onMouseOver={(e) => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.3)"; }}
                onMouseOut={(e) => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.15)"; }}
                >
                <X size={20} strokeWidth={2.5} />
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
                    fontSize: 14, lineHeight: 1.6, wordBreak: "break-word",
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
                bottom: 80px !important;
                right: 16px !important;
                max-height: 80vh !important;
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