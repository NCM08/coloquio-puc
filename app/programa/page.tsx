// ============================================================
// app/programa/page.tsx — PROGRAMA
// ============================================================

"use client";

import { useState } from "react";
import { useTheme } from "@/components/ThemeProvider";
import Link from "next/link";
import { ChevronRight, Clock, MapPin, Mic, Coffee, Users } from "lucide-react";

const DAYS = [
    { label: "Día 1", date: "Jueves 15 Oct" },
    { label: "Día 2", date: "Viernes 16 Oct" },
    { label: "Día 3", date: "Sábado 17 Oct" },
];

type ScheduleItem = {
    time: string;
    title: string;
    speaker?: string;
    location: string;
    type: "keynote" | "session" | "break" | "social";
};

const SCHEDULE: Record<number, ScheduleItem[]> = {
    0: [
        { time: "08:30 — 09:00", title: "Acreditación y bienvenida", location: "Hall Central", type: "break" },
        { time: "09:00 — 10:30", title: "Ceremonia de inauguración y conferencia magistral", speaker: "Dra. María González", location: "Auditorio Principal", type: "keynote" },
        { time: "10:30 — 11:00", title: "Coffee break", location: "Hall Central", type: "break" },
        { time: "11:00 — 13:00", title: "Sesiones de ponencias paralelas", location: "Salas A1–A4", type: "session" },
        { time: "13:00 — 14:30", title: "Almuerzo libre", location: "", type: "break" },
        { time: "14:30 — 16:00", title: "Simposios temáticos", location: "Salas B1–B3", type: "session" },
        { time: "16:00 — 16:30", title: "Coffee break", location: "Hall Central", type: "break" },
        { time: "16:30 — 18:00", title: "Mesa redonda: Desafíos de la educación pública", location: "Auditorio Principal", type: "keynote" },
    ],
    1: [
        { time: "09:00 — 10:30", title: "Conferencia magistral", speaker: "Dr. Carlos Mendoza", location: "Auditorio Principal", type: "keynote" },
        { time: "10:30 — 11:00", title: "Coffee break", location: "Hall Central", type: "break" },
        { time: "11:00 — 13:00", title: "Sesiones de ponencias paralelas", location: "Salas A1–A4", type: "session" },
        { time: "13:00 — 14:30", title: "Almuerzo libre", location: "", type: "break" },
        { time: "14:30 — 16:00", title: "Sesión de pósters", location: "Hall de Exposiciones", type: "session" },
        { time: "16:00 — 16:30", title: "Coffee break", location: "Hall Central", type: "break" },
        { time: "16:30 — 18:00", title: "Simposios temáticos", location: "Salas B1–B3", type: "session" },
        { time: "20:00", title: "Cena de networking", location: "Por confirmar", type: "social" },
    ],
    2: [
        { time: "09:00 — 10:30", title: "Conferencia magistral", speaker: "Dra. Ana Beatriz Silva", location: "Auditorio Principal", type: "keynote" },
        { time: "10:30 — 11:00", title: "Coffee break", location: "Hall Central", type: "break" },
        { time: "11:00 — 12:30", title: "Sesiones de ponencias paralelas", location: "Salas A1–A4", type: "session" },
        { time: "12:30 — 13:30", title: "Panel de cierre: Perspectivas futuras", location: "Auditorio Principal", type: "keynote" },
        { time: "13:30 — 14:00", title: "Ceremonia de clausura", location: "Auditorio Principal", type: "keynote" },
    ],
};

const TYPE_CONFIG = {
    keynote: { icon: Mic, color: "var(--color-accent)" },
    session: { icon: Users, color: "var(--color-primary)" },
    break: { icon: Coffee, color: "var(--color-dark-400)" },
    social: { icon: Users, color: "#4CAF50" },
};

export default function ProgramaPage() {
    const { dark } = useTheme();
    const [activeDay, setActiveDay] = useState(0);

    return (
        <div
        style={{
            backgroundColor: dark ? "var(--color-dark-900)" : "var(--color-dark-50)",
            minHeight: "100vh",
            transition: "background-color 0.3s",
        }}
        >
        {/* Page Header */}
        <div style={{ padding: "48px 24px", backgroundColor: dark ? "var(--color-dark-800)" : "var(--color-primary)", color: "#FFFFFF" }}>
            <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, opacity: 0.6, marginBottom: 16 }}>
                <Link href="/" style={{ color: "#fff", textDecoration: "none" }}>Inicio</Link>
                <ChevronRight size={14} />
                <span>Programa</span>
            </div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 700, marginBottom: 12 }}>
                Programa
            </h1>
            <p style={{ fontSize: 18, opacity: 0.8, maxWidth: 600, lineHeight: 1.6 }}>
                Tres días de conferencias, ponencias, mesas redondas y espacios de encuentro.
            </p>
            </div>
        </div>

        <div style={{ maxWidth: 800, margin: "0 auto", padding: "48px 24px" }}>
            {/* Day tabs */}
            <div
            style={{
                display: "flex",
                gap: 4,
                marginBottom: 40,
                padding: 4,
                borderRadius: 12,
                backgroundColor: dark ? "var(--color-dark-800)" : "#FFFFFF",
                border: `1px solid ${dark ? "var(--color-dark-700)" : "var(--color-dark-100)"}`,
            }}
            >
            {DAYS.map((day, index) => (
                <button
                key={index}
                onClick={() => setActiveDay(index)}
                style={{
                    flex: 1,
                    padding: "14px 16px",
                    borderRadius: 8,
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "var(--font-body)",
                    transition: "all 0.2s",
                    backgroundColor: activeDay === index ? (dark ? "var(--color-accent)" : "var(--color-primary)") : "transparent",
                    color: activeDay === index ? "#FFFFFF" : dark ? "var(--color-dark-400)" : "var(--color-dark-500)",
                }}
                >
                <div style={{ fontSize: 15, fontWeight: 600 }}>{day.label}</div>
                <div style={{ fontSize: 12, opacity: 0.7 }}>{day.date}</div>
                </button>
            ))}
            </div>

            {/* Schedule items */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {SCHEDULE[activeDay].map((item, index) => {
                const config = TYPE_CONFIG[item.type];
                const Icon = config.icon;
                const isBreak = item.type === "break";

                return (
                <div
                    key={index}
                    style={{
                    display: "flex",
                    gap: 16,
                    padding: isBreak ? "12px 16px" : "20px 16px",
                    borderRadius: 12,
                    backgroundColor: isBreak
                        ? "transparent"
                        : dark ? "var(--color-dark-800)" : "#FFFFFF",
                    border: isBreak
                        ? "none"
                        : `1px solid ${dark ? "var(--color-dark-700)" : "var(--color-dark-100)"}`,
                    opacity: isBreak ? 0.6 : 1,
                    alignItems: "flex-start",
                    }}
                >
                    {/* Time */}
                    <div style={{ minWidth: 110, flexShrink: 0 }}>
                    <div style={{
                        display: "flex", alignItems: "center", gap: 6,
                        fontSize: 13, fontWeight: 600,
                        color: dark ? "var(--color-dark-400)" : "var(--color-dark-500)",
                    }}>
                        <Clock size={13} />
                        {item.time}
                    </div>
                    </div>

                    {/* Icon */}
                    <div
                    style={{
                        width: 32,
                        height: 32,
                        borderRadius: 8,
                        backgroundColor: dark ? "rgba(255,255,255,0.05)" : "var(--color-dark-50)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                    }}
                    >
                    <Icon size={16} style={{ color: config.color }} />
                    </div>

                    {/* Content */}
                    <div style={{ flex: 1 }}>
                    <p style={{
                        fontSize: isBreak ? 14 : 15,
                        fontWeight: isBreak ? 400 : 600,
                        color: dark ? "var(--color-dark-200)" : "var(--color-dark-700)",
                        marginBottom: item.speaker ? 4 : 0,
                    }}>
                        {item.title}
                    </p>
                    {item.speaker && (
                        <p style={{ fontSize: 13, color: "var(--color-accent)", fontWeight: 500 }}>
                        {item.speaker}
                        </p>
                    )}
                    {item.location && (
                        <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 4, fontSize: 12, color: dark ? "var(--color-dark-500)" : "var(--color-dark-400)" }}>
                        <MapPin size={11} />
                        {item.location}
                        </div>
                    )}
                    </div>
                </div>
                );
            })}
            </div>
        </div>
        </div>
    );
}