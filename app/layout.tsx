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
  title: "VIII Coloquio Internacional de Sociología Clínica 2026",
  description:
    "VIII Coloquio Internacional de Sociología Clínica — 10 al 12 de noviembre de 2026, Santiago de Chile.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning className={`${openSans.variable} ${montserrat.variable}`}>
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