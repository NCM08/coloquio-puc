// ============================================================
// app/page.tsx — PÁGINA DE INICIO COMPLETA
// ============================================================

import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import ThematicAxes from "@/components/sections/ThematicAxes";
import ImportantDates from "@/components/sections/ImportantDates";
import MapSection from "@/components/sections/MapSection";
import FlyerCarousel from "@/components/sections/FlyerCarousel";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <ThematicAxes />
      <ImportantDates />
      <FlyerCarousel />
      <MapSection />
    </>
  );
}