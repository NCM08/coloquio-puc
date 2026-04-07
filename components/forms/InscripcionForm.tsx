// ============================================================
// components/forms/InscripcionForm.tsx — FORMULARIO MULTI-PASO
// ============================================================

"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, ChevronLeft, ChevronRight, Loader2, Lock, Upload, AlertCircle, AlertTriangle } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import allCountries from "world-countries";
import {
  inscripcionSchema,
  type InscripcionFormData,
  CALIDADES_ASISTENCIA,
  type CalidadAsistencia,
} from "@/lib/validations/inscripcionSchema";
import { procesarInscripcion } from "@/app/actions/inscripcion";
import { Turnstile } from "@marsidev/react-turnstile";

// ── Constantes ────────────────────────────────────────────────
const PASOS = ["Datos Personales", "Perfil de Participación", "Comprobante de Pago"];

// ── Tarifas oficiales (CLP) según tabla oficial ───────────────
const TARIFAS_CLP: Record<CalidadAsistencia, number> = {
  "Estudiante de pregrado - Asistente":                                       13000,
  "Estudiante de pregrado - Expositor":                                       16000,
  "Profesional de ciencias sociales/humanidades/artes - Asistente":           26000,
  "Profesional de ciencias sociales/humanidades/artes - Expositor":           34000,
  "Estudiante de posgrado - Asistente":                                       38000,
  "Estudiante de posgrado - Expositor":                                       54000,
  "Académico/a e investigador/a - Asistente":                                 55000,
  "Académico/a e investigador/a - Expositor":                                 80000,
};

const USD_POR_CLP = 950;

function calcularTarifa(calidad: string): { clp: number; usd: number } | null {
  const clp = TARIFAS_CLP[calidad as CalidadAsistencia];
  if (!clp) return null;
  return { clp, usd: Math.round(clp / USD_POR_CLP) };
}

function formatCLP(n: number): string {
  return `$${n.toLocaleString("es-CL")}`;
}

// ── Opciones agrupadas para la UI (tabla oficial) ─────────────
type OpcionCalidad = {
  label: string;
  value: CalidadAsistencia;
  clp: number;
  usd: number;
  esExpositor: boolean;
};

const OPCIONES: OpcionCalidad[] = CALIDADES_ASISTENCIA.map((v) => ({
  label:       v,
  value:       v,
  clp:         TARIFAS_CLP[v],
  usd:         Math.round(TARIFAS_CLP[v] / USD_POR_CLP),
  esExpositor: v.includes("Expositor"),
}));

const EJES_TEMATICOS = [
  "Subjetividad, identidad y lazo social",
  "Clínica social y prácticas comunitarias",
  "Violencias, trauma y memoria colectiva",
  "Género, cuerpo y sexualidades",
  "Trabajo, precariedad y sufrimiento social",
  "Migraciones, exilio y pertenencia",
  "Salud mental y políticas públicas",
  "Metodologías de investigación clínico-social",
  "Otro (especificar en el título)",
];

// ── Componente de indicador de paso ──────────────────────────
function StepIndicator({ current, total, dark }: { current: number; total: number; dark: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0, marginBottom: 40 }}>
      {Array.from({ length: total }).map((_, i) => {
        const done    = i < current;
        const active  = i === current;
        const accent  = "var(--color-accent)";
        const grayBg  = dark ? "rgba(255,255,255,0.1)" : "#D1D5DB";
        const lineDone = done ? accent : grayBg;

        return (
          <div key={i} style={{ display: "flex", alignItems: "center" }}>
            {i > 0 && (
              <div
                style={{
                  width: 48,
                  height: 2,
                  backgroundColor: lineDone,
                  transition: "background-color 0.3s",
                }}
              />
            )}
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: done ? accent : active ? accent : grayBg,
                border: active ? `3px solid ${accent}` : done ? "none" : `2px solid ${grayBg}`,
                boxShadow: active ? `0 0 0 4px ${dark ? "rgba(13,71,161,0.3)" : "rgba(13,71,161,0.15)"}` : "none",
                transition: "all 0.3s",
                flexShrink: 0,
              }}
            >
              {done ? (
                <CheckCircle size={18} color="#fff" />
              ) : (
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: active ? "#fff" : dark ? "rgba(255,255,255,0.4)" : "#9CA3AF",
                  }}
                >
                  {i + 1}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Componente de campo con error ─────────────────────────────
function Field({
  label,
  error,
  required,
  children,
  dark,
  hint,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  dark: boolean;
  hint?: string;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label
        style={{
          fontSize: 14,
          fontWeight: 600,
          color: dark ? "var(--color-dark-200)" : "#374151",
          fontFamily: "var(--font-body)",
        }}
      >
        {label}
        {required && <span style={{ color: "#E53E3E", marginLeft: 4 }}>*</span>}
      </label>
      {hint && (
        <p style={{ fontSize: 12, color: dark ? "var(--color-dark-400)" : "#6B7280", margin: 0 }}>
          {hint}
        </p>
      )}
      {children}
      {error && (
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <AlertCircle size={13} color="#E53E3E" />
          <span style={{ fontSize: 13, color: "#E53E3E" }}>{error}</span>
        </div>
      )}
    </div>
  );
}

// ── Estilos reutilizables para inputs ─────────────────────────
function inputStyle(dark: boolean, hasError: boolean): React.CSSProperties {
  return {
    width: "100%",
    padding: "11px 14px",
    borderRadius: 9,
    border: `1.5px solid ${hasError ? "#E53E3E" : dark ? "rgba(255,255,255,0.12)" : "#D1D5DB"}`,
    backgroundColor: dark ? "rgba(255,255,255,0.05)" : "#FFFFFF",
    color: dark ? "var(--color-dark-100)" : "#111827",
    fontSize: 15,
    fontFamily: "var(--font-body)",
    outline: "none",
    transition: "border-color 0.2s",
    boxSizing: "border-box",
  };
}

// ── Datos de países: bandera + nombre en español ──────────────
const COUNTRY_LIST = allCountries
  .map((c) => ({
    flag:  c.flag,
    spa:   c.translations?.spa?.common ?? c.name.common,
    search: [
      c.translations?.spa?.common ?? "",
      c.translations?.por?.common ?? "",
      c.translations?.fra?.common ?? "",
      c.name.common,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase(),
  }))
  .sort((a, b) => a.spa.localeCompare(b.spa, "es"));

// ── Buscador de países (Combobox) ─────────────────────────────
function CountryCombobox({
  value,
  onChange,
  dark,
  hasError,
}: {
  value: string;
  onChange: (v: string) => void;
  dark: boolean;
  hasError: boolean;
}) {
  function displayFor(spa: string) {
    const country = COUNTRY_LIST.find((c) => c.spa === spa);
    return country ? `${country.flag} ${country.spa}` : spa;
  }

  const [query, setQuery]       = useState(() => displayFor(value ?? ""));
  const [open, setOpen]         = useState(false);
  const wrapperRef              = useRef<HTMLDivElement>(null);

  // Sync display when form resets
  useEffect(() => { setQuery(displayFor(value ?? "")); }, [value]);

  // Close on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
        // If user typed something but didn't select, restore last valid value
        if (!COUNTRY_LIST.some((c) => c.spa === value)) {
          setQuery(displayFor(value ?? ""));
        }
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [query, value]);

  const filtered = useMemo(() => {
    // Strip a leading flag emoji + space so typing in a selected value still filters correctly
    const raw = query.trim();
    const strippedQuery = COUNTRY_LIST.some((c) => raw.startsWith(c.flag))
      ? raw.replace(/^\S+\s*/, "")
      : raw;
    const q = strippedQuery.toLowerCase();
    if (!q) return COUNTRY_LIST.slice(0, 50);
    return COUNTRY_LIST.filter((c) => c.search.includes(q)).slice(0, 60);
  }, [query]);

  function select(country: typeof COUNTRY_LIST[number]) {
    setQuery(`${country.flag} ${country.spa}`);
    onChange(country.spa);
    setOpen(false);
  }

  return (
    <div ref={wrapperRef} style={{ position: "relative", width: "100%" }}>
      <input
        type="text"
        autoComplete="off"
        value={query}
        placeholder="Escribe para buscar: Chile, Colombia, Brazil…"
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
          // Clear RHF value until a valid country is selected
          const matchedByDisplay = COUNTRY_LIST.find(
            (c) => `${c.flag} ${c.spa}` === e.target.value || c.spa === e.target.value
          );
          if (!matchedByDisplay) {
            onChange("");
          }
        }}
        onFocus={() => setOpen(true)}
        style={inputStyle(dark, hasError)}
      />
      {open && filtered.length > 0 && (
        <ul
          style={{
            position:        "absolute",
            top:             "calc(100% + 4px)",
            left:            0,
            right:           0,
            maxHeight:       220,
            overflowY:       "auto",
            zIndex:          1000,
            margin:          0,
            padding:         "4px 0",
            listStyle:       "none",
            borderRadius:    9,
            border:          `1.5px solid ${dark ? "rgba(255,255,255,0.15)" : "#D1D5DB"}`,
            backgroundColor: dark ? "var(--color-dark-800)" : "#FFFFFF",
            boxShadow:       "0 8px 24px rgba(0,0,0,0.12)",
          }}
        >
          {filtered.map((c) => (
            <li
              key={c.spa}
              onMouseDown={() => select(c)}
              style={{
                padding:    "9px 14px",
                cursor:     "pointer",
                fontSize:   14,
                fontFamily: "var(--font-body)",
                color:      dark ? "var(--color-dark-100)" : "#111827",
                display:    "flex",
                alignItems: "center",
                gap:        10,
                backgroundColor: value === c.spa
                  ? (dark ? "rgba(255,255,255,0.08)" : "#EFF6FF")
                  : "transparent",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLLIElement).style.backgroundColor =
                  dark ? "rgba(255,255,255,0.06)" : "#F3F4F6")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLLIElement).style.backgroundColor =
                  value === c.spa ? (dark ? "rgba(255,255,255,0.08)" : "#EFF6FF") : "transparent")
              }
            >
              <span style={{ fontSize: 20, lineHeight: 1 }}>{c.flag}</span>
              <span>{c.spa}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// COMPONENTE PRINCIPAL
// ════════════════════════════════════════════════════════════
export default function InscripcionForm() {
  const { dark } = useTheme();
  const [currentStep, setCurrentStep] = useState(0);
  const [submitResult, setSubmitResult] = useState<{ success: boolean; error?: string; id?: string } | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileKey, setTurnstileKey] = useState(0);
  const [archivoNombre, setArchivoNombre] = useState<string | null>(null);

  const cardBg      = dark ? "var(--color-dark-800)" : "#FFFFFF";
  const textPrimary = dark ? "var(--color-dark-100)" : "#111827";
  const textMuted   = dark ? "var(--color-dark-400)" : "#6B7280";
  const borderColor = dark ? "rgba(255,255,255,0.10)" : "#E5E7EB";

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<InscripcionFormData>({
    resolver: zodResolver(inscripcionSchema),
    mode: "onTouched",
  });

  const calidad     = watch("calidad_asistencia");
  const esExpositor = calidad?.includes("Expositor") ?? false;

  // ── Validación parcial al hacer "Siguiente" ────────────────
  const handleNext = async () => {
    let camposAValidar: (keyof InscripcionFormData)[] = [];

    if (currentStep === 0) {
      camposAValidar = ["nombre", "apellidos", "email", "nacionalidad"];
    } else if (currentStep === 1) {
      camposAValidar = ["calidad_asistencia"];
      if (esExpositor) {
        camposAValidar.push("titulo_ponencia", "eje_tematico", "confirmacion_aprobacion");
      }
    }

    const valid = await trigger(camposAValidar);
    if (valid) setCurrentStep((s) => s + 1);
  };

  // ── Submit final ───────────────────────────────────────────
  const onSubmit = async (data: InscripcionFormData) => {
    const fd = new FormData();

    fd.append("nombre",             data.nombre);
    fd.append("apellidos",          data.apellidos);
    fd.append("email",              data.email);
    fd.append("nacionalidad",       data.nacionalidad);
    fd.append("calidad_asistencia", data.calidad_asistencia);

    if (esExpositor) {
      if (data.titulo_ponencia) fd.append("titulo_ponencia", data.titulo_ponencia);
      if (data.eje_tematico)    fd.append("eje_tematico",    data.eje_tematico);
      fd.append("confirmacion_aprobacion", String(data.confirmacion_aprobacion ?? false));
    }

    if (data.comprobante_pago?.[0]) {
      fd.append("comprobante_pago", data.comprobante_pago[0]);
    }

    if (turnstileToken) {
      fd.append("turnstile_token", turnstileToken);
    }

    const result = await procesarInscripcion(fd);
    setSubmitResult({
      success: result.success,
      error:   result.success ? undefined : result.message,
      id:      result.inscripcionId,
    });
  };

  // ── Pantalla de éxito ─────────────────────────────────────
  if (submitResult?.success) {
    const numeroReferencia = submitResult.id
      ? `COL-${submitResult.id.substring(0, 8).toUpperCase()}`
      : '';
    return (
      <div
        style={{
          padding: "56px 40px",
          borderRadius: 20,
          backgroundColor: cardBg,
          border: `1px solid ${borderColor}`,
          textAlign: "center",
          maxWidth: 560,
          margin: "0 auto",
        }}
      >
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            backgroundColor: dark ? "rgba(16,185,129,0.15)" : "#D1FAE5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 24px",
          }}
        >
          <CheckCircle size={36} color="#10B981" />
        </div>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 26,
            fontWeight: 700,
            color: textPrimary,
            margin: "0 0 12px 0",
          }}
        >
          ¡Inscripción recibida!
        </h2>
        <p style={{ fontSize: 16, color: textMuted, lineHeight: 1.7, margin: "0 0 24px 0" }}>
          Su inscripción ha sido registrada exitosamente. En los próximos días recibirá
          un correo de confirmación con las instrucciones para el evento.
        </p>
        {submitResult.id && (
          <p
            style={{
              fontSize: 13,
              color: textMuted,
              backgroundColor: dark ? "rgba(255,255,255,0.05)" : "#F9FAFB",
              border: `1px solid ${borderColor}`,
              borderRadius: 8,
              padding: "10px 16px",
            }}
          >
            N.° de referencia: <strong style={{ color: textPrimary }}>{numeroReferencia}</strong>
          </p>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* ── Indicador de pasos ─────────────────────────────── */}
      <StepIndicator current={currentStep} total={PASOS.length} dark={dark} />

      {/* ── Título del paso actual ────────────────────────── */}
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 22,
          fontWeight: 700,
          color: textPrimary,
          margin: "0 0 28px 0",
          textAlign: "center",
        }}
      >
        {PASOS[currentStep]}
      </h2>

      {/* ────────────────────────────────────────────────────
          PASO 0 — DATOS PERSONALES
      ──────────────────────────────────────────────────── */}
      {currentStep === 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <Field label="Nombre" required error={errors.nombre?.message} dark={dark}>
              <input
                {...register("nombre")}
                placeholder="Ej. María José"
                style={inputStyle(dark, !!errors.nombre)}
              />
            </Field>
            <Field label="Apellidos" required error={errors.apellidos?.message} dark={dark}>
              <input
                {...register("apellidos")}
                placeholder="Ej. González Pérez"
                style={inputStyle(dark, !!errors.apellidos)}
              />
            </Field>
          </div>

          <Field
            label="Correo electrónico"
            required
            error={errors.email?.message}
            dark={dark}
            hint="Recibirá la confirmación de su inscripción en esta dirección."
          >
            <input
              {...register("email")}
              type="email"
              placeholder="nombre@institución.cl"
              style={inputStyle(dark, !!errors.email)}
            />
          </Field>

          <Field label="Nacionalidad" required error={errors.nacionalidad?.message} dark={dark}>
            <CountryCombobox
              value={watch("nacionalidad") ?? ""}
              onChange={(v) => setValue("nacionalidad", v, { shouldValidate: true, shouldTouch: true })}
              dark={dark}
              hasError={!!errors.nacionalidad}
            />
          </Field>
        </div>
      )}

      {/* ────────────────────────────────────────────────────
          PASO 1 — PERFIL DE PARTICIPACIÓN
      ──────────────────────────────────────────────────── */}
      {currentStep === 1 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <Field
            label="Seleccione su perfil de participación"
            required
            error={errors.calidad_asistencia?.message}
            dark={dark}
            hint="El monto a pagar depende de su perfil. Tarifas en CLP con referencia en USD (~$950 CLP/USD)."
          >
            {/* Registro oculto para RHF */}
            <input type="hidden" {...register("calidad_asistencia")} />

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {OPCIONES.map((op) => {
                const selected = calidad === op.value;
                return (
                  <button
                    key={op.value}
                    type="button"
                    onClick={() => setValue("calidad_asistencia", op.value, { shouldValidate: true })}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "14px 18px",
                      borderRadius: 10,
                      border: `2px solid ${
                        selected
                          ? "var(--color-accent)"
                          : errors.calidad_asistencia
                          ? "#E53E3E"
                          : dark
                          ? "rgba(255,255,255,0.10)"
                          : "#D1D5DB"
                      }`,
                      backgroundColor: selected
                        ? dark
                          ? "rgba(13,71,161,0.18)"
                          : "rgba(13,71,161,0.06)"
                        : dark
                        ? "rgba(255,255,255,0.03)"
                        : "#FAFAFA",
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "all 0.15s",
                      gap: 12,
                    }}
                  >
                    {/* Radio visual */}
                    <div
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: "50%",
                        border: `2px solid ${selected ? "var(--color-accent)" : dark ? "rgba(255,255,255,0.3)" : "#9CA3AF"}`,
                        backgroundColor: selected ? "var(--color-accent)" : "transparent",
                        flexShrink: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.15s",
                      }}
                    >
                      {selected && (
                        <div
                          style={{
                            width: 7,
                            height: 7,
                            borderRadius: "50%",
                            backgroundColor: "#fff",
                          }}
                        />
                      )}
                    </div>

                    {/* Etiqueta */}
                    <span
                      style={{
                        flex: 1,
                        fontSize: 14,
                        fontWeight: selected ? 600 : 400,
                        color: selected
                          ? dark ? "var(--color-dark-100)" : "#111827"
                          : dark ? "var(--color-dark-300)" : "#374151",
                        fontFamily: "var(--font-body)",
                        lineHeight: 1.4,
                      }}
                    >
                      {op.label}
                    </span>

                    {/* Precio */}
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <span
                        style={{
                          fontSize: 15,
                          fontWeight: 700,
                          color: selected
                            ? "var(--color-accent)"
                            : dark ? "var(--color-dark-200)" : "#374151",
                          fontFamily: "var(--font-display)",
                          display: "block",
                        }}
                      >
                        {formatCLP(op.clp)}
                      </span>
                      <span
                        style={{
                          fontSize: 11,
                          color: textMuted,
                          display: "block",
                        }}
                      >
                        ~ ${op.usd} USD
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </Field>

          {/* ── Sección expositor (condicional) ──────────── */}
          {esExpositor && (
            <div
              style={{
                padding: "24px",
                borderRadius: 14,
                backgroundColor: dark ? "rgba(13,71,161,0.08)" : "rgba(13,71,161,0.04)",
                border: `1px solid ${dark ? "rgba(13,71,161,0.3)" : "rgba(13,71,161,0.2)"}`,
                display: "flex",
                flexDirection: "column",
                gap: 20,
              }}
            >
              <p
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "var(--color-accent)",
                  margin: 0,
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                }}
              >
                Datos de la ponencia
              </p>

              <Field
                label="Título de la ponencia"
                required
                error={errors.titulo_ponencia?.message}
                dark={dark}
              >
                <input
                  {...register("titulo_ponencia")}
                  placeholder="Título completo de su presentación"
                  style={inputStyle(dark, !!errors.titulo_ponencia)}
                />
              </Field>

              <Field
                label="Eje temático"
                required
                error={errors.eje_tematico?.message}
                dark={dark}
              >
                <select
                  {...register("eje_tematico")}
                  style={{
                    ...inputStyle(dark, !!errors.eje_tematico),
                    cursor: "pointer",
                    appearance: "none",
                  }}
                >
                  <option value="">Seleccione un eje temático</option>
                  {EJES_TEMATICOS.map((eje) => (
                    <option key={eje} value={eje}>
                      {eje}
                    </option>
                  ))}
                </select>
              </Field>

              {/* Confirmación de aprobación por el Comité */}
              <div
                style={{
                  padding: "16px 18px",
                  borderRadius: 10,
                  backgroundColor: dark ? "rgba(234,179,8,0.08)" : "rgba(234,179,8,0.07)",
                  border: `1.5px solid ${errors.confirmacion_aprobacion ? "#E53E3E" : dark ? "rgba(234,179,8,0.35)" : "rgba(234,179,8,0.5)"}`,
                }}
              >
                <label
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 12,
                    cursor: "pointer",
                  }}
                >
                  <input
                    {...register("confirmacion_aprobacion")}
                    type="checkbox"
                    style={{
                      marginTop: 3,
                      width: 17,
                      height: 17,
                      flexShrink: 0,
                      accentColor: "var(--color-accent)",
                      cursor: "pointer",
                    }}
                  />
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <AlertTriangle size={15} color="#CA8A04" style={{ flexShrink: 0 }} />
                      <span
                        style={{
                          fontSize: 13,
                          fontWeight: 700,
                          color: dark ? "#FDE68A" : "#92400E",
                          textTransform: "uppercase",
                          letterSpacing: 0.4,
                        }}
                      >
                        Declaración obligatoria
                      </span>
                    </div>
                    <span
                      style={{
                        fontSize: 13,
                        color: dark ? "var(--color-dark-200)" : "#374151",
                        lineHeight: 1.6,
                      }}
                    >
                      Declaro que mi propuesta ha sido evaluada y{" "}
                      <strong style={{ color: dark ? "#FDE68A" : "#92400E" }}>APROBADA</strong>{" "}
                      formalmente por el Comité Científico del Coloquio. (Las inscripciones de
                      expositores no aprobados previamente serán anuladas)
                    </span>
                  </div>
                </label>
                {errors.confirmacion_aprobacion && (
                  <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 10 }}>
                    <AlertCircle size={13} color="#E53E3E" />
                    <span style={{ fontSize: 13, color: "#E53E3E" }}>
                      {errors.confirmacion_aprobacion.message}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ────────────────────────────────────────────────────
          PASO 2 — COMPROBANTE DE PAGO
      ──────────────────────────────────────────────────── */}
      {currentStep === 2 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Datos bancarios */}
          <div
            style={{
              padding: "24px 28px",
              borderRadius: 14,
              backgroundColor: dark ? "rgba(0,173,252,0.07)" : "#EFF8FF",
              border: `1.5px solid ${dark ? "rgba(0,173,252,0.3)" : "rgba(0,173,252,0.4)"}`,
            }}
          >
            <p
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: dark ? "#60C8F5" : "#0284C7",
                margin: "0 0 4px 0",
                textTransform: "uppercase",
                letterSpacing: 0.6,
              }}
            >
              Datos para la transferencia bancaria
            </p>
            <p style={{ fontSize: 14, color: textMuted, lineHeight: 1.65, margin: "0 0 16px 0" }}>
              Realiza la transferencia por el monto correspondiente a tu perfil y sube el comprobante aquí.
            </p>

            {/* Monto a transferir */}
            {(() => {
              const tarifa = calcularTarifa(calidad ?? "");
              return (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "14px 18px",
                    borderRadius: 10,
                    backgroundColor: dark ? "rgba(0,173,252,0.12)" : "rgba(0,173,252,0.12)",
                    border: `1.5px solid ${dark ? "rgba(0,173,252,0.45)" : "rgba(0,173,252,0.5)"}`,
                    marginBottom: 16,
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.8, color: dark ? "#60C8F5" : "#0284C7", margin: "0 0 4px 0" }}>
                      Monto a transferir
                    </p>
                    {tarifa ? (
                      <>
                        <p style={{ fontSize: 26, fontWeight: 800, color: dark ? "#FFFFFF" : "#0369A1", margin: 0, fontFamily: "var(--font-display)", lineHeight: 1.1 }}>
                          {formatCLP(tarifa.clp)} CLP
                        </p>
                        <p style={{ fontSize: 13, color: dark ? "#60C8F5" : "#0284C7", margin: "4px 0 0 0" }}>
                          ~ ${tarifa.usd} USD <span style={{ opacity: 0.7 }}>(referencial, ~$950 CLP/USD)</span>
                        </p>
                      </>
                    ) : (
                      <p style={{ fontSize: 15, color: textMuted, margin: 0, fontStyle: "italic" }}>
                        Seleccione su perfil en el paso anterior
                      </p>
                    )}
                  </div>
                  {calidad && (
                    <div style={{ textAlign: "right", maxWidth: 220 }}>
                      <p style={{ fontSize: 12, color: dark ? "#60C8F5" : "#0284C7", margin: 0, lineHeight: 1.5 }}>
                        {calidad}
                      </p>
                    </div>
                  )}
                </div>
              );
            })()}

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: 12,
              }}
            >
              {[
                { label: "Titular",       value: "Romina Estivalia Díaz Meza" },
                { label: "RUT",           value: "17.188.251-6" },
                { label: "Banco",         value: "Global66" },
                { label: "Tipo de cuenta", value: "Cuenta Vista" },
                { label: "N° de cuenta",  value: "10327090" },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  style={{
                    padding: "12px 16px",
                    borderRadius: 10,
                    backgroundColor: dark ? "var(--color-dark-800)" : "#FFFFFF",
                    border: `1px solid ${dark ? "rgba(0,173,252,0.2)" : "#BFDFEF"}`,
                  }}
                >
                  <p style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.7, color: textMuted, margin: "0 0 3px 0" }}>
                    {label}
                  </p>
                  <p style={{ fontSize: 15, fontWeight: 700, color: dark ? "var(--color-dark-100)" : "#111827", margin: 0 }}>
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Instrucciones de pago */}
          <div
            style={{
              padding: "20px 24px",
              borderRadius: 12,
              backgroundColor: dark ? "rgba(255,255,255,0.03)" : "#F0F4FA",
              border: `1px solid ${borderColor}`,
            }}
          >
            <p style={{ fontSize: 14, fontWeight: 700, color: textPrimary, margin: "0 0 10px 0" }}>
              Instrucciones de pago
            </p>
            <p style={{ fontSize: 14, color: textMuted, lineHeight: 1.7, margin: 0 }}>
              Realice su transferencia bancaria a la cuenta indicada arriba y
              adjunte el comprobante a continuación. El pago será verificado por el equipo
              organizador en un plazo de <strong style={{ color: textPrimary }}>2 a 5 días hábiles</strong>.
            </p>
          </div>

          <Field
            label="Comprobante de transferencia bancaria"
            required
            error={errors.comprobante_pago?.message as string | undefined}
            dark={dark}
            hint="Formatos aceptados: JPG, PNG, WEBP, PDF. Tamaño máximo: 10 MB."
          >
            {(() => {
              const { onChange: onComprobanteChange, ...comprobanteRest } = register("comprobante_pago");
              return (
                <label
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                    padding: "32px 24px",
                    borderRadius: 12,
                    border: `2px dashed ${
                      errors.comprobante_pago
                        ? "#E53E3E"
                        : archivoNombre
                        ? (dark ? "rgba(16,185,129,0.5)" : "#6EE7B7")
                        : dark ? "rgba(255,255,255,0.2)" : "#D1D5DB"
                    }`,
                    backgroundColor: archivoNombre
                      ? (dark ? "rgba(16,185,129,0.07)" : "rgba(16,185,129,0.05)")
                      : dark ? "rgba(255,255,255,0.02)" : "#FAFAFA",
                    cursor: "pointer",
                    textAlign: "center",
                    transition: "all 0.2s",
                  }}
                >
                  {archivoNombre ? (
                    <>
                      <CheckCircle size={28} color="#10B981" />
                      <div>
                        <p style={{ fontSize: 15, fontWeight: 600, color: "#10B981", margin: "0 0 4px 0" }}>
                          Archivo seleccionado
                        </p>
                        <p style={{ fontSize: 13, color: textMuted, margin: 0, wordBreak: "break-all" }}>
                          {archivoNombre}
                        </p>
                      </div>
                      <p style={{ fontSize: 12, color: textMuted, margin: 0 }}>
                        Haga clic para cambiar el archivo
                      </p>
                    </>
                  ) : (
                    <>
                      <Upload size={28} color={dark ? "rgba(255,255,255,0.35)" : "#9CA3AF"} />
                      <div>
                        <p style={{ fontSize: 15, fontWeight: 600, color: textPrimary, margin: "0 0 4px 0" }}>
                          Adjuntar comprobante de pago
                        </p>
                        <p style={{ fontSize: 13, color: textMuted, margin: 0 }}>
                          Haga clic para seleccionar el archivo
                        </p>
                      </div>
                    </>
                  )}
                  <input
                    {...comprobanteRest}
                    onChange={(e) => {
                      onComprobanteChange(e);
                      setArchivoNombre(e.target.files?.[0]?.name ?? null);
                    }}
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png,.webp,application/pdf,image/*"
                    style={{ display: "none" }}
                  />
                </label>
              );
            })()}
          </Field>

          {/* Nota de seguridad */}
          <div
            style={{
              display: "flex",
              gap: 10,
              alignItems: "flex-start",
              padding: "12px 16px",
              borderRadius: 9,
              backgroundColor: dark ? "rgba(16,185,129,0.07)" : "rgba(16,185,129,0.06)",
              border: `1px solid rgba(16,185,129,0.25)`,
            }}
          >
            <Lock size={16} color="#10B981" style={{ flexShrink: 0, marginTop: 2 }} />
            <p style={{ fontSize: 13, color: textMuted, margin: 0, lineHeight: 1.6 }}>
              Su información y archivos están protegidos mediante cifrado SSL. Solo el equipo
              organizador del coloquio tiene acceso a los documentos adjuntos.
            </p>
          </div>
        </div>
      )}

      {/* ── Error de envío ─────────────────────────────────── */}
      {submitResult?.success === false && submitResult.error && (
        <div
          style={{
            marginTop: 20,
            padding: "14px 18px",
            borderRadius: 10,
            backgroundColor: dark ? "rgba(229,62,62,0.1)" : "#FEF2F2",
            border: "1px solid rgba(229,62,62,0.35)",
            display: "flex",
            gap: 10,
            alignItems: "flex-start",
          }}
        >
          <AlertCircle size={18} color="#E53E3E" style={{ flexShrink: 0, marginTop: 1 }} />
          <p style={{ fontSize: 14, color: "#E53E3E", margin: 0, lineHeight: 1.6 }}>
            {submitResult.error}
          </p>
        </div>
      )}

      {/* ── Turnstile (solo en el último paso) ───────────────── */}
      {currentStep === PASOS.length - 1 && (
        <div style={{ display: "flex", justifyContent: "center", marginTop: 24 }}>
          <Turnstile
            key={turnstileKey}
            siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
            onSuccess={(token) => setTurnstileToken(token)}
            onExpire={() => { setTurnstileToken(null); setTurnstileKey((k) => k + 1); }}
            onError={() => { setTurnstileToken(null); setTurnstileKey((k) => k + 1); }}
          />
        </div>
      )}

      {/* ── Botones de navegación ─────────────────────────── */}
      <div
        style={{
          display: "flex",
          justifyContent: currentStep === 0 ? "flex-end" : "space-between",
          alignItems: "center",
          marginTop: 36,
          gap: 12,
        }}
      >
        {currentStep > 0 && (
          <button
            type="button"
            onClick={() => setCurrentStep((s) => s - 1)}
            disabled={isSubmitting}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 24px",
              borderRadius: 10,
              border: `1.5px solid ${borderColor}`,
              backgroundColor: "transparent",
              color: dark ? "var(--color-dark-300)" : "#374151",
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "var(--font-body)",
              transition: "all 0.2s",
              opacity: isSubmitting ? 0.5 : 1,
            }}
          >
            <ChevronLeft size={16} />
            Atrás
          </button>
        )}

        {currentStep < PASOS.length - 1 ? (
          <button
            type="button"
            onClick={handleNext}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 28px",
              borderRadius: 10,
              border: "none",
              backgroundColor: "var(--color-accent)",
              color: "#FFFFFF",
              fontSize: 15,
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "var(--font-display)",
              transition: "opacity 0.2s",
              letterSpacing: 0.2,
            }}
          >
            Siguiente
            <ChevronRight size={16} />
          </button>
        ) : (
          <button
            type="submit"
            disabled={isSubmitting || !turnstileToken}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "14px 36px",
              borderRadius: 10,
              border: "none",
              backgroundColor: (isSubmitting || !turnstileToken) ? "#6B7280" : "var(--color-accent)",
              color: "#FFFFFF",
              fontSize: 16,
              fontWeight: 700,
              cursor: (isSubmitting || !turnstileToken) ? "not-allowed" : "pointer",
              fontFamily: "var(--font-display)",
              transition: "background-color 0.2s",
              letterSpacing: 0.3,
            }}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} />
                Enviando inscripción…
              </>
            ) : (
              <>
                <Lock size={16} />
                Finalizar Inscripción
              </>
            )}
          </button>
        )}
      </div>

      {/* Contador de pasos */}
      <p
        style={{
          textAlign: "center",
          fontSize: 13,
          color: textMuted,
          margin: "20px 0 0 0",
        }}
      >
        Paso {currentStep + 1} de {PASOS.length}
      </p>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </form>
  );
}
