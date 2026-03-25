// ============================================================
// components/sections/Organizers.tsx — ORGANIZAN
// ============================================================

"use client";

import Image from "next/image";
import FadeInSection from "@/components/ui/FadeInSection";
import { useTheme } from "@/components/ThemeProvider";

const ORGANIZERS = [
    { src: "/images/logo-uc.png",            alt: "Pontificia Universidad Católica de Chile" },
    { src: "/images/logo-educacion.png",      alt: "Facultad de Educación UC" },
    { src: "/images/logo-psicologia.png",     alt: "Escuela de Psicología UC" },
    { src: "/images/logo-trabajo-social.png", alt: "Escuela de Trabajo Social UC" },
];


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
                <div
                    key={src}
                    className={[
                        "flex items-center justify-center rounded-xl px-6 py-4",
                        "border transition-colors duration-200",
                        dark
                            ? "bg-[var(--color-dark-900)] border-[var(--color-dark-700)]"
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
            ))}
        </div>
    );
}

export default function Organizers() {
    const { dark } = useTheme();

    const sectionBg = dark ? "var(--color-dark-800)" : "var(--color-dark-50)";
    const labelColor = "var(--color-dark-400)";
    const headingColor = dark ? "var(--color-dark-100)" : "var(--color-primary)";

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
                    <LogoGrid logos={ORGANIZERS} dark={dark} />
                </FadeInSection>

            </div>
        </section>
    );
}
