// ============================================================
// app/privacidad/page.tsx — POLÍTICA DE PRIVACIDAD
// ============================================================

"use client";

import { useTheme } from "@/components/ThemeProvider";
import Link from "next/link";
import { ChevronRight, Shield } from "lucide-react";
import FadeInSection from "@/components/ui/FadeInSection";

const SECTIONS = [
    {
        title: "1. Responsable del tratamiento",
        content: "La Pontificia Universidad Católica de Chile, a través de la Facultad de Educación, es responsable del tratamiento de los datos personales recopilados a través de este sitio web y del proceso de inscripción al Coloquio de Educación y Pedagogía.",
    },
    {
        title: "2. Datos que recopilamos",
        content: "Recopilamos los datos personales que usted nos proporciona voluntariamente al inscribirse o contactarnos: nombre completo, correo electrónico institucional o personal, institución de afiliación, país, área de investigación, y en caso de expositores, el resumen de su ponencia. No recopilamos datos sensibles ni información financiera directamente en este sitio.",
    },
    {
        title: "3. Finalidad del tratamiento",
        content: "Sus datos personales serán utilizados exclusivamente para: gestionar su inscripción y participación en el coloquio, enviarle comunicaciones relacionadas con el evento (programa, cambios, recordatorios), emitir certificados de asistencia o participación, elaborar estadísticas anónimas sobre los participantes, y publicar las actas del coloquio con la información académica de los expositores.",
    },
    {
        title: "4. Base legal",
        content: "El tratamiento de sus datos se basa en su consentimiento, otorgado al completar el formulario de inscripción o al contactarnos a través de este sitio. Usted puede retirar su consentimiento en cualquier momento escribiendo a congresosociologiaclinica.2026@gmail.com.",
    },
    {
        title: "5. Compartir datos con terceros",
        content: "No compartimos sus datos personales con terceros, salvo: proveedores de servicios necesarios para la organización del evento (plataforma de inscripción, servicio de correo electrónico), y cuando sea requerido por ley. En ningún caso vendemos o cedemos sus datos a terceros con fines comerciales.",
    },
    {
        title: "6. Conservación de datos",
        content: "Sus datos serán conservados durante el período necesario para cumplir con las finalidades descritas y, posteriormente, durante los plazos legales aplicables. Los datos de inscripción se conservarán por un máximo de 3 años después del evento para fines de archivo académico.",
    },
    {
        title: "7. Derechos del titular",
        content: "Usted tiene derecho a acceder, rectificar, cancelar u oponerse al tratamiento de sus datos personales en cualquier momento. Para ejercer estos derechos, contacte al equipo organizador a través de congresosociologiaclinica.2026@gmail.com, indicando su nombre completo y el derecho que desea ejercer.",
    },
    {
        title: "8. Cookies y tecnologías de seguimiento",
        content: "Este sitio web utiliza cookies técnicas necesarias para su funcionamiento. No utilizamos cookies de seguimiento ni herramientas de publicidad. Puede configurar su navegador para rechazar cookies, aunque esto podría afectar la funcionalidad del sitio.",
    },
    {
        title: "9. Seguridad",
        content: "Implementamos medidas de seguridad técnicas y organizativas para proteger sus datos personales contra acceso no autorizado, pérdida o alteración. El sitio utiliza conexión segura HTTPS para la transmisión de datos.",
    },
    {
        title: "10. Modificaciones",
        content: "Nos reservamos el derecho de actualizar esta política de privacidad. Cualquier modificación será publicada en esta página con la fecha de actualización correspondiente.",
    },
];

export default function PrivacidadPage() {
    const { dark } = useTheme();

    return (
        <div style={{
        backgroundColor: dark ? "var(--color-dark-900)" : "var(--color-dark-50)",
        minHeight: "100vh", transition: "background-color 0.3s",
        }}>
        {/* Header */}
        <div style={{ padding: "48px 24px", backgroundColor: dark ? "var(--color-dark-800)" : "var(--color-primary)", color: "#FFFFFF" }}>
            <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, opacity: 0.6, marginBottom: 16 }}>
                <Link href="/" style={{ color: "#fff", textDecoration: "none" }}>Inicio</Link>
                <ChevronRight size={14} />
                <span>Política de privacidad</span>
            </div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 700, marginBottom: 12 }}>
                Política de Privacidad
            </h1>
            <p style={{ fontSize: 18, opacity: 0.8, maxWidth: 600, lineHeight: 1.6 }}>
                Cómo recopilamos, usamos y protegemos sus datos personales.
            </p>
            </div>
        </div>

        <div style={{ maxWidth: 800, margin: "0 auto", padding: "64px 24px" }}>
            {/* Fecha y badge */}
            <FadeInSection>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 40 }}>
                <Shield size={20} style={{ color: "var(--color-accent)" }} />
                <span style={{ fontSize: 14, color: dark ? "var(--color-dark-400)" : "var(--color-dark-500)" }}>
                Última actualización: Febrero 2026
                </span>
            </div>
            </FadeInSection>

            {/* Secciones */}
            {SECTIONS.map((section, index) => (
            <FadeInSection key={index} delay={index * 0.04}>
                <div style={{ marginBottom: 32 }}>
                <h2 style={{
                    fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700,
                    color: dark ? "var(--color-dark-100)" : "var(--color-primary)",
                    marginBottom: 10,
                }}>
                    {section.title}
                </h2>
                <p style={{
                    fontSize: 16, lineHeight: 1.8,
                    color: dark ? "var(--color-dark-300)" : "var(--color-dark-500)",
                }}>
                    {section.content}
                </p>
                </div>
            </FadeInSection>
            ))}

            {/* Contacto */}
            <FadeInSection delay={0.4}>
            <div style={{
                marginTop: 16, padding: 24, borderRadius: 12,
                backgroundColor: dark ? "var(--color-dark-800)" : "var(--color-primary-50)",
                border: `1px solid ${dark ? "var(--color-dark-700)" : "var(--color-primary-100)"}`,
            }}>
                <p style={{ fontSize: 15, lineHeight: 1.6, color: dark ? "var(--color-dark-300)" : "var(--color-dark-500)" }}>
                Para cualquier consulta sobre esta política o el tratamiento de sus datos, contacte a:{" "}
                <a href="mailto:congresosociologiaclinica.2026@gmail.com" style={{ color: dark ? "var(--color-accent)" : "var(--color-primary)", fontWeight: 600, textDecoration: "none" }}>
                    congresosociologiaclinica.2026@gmail.com
                </a>
                </p>
            </div>
            </FadeInSection>
        </div>
        </div>
    );
}