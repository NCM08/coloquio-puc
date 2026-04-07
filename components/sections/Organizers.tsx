// ============================================================
// components/sections/Organizers.tsx — ORGANIZAN
// ============================================================

"use client";

import Image from "next/image";
import FadeInSection from "@/components/ui/FadeInSection";
import { useTheme } from "@/components/ThemeProvider";

const ORGANIZER_MAIN = { src: "/images/uc-color.png", alt: "Pontificia Universidad Católica de Chile" };

const ORGANIZER_FACULTIES: { src: string; alt: string; blackFilter?: boolean }[] = [
    { src: "/images/logo-educacion.png",      alt: "Facultad de Educación UC" },
    { src: "/images/logo-psicologia.png",     alt: "Escuela de Psicología UC" },
    { src: "/images/logo-trabajo-social.png", alt: "Escuela de Trabajo Social UC", blackFilter: true },
];

const COLLABORATORS = [
    { src: "/images/risc-logo.png",      alt: "RISC – Réseau International de Sociologie Clinique" },
    { src: "/images/nodo-sur-logo.png",  alt: "Nodo Sur RISC" },
];


/** Tarjeta grande para el logo principal de la UC */
function MainLogoCard({ src, alt, dark }: { src: string; alt: string; dark: boolean }) {
    return (
        <div
            className={[
                "flex items-center justify-center rounded-xl px-8 py-5",
                "border transition-colors duration-200",
                dark
                    ? "bg-white border-[var(--color-dark-300)]"
                    : "bg-white border-[var(--color-dark-100)]",
            ].join(" ")}
        >
            <Image
                src={src}
                alt={alt}
                width={220}
                height={110}
                className="h-24 w-auto object-contain"
            />
        </div>
    );
}

/** Tarjeta pequeña para facultades y colaboradores (mismo peso visual) */
function SmallLogoCard({
    src,
    alt,
    dark,
    blackFilter = false,
}: {
    src: string;
    alt: string;
    dark: boolean;
    blackFilter?: boolean;
}) {
    return (
        <div
            className={[
                "flex items-center justify-center rounded-xl px-4 py-3",
                "border transition-colors duration-200",
                dark
                    ? "bg-white border-[var(--color-dark-300)]"
                    : "bg-white border-[var(--color-dark-100)]",
            ].join(" ")}
        >
            <Image
                src={src}
                alt={alt}
                width={110}
                height={52}
                className="h-10 w-auto object-contain"
                style={blackFilter ? { filter: "brightness(0) contrast(100%)" } : undefined}
            />
        </div>
    );
}

export default function Organizers() {
    const { dark } = useTheme();

    const sectionBg   = dark ? "var(--color-dark-800)" : "var(--color-dark-50)";
    const labelColor  = "var(--color-dark-400)";
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

                    {/* Logo principal UC — centrado, tamaño dominante */}
                    <div className="flex justify-center mt-6">
                        <MainLogoCard
                            src={ORGANIZER_MAIN.src}
                            alt={ORGANIZER_MAIN.alt}
                            dark={dark}
                        />
                    </div>

                    {/* 3 logos de facultades — subordinados al logo principal */}
                    <div className="flex flex-wrap justify-center items-center gap-4 mt-5 max-w-2xl mx-auto">
                        {ORGANIZER_FACULTIES.map(({ src, alt, blackFilter }) => (
                            <SmallLogoCard
                                key={src}
                                src={src}
                                alt={alt}
                                dark={dark}
                                blackFilter={blackFilter}
                            />
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

                    {/* Logos colaboradores — mismo tamaño que las facultades */}
                    <div className="flex flex-wrap justify-center gap-4 mt-6">
                        {COLLABORATORS.map(({ src, alt }) => (
                            <SmallLogoCard
                                key={src}
                                src={src}
                                alt={alt}
                                dark={dark}
                            />
                        ))}
                    </div>
                </FadeInSection>

            </div>
        </section>
    );
}
