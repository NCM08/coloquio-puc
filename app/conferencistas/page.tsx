// ============================================================
// app/conferencistas/page.tsx — Vista desacoplada de los datos
// ============================================================

"use client";

import { useTheme } from "@/components/ThemeProvider";
import Link from "next/link";
import { ChevronRight, Mic, Globe, Mail, ExternalLink, MapPin } from "lucide-react";
import FadeInSection from "@/components/ui/FadeInSection";
import Image from "next/image";
import { speakersList } from "@/data/speakers";

export default function ConferencistasPage() {
    const { dark } = useTheme();

    return (
        <div style={{
        backgroundColor: dark ? "var(--color-dark-900)" : "var(--color-dark-50)",
        minHeight: "100vh",
        transition: "background-color 0.3s",
        }}>
        {/* Page Header */}
        <div style={{ padding: "48px 24px", backgroundColor: dark ? "var(--color-dark-800)" : "var(--color-primary)", color: "#FFFFFF" }}>
            <div style={{ maxWidth: 1000, margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, opacity: 0.6, marginBottom: 16 }}>
                <Link href="/" style={{ color: "#fff", textDecoration: "none" }}>Inicio</Link>
                <ChevronRight size={14} />
                <span>Conferencistas</span>
            </div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 700, marginBottom: 12 }}>
                Conferencistas
            </h1>
            <p style={{ fontSize: 18, opacity: 0.8, maxWidth: 600, lineHeight: 1.6 }}>
                Académicos e investigadores de Chile y Latinoamérica que compartirán sus conocimientos y experiencias.
            </p>
            </div>
        </div>

        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "80px 24px" }}>

            <FadeInSection>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
                <p style={{ fontSize: 13, fontWeight: 600, textTransform: "uppercase", letterSpacing: 2, color: "var(--color-accent)", marginBottom: 8 }}>
                Conferencias magistrales
                </p>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 700, color: dark ? "var(--color-dark-100)" : "var(--color-primary)" }}>
                Conferencistas Magistrales
                </h2>
            </div>
            </FadeInSection>

            {/* ====== LÓGICA DDD: vacío → Próximamente | con datos → Cards ====== */}
            {speakersList.length === 0 ? (

            /* Estado Próximamente */
            <FadeInSection delay={0.15}>
                <div style={{
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                padding: "80px 32px", borderRadius: 24, textAlign: "center",
                border: `1px solid ${dark ? "var(--color-dark-700)" : "var(--color-dark-100)"}`,
                backgroundColor: dark ? "var(--color-dark-800)" : "#FFFFFF",
                marginBottom: 80,
                }}>
                <div style={{
                    width: 112, height: 112, borderRadius: "50%", marginBottom: 32,
                    backgroundColor: dark ? "rgba(212,168,67,0.08)" : "var(--color-accent-50)",
                    border: `2px solid ${dark ? "rgba(212,168,67,0.2)" : "var(--color-accent-100)"}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                    <Mic size={48} color="var(--color-accent)" strokeWidth={1.5} />
                </div>

                <h3 style={{
                    fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700,
                    color: dark ? "var(--color-dark-100)" : "var(--color-primary)",
                    marginBottom: 16,
                }}>
                    Próximamente
                </h3>

                <p style={{
                    fontSize: 17, lineHeight: 1.75,
                    color: dark ? "var(--color-dark-400)" : "var(--color-dark-500)",
                    maxWidth: 520,
                }}>
                    Estamos confirmando a nuestros invitados internacionales. Pronto publicaremos sus perfiles.
                </p>
                </div>
            </FadeInSection>

            ) : (

            /* Grid de tarjetas de conferencistas */
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: 32,
                marginBottom: 80,
            }}>
                {speakersList.map((speaker, i) => (
                <FadeInSection key={speaker.id} delay={i * 0.08}>
                    <div style={{
                    borderRadius: 20, overflow: "hidden",
                    border: `1px solid ${dark ? "var(--color-dark-700)" : "var(--color-dark-100)"}`,
                    backgroundColor: dark ? "var(--color-dark-800)" : "#FFFFFF",
                    transition: "box-shadow 0.2s",
                    }}>
                    {/* Imagen */}
                    <div style={{ position: "relative", width: "100%", aspectRatio: "1 / 1", backgroundColor: dark ? "var(--color-dark-700)" : "var(--color-dark-100)" }}>
                        <Image
                        src={speaker.imageUrl}
                        alt={speaker.name}
                        fill
                        style={{ objectFit: "cover" }}
                        />
                    </div>

                    {/* Contenido */}
                    <div style={{ padding: "20px 24px 24px" }}>
                        <h3 style={{
                        fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700,
                        color: dark ? "var(--color-dark-100)" : "var(--color-primary)",
                        marginBottom: 4,
                        }}>
                        {speaker.name}
                        </h3>
                        <p style={{ fontSize: 14, fontWeight: 500, color: "var(--color-accent)", marginBottom: 8 }}>
                        {speaker.role}
                        </p>
                        <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13, color: dark ? "var(--color-dark-400)" : "var(--color-dark-500)", marginBottom: 12 }}>
                        <MapPin size={12} />
                        <span>{speaker.country}</span>
                        </div>
                        <p style={{ fontSize: 14, lineHeight: 1.65, color: dark ? "var(--color-dark-400)" : "var(--color-dark-600)" }}>
                        {speaker.bio}
                        </p>
                    </div>
                    </div>
                </FadeInSection>
                ))}
            </div>

            )}

            {/* CTA final */}
            <FadeInSection delay={0.2}>
            <div style={{
                padding: 32, borderRadius: 16, textAlign: "center",
                backgroundColor: dark ? "var(--color-dark-800)" : "var(--color-primary-50)",
                border: `1px solid ${dark ? "var(--color-dark-700)" : "var(--color-primary-100)"}`,
            }}>
                <Globe size={28} style={{ color: "var(--color-accent)", marginBottom: 12 }} />
                <h3 style={{
                fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700,
                color: dark ? "var(--color-dark-100)" : "var(--color-primary)", marginBottom: 8,
                }}>
                ¿Quieres ser expositor?
                </h3>
                <p style={{ fontSize: 15, color: dark ? "var(--color-dark-400)" : "var(--color-dark-500)", maxWidth: 500, margin: "0 auto 20px", lineHeight: 1.6 }}>
                Envía tu propuesta de ponencia o póster antes del cierre de la convocatoria.
                </p>
                <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <Link href="/convocatoria" style={{
                    display: "inline-flex", alignItems: "center", gap: 8, height: 48, padding: "0 24px",
                    backgroundColor: "var(--color-accent)", color: "#fff", fontSize: 15, fontWeight: 600,
                    borderRadius: 10, textDecoration: "none",
                }}>
                    Ver convocatoria <ExternalLink size={14} />
                </Link>
                <Link href="mailto:congresosociologiaclinica.2026@gmail.com" style={{
                    display: "inline-flex", alignItems: "center", gap: 8, height: 48, padding: "0 24px",
                    border: `1px solid ${dark ? "var(--color-dark-600)" : "var(--color-primary-200)"}`,
                    color: dark ? "var(--color-dark-200)" : "var(--color-primary)",
                    fontSize: 15, fontWeight: 500, borderRadius: 10, textDecoration: "none",
                }}>
                    <Mail size={14} /> Contactar
                </Link>
                </div>
            </div>
            </FadeInSection>
        </div>
        </div>
    );
}
