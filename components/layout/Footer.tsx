// ============================================================
// components/layout/Footer.tsx — FOOTER COMPLETO
// ============================================================
//
// DIFERENCIA VS SITIO ORIGINAL:
// El original repite logos de colaboradores en el footer
// de cada página, consumiendo espacio excesivo.
// Nosotros hacemos un footer compacto con info esencial:
// contacto, links rápidos, redes sociales.
// ============================================================

"use client";

import { useTheme } from "@/components/ThemeProvider";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";

const LOGOS_ORGANIZA = [
    { src: "/images/risc-logo.png", alt: "RISC – Réseau International de Sociologie Clinique", height: 90 },
    { src: "/images/nodo-sur-logo.png", alt: "Nodo Sur RISC", height: 90 },
];

const QUICK_LINKS = [
    { label: "Convocatoria", href: "/convocatoria" },
    { label: "Envío de propuestas", href: "/envio-propuestas" },
    { label: "Inscripciones", href: "/inscripciones" },
    { label: "Programa", href: "/programa" },
    { label: "Conferencistas", href: "/conferencistas" },
    { label: "Equipo", href: "/equipo" },
];

const RESOURCES = [
    { label: "Actas y publicaciones", href: "/actas" },
    { label: "Ediciones anteriores", href: "/ediciones-anteriores" },
    { label: "Preguntas frecuentes", href: "/preguntas-frecuentes" },
    { label: "Política de privacidad", href: "/privacidad" },
];

export default function Footer() {
    const { dark } = useTheme();

    const linkStyle = {
        fontSize: 14,
        color: dark ? "var(--color-dark-400)" : "var(--color-dark-500)",
        textDecoration: "none" as const,
        display: "block" as const,
        padding: "4px 0",
        transition: "color 0.2s",
    };

    return (
        <footer
        style={{
            padding: "64px 24px 32px",
            backgroundColor: dark ? "var(--color-dark-900)" : "var(--color-primary-900)",
            color: "#FFFFFF",
            borderTop: `1px solid ${dark ? "var(--color-dark-700)" : "rgba(255,255,255,0.1)"}`,
        }}
        >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>

            {/* ====== BANDA ORGANIZA ====== */}
            <div style={{
                marginBottom: 48,
                paddingBottom: 48,
                borderBottom: "1px solid rgba(255,255,255,0.08)",
                textAlign: "center",
            }}>
                <p style={{
                    fontSize: 11,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: 3,
                    color: "rgba(255,255,255,0.35)",
                    marginBottom: 28,
                }}>
                    Organiza
                </p>
                <div style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 56,
                    flexWrap: "wrap",
                    backgroundColor: "#ffffff",
                    borderRadius: 20,
                    padding: "28px 56px",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.25)",
                }}>
                    {LOGOS_ORGANIZA.map((logo) => (
                        <Image
                            key={logo.alt}
                            src={logo.src}
                            alt={logo.alt}
                            width={200}
                            height={logo.height}
                            style={{ objectFit: "contain", height: logo.height, width: "auto" }}
                        />
                    ))}
                </div>
            </div>

            {/* Grid principal */}
            <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: 48,
                marginBottom: 48,
            }}
            >
            {/* Columna 1: Sobre */}
            <div>
                {/* Logo */}
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <div
                    style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    backgroundColor: "var(--color-vibrant-cyan)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-display)",
                    fontWeight: 800,
                    fontSize: 15,
                    color: "#fff",
                    flexShrink: 0,
                    }}
                >
                    SC
                </div>
                <div>
                    <p style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: 15,
                    }}>
                    Coloquio Sociología Clínica 2026
                    </p>
                    <p style={{
                    fontSize: 11,
                    opacity: 0.5,
                    textTransform: "uppercase",
                    letterSpacing: 1,
                    }}>
                    VIII Edición Internacional
                    </p>
                </div>
                </div>

                <p style={{
                fontSize: 14,
                lineHeight: 1.7,
                opacity: 0.6,
                maxWidth: 280,
                marginBottom: 20,
                }}>
                Un espacio transdisciplinar que articula sociología,
                psicoanálisis y psicosociología para comprender los
                vínculos entre lo social y lo subjetivo.
                </p>

                {/* Contacto */}
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, opacity: 0.6 }}>
                    <Mail size={14} />
                    <span>coloquio@uc.cl</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, opacity: 0.6 }}>
                    <Phone size={14} />
                    <span>+56 2 2354 0000</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, opacity: 0.6 }}>
                    <MapPin size={14} />
                    <span>Campus San Joaquín, Santiago</span>
                </div>
                </div>
            </div>

            {/* Columna 2: Links rápidos */}
            <div>
                <h4 style={{
                fontSize: 14,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: 1,
                marginBottom: 16,
                opacity: 0.5,
                fontFamily: "var(--font-body)",
                color: "#FFFFFF",
                }}>
                Navegación
                </h4>
                {QUICK_LINKS.map((link) => (
                <Link
                    key={link.label}
                    href={link.href}
                    style={linkStyle}
                    onMouseOver={(e) => { e.currentTarget.style.color = "var(--color-accent)"; }}
                    onMouseOut={(e) => { e.currentTarget.style.color = dark ? "var(--color-dark-400)" : "rgba(255,255,255,0.5)"; }}
                >
                    {link.label}
                </Link>
                ))}
            </div>

            {/* Columna 3: Recursos */}
            <div>
                <h4 style={{
                fontSize: 14,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: 1,
                marginBottom: 16,
                opacity: 0.5,
                fontFamily: "var(--font-body)",
                color: "#FFFFFF",
                }}>
                Recursos
                </h4>
                {RESOURCES.map((link) => (
                <Link
                    key={link.label}
                    href={link.href}
                    style={linkStyle}
                    onMouseOver={(e) => { e.currentTarget.style.color = "var(--color-accent)"; }}
                    onMouseOut={(e) => { e.currentTarget.style.color = dark ? "var(--color-dark-400)" : "rgba(255,255,255,0.5)"; }}
                >
                    {link.label}
                </Link>
                ))}
            </div>

            {/* Columna 4: Redes sociales / Newsletter */}
            <div>
                <h4 style={{
                fontSize: 14,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: 1,
                marginBottom: 16,
                opacity: 0.5,
                fontFamily: "var(--font-body)",
                color: "#FFFFFF",
                }}>
                Mantente informado
                </h4>
                <p style={{
                fontSize: 14,
                lineHeight: 1.6,
                opacity: 0.5,
                marginBottom: 16,
                }}>
                Suscríbete para recibir novedades sobre el coloquio.
                </p>

                {/* Email input + botón */}
                <div style={{ display: "flex", gap: 8 }}>
                <input
                    type="email"
                    placeholder="correo@ejemplo.com"
                    style={{
                    flex: 1,
                    height: 40,
                    padding: "0 12px",
                    borderRadius: 8,
                    border: "1px solid rgba(255,255,255,0.15)",
                    backgroundColor: "rgba(255,255,255,0.05)",
                    color: "#fff",
                    fontSize: 14,
                    fontFamily: "var(--font-body)",
                    outline: "none",
                    }}
                />
                <button
                    style={{
                    height: 40,
                    padding: "0 16px",
                    borderRadius: 8,
                    border: "none",
                    backgroundColor: "var(--color-accent)",
                    color: "#fff",
                    fontSize: 13,
                    fontWeight: 600,
                    fontFamily: "var(--font-body)",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    }}
                >
                    Enviar
                </button>
                </div>
            </div>
            </div>

            {/* Separador */}
            <div
            style={{
                height: 1,
                backgroundColor: "rgba(255,255,255,0.08)",
                marginBottom: 24,
            }}
            />

            {/* Copyright */}
            <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 12,
            }}
            >
            <p style={{ fontSize: 13, opacity: 0.4 }}>
                © 2026 Coloquio Internacional de Sociología Clínica — Todos los derechos reservados
            </p>
            <p style={{ fontSize: 13, opacity: 0.3 }}>
                VIII Edición · Santiago de Chile
            </p>
            </div>
        </div>
        </footer>
    );
}