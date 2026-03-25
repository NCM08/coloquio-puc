// ============================================================
// components/sections/Speakers.tsx — ESTADO PRÓXIMAMENTE
// ============================================================

"use client";

import { useTheme } from "@/components/ThemeProvider";
import { Mic } from "lucide-react";
import FadeInSection from "@/components/ui/FadeInSection";

export default function Speakers() {
    const { dark } = useTheme();

    return (
        <section style={{ padding: "96px 24px", backgroundColor: dark ? "var(--color-dark-800)" : "var(--color-dark-50)", transition: "background-color 0.3s" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <FadeInSection>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
                <p style={{ fontSize: 13, fontWeight: 600, textTransform: "uppercase", letterSpacing: 2, color: "var(--color-accent)", marginBottom: 12 }}>
                Expositores invitados
                </p>
                <h2 style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(28px, 4vw, 40px)",
                fontWeight: 700, lineHeight: 1.2,
                color: dark ? "var(--color-dark-100)" : "var(--color-primary)",
                marginBottom: 16,
                }}>
                Conferencistas Magistrales
                </h2>
                <p style={{ fontSize: 17, color: dark ? "var(--color-dark-400)" : "var(--color-dark-500)", maxWidth: 500, margin: "0 auto", lineHeight: 1.7 }}>
                Destacados académicos nacionales e internacionales compartirán sus investigaciones y experiencias.
                </p>
            </div>
            </FadeInSection>

            <FadeInSection delay={0.15}>
            <div style={{
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                padding: "64px 32px", borderRadius: 24, textAlign: "center",
                border: `1px solid ${dark ? "var(--color-dark-700)" : "var(--color-dark-100)"}`,
                backgroundColor: dark ? "var(--color-dark-900)" : "#FFFFFF",
            }}>
                {/* Ícono decorativo */}
                <div style={{
                width: 96, height: 96, borderRadius: "50%", marginBottom: 28,
                backgroundColor: dark ? "rgba(212,168,67,0.08)" : "var(--color-accent-50)",
                border: `2px solid ${dark ? "rgba(212,168,67,0.2)" : "var(--color-accent-100)"}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                <Mic size={40} color="var(--color-accent)" strokeWidth={1.5} />
                </div>

                <h3 style={{
                fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700,
                color: dark ? "var(--color-dark-100)" : "var(--color-primary)",
                marginBottom: 12,
                }}>
                Próximamente
                </h3>

                <p style={{
                fontSize: 16, lineHeight: 1.7,
                color: dark ? "var(--color-dark-400)" : "var(--color-dark-500)",
                maxWidth: 480,
                }}>
                Estamos confirmando a nuestros invitados internacionales. Pronto publicaremos sus perfiles.
                </p>
            </div>
            </FadeInSection>
        </div>
        </section>
    );
}
