// ============================================================
// components/sections/Speakers.tsx — CONFERENCISTAS Y COMITÉ
// ============================================================

"use client";

import FadeInSection from "@/components/ui/FadeInSection";
import { useTheme } from "@/components/ThemeProvider";

const CONFERENCISTAS = [
  {
    name: "Ana Araujo",
    role: "Conferencista Internacional",
    src: "/images/conferencistas/Ana%20Araujo.jfif",
  },
  {
    name: "Ana Correa",
    role: "Comité Académico",
    src: "/images/conferencistas/Ana%20Correa.JPG",
  },
  {
    name: "Dariela Sharim",
    role: "Comité Académico",
    src: "/images/conferencistas/Dariela%20Sharim.jfif",
  },
  {
    name: "Fernando Yzaguirre",
    role: "Conferencista Internacional",
    src: "/images/conferencistas/Fernando%20Yzaguirre.jfif",
  },
  {
    name: "Johnny Orejuela",
    role: "Conferencista Internacional",
    src: "/images/conferencistas/Johnny%20Orejuela.jpeg",
  },
  {
    name: "Magdalena Garcés",
    role: "Comité Académico",
    src: "/images/conferencistas/Magdalena%20Garc%C3%A9s.jfif",
  },
  {
    name: "Matheus Viana Braz",
    role: "Conferencista Internacional",
    src: "/images/conferencistas/Matheus%20Viana%20Braz.jfif",
  },
  {
    name: "Patricia Guerrero",
    role: "Comité Académico",
    src: "/images/conferencistas/Patricia%20Guerrero.jpg",
  },
  {
    name: "Teresa Carreteiro",
    role: "Conferencista Internacional",
    src: "/images/conferencistas/Teresa%20Carreteiro.jpeg",
  },
  {
    name: "Vincent de Gaulejac",
    role: "Conferencista Internacional",
    src: "/images/conferencistas/Vincent%20dG.jfif",
  },
];

export default function Speakers() {
  const { dark } = useTheme();

  return (
    <section
      style={{
        backgroundColor: dark ? "var(--color-dark-900)" : "#FFFFFF",
        transition: "background-color 0.3s",
        padding: "96px 24px",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>

        {/* ── ENCABEZADO ── */}
        <FadeInSection>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <p
              style={{
                fontSize: 12,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: 2,
                color: "var(--color-accent)",
                marginBottom: 12,
              }}
            >
              Expositores invitados
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(28px, 4vw, 40px)",
                fontWeight: 700,
                lineHeight: 1.2,
                color: dark ? "var(--color-dark-100)" : "var(--color-primary)",
                marginBottom: 0,
              }}
            >
              Conferencistas y Comité Académico
            </h2>
          </div>
        </FadeInSection>

        {/* ── GRID ── */}
        <FadeInSection delay={0.15}>
          <div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8"
          >
            {CONFERENCISTAS.map((speaker) => (
              <div key={speaker.name} className="flex flex-col items-center">
                {/* Avatar circular */}
                <div
                  className="w-40 h-40 rounded-full overflow-hidden shadow-lg mx-auto
                              transition-transform duration-300 hover:scale-105"
                  style={{
                    border: `3px solid ${dark ? "var(--color-dark-600)" : "var(--color-dark-100)"}`,
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={speaker.src}
                    alt={speaker.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Nombre */}
                <p
                  className="font-semibold text-lg text-center mt-4 leading-tight"
                  style={{
                    color: dark ? "var(--color-dark-100)" : "var(--color-primary)",
                  }}
                >
                  {speaker.name}
                </p>

                {/* Rol */}
                <p
                  className="text-sm text-center mt-1"
                  style={{ color: dark ? "var(--color-dark-400)" : "var(--color-dark-500)" }}
                >
                  {speaker.role}
                </p>
              </div>
            ))}
          </div>
        </FadeInSection>

      </div>
    </section>
  );
}
