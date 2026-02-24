// ============================================================
// app/equipo/page.tsx — EQUIPO ORGANIZADOR
// ============================================================

"use client";

import { useState } from "react";
import { useTheme } from "@/components/ThemeProvider";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

// Tabs de comités
const TABS = ["Comité Organizador", "Comité Científico", "Comité Web"];

// Miembros placeholder
const MEMBERS: Record<string, Array<{ name: string; role: string; dept: string; initials: string }>> = {
    "Comité Organizador": [
        { name: "Dra. Patricia Herrera", role: "Coordinadora General", dept: "Facultad de Educación", initials: "PH" },
        { name: "Dr. Alejandro Ruiz", role: "Coordinador Académico", dept: "Departamento de Pedagogía", initials: "AR" },
        { name: "Mg. Carolina Torres", role: "Coordinadora Logística", dept: "Facultad de Educación", initials: "CT" },
        { name: "Mg. Diego Soto", role: "Coordinador de Comunicaciones", dept: "Dirección de Extensión", initials: "DS" },
        { name: "Dra. Valentina Muñoz", role: "Coordinadora de Finanzas", dept: "Facultad de Educación", initials: "VM" },
        { name: "Dr. Felipe Araya", role: "Coordinador Internacional", dept: "Relaciones Internacionales", initials: "FA" },
    ],
    "Comité Científico": [
        { name: "Dr. Roberto Campos", role: "Presidente", dept: "Investigación Educativa", initials: "RC" },
        { name: "Dra. Isabel Ramos", role: "Evaluadora", dept: "Currículum y Evaluación", initials: "IR" },
        { name: "Dr. Martín Vega", role: "Evaluador", dept: "Políticas Educativas", initials: "MV" },
        { name: "Dra. Laura Díaz", role: "Evaluadora", dept: "Psicología Educacional", initials: "LD" },
        { name: "Dr. Andrés Molina", role: "Evaluador", dept: "Didáctica de las Ciencias", initials: "AM" },
        { name: "Dra. Camila Fuentes", role: "Evaluadora", dept: "Tecnología Educativa", initials: "CF" },
        { name: "Dr. Nicolás Bravo", role: "Evaluador", dept: "Educación Inclusiva", initials: "NB" },
        { name: "Dra. Francisca León", role: "Evaluadora", dept: "Formación Docente", initials: "FL" },
    ],
    "Comité Web": [
        { name: "Ing. Sebastián Mora", role: "Desarrollador Principal", dept: "Tecnología Educativa", initials: "SM" },
        { name: "Dis. Antonia Vargas", role: "Diseñadora UX/UI", dept: "Comunicaciones", initials: "AV" },
        { name: "Ing. Tomás Reyes", role: "Soporte Técnico", dept: "Informática", initials: "TR" },
    ],
};

export default function EquipoPage() {
    const { dark } = useTheme();
    const [activeTab, setActiveTab] = useState(0);
    const currentMembers = MEMBERS[TABS[activeTab]];

    return (
        <div
        style={{
            backgroundColor: dark ? "var(--color-dark-900)" : "var(--color-dark-50)",
            minHeight: "100vh",
            transition: "background-color 0.3s",
        }}
        >
        {/* Page Header */}
        <div
            style={{
            padding: "48px 24px",
            backgroundColor: dark ? "var(--color-dark-800)" : "var(--color-primary)",
            color: "#FFFFFF",
            }}
        >
            <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, opacity: 0.6, marginBottom: 16 }}>
                <Link href="/" style={{ color: "#fff", textDecoration: "none" }}>Inicio</Link>
                <ChevronRight size={14} />
                <span>Equipo</span>
            </div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 700, marginBottom: 12 }}>
                Equipo Organizador
            </h1>
            <p style={{ fontSize: 18, opacity: 0.8, maxWidth: 600, lineHeight: 1.6 }}>
                Conoce a las personas detrás del Coloquio de Educación y Pedagogía.
            </p>
            </div>
        </div>

        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "48px 24px" }}>

            {/* Tabs */}
            <div
            style={{
                display: "flex",
                gap: 4,
                marginBottom: 40,
                padding: 4,
                borderRadius: 12,
                backgroundColor: dark ? "var(--color-dark-800)" : "#FFFFFF",
                border: `1px solid ${dark ? "var(--color-dark-700)" : "var(--color-dark-100)"}`,
                overflow: "auto",
            }}
            >
            {TABS.map((tab, index) => (
                <button
                key={tab}
                onClick={() => setActiveTab(index)}
                style={{
                    flex: 1,
                    padding: "12px 20px",
                    borderRadius: 8,
                    border: "none",
                    cursor: "pointer",
                    fontSize: 14,
                    fontWeight: 600,
                    fontFamily: "var(--font-body)",
                    whiteSpace: "nowrap",
                    transition: "all 0.2s",
                    backgroundColor: activeTab === index
                    ? dark ? "var(--color-accent)" : "var(--color-primary)"
                    : "transparent",
                    color: activeTab === index
                    ? "#FFFFFF"
                    : dark ? "var(--color-dark-400)" : "var(--color-dark-500)",
                }}
                >
                {tab}
                </button>
            ))}
            </div>

            {/* Grid de miembros */}
            <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: 16,
            }}
            >
            {currentMembers.map((member, index) => (
                <div
                key={index}
                style={{
                    padding: 24,
                    borderRadius: 16,
                    border: `1px solid ${dark ? "var(--color-dark-700)" : "var(--color-dark-100)"}`,
                    backgroundColor: dark ? "var(--color-dark-800)" : "#FFFFFF",
                    textAlign: "center",
                    transition: "all 0.2s",
                }}
                onMouseOver={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = dark ? "0 4px 20px rgba(0,0,0,0.3)" : "var(--shadow-medium)";
                }}
                onMouseOut={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                }}
                >
                {/* Avatar */}
                <div
                    style={{
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    margin: "0 auto 16px",
                    backgroundColor: dark ? "var(--color-dark-700)" : "var(--color-primary-50)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-display)",
                    fontSize: 22,
                    fontWeight: 700,
                    color: dark ? "var(--color-dark-300)" : "var(--color-primary)",
                    }}
                >
                    {member.initials}
                </div>

                <h3
                    style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: dark ? "var(--color-dark-100)" : "var(--color-dark-700)",
                    marginBottom: 4,
                    fontFamily: "var(--font-body)",
                    }}
                >
                    {member.name}
                </h3>
                <p style={{ fontSize: 13, fontWeight: 600, color: "var(--color-accent)", marginBottom: 4 }}>
                    {member.role}
                </p>
                <p style={{ fontSize: 12, color: dark ? "var(--color-dark-500)" : "var(--color-dark-400)" }}>
                    {member.dept}
                </p>
                </div>
            ))}
            </div>
        </div>
        </div>
    );
}