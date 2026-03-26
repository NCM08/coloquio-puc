// ============================================================
// app/inscripcion/page.tsx — PÁGINA DE FORMULARIO DE INSCRIPCIÓN
// ============================================================

import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Lock, ShieldCheck } from "lucide-react";
import InscripcionForm from "@/components/forms/InscripcionForm";

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
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
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
            Complete los tres pasos a continuación para registrar su participación en el
            VIII Coloquio Internacional de Sociología Clínica 2026.
          </p>

          {/* Indicadores de seguridad */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              marginTop: 24,
              flexWrap: "wrap",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 7, opacity: 0.9 }}>
              <Lock size={14} />
              <span style={{ fontSize: 13 }}>Conexión cifrada SSL</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 7, opacity: 0.9 }}>
              <ShieldCheck size={14} />
              <span style={{ fontSize: 13 }}>Datos protegidos y encriptados</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 7, opacity: 0.9 }}>
              <ShieldCheck size={14} />
              <span style={{ fontSize: 13 }}>Archivos de acceso restringido</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Contenedor principal ──────────────────────────────── */}
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "48px 24px 80px" }}>

        {/* ── Aviso importante antes del formulario ────────────── */}
        <div
          style={{
            padding: "18px 22px",
            borderRadius: 12,
            backgroundColor: "rgba(251,191,36,0.08)",
            border: "1px solid rgba(251,191,36,0.4)",
            marginBottom: 36,
            fontSize: 14,
            lineHeight: 1.7,
            color: "#92400E",
          }}
        >
          <strong>Antes de continuar:</strong> Tenga a mano su comprobante de transferencia bancaria.
          El pago debe realizarse <em>antes</em> de completar este formulario. Si aún no ha pagado,{" "}
          <Link href="/inscripciones" style={{ color: "var(--color-accent)", fontWeight: 600 }}>
            revise la tabla de valores e instrucciones de pago
          </Link>
          .
        </div>

        {/* ── Tarjeta del formulario ────────────────────────────── */}
        <div
          style={{
            backgroundColor: "var(--color-card-bg, #FFFFFF)",
            borderRadius: 20,
            padding: "clamp(28px, 5vw, 52px)",
            boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
            border: "1px solid rgba(0,0,0,0.06)",
          }}
        >
          <InscripcionForm />
        </div>

        {/* ── Pie de página informativo ─────────────────────────── */}
        <p
          style={{
            textAlign: "center",
            fontSize: 13,
            color: "#9CA3AF",
            marginTop: 28,
            lineHeight: 1.65,
          }}
        >
          ¿Tiene dudas sobre el proceso de inscripción?{" "}
          <Link
            href="/preguntas-frecuentes"
            style={{ color: "var(--color-accent)", textDecoration: "none", fontWeight: 600 }}
          >
            Consulte las preguntas frecuentes
          </Link>{" "}
          o escríbanos a{" "}
          <a
            href="mailto:coloquiosociologiaclinica@uc.cl"
            style={{ color: "var(--color-accent)", fontWeight: 600, textDecoration: "none" }}
          >
            coloquiosociologiaclinica@uc.cl
          </a>
          .
        </p>
      </div>
    </div>
  );
}
