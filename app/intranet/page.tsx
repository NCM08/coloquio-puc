// ============================================================
// app/intranet/page.tsx — INTRANET (Login UX accesible)
// ============================================================

"use client";

import { useState } from "react";
import { useTheme } from "@/components/ThemeProvider";

// ── Icono Google (SVG inline) ─────────────────────────────
function GoogleIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    </svg>
  );
}

// ── Icono UC (placeholder institucional) ──────────────────
function UCIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect width="40" height="40" rx="8" fill="#003087"/>
      <text x="50%" y="56%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold" fontFamily="serif">UC</text>
    </svg>
  );
}

export default function IntranetPage() {
  const { dark } = useTheme();

  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  // ── Tokens de color ───────────────────────────────────────
  const pageBg      = dark ? "var(--color-dark-900)" : "#F0F4FA";
  const cardBg      = dark ? "var(--color-dark-800)" : "#FFFFFF";
  const borderColor = dark ? "var(--color-dark-600)" : "#CCCCCC";
  const textPrimary = dark ? "var(--color-dark-100)" : "#1A1A2E";
  const textSecondary = dark ? "var(--color-dark-400)" : "#5A5A7A";
  const inputBg     = dark ? "var(--color-dark-700)" : "#F7F8FC";
  const accentColor = "var(--color-accent)";
  const focusRing   = dark ? "rgba(255,255,255,0.25)" : "rgba(13,71,161,0.25)";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Placeholder: lógica de autenticación futura
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: pageBg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        transition: "background-color 0.3s",
      }}
    >
      {/* ── Tarjeta de Login ────────────────────────────────── */}
      <div
        style={{
          width: "100%",
          maxWidth: 480,
          backgroundColor: cardBg,
          borderRadius: 20,
          border: `1px solid ${borderColor}`,
          boxShadow: dark
            ? "0 8px 32px rgba(0,0,0,0.5)"
            : "0 8px 40px rgba(13,71,161,0.10)",
          padding: "48px 40px 44px",
          transition: "background-color 0.3s",
        }}
      >
        {/* Encabezado */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 60,
              height: 60,
              borderRadius: 14,
              backgroundColor: dark ? "rgba(255,255,255,0.06)" : "#E8EDF7",
              marginBottom: 18,
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 28,
              fontWeight: 700,
              color: textPrimary,
              margin: "0 0 8px 0",
              lineHeight: 1.3,
            }}
          >
            Intranet Coloquio
          </h1>
          <p style={{ fontSize: 17, color: textSecondary, margin: 0, lineHeight: 1.6 }}>
            Acceso exclusivo para participantes registrados.
          </p>
        </div>

        {/* ── Botones de acceso social ─────────────────────────── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

          {/* Ingresar con cuenta UC */}
          <button
            type="button"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 14,
              width: "100%",
              minHeight: 60,
              padding: "14px 24px",
              borderRadius: 12,
              border: "2px solid #003087",
              backgroundColor: "#003087",
              color: "#FFFFFF",
              fontFamily: "var(--font-display)",
              fontSize: 18,
              fontWeight: 700,
              cursor: "pointer",
              letterSpacing: 0.2,
              transition: "opacity 0.2s, transform 0.1s",
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.88")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            onMouseDown={e => (e.currentTarget.style.transform = "scale(0.98)")}
            onMouseUp={e => (e.currentTarget.style.transform = "scale(1)")}
          >
            <UCIcon />
            Ingresar con cuenta UC
          </button>

          {/* Ingresar con Google */}
          <button
            type="button"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 14,
              width: "100%",
              minHeight: 60,
              padding: "14px 24px",
              borderRadius: 12,
              border: `2px solid ${dark ? "rgba(255,255,255,0.18)" : "#DADCE0"}`,
              backgroundColor: dark ? "rgba(255,255,255,0.06)" : "#FFFFFF",
              color: textPrimary,
              fontFamily: "var(--font-display)",
              fontSize: 18,
              fontWeight: 700,
              cursor: "pointer",
              letterSpacing: 0.2,
              transition: "background-color 0.2s, transform 0.1s",
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = dark ? "rgba(255,255,255,0.10)" : "#F5F5F5")}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = dark ? "rgba(255,255,255,0.06)" : "#FFFFFF")}
            onMouseDown={e => (e.currentTarget.style.transform = "scale(0.98)")}
            onMouseUp={e => (e.currentTarget.style.transform = "scale(1)")}
          >
            <GoogleIcon />
            Ingresar con Google
          </button>
        </div>

        {/* ── Separador ───────────────────────────────────────── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            margin: "32px 0",
          }}
        >
          <div style={{ flex: 1, height: 1, backgroundColor: borderColor }} />
          <span
            style={{
              fontSize: 15,
              fontWeight: 600,
              color: textSecondary,
              whiteSpace: "nowrap",
              padding: "0 4px",
            }}
          >
            O ingresar con correo
          </span>
          <div style={{ flex: 1, height: 1, backgroundColor: borderColor }} />
        </div>

        {/* ── Formulario clásico ───────────────────────────────── */}
        <form onSubmit={handleSubmit} noValidate>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

            {/* Campo Correo */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <label
                htmlFor="email"
                style={{
                  fontSize: 18,        // text-lg equivalente
                  fontWeight: 600,
                  color: textPrimary,
                  fontFamily: "var(--font-body)",
                  lineHeight: 1.4,
                }}
              >
                Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="ej. nombre@uc.cl"
                autoComplete="email"
                style={{
                  width: "100%",
                  minHeight: 52,
                  padding: "12px 16px",
                  borderRadius: 10,
                  border: `2px solid ${borderColor}`,
                  backgroundColor: inputBg,
                  color: textPrimary,
                  fontFamily: "var(--font-body)",
                  fontSize: 17,
                  outline: "none",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                  boxSizing: "border-box",
                }}
                onFocus={e => {
                  e.currentTarget.style.borderColor = accentColor;
                  e.currentTarget.style.boxShadow = `0 0 0 3px ${focusRing}`;
                }}
                onBlur={e => {
                  e.currentTarget.style.borderColor = borderColor;
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </div>

            {/* Campo Contraseña */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <label
                htmlFor="password"
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  color: textPrimary,
                  fontFamily: "var(--font-body)",
                  lineHeight: 1.4,
                }}
              >
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                style={{
                  width: "100%",
                  minHeight: 52,
                  padding: "12px 16px",
                  borderRadius: 10,
                  border: `2px solid ${borderColor}`,
                  backgroundColor: inputBg,
                  color: textPrimary,
                  fontFamily: "var(--font-body)",
                  fontSize: 17,
                  outline: "none",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                  boxSizing: "border-box",
                }}
                onFocus={e => {
                  e.currentTarget.style.borderColor = accentColor;
                  e.currentTarget.style.boxShadow = `0 0 0 3px ${focusRing}`;
                }}
                onBlur={e => {
                  e.currentTarget.style.borderColor = borderColor;
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </div>

            {/* Checkbox Recuérdame */}
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                cursor: "pointer",
                userSelect: "none",
              }}
            >
              <input
                type="checkbox"
                checked={remember}
                onChange={e => setRemember(e.target.checked)}
                style={{
                  width: 24,
                  height: 24,
                  minWidth: 24,
                  cursor: "pointer",
                  accentColor: accentColor,
                }}
              />
              <span
                style={{
                  fontSize: 17,
                  fontWeight: 500,
                  color: textPrimary,
                  fontFamily: "var(--font-body)",
                  lineHeight: 1.4,
                }}
              >
                Recuérdame
              </span>
            </label>

            {/* Botón Ingresar */}
            <button
              type="submit"
              style={{
                width: "100%",
                minHeight: 56,
                padding: "14px 24px",
                borderRadius: 12,
                border: "none",
                backgroundColor: accentColor,
                color: "#FFFFFF",
                fontFamily: "var(--font-display)",
                fontSize: 19,
                fontWeight: 700,
                cursor: "pointer",
                letterSpacing: 0.3,
                transition: "opacity 0.2s, transform 0.1s",
                marginTop: 4,
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.88")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
              onMouseDown={e => (e.currentTarget.style.transform = "scale(0.98)")}
              onMouseUp={e => (e.currentTarget.style.transform = "scale(1)")}
            >
              Ingresar
            </button>
          </div>
        </form>

        {/* Pie de la tarjeta */}
        <p
          style={{
            textAlign: "center",
            fontSize: 14,
            color: textSecondary,
            marginTop: 28,
            lineHeight: 1.6,
          }}
        >
          ¿Problemas para acceder?{" "}
          <a
            href="mailto:congresosociologiaclinica.2026@gmail.com"
            style={{
              color: accentColor,
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Contáctenos
          </a>
        </p>
      </div>
    </div>
  );
}
