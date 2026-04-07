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

// ─── NIVEL 1: Logo UC — protagonista absoluto ─────────────────────────────────
function MainLogoCard({ src, alt, dark }: { src: string; alt: string; dark: boolean }) {
    return (
        <div
            className={[
                "flex items-center justify-center rounded-2xl px-10 py-8",
                "border-2 shadow-md transition-colors duration-200",
                dark
                    ? "bg-white border-[var(--color-dark-300)]"
                    : "bg-white border-[var(--color-dark-100)]",
            ].join(" ")}
        >
            {/* width={0} height={0} sizes="100vw" → patrón oficial Next.js sin warning de aspect-ratio */}
            <div className="h-32 md:h-40">
                <Image
                    src={src}
                    alt={alt}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: "auto", height: "100%" }}
                    className="object-contain"
                />
            </div>
        </div>
    );
}

// ─── NIVEL 2: Facultades y Colaboradores — exactamente la mitad de alto que UC ─
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
            {/* h-16 md:h-20 = mitad exacta de UC; mismo valor para facultades y colaboradores */}
            <Image
                src={src}
                alt={alt}
                width={180}
                height={88}
                className={[
                    "h-16 md:h-20 w-auto object-contain",
                    blackFilter ? "grayscale brightness-0" : "",
                ].join(" ").trim()}
            />
        </div>
    );
}

export default function Organizers() {
    const { dark } = useTheme();

    const sectionBg    = dark ? "var(--color-dark-800)" : "var(--color-dark-50)";
    const labelColor   = "var(--color-dark-400)";
    const headingColor = dark ? "var(--color-dark-100)" : "var(--color-primary)";
    const dividerColor = dark ? "var(--color-dark-700)" : "var(--color-dark-100)";

    return (
        <section
            className="py-12 md:py-20 px-4 md:px-8 lg:px-12"
            style={{ backgroundColor: sectionBg, transition: "background-color 0.3s" }}
        >
            <div style={{ maxWidth: 960, margin: "0 auto", textAlign: "center" }}>

                {/* ── ORGANIZAN ── */}
                <FadeInSection>
                    <p style={{
                        fontSize: 12,
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: 2,
                        color: labelColor,
                        marginBottom: 4,
                    }}>
                        Organizan
                    </p>
                    <h2 style={{
                        fontSize: 22,
                        fontWeight: 700,
                        fontFamily: "var(--font-display)",
                        color: headingColor,
                        marginBottom: 0,
                    }}>
                        Instituciones organizadoras
                    </h2>

                    {/* Nivel 1 — UC, centrada y dominante */}
                    <div className="flex justify-center mt-8">
                        <MainLogoCard src={ORGANIZER_MAIN.src} alt={ORGANIZER_MAIN.alt} dark={dark} />
                    </div>

                    {/* Nivel 2 — Facultades */}
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
                <div style={{
                    margin: "56px auto",
                    height: 1,
                    maxWidth: 480,
                    backgroundColor: dividerColor,
                }} />

                {/* ── COLABORAN ── */}
                <FadeInSection delay={0.2}>
                    <p style={{
                        fontSize: 12,
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: 2,
                        color: labelColor,
                        marginBottom: 4,
                    }}>
                        Colaboran
                    </p>
                    <h2 style={{
                        fontSize: 22,
                        fontWeight: 700,
                        fontFamily: "var(--font-display)",
                        color: headingColor,
                        marginBottom: 0,
                    }}>
                        Redes Internacionales
                    </h2>

                    {/* Nivel 2 — Colaboradores, idéntico tamaño a facultades */}
                    <div className="flex flex-wrap justify-center gap-6 mt-8 max-w-3xl mx-auto">
                        {COLLABORATORS.map(({ src, alt }) => (
                            <SmallLogoCard key={src} src={src} alt={alt} dark={dark} />
                        ))}
                    </div>
                </FadeInSection>

            </div>
        </section>
    );
}
