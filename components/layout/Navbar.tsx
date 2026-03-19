// ============================================================
// components/layout/Navbar.tsx — NAVBAR RESPONSIVE FINAL
// ============================================================

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "@/components/ThemeProvider";
import { Sun, Moon, Menu, X, ChevronDown } from "lucide-react";

const NAV_ITEMS = [
    { label: "Inicio", href: "/" },
    { label: "Convocatoria", href: "/convocatoria", hasDropdown: true },
    { label: "Programa", href: "/programa" },
    { label: "Inscripción", href: "/inscripciones" },
];

const CONVOCATORIA_ITEMS = [
    { label: "Ejes temáticos", href: "/convocatoria#ejes" },
    { label: "Modalidades", href: "/convocatoria#modalidades" },
    { label: "Envío de propuestas", href: "/envio-propuestas" },
];

const SECONDARY_ITEMS = [
    { label: "Equipo organizador", href: "/equipo" },
    { label: "Conferencistas", href: "/conferencistas" },
    { label: "Actas y publicaciones", href: "/actas" },
    { label: "Ediciones anteriores", href: "/ediciones-anteriores" },
    { label: "Contacto", href: "#contacto" },
];

export default function Navbar() {
    const { dark, toggleTheme } = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 16);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const handleResize = () => { if (window.innerWidth > 768) setMobileOpen(false); };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <>
        <nav className="main-nav" style={{
            position: "sticky", top: 0, zIndex: 50,
            padding: "0 24px", display: "flex", alignItems: "center",
            transition: "all 0.3s ease",
            backgroundColor: dark ? "var(--color-dark-900)" : "#FFFFFF",
            borderBottom: scrolled ? "none" : `1px solid ${dark ? "var(--color-dark-700)" : "var(--color-dark-100)"}`,
            boxShadow: scrolled ? (dark ? "0 1px 12px rgba(0,0,0,0.5)" : "var(--shadow-soft)") : "none",
        }}>
            {/* Logo */}
            <Link href="/" className="nav-logo" style={{ display: "flex", alignItems: "center", textDecoration: "none", gap: 12 }}>
            <div style={{
                width: 44, height: 44, borderRadius: 10,
                backgroundColor: "var(--color-vibrant-cyan)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 15, fontWeight: 800, color: "#fff",
                fontFamily: "var(--font-display)", flexShrink: 0,
            }}>SC</div>
            <div>
                <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14, color: dark ? "#fff" : "var(--color-text-dark)", margin: 0, lineHeight: 1.25 }}>
                Coloquio Sociología Clínica 2026
                </p>
                <p style={{ fontSize: 11, opacity: 0.5, textTransform: "uppercase", letterSpacing: 1, margin: 0 }}>
                VIII Edición Internacional
                </p>
            </div>
            </Link>

            <div style={{ flex: 1 }} />

            {/* Nav items desktop */}
            <div className="nav-desktop" style={{ display: "flex", alignItems: "center", gap: 4 }}>
            {NAV_ITEMS.map((item) => (
                <div key={item.label} style={{ position: "relative" }}
                onMouseEnter={() => item.hasDropdown && setDropdownOpen(true)}
                onMouseLeave={() => item.hasDropdown && setDropdownOpen(false)}
                >
                <Link href={item.href} style={{
                    height: 44, padding: "0 16px", display: "flex", alignItems: "center", gap: 4,
                    borderRadius: 8, fontSize: 15, fontWeight: 500, fontFamily: "var(--font-body)",
                    color: dark ? "var(--color-dark-300)" : "var(--color-dark-500)",
                    textDecoration: "none", transition: "all 0.2s",
                }}
                onMouseOver={(e) => { e.currentTarget.style.color = dark ? "var(--color-dark-100)" : "var(--color-primary)"; e.currentTarget.style.backgroundColor = dark ? "rgba(255,255,255,0.05)" : "var(--color-primary-50)"; }}
                onMouseOut={(e) => { e.currentTarget.style.color = dark ? "var(--color-dark-300)" : "var(--color-dark-500)"; e.currentTarget.style.backgroundColor = "transparent"; }}
                >
                    {item.label}
                    {item.hasDropdown && <ChevronDown size={14} style={{ transition: "transform 0.2s", transform: dropdownOpen ? "rotate(180deg)" : "rotate(0)" }} />}
                </Link>

                {item.hasDropdown && dropdownOpen && (
                    <div style={{
                    position: "absolute", top: "100%", left: 0, marginTop: 4, padding: 8, minWidth: 220,
                    borderRadius: 12, border: `1px solid ${dark ? "var(--color-dark-700)" : "var(--color-dark-100)"}`,
                    backgroundColor: dark ? "var(--color-dark-800)" : "#FFFFFF",
                    boxShadow: dark ? "0 8px 32px rgba(0,0,0,0.4)" : "var(--shadow-large)",
                    }}>
                    {CONVOCATORIA_ITEMS.map((sub) => (
                        <Link key={sub.label} href={sub.href} style={{
                        display: "block", padding: "10px 16px", borderRadius: 8, fontSize: 14, fontWeight: 500,
                        color: dark ? "var(--color-dark-300)" : "var(--color-dark-600)", textDecoration: "none", transition: "all 0.15s",
                        }}
                        onMouseOver={(e) => { e.currentTarget.style.backgroundColor = dark ? "rgba(255,255,255,0.05)" : "var(--color-primary-50)"; e.currentTarget.style.color = dark ? "var(--color-dark-100)" : "var(--color-primary)"; }}
                        onMouseOut={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = dark ? "var(--color-dark-300)" : "var(--color-dark-600)"; }}
                        >{sub.label}</Link>
                    ))}
                    </div>
                )}
                </div>
            ))}
            </div>

            {/* Acciones */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginLeft: 16 }}>
            <button onClick={toggleTheme} aria-label={dark ? "Modo claro" : "Modo oscuro"} style={{
                width: 40, height: 40, borderRadius: 10,
                border: `1px solid ${dark ? "var(--color-dark-700)" : "var(--color-dark-100)"}`,
                backgroundColor: dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.02)",
                cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                color: dark ? "var(--color-accent)" : "var(--color-dark-500)", transition: "all 0.2s",
            }}>
                {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <Link href="/inscripciones" className="nav-desktop" style={{
                height: 44, padding: "0 24px", display: "flex", alignItems: "center",
                background: "linear-gradient(135deg, var(--color-accent), var(--color-accent-600))",
                color: "#fff", fontSize: 14, fontWeight: 600, fontFamily: "var(--font-body)",
                borderRadius: 8, textDecoration: "none", boxShadow: "var(--shadow-accent)", transition: "all 0.2s",
            }}
            onMouseOver={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseOut={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
            >Inscribirse</Link>

            <button onClick={() => setMobileOpen(!mobileOpen)} className="nav-mobile-only" style={{
                width: 44, height: 44, borderRadius: 10,
                border: `1px solid ${dark ? "var(--color-dark-700)" : "var(--color-dark-100)"}`,
                backgroundColor: "transparent", cursor: "pointer", display: "none", alignItems: "center", justifyContent: "center",
                color: dark ? "var(--color-dark-100)" : "var(--color-dark-700)",
            }}>
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
            </div>
        </nav>

        {/* Menú móvil */}
        {mobileOpen && (
            <div className="mobile-menu" style={{
            position: "fixed", left: 0, right: 0, bottom: 0, zIndex: 40, padding: 24, overflowY: "auto",
            backgroundColor: dark ? "var(--color-dark-900)" : "#FFFFFF",
            }}>
            {NAV_ITEMS.map((item) => (
                <Link key={item.label} href={item.href} onClick={() => setMobileOpen(false)} style={{
                display: "block", padding: "16px 0", fontSize: 18, fontWeight: 500, textDecoration: "none",
                borderBottom: `1px solid ${dark ? "var(--color-dark-700)" : "var(--color-dark-100)"}`,
                color: dark ? "var(--color-dark-100)" : "var(--color-dark-700)",
                }}>{item.label}</Link>
            ))}
            <div style={{ paddingTop: 16, paddingBottom: 8, fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1.5, color: "var(--color-dark-500)" }}>
                Más secciones
            </div>
            {SECONDARY_ITEMS.map((item) => (
                <Link key={item.label} href={item.href} onClick={() => setMobileOpen(false)} style={{
                display: "block", padding: "14px 0", fontSize: 16, textDecoration: "none",
                borderBottom: `1px solid ${dark ? "var(--color-dark-800)" : "rgba(0,0,0,0.04)"}`,
                color: dark ? "var(--color-dark-400)" : "var(--color-dark-500)",
                }}>{item.label}</Link>
            ))}
            <Link href="/inscripciones" onClick={() => setMobileOpen(false)} style={{
                display: "block", width: "100%", marginTop: 24, padding: "16px 0", textAlign: "center",
                background: "linear-gradient(135deg, var(--color-accent), var(--color-accent-600))",
                color: "#fff", fontSize: 16, fontWeight: 600, borderRadius: 10, textDecoration: "none",
            }}>Inscribirse →</Link>
            </div>
        )}

        {/* ====== RESPONSIVE STYLES ====== */}
        <style>{`
            /* Desktop */
            .main-nav { height: 88px; }
            .mobile-menu { top: 88px; }

            @media (max-width: 768px) {
            .nav-desktop { display: none !important; }
            .nav-mobile-only { display: flex !important; }
            .main-nav { height: 72px; padding: 0 16px !important; }
            .mobile-menu { top: 72px !important; }
            }

            @media (min-width: 769px) and (max-width: 1024px) {
            .main-nav { height: 80px; }
            .mobile-menu { top: 80px; }
            }

            @media (min-width: 769px) {
            .nav-desktop { display: flex !important; }
            .nav-mobile-only { display: none !important; }
            }
        `}</style>
        </>
    );
}