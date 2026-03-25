// ============================================================
// app/hospedaje/page.tsx — HOSPEDAJE
// ============================================================

"use client";

import { useTheme } from "@/components/ThemeProvider";
import Link from "next/link";
import { ChevronRight, Star, MapPin, DollarSign, ExternalLink } from "lucide-react";

// ── Estructura de datos: hoteles del PDF ──────────────────────
interface Hotel {
  nombre: string;
  estrellas: number;
  direccion: string;
  precio: number;
  mapQuery: string;
}

const HOTELES: Hotel[] = [
  {
    nombre: "Hostería San Carlos de Chiloé",
    estrellas: 4,
    direccion: "San Carlos de Chiloé 0192, Puente Alto",
    precio: 50000,
    mapQuery: "San+Carlos+de+Chiloé+0192+Puente+Alto+Chile",
  },
  {
    nombre: "Hotel San Andrés",
    estrellas: 3,
    direccion: "San Andrés 0184, Puente Alto",
    precio: 40000,
    mapQuery: "San+Andrés+0184+Puente+Alto+Chile",
  },
  {
    nombre: "Apart Hotel San Juan",
    estrellas: 3,
    direccion: "San Juan 0190, Puente Alto",
    precio: 45000,
    mapQuery: "San+Juan+0190+Puente+Alto+Chile",
  },
  {
    nombre: "Hotel San Pedro",
    estrellas: 2,
    direccion: "San Pedro 0188, Puente Alto",
    precio: 35000,
    mapQuery: "San+Pedro+0188+Puente+Alto+Chile",
  },
  {
    nombre: "Hostal San Pablo",
    estrellas: 1,
    direccion: "San Pablo 0186, Puente Alto",
    precio: 30000,
    mapQuery: "San+Pablo+0186+Puente+Alto+Chile",
  },
];

// ── Componente de estrellas ────────────────────────────────────
function StarRating({ count }: { count: number }) {
  return (
    <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={28}
          fill={i < count ? "var(--color-accent)" : "none"}
          stroke={i < count ? "var(--color-accent)" : "#BDBDBD"}
          strokeWidth={1.5}
        />
      ))}
      <span
        style={{
          marginLeft: 8,
          fontSize: 15,
          fontWeight: 600,
          color: "var(--color-accent)",
        }}
      >
        {count} {count === 1 ? "estrella" : "estrellas"}
      </span>
    </div>
  );
}

// ── Tarjeta de hotel ──────────────────────────────────────────
function HotelCard({
  hotel,
  cardBg,
  borderColor,
  textPrimary,
  textSecondary,
}: {
  hotel: Hotel;
  cardBg: string;
  borderColor: string;
  textPrimary: string;
  textSecondary: string;
}) {
  const mapsEmbedUrl = `https://www.google.com/maps?q=${hotel.mapQuery}&output=embed`;
  const mapsOpenUrl  = `https://www.google.com/maps/search/?api=1&query=${hotel.mapQuery}`;

  return (
    <div
      style={{
        backgroundColor: cardBg,
        border: `1px solid ${borderColor}`,
        borderRadius: 16,
        overflow: "hidden",
        boxShadow: "0 2px 12px rgba(0,0,0,0.07), 0 6px 24px rgba(0,173,252,0.08)",
        display: "flex",
        flexDirection: "column",
        transition: "box-shadow 0.2s",
      }}
    >
      {/* ── Cabecera de la tarjeta ─────────────────────────── */}
      <div
        style={{
          padding: "28px 28px 20px 28px",
        }}
      >
        {/* Nombre */}
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(20px, 3vw, 24px)",
            fontWeight: 700,
            color: "var(--color-primary)",
            margin: "0 0 12px 0",
            lineHeight: 1.25,
          }}
        >
          {hotel.nombre}
        </h2>

        {/* Estrellas */}
        <div style={{ marginBottom: 20 }}>
          <StarRating count={hotel.estrellas} />
        </div>

        {/* Dirección */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 10,
            marginBottom: 14,
          }}
        >
          <MapPin
            size={22}
            style={{ color: "var(--color-primary)", flexShrink: 0, marginTop: 2 }}
          />
          <p
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: textPrimary,
              margin: 0,
              lineHeight: 1.4,
            }}
          >
            {hotel.direccion}
          </p>
        </div>

        {/* Precio */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <DollarSign
            size={22}
            style={{ color: "var(--color-accent)", flexShrink: 0 }}
          />
          <p
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: "var(--color-accent)",
              margin: 0,
            }}
          >
            ${hotel.precio.toLocaleString("es-CL")} CLP
            <span
              style={{
                fontSize: 14,
                fontWeight: 400,
                color: textSecondary,
                marginLeft: 8,
              }}
            >
              por noche
            </span>
          </p>
        </div>
      </div>

      {/* ── Mapa de Google Maps ────────────────────────────── */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: 280,
          borderTop: `1px solid ${borderColor}`,
        }}
      >
        {/* Capa bloqueadora de eventos del mapa (evita zoom accidental) */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            pointerEvents: "none",
          }}
        />
        <iframe
          src={mapsEmbedUrl}
          width="100%"
          height="100%"
          style={{
            border: "none",
            display: "block",
            pointerEvents: "none",
          }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Mapa de ${hotel.nombre}`}
          allowFullScreen={false}
        />
      </div>

      {/* ── Botón Abrir en Google Maps ─────────────────────── */}
      <div style={{ padding: "20px 28px 28px 28px" }}>
        <a
          href={mapsOpenUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            padding: "16px 24px",
            borderRadius: 12,
            backgroundColor: "var(--color-primary)",
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
          Abrir en Google Maps
        </a>
      </div>
    </div>
  );
}

// ── Página principal ──────────────────────────────────────────
export default function HospedajePage() {
  const { dark } = useTheme();

  const bg            = dark ? "var(--color-dark-900)" : "#F7F7F7";
  const cardBg        = dark ? "var(--color-dark-800)" : "#FFFFFF";
  const borderColor   = dark ? "var(--color-dark-700)" : "#DDDDDD";
  const textPrimary   = dark ? "var(--color-dark-100)" : "#424242";
  const textSecondary = dark ? "var(--color-dark-400)" : "#6B6B6B";

  return (
    <div
      style={{
        backgroundColor: bg,
        minHeight: "100vh",
        transition: "background-color 0.3s",
      }}
    >
      {/* ── Encabezado ──────────────────────────────────────────── */}
      <div
        style={{
          padding: "48px 24px",
          backgroundColor: dark ? "var(--color-dark-800)" : "var(--color-primary)",
          color: "#FFFFFF",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 14,
              opacity: 0.75,
              marginBottom: 16,
            }}
          >
            <Link href="/" style={{ color: "#fff", textDecoration: "none" }}>
              Inicio
            </Link>
            <ChevronRight size={14} />
            <span>Hospedaje</span>
          </div>

          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(30px, 5vw, 48px)",
              fontWeight: 700,
              marginBottom: 14,
              lineHeight: 1.15,
            }}
          >
            Opciones de Alojamiento Recomendado
          </h1>

          <p
            style={{
              fontSize: "clamp(16px, 2.5vw, 19px)",
              opacity: 0.85,
              maxWidth: 680,
              lineHeight: 1.7,
            }}
          >
            A continuación encontrará una selección de hoteles cercanos al lugar del
            evento, con distintas categorías y rangos de precios para adaptarse a sus
            necesidades.
          </p>
        </div>
      </div>

      {/* ── Nota informativa ────────────────────────────────────── */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px 0 24px" }}>
        <div
          style={{
            padding: "18px 24px",
            borderRadius: 12,
            backgroundColor: dark
              ? "rgba(0,173,252,0.08)"
              : "rgba(0,173,252,0.06)",
            border: "1px solid rgba(0,173,252,0.25)",
            display: "flex",
            gap: 14,
            alignItems: "flex-start",
          }}
        >
          <MapPin
            size={22}
            style={{ color: "var(--color-primary)", flexShrink: 0, marginTop: 2 }}
          />
          <p
            style={{
              fontSize: 16,
              color: textPrimary,
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            Todos los alojamientos listados se encuentran en <strong>Puente Alto, Santiago de Chile</strong>,
            a pocos minutos del recinto del evento. Los precios indicados son referenciales
            y están sujetos a disponibilidad.
          </p>
        </div>
      </div>

      {/* ── Grilla de hoteles ────────────────────────────────────── */}
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "48px 24px 80px 24px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: 32,
        }}
      >
        {HOTELES.map((hotel) => (
          <HotelCard
            key={hotel.nombre}
            hotel={hotel}
            cardBg={cardBg}
            borderColor={borderColor}
            textPrimary={textPrimary}
            textSecondary={textSecondary}
          />
        ))}
      </div>
    </div>
  );
}
