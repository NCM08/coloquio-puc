// ============================================================
// app/inscripcion/page.tsx — PÁGINA DE FORMULARIO DE INSCRIPCIÓN
// ============================================================

import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, PauseCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Formulario de Inscripción — VIII Coloquio Internacional de Sociología Clínica 2026",
  description:
    "Complete su inscripción al VIII Coloquio Internacional de Sociología Clínica 2026. " +
    "Sus datos y archivos están protegidos mediante cifrado SSL.",
};

export default function InscripcionPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--color-bg, #F7F7F7)",
        transition: "background-color 0.3s",
      }}
    >
      {/* ── Encabezado institucional ──────────────────────────── */}
      <div
        style={{
          padding: "48px 24px 52px",
          backgroundColor: "var(--color-primary)",
          color: "#FFFFFF",
        }}
      >
        <div style={{ maxWidth: 768, margin: "0 auto" }}>
          {/* Breadcrumb */}
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 14,
              opacity: 0.75,
              marginBottom: 20,
              flexWrap: "wrap",
            }}
          >
            <Link href="/" style={{ color: "#fff", textDecoration: "none" }}>
              Inicio
            </Link>
            <ChevronRight size={14} />
            <Link href="/inscripciones" style={{ color: "#fff", textDecoration: "none" }}>
              Inscripciones
            </Link>
            <ChevronRight size={14} />
            <span>Formulario</span>
          </nav>

          {/* Título */}
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px, 4.5vw, 44px)",
              fontWeight: 700,
              margin: "0 0 14px 0",
              lineHeight: 1.2,
            }}
          >
            Formulario de Inscripción
          </h1>
          <p style={{ fontSize: 17, opacity: 0.85, maxWidth: 580, lineHeight: 1.65, margin: 0 }}>
            Las inscripciones se encuentran temporalmente suspendidas. Vuelva a consultar
            esta página próximamente para registrar su participación.
          </p>
        </div>
      </div>

      {/* ── Contenedor principal ──────────────────────────────── */}
      <div style={{ maxWidth: 768, margin: "0 auto", padding: "48px 24px 80px" }}>

        {/* ── Banner: inscripciones pausadas ────────────────────── */}
        <div
          style={{
            textAlign: "center",
            padding: "56px 40px",
            borderRadius: 20,
            backgroundColor: "rgba(220,38,38,0.05)",
            border: "1.5px solid rgba(220,38,38,0.3)",
            marginBottom: 32,
          }}
        >
          <PauseCircle
            size={56}
            style={{ color: "#DC2626", marginBottom: 20 }}
          />
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(22px, 3.5vw, 30px)",
              fontWeight: 700,
              color: "#991B1B",
              margin: "0 0 16px 0",
              lineHeight: 1.25,
            }}
          >
            Inscripciones temporalmente deshabilitadas
          </h2>
          <p
            style={{
              fontSize: 17,
              color: "#6B7280",
              lineHeight: 1.75,
              maxWidth: 520,
              margin: "0 auto 32px",
            }}
          >
            Las inscripciones se encuentran temporalmente deshabilitadas mientras
            actualizamos nuestros aranceles. Pronto publicaremos los nuevos valores.
          </p>
          <Link
            href="/inscripciones"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "14px 32px",
              borderRadius: 10,
              backgroundColor: "var(--color-primary)",
              color: "#FFFFFF",
              fontFamily: "var(--font-display)",
              fontSize: 16,
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Ver información de aranceles
          </Link>
        </div>

        {/* ── Pie de página informativo ─────────────────────────── */}
        <p
          style={{
            textAlign: "center",
            fontSize: 13,
            color: "#9CA3AF",
            lineHeight: 1.65,
          }}
        >
          ¿Tiene dudas?{" "}
          <a
            href="mailto:coloquiosociologiaclinica@uc.cl"
            style={{ color: "var(--color-accent)", fontWeight: 600, textDecoration: "none" }}
          >
            coloquiosociologiaclinica@uc.cl
          </a>
        </p>
      </div>
    </div>
  );
}
