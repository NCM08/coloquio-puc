// ============================================================
// app/hospedaje/page.tsx — HOSPEDAJE (formato documento PDF)
// ============================================================

"use client";

import { useTheme } from "@/components/ThemeProvider";
import Link from "next/link";
import {
  ChevronRight,
  Star,
  MapPin,
  ExternalLink,
  AlertTriangle,
} from "lucide-react";

// ── Datos reales de hostales ───────────────────────────────────

interface Hostal {
  numero: number;
  nombre: string;
  rating: number;
  tag: string;
  presupuesto: string;
  direccion: string;
  sitio: string;
}

const ECONOMICOS: Hostal[] = [
  {
    numero: 1,
    nombre: "Hostel Providencia",
    rating: 4.4,
    tag: "Mejor conexión (Línea 5)",
    presupuesto: "$20.000 por persona",
    direccion: "Dr. Ernesto Prado Tagle 85, Providencia",
    sitio: "https://hostalprovidencia.com/",
  },
  {
    numero: 2,
    nombre: "Rado Boutique Hostel",
    rating: 4.6,
    tag: "Mejor evaluado",
    presupuesto: "Desde $29.960",
    direccion: "Pío Nono 5, Providencia",
    sitio: "https://radoboutiquehostel.com/",
  },
  {
    numero: 3,
    nombre: "Aji Hostel",
    rating: 4.2,
    tag: "Excelente valor agregado",
    presupuesto: "Desde $30.600",
    direccion: "Triana 863, Providencia",
    sitio: "https://ajihostel.com/",
  },
  {
    numero: 4,
    nombre: "Hostal Brown Sur",
    rating: 4.2,
    tag: "Especialistas en grupos",
    presupuesto: "$24.000",
    direccion: "Brown Sur 655, Ñuñoa",
    sitio: "http://www.hostalbrownsur.cl/",
  },
];

const BOUTIQUE: Hostal[] = [
  {
    numero: 5,
    nombre: "Hostal Merced 88",
    rating: 4.5,
    tag: "Estilo y tranquilidad",
    presupuesto: "Desde $41.800",
    direccion: "Merced 88, Santiago",
    sitio: "https://merced88.com/",
  },
  {
    numero: 6,
    nombre: "Yogi Hostels",
    rating: 4.4,
    tag: "Enfoque en el descanso",
    presupuesto: "Desde $40.000",
    direccion: "José Manuel Infante 1020, Providencia",
    sitio: "https://yogihostels.com/",
  },
  {
    numero: 7,
    nombre: "Hostal Almenas",
    rating: 4.6,
    tag: "Máxima comodidad",
    presupuesto: "$45.000 ($22.500 compartido)",
    direccion: "Ricardo Matte Pérez 0270, Providencia",
    sitio: "https://hostalalmenas.cl/",
  },
  {
    numero: 8,
    nombre: "Hotel Plaza Ñuñoa",
    rating: 4.5,
    tag: "Recomendado — cerca del campus",
    presupuesto: "Consultar en sitio web",
    direccion: "Ñuñoa, Santiago",
    sitio: "https://hotelplazanunoa.com/gallery/",
  },
];

// ── Componente: fila de rating con estrellas amarillas ─────────
function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const partial = rating - full >= 0.5;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 3 }}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={15}
          fill={i < full || (i === full && partial) ? "#F59E0B" : "none"}
          stroke={i < full || (i === full && partial) ? "#F59E0B" : "#D1D5DB"}
          strokeWidth={1.5}
        />
      ))}
      <span style={{ marginLeft: 5, fontSize: 13, fontWeight: 700, color: "#F59E0B" }}>
        {rating}/5
      </span>
    </span>
  );
}

// ── Componente: tarjeta de hostal en formato lista ─────────────
function HostalRow({
  hostal,
  textPrimary,
  textSecondary,
  borderColor,
  cardBg,
}: {
  hostal: Hostal;
  textPrimary: string;
  textSecondary: string;
  borderColor: string;
  cardBg: string;
}) {
  return (
    <div
      style={{
        backgroundColor: cardBg,
        border: `1px solid ${borderColor}`,
        borderRadius: 12,
        padding: "20px 24px",
        marginBottom: 16,
      }}
    >
      {/* Fila 1: número, nombre, rating, tag */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "8px 14px",
          marginBottom: 12,
        }}
      >
        <span
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            backgroundColor: "var(--color-primary)",
            color: "#fff",
            fontSize: 13,
            fontWeight: 700,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {hostal.numero}
        </span>

        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(16px, 2.5vw, 19px)",
            fontWeight: 700,
            color: "var(--color-primary)",
          }}
        >
          {hostal.nombre}
        </span>

        <StarRating rating={hostal.rating} />

        {/* Tag */}
        <span
          style={{
            fontSize: 12,
            fontWeight: 600,
            padding: "3px 10px",
            borderRadius: 20,
            backgroundColor: "rgba(0,173,252,0.12)",
            color: "var(--color-primary)",
            border: "1px solid rgba(0,173,252,0.3)",
          }}
        >
          {hostal.tag}
        </span>
      </div>

      {/* Fila 2: detalles */}
      <ul
        style={{
          listStyle: "none",
          margin: 0,
          padding: 0,
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}
      >
        <li style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
          <span style={{ fontSize: 13, color: textSecondary, minWidth: 90, flexShrink: 0 }}>
            Presupuesto:
          </span>
          <span style={{ fontSize: 14, fontWeight: 700, color: "#10B981" }}>
            {hostal.presupuesto} CLP / noche
          </span>
        </li>
        <li style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
          <span style={{ fontSize: 13, color: textSecondary, minWidth: 90, flexShrink: 0 }}>
            Dirección:
          </span>
          <span style={{ fontSize: 14, color: textPrimary, display: "flex", alignItems: "center", gap: 5 }}>
            <MapPin size={13} style={{ color: "var(--color-primary)", flexShrink: 0 }} />
            {hostal.direccion}
          </span>
        </li>
        <li style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
          <span style={{ fontSize: 13, color: textSecondary, minWidth: 90, flexShrink: 0 }}>
            Sitio web:
          </span>
          <a
            href={hostal.sitio}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: 14,
              color: "var(--color-primary)",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <ExternalLink size={13} />
            {hostal.sitio.replace(/^https?:\/\//, "").replace(/\/$/, "")}
          </a>
        </li>
      </ul>
    </div>
  );
}

// ── Sección con título ─────────────────────────────────────────
function Section({
  title,
  borderColor,
  children,
  textPrimary,
}: {
  title: string;
  borderColor: string;
  children: React.ReactNode;
  textPrimary: string;
}) {
  return (
    <section style={{ marginBottom: 48 }}>
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(18px, 3vw, 22px)",
          fontWeight: 700,
          color: textPrimary,
          borderBottom: `2px solid var(--color-primary)`,
          paddingBottom: 10,
          marginBottom: 24,
          marginTop: 0,
        }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

// ── Página principal ──────────────────────────────────────────
export default function HospedajePage() {
  const { dark } = useTheme();

  const bg            = dark ? "var(--color-dark-900)" : "#F7F7F7";
  const cardBg        = dark ? "var(--color-dark-800)" : "#FFFFFF";
  const borderColor   = dark ? "var(--color-dark-700)" : "#E5E7EB";
  const textPrimary   = dark ? "var(--color-dark-100)" : "#1F2937";
  const textSecondary = dark ? "var(--color-dark-400)" : "#6B7280";
  const alertBg       = dark ? "rgba(245,158,11,0.1)" : "rgba(254,243,199,1)";
  const alertBorder   = dark ? "rgba(245,158,11,0.35)" : "#FCD34D";

  return (
    <div
      style={{
        backgroundColor: bg,
        minHeight: "100vh",
        transition: "background-color 0.3s",
      }}
    >
      {/* ── Encabezado hero ────────────────────────────────────── */}
      <div
        style={{
          padding: "48px 24px 40px",
          backgroundColor: dark ? "var(--color-dark-800)" : "var(--color-primary)",
          color: "#FFFFFF",
        }}
      >
        <div style={{ maxWidth: 896, margin: "0 auto" }}>
          {/* Breadcrumb */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: 13,
              opacity: 0.7,
              marginBottom: 20,
            }}
          >
            <Link href="/" style={{ color: "#fff", textDecoration: "none" }}>
              Inicio
            </Link>
            <ChevronRight size={13} />
            <span>Hospedaje</span>
          </div>

          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(26px, 4.5vw, 42px)",
              fontWeight: 700,
              margin: "0 0 10px 0",
              lineHeight: 1.2,
            }}
          >
            Opciones de Alojamiento Recomendado — Coloquio
          </h1>

          <p
            style={{
              fontSize: "clamp(14px, 2vw, 17px)",
              opacity: 0.9,
              margin: 0,
              fontWeight: 500,
              letterSpacing: 0.2,
            }}
          >
            Conexión directa a UC San Joaquín
          </p>
        </div>
      </div>

      {/* ── Cuerpo artículo ────────────────────────────────────── */}
      <article style={{ maxWidth: 896, margin: "0 auto", padding: "48px 24px 80px" }}>

        {/* Párrafo introductorio */}
        <p
          style={{
            fontSize: 16,
            color: textPrimary,
            lineHeight: 1.8,
            marginBottom: 40,
            padding: "18px 22px",
            borderLeft: "4px solid var(--color-primary)",
            backgroundColor: cardBg,
            borderRadius: "0 10px 10px 0",
            border: `1px solid ${borderColor}`,
            borderLeftColor: "var(--color-primary)",
            borderLeftWidth: 4,
          }}
        >
          El siguiente documento detalla opciones de hospedaje reales, seguras y altamente
          calificadas para los asistentes al Coloquio. Se priorizan establecimientos con
          reseñas verificadas y buena conectividad con el campus UC San Joaquín, ubicados
          en las comunas más tranquilas y seguras:{" "}
          <strong>Providencia y Ñuñoa</strong>.
        </p>

        {/* ── SECCIÓN 1: Económicas ── */}
        <Section
          title="1. Opciones Económicas (Aprox. $20.000 – $30.000 CLP por persona)"
          borderColor={borderColor}
          textPrimary={textPrimary}
        >
          {ECONOMICOS.map((h) => (
            <HostalRow
              key={h.numero}
              hostal={h}
              textPrimary={textPrimary}
              textSecondary={textSecondary}
              borderColor={borderColor}
              cardBg={cardBg}
            />
          ))}
        </Section>

        {/* ── SECCIÓN 2: Boutique ── */}
        <Section
          title="2. Opciones Boutique y Mayor Presupuesto (Aprox. $40.000+ CLP por persona)"
          borderColor={borderColor}
          textPrimary={textPrimary}
        >
          {BOUTIQUE.map((h) => (
            <HostalRow
              key={h.numero}
              hostal={h}
              textPrimary={textPrimary}
              textSecondary={textSecondary}
              borderColor={borderColor}
              cardBg={cardBg}
            />
          ))}
        </Section>

        {/* ── SECCIÓN 3: Airbnb ── */}
        <Section
          title="3. Alternativas en Departamentos Privados (Plataforma Airbnb)"
          borderColor={borderColor}
          textPrimary={textPrimary}
        >
          <p style={{ fontSize: 15, color: textPrimary, lineHeight: 1.75, marginBottom: 20 }}>
            Para quienes prefieran privacidad y mayor autonomía, la plataforma Airbnb ofrece
            departamentos completos en el <strong>eje Vicuña Mackenna</strong> (entre Providencia
            y Ñuñoa), con precios que oscilan entre{" "}
            <strong style={{ color: "#10B981" }}>$25.000 y $35.000 CLP por noche</strong>, a
            pasos del Metro y con conexión directa a la UC San Joaquín.
          </p>

          {/* Alertas */}
          <div
            style={{
              backgroundColor: alertBg,
              border: `1px solid ${alertBorder}`,
              borderRadius: 10,
              padding: "16px 20px",
              marginBottom: 28,
            }}
          >
            <p
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "#92400E",
                textTransform: "uppercase",
                letterSpacing: 0.8,
                margin: "0 0 12px 0",
              }}
            >
              Consideraciones importantes
            </p>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              <li style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <AlertTriangle
                  size={16}
                  style={{ color: "#D97706", flexShrink: 0, marginTop: 2 }}
                />
                <span style={{ fontSize: 14, color: dark ? "#FCD34D" : "#78350F", lineHeight: 1.6 }}>
                  <strong>Rendición de Gastos:</strong> Los arrendatarios en Airbnb{" "}
                  <strong>no emiten boleta comercial chilena</strong>. Si requiere
                  documentación tributaria para reembolso, opte por los hostales listados.
                </span>
              </li>
              <li style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <AlertTriangle
                  size={16}
                  style={{ color: "#D97706", flexShrink: 0, marginTop: 2 }}
                />
                <span style={{ fontSize: 14, color: dark ? "#FCD34D" : "#78350F", lineHeight: 1.6 }}>
                  <strong>Seguridad y Estafas:</strong> Buscar exclusivamente anfitriones con
                  la insignia <strong>&quot;Superhost&quot;</strong> y calificación sobre{" "}
                  <strong>4.8 estrellas</strong>. No realizar pagos fuera de la plataforma.
                </span>
              </li>
            </ul>
          </div>

          {/* Botón Airbnb */}
          <a
            href="https://www.airbnb.cl/s/Providencia--Santiago--Regi%C3%B3n-Metropolitana/homes?refinement_paths%5B%5D=%2Fhomes&place_id=ChIJhfh7hwLZYpYRTYfBuBnqX0U"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              padding: "18px 28px",
              borderRadius: 12,
              backgroundColor: "#FF5A5F",
              color: "#FFFFFF",
              fontFamily: "var(--font-display)",
              fontSize: 17,
              fontWeight: 700,
              textDecoration: "none",
              transition: "opacity 0.2s",
              letterSpacing: 0.2,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            <ExternalLink size={20} />
            Ver zona recomendada en Airbnb
          </a>
        </Section>
      </article>
    </div>
  );
}
