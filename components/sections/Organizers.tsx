// ============================================================
// components/sections/Organizers.tsx — ORGANIZAN
// ============================================================

"use client";

import Image from "next/image";
import FadeInSection from "@/components/ui/FadeInSection";
import { useTheme } from "@/components/ThemeProvider";

const ORGANIZER_MAIN = { src: "/images/logo-uc.png", alt: "Pontificia Universidad Católica de Chile" };

const ORGANIZER_FACULTIES = [
    { src: "/images/logo-educacion.png",      alt: "Facultad de Educación UC" },
    { src: "/images/logo-psicologia.png",     alt: "Escuela de Psicología UC" },
    { src: "/images/logo-trabajo-social.png", alt: "Escuela de Trabajo Social UC" },
];

const COLLABORATORS = [
    { src: "/images/risc-logo.png",      alt: "RISC – Réseau International de Sociologie Clinique" },
    { src: "/images/nodo-sur-logo.png",  alt: "Nodo Sur RISC" },
];


function LogoCard({
    src,
    alt,
    dark,
}: {
    src: string;
    alt: string;
    dark: boolean;
}) {
    return (
        <div
            className={[
                "flex items-center justify-center rounded-xl px-6 py-4",
                "border transition-colors duration-200",
                dark
                    ? "bg-white border-[var(--color-dark-300)]"
                    : "bg-white border-[var(--color-dark-100)]",
            ].join(" ")}
            style={{ minWidth: 120 }}
        >
            <Image
                src={src}
                alt={alt}
                width={160}
                height={80}
                className="h-20 w-auto object-contain"
            />
        </div>
    );
}

function LogoGrid({
    logos,
    dark,
}: {
    logos: { src: string; alt: string }[];
    dark: boolean;
}) {
    return (
        <div className="flex flex-wrap justify-center gap-6 mt-6">
            {logos.map(({ src, alt }) => (
                <LogoCard key={src} src={src} alt={alt} dark={dark} />
            ))}
        </div>
    );
}

export default function Organizers() {
    const { dark } = useTheme();

    const sectionBg = dark ? "var(--color-dark-800)" : "var(--color-dark-50)";
    const labelColor = "var(--color-dark-400)";
    const headingColor = dark ? "var(--color-dark-100)" : "var(--color-primary)";
    const dividerColor = dark ? "var(--color-dark-700)" : "var(--color-dark-100)";

    return (
        <section
            className="py-12 md:py-20 px-4 md:px-8 lg:px-12"
            style={{
                backgroundColor: sectionBg,
                transition: "background-color 0.3s",
            }}
        >
            <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>

                {/* ── ORGANIZAN ── */}
                <FadeInSection>
                    <p
                        style={{
                            fontSize: 12,
                            fontWeight: 600,
                            textTransform: "uppercase",
                            letterSpacing: 2,
                            color: labelColor,
                            marginBottom: 4,
                        }}
                    >
                        Organizan
                    </p>
                    <h2
                        style={{
                            fontSize: 22,
                            fontWeight: 700,
                            fontFamily: "var(--font-display)",
                            color: headingColor,
                            marginBottom: 0,
                        }}
                    >
                        Instituciones organizadoras
                    </h2>

                    {/* Fila 1: Logo principal UC centrado */}
                    <div className="flex justify-center mt-6">
                        <LogoCard src={ORGANIZER_MAIN.src} alt={ORGANIZER_MAIN.alt} dark={dark} />
                    </div>

                    {/* Fila 2: 3 logos de facultades */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                        {ORGANIZER_FACULTIES.map(({ src, alt }) => (
                            <div key={src} className="flex justify-center">
                                <LogoCard src={src} alt={alt} dark={dark} />
                            </div>
                        ))}
                    </div>
                </FadeInSection>

                {/* ── DIVIDER ── */}
                <div
                    style={{
                        margin: "56px auto",
                        height: 1,
                        maxWidth: 480,
                        backgroundColor: dividerColor,
                    }}
                />

                {/* ── COLABORAN ── */}
                <FadeInSection delay={0.2}>
                    <p
                        style={{
                            fontSize: 12,
                            fontWeight: 600,
                            textTransform: "uppercase",
                            letterSpacing: 2,
                            color: labelColor,
                            marginBottom: 4,
                        }}
                    >
                        Colaboran
                    </p>
                    <h2
                        style={{
                            fontSize: 22,
                            fontWeight: 700,
                            fontFamily: "var(--font-display)",
                            color: headingColor,
                            marginBottom: 0,
                        }}
                    >
                        Redes Internacionales
                    </h2>
                    <LogoGrid logos={COLLABORATORS} dark={dark} />
                </FadeInSection>

            </div>
        </section>
    );
}
