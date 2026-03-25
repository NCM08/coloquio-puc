// ============================================================
// components/sections/MapSection.tsx — MAPA (ANIMADO)
// ============================================================

"use client";

import { useTheme } from "@/components/ThemeProvider";
import { MapPin, Train, Car, Clock } from "lucide-react";
import FadeInSection from "@/components/ui/FadeInSection";

const INFO_ITEMS = [
    { icon: MapPin, title: "Dirección", text: "Av. Vicuña Mackenna 4860, Macul, Santiago, Chile" },
    { icon: Train, title: "Metro", text: "Estación San Joaquín (Línea 5), a 5 minutos caminando" },
    { icon: Car, title: "Estacionamiento", text: "Estacionamiento disponible en campus (acceso por Av. Vicuña Mackenna)" },
    { icon: Clock, title: "Horario del evento", text: "9:00 — 18:00 hrs, 15 al 17 de Octubre 2026" },
];

export default function MapSection() {
    const { dark } = useTheme();

    return (
        <section style={{ padding: "96px 24px", backgroundColor: dark ? "var(--color-dark-900)" : "#FFFFFF", transition: "background-color 0.3s" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <FadeInSection>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
                <p style={{ fontSize: 13, fontWeight: 600, textTransform: "uppercase", letterSpacing: 2, color: "var(--color-accent)", marginBottom: 12 }}>Lugar del evento</p>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, lineHeight: 1.2, color: dark ? "var(--color-dark-100)" : "var(--color-primary)", marginBottom: 12 }}>
                Campus San Joaquín
                </h2>
                <p style={{ fontSize: 17, color: dark ? "var(--color-dark-400)" : "var(--color-dark-500)", maxWidth: 500, margin: "0 auto", lineHeight: 1.6 }}>
                Pontificia Universidad Católica de Chile
                </p>
            </div>
            </FadeInSection>

            <div style={{ display: "flex", gap: 32, flexWrap: "wrap", alignItems: "stretch" }}>
            <FadeInSection direction="left" style={{ flex: "1 1 500px", borderRadius: 16, overflow: "hidden", border: `1px solid ${dark ? "var(--color-dark-700)" : "var(--color-dark-100)"}`, display: "flex", flexDirection: "column" }}>
                <div style={{ position: "relative", flex: 1, minHeight: 400 }}>
                <iframe
                    src="https://www.openstreetmap.org/export/embed.html?bbox=-70.6175%2C-33.5010%2C-70.6075%2C-33.4940&layer=mapnik&marker=-33.4975%2C-70.6125"
                    style={{ width: "100%", height: "100%", minHeight: 400, border: "none", filter: dark ? "brightness(0.8) contrast(1.1) invert(0.92) hue-rotate(180deg)" : "none", pointerEvents: "none" }}
                    loading="lazy"
                    title="Mapa Campus San Joaquín PUC"
                />
                </div>
                <a
                href="https://www.google.com/maps/search/?api=1&query=Campus+San+Joaquín+PUC+Av+Vicuña+Mackenna+4860+Macul+Santiago"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    display: "block",
                    textAlign: "center",
                    padding: "14px 24px",
                    backgroundColor: dark ? "var(--color-dark-800)" : "var(--color-primary-50)",
                    color: dark ? "var(--color-accent)" : "var(--color-primary)",
                    fontWeight: 600,
                    fontSize: 15,
                    textDecoration: "none",
                    borderTop: `1px solid ${dark ? "var(--color-dark-700)" : "var(--color-dark-100)"}`,
                    transition: "background-color 0.2s",
                }}
                >
                📍 Abrir en Google Maps
                </a>
            </FadeInSection>

            <div style={{ flex: "0 1 360px", display: "flex", flexDirection: "column", gap: 16, minWidth: 280 }}>
                {INFO_ITEMS.map((item, index) => {
                const Icon = item.icon;
                return (
                    <FadeInSection key={index} direction="right" delay={index * 0.1}>
                    <div style={{
                        padding: 20, borderRadius: 12,
                        border: `1px solid ${dark ? "var(--color-dark-700)" : "var(--color-dark-100)"}`,
                        backgroundColor: dark ? "var(--color-dark-800)" : "var(--color-dark-50)",
                        display: "flex", gap: 16, alignItems: "flex-start",
                    }}>
                        <div style={{
                        width: 40, height: 40, borderRadius: 10,
                        backgroundColor: dark ? "rgba(212,168,67,0.1)" : "var(--color-primary-50)",
                        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                        }}>
                        <Icon size={18} style={{ color: dark ? "var(--color-accent)" : "var(--color-primary)" }} />
                        </div>
                        <div>
                        <p style={{ fontSize: 14, fontWeight: 600, color: dark ? "var(--color-dark-100)" : "var(--color-dark-700)", marginBottom: 4 }}>{item.title}</p>
                        <p style={{ fontSize: 14, lineHeight: 1.6, color: dark ? "var(--color-dark-400)" : "var(--color-dark-500)" }}>{item.text}</p>
                        </div>
                    </div>
                    </FadeInSection>
                );
                })}
            </div>
            </div>
        </div>
        </section>
    );
}