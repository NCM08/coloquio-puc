// ============================================================
// components/sections/Organizers.tsx — ORGANIZADORES (ANIMADO)
// ============================================================

"use client";

import { useTheme } from "@/components/ThemeProvider";
import FadeInSection from "@/components/ui/FadeInSection";

const ORGANIZER = { name: "Pontificia Universidad Católica de Chile", subtitle: "Facultad de Educación" };

const COLLABORATORS = ["Universidad de Chile", "MINEDUC", "CONICYT", "UNESCO Chile", "OEI", "CEPPE UC"];

export default function Organizers() {
    const { dark } = useTheme();

    return (
        <section style={{ padding: "80px 24px", backgroundColor: dark ? "var(--color-dark-800)" : "var(--color-dark-50)", transition: "background-color 0.3s" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
            <FadeInSection>
            <p style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: 2, color: dark ? "var(--color-dark-400)" : "var(--color-dark-400)", marginBottom: 16 }}>
                Organiza
            </p>
            <div style={{
                display: "inline-flex", alignItems: "center", gap: 16, padding: "20px 32px", borderRadius: 16,
                border: `1px solid ${dark ? "var(--color-dark-700)" : "var(--color-dark-100)"}`,
                backgroundColor: dark ? "var(--color-dark-900)" : "#FFFFFF", marginBottom: 48,
            }}>
                <div style={{
                width: 48, height: 48, borderRadius: 12,
                background: dark ? "linear-gradient(135deg, var(--color-accent), var(--color-accent-600))" : "linear-gradient(135deg, var(--color-primary), var(--color-primary-400))",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, color: "#fff",
                }}>UC</div>
                <div style={{ textAlign: "left" }}>
                <p style={{ fontSize: 16, fontWeight: 700, fontFamily: "var(--font-display)", color: dark ? "var(--color-dark-100)" : "var(--color-primary)" }}>{ORGANIZER.name}</p>
                <p style={{ fontSize: 13, color: dark ? "var(--color-dark-400)" : "var(--color-dark-500)" }}>{ORGANIZER.subtitle}</p>
                </div>
            </div>
            </FadeInSection>

            <FadeInSection delay={0.2}>
            <p style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: 2, color: dark ? "var(--color-dark-400)" : "var(--color-dark-400)", marginBottom: 20 }}>
                Colaboran
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                {COLLABORATORS.map((name, index) => (
                <div
                    key={index}
                    style={{
                    padding: "12px 20px", borderRadius: 10,
                    border: `1px solid ${dark ? "var(--color-dark-700)" : "var(--color-dark-100)"}`,
                    backgroundColor: dark ? "var(--color-dark-900)" : "#FFFFFF",
                    fontSize: 13, fontWeight: 500,
                    color: dark ? "var(--color-dark-300)" : "var(--color-dark-500)",
                    transition: "all 0.2s", cursor: "default",
                    }}
                    onMouseOver={(e) => {
                    e.currentTarget.style.borderColor = dark ? "var(--color-accent-700)" : "var(--color-primary-200)";
                    e.currentTarget.style.color = dark ? "var(--color-accent)" : "var(--color-primary)";
                    }}
                    onMouseOut={(e) => {
                    e.currentTarget.style.borderColor = dark ? "var(--color-dark-700)" : "var(--color-dark-100)";
                    e.currentTarget.style.color = dark ? "var(--color-dark-300)" : "var(--color-dark-500)";
                    }}
                >
                    {name}
                </div>
                ))}
            </div>
            </FadeInSection>
        </div>
        </section>
    );
}