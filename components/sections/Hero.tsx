// ============================================================
// components/sections/Hero.tsx — HERO RESPONSIVE FINAL
// ============================================================

"use client";

import { useState, useEffect, useMemo } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { CalendarDays, MapPin, Globe, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

function Countdown() {
    const targetDate = useMemo(() => new Date("2026-10-15T09:00:00"), []);
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const tick = () => {
        const now = new Date();
        const diff = targetDate.getTime() - now.getTime();
        if (diff <= 0) return;
        setTimeLeft({
            days: Math.floor(diff / (1000 * 60 * 60 * 24)),
            hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((diff % (1000 * 60)) / 1000),
        });
        };
        tick();
        const interval = setInterval(tick, 1000);
        return () => clearInterval(interval);
    }, [targetDate]);

    const items = [
        { label: "Días", value: timeLeft.days },
        { label: "Horas", value: timeLeft.hours },
        { label: "Minutos", value: timeLeft.minutes },
        { label: "Segundos", value: timeLeft.seconds },
    ];

    return (
        <div className="countdown-grid">
        {items.map((item, i) => (
            <motion.div
            key={item.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 + i * 0.1, ease: "easeOut" }}
            className="countdown-card"
            >
            <span className="countdown-number">{String(item.value).padStart(2, "0")}</span>
            <span className="countdown-label">{item.label}</span>
            </motion.div>
        ))}
        </div>
    );
}

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

export default function Hero() {
    const { dark } = useTheme();

    return (
        <>
        <section
            style={{
            position: "relative", overflow: "hidden",
            background: dark
                ? "linear-gradient(160deg, var(--color-dark-900) 0%, #0a1628 50%, var(--color-dark-800) 100%)"
                : "linear-gradient(160deg, var(--color-primary-800) 0%, var(--color-primary) 40%, var(--color-primary-600) 100%)",
            color: "#FFFFFF", textAlign: "center",
            }}
            className="hero-section"
        >
            {/* Patrón decorativo */}
            <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)", backgroundSize: "40px 40px", pointerEvents: "none" }} />
            <div style={{ position: "absolute", top: -200, right: -200, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(212,168,67,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />

            <motion.div variants={containerVariants} initial="hidden" animate="visible" style={{ position: "relative", zIndex: 1, maxWidth: 800, margin: "0 auto" }}>

            {/* Logo */}
            <motion.div variants={itemVariants} style={{ marginBottom: 24, display: "flex", justifyContent: "center" }}>
                <Image
                src="/images/logo-puc-blanco.png"
                alt="Pontificia Universidad Católica de Chile"
                width={300}
                height={173}
                className="hero-logo"
                style={{ width: "auto", opacity: 0.9 }}
                priority
                />
            </motion.div>

            <motion.p variants={itemVariants} style={{ fontSize: 13, fontWeight: 600, textTransform: "uppercase", letterSpacing: 3, color: "var(--color-accent-300)", marginBottom: 20, fontFamily: "var(--font-body)" }}>
                Facultad de Educación
            </motion.p>

            <motion.h1 variants={itemVariants} className="hero-title">
                Coloquio de Educación{" "}<br />
                <span style={{ color: "var(--color-accent-300)" }}>y Pedagogía</span>
            </motion.h1>

            <motion.p variants={itemVariants} className="hero-subtitle">
                Desafíos contemporáneos de la educación: construir conocimiento desde la investigación y la práctica docente
            </motion.p>

            {/* Datos clave */}
            <motion.div variants={itemVariants} className="hero-data">
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <CalendarDays size={18} style={{ color: "var(--color-accent)" }} /><span>15 — 17 Octubre 2026</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <MapPin size={18} style={{ color: "var(--color-accent)" }} /><span>Campus San Joaquín</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Globe size={18} style={{ color: "var(--color-accent)" }} /><span>Presencial + Online</span>
                </div>
            </motion.div>

            {/* Countdown */}
            <motion.div variants={itemVariants} style={{ marginBottom: 40 }}>
                <p style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: 2, color: "rgba(255,255,255,0.4)", marginBottom: 12 }}>
                Faltan para el coloquio
                </p>
                <Countdown />
            </motion.div>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="hero-ctas">
                <Link href="/inscripciones" className="hero-btn-primary">
                Inscribirse <ArrowRight size={18} />
                </Link>
                <Link href="/convocatoria" className="hero-btn-secondary">
                Ver convocatoria
                </Link>
            </motion.div>
            </motion.div>
        </section>

        {/* ====== RESPONSIVE STYLES ====== */}
        <style>{`
            .hero-section {
            padding: 96px 24px 80px;
            }
            .hero-logo { height: 80px; }
            .hero-title {
            font-family: var(--font-display);
            font-size: clamp(32px, 6vw, 60px);
            font-weight: 800;
            line-height: 1.1;
            margin: 0 0 20px;
            color: #FFFFFF;
            }
            .hero-subtitle {
            font-size: clamp(15px, 2.5vw, 20px);
            font-weight: 400;
            line-height: 1.6;
            color: rgba(255,255,255,0.75);
            max-width: 600;
            margin: 0 auto 32px;
            font-family: var(--font-body);
            }
            .hero-data {
            display: flex;
            gap: 32px;
            justify-content: center;
            flex-wrap: wrap;
            margin-bottom: 40px;
            font-size: 15px;
            font-weight: 500;
            color: rgba(255,255,255,0.8);
            }
            .countdown-grid {
            display: flex;
            gap: 16px;
            justify-content: center;
            flex-wrap: wrap;
            }
            .countdown-card {
            display: flex;
            flex-direction: column;
            align-items: center;
            min-width: 72px;
            padding: 12px 16px;
            border-radius: 12px;
            background-color: rgba(255,255,255,0.08);
            backdrop-filter: blur(8px);
            border: 1px solid rgba(255,255,255,0.1);
            }
            .countdown-number {
            font-family: var(--font-display);
            font-size: 32px;
            font-weight: 700;
            color: var(--color-accent);
            line-height: 1;
            }
            .countdown-label {
            font-size: 11px;
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: rgba(255,255,255,0.6);
            margin-top: 4px;
            }
            .hero-ctas {
            display: flex;
            gap: 16px;
            justify-content: center;
            flex-wrap: wrap;
            }
            .hero-btn-primary {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            height: 52px;
            padding: 0 32px;
            background: linear-gradient(135deg, var(--color-accent), var(--color-accent-600));
            color: #fff;
            font-size: 16px;
            font-weight: 600;
            font-family: var(--font-body);
            border-radius: 10px;
            text-decoration: none;
            box-shadow: var(--shadow-accent);
            transition: all 0.2s;
            }
            .hero-btn-primary:hover { transform: translateY(-2px); }
            .hero-btn-secondary {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            height: 52px;
            padding: 0 32px;
            background-color: transparent;
            color: #fff;
            font-size: 16px;
            font-weight: 500;
            font-family: var(--font-body);
            border-radius: 10px;
            border: 1px solid rgba(255,255,255,0.25);
            text-decoration: none;
            transition: all 0.2s;
            }
            .hero-btn-secondary:hover { background-color: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.4); }

            /* ====== MOBILE ====== */
            @media (max-width: 640px) {
            .hero-section { padding: 64px 16px 56px; }
            .hero-logo { height: 56px !important; }
            .hero-data {
                flex-direction: column;
                align-items: center;
                gap: 12px;
            }
            .countdown-grid { gap: 10px; }
            .countdown-card { min-width: 64px; padding: 10px 12px; }
            .countdown-number { font-size: 26px; }
            .hero-btn-primary, .hero-btn-secondary {
                width: 100%;
                justify-content: center;
            }
            }

            /* ====== TABLET ====== */
            @media (min-width: 641px) and (max-width: 1024px) {
            .hero-section { padding: 80px 24px 64px; }
            .hero-logo { height: 64px !important; }
            }
        `}</style>
        </>
    );
}