import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Chatbot from "@/components/ui/Chatbot";
import AccessibilityWidget from "@/components/ui/AccessibilityWidget";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Organizers from "@/components/sections/Organizers";
import { Open_Sans, Montserrat } from "next/font/google";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-open-sans",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Coloquio de Sociología PUC - Inscripciones y Propuestas",
  description:
    "Participa en el Coloquio de Sociología de la Pontificia Universidad Católica. Envía tu propuesta o inscríbete como asistente o expositor.",
  openGraph: {
    title: "Coloquio de Sociología PUC - Inscripciones y Propuestas",
    description:
      "Participa en el Coloquio de Sociología de la Pontificia Universidad Católica. Envía tu propuesta o inscríbete como asistente o expositor.",
    type: "website",
    images: ["/images/uc-color.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning data-scroll-behavior="smooth" className={`${openSans.variable} ${montserrat.variable}`}>
      <body style={{ overflowX: "hidden" }}>
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
          <Organizers />
          <Footer />
          <Chatbot />
          <AccessibilityWidget />
        </ThemeProvider>
      </body>
    </html>
  );
}