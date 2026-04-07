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


/** Tarjeta grande para el logo principal de la UC — Nivel 1, protagonista */
function MainLogoCard({ src, alt, dark }: { src: string; alt: string; dark: boolean }) {
    return (
        <div
            className={[
                "flex items-center justify-center rounded-2xl px-12 py-8",
                "border-2 transition-colors duration-200 shadow-md",
                dark
                    ? "bg-white border-[var(--color-dark-300)]"
                    : "bg-white border-[var(--color-dark-100)]",
            ].join(" ")}
        >
            <Image
                src={src}
                alt={alt}
                width={340}
                height={160}
                className="object-contain"
                style={{ height: "clamp(100px, 14vw, 148px)", width: "auto" }}
            />
        </div>
    );
}

/** Tarjeta Nivel 2 — facultades y colaboradores (60–70% del peso visual de la UC) */
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
                "flex items-center justify-center rounded-xl px-6 py-5",
                "border transition-colors duration-200",
                dark
                    ? "bg-white border-[var(--color-dark-300)]"
                    : "bg-white border-[var(--color-dark-100)]",
            ].join(" ")}
        >
            <Image
                src={src}
                alt={alt}
                width={180}
                height={88}
                className="object-contain"
                style={{
                    height: "clamp(60px, 9vw, 88px)",
                    width: "auto",
                    filter: blackFilter
                        ? "grayscale(100%) brightness(0)"
                        : undefined,
                }}
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

                    {/* Logo principal UC — Nivel 1, centrado y dominante */}
                    <div className="flex justify-center mt-8">
                        <MainLogoCard
                            src={ORGANIZER_MAIN.src}
                            alt={ORGANIZER_MAIN.alt}
                            dark={dark}
                        />
                    </div>

                    {/* 3 logos de facultades — Nivel 2, 60-70% del peso visual de la UC */}
                    <div className="flex flex-wrap justify-center items-center gap-6 mt-8 max-w-3xl mx-auto">
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

                    {/* Logos colaboradores — Nivel 2, idéntico tamaño a las facultades */}
                    <div className="flex flex-wrap justify-center gap-6 mt-8 max-w-3xl mx-auto">
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
