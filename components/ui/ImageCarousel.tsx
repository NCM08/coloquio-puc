"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { SlideData } from "@/types/coloquio";

// ============================================================
// 6 slides — usa los archivos exactos que subiste a /public/images/
// (respeta mayúsculas/minúsculas en producción)
// ============================================================
const SLIDES: SlideData[] = [
  {
    id: 1,
    image: "/images/slide-1.jpg",
    title: "VIII Coloquio Internacional de Sociología Clínica y Psicosociología",
    subtitle:
      "Desintegración social en el mundo actual: acciones de resistencias y nuevos imaginarios posibles",
    dateText: "10 — 12 de Noviembre 2026 · Santiago, Chile",
    ctaText: "Conocer más",
    ctaLink: "/convocatoria",
    bgColor: "#00adfc",
  },
  {
    id: 2,
    image: "/images/slide-2.jpg",
    title: "Convocatoria abierta",
    subtitle:
      "Presenta tu propuesta de investigación ante colegas de todo el mundo.",
    dateText: "Cierre: 30 de junio 2026",
    ctaText: "Enviar propuesta",
    ctaLink: "/convocatoria",
    bgColor: "#5841b3",
  },
  {
    id: 3,
    image: "/images/slide-3.JPG",
    title: "Conferencistas magistrales",
    subtitle:
      "Referentes internacionales de la Sociología Clínica y la psicosociología.",
    dateText: "10 — 12 de Noviembre 2026",
    ctaText: "Ver conferencistas",
    ctaLink: "/conferencistas",
    bgColor: "#f5008c",
  },
  {
    id: 4,
    image: "/images/slide-4.JPG",
    title: "Programa del coloquio",
    subtitle:
      "Mesas de trabajo, conferencias magistrales y espacios de diálogo interdisciplinario.",
    dateText: "Programa disponible próximamente",
    ctaText: "Ver programa",
    ctaLink: "/programa",
    bgColor: "#00adfc",
  },
  {
    id: 5,
    image: "/images/slide-5.JPG",
    title: "Comunidad internacional",
    subtitle:
      "Más de 25 países participantes de América Latina, Europa y el mundo.",
    dateText: "500+ participantes esperados",
    ctaText: "Inscribirse",
    ctaLink: "/inscripciones",
    bgColor: "#f87e28",
  },
  {
    id: 6,
    image: "/images/slide-6.jpg",
    title: "Inscripciones abiertas",
    subtitle:
      "Modalidad presencial en Santiago de Chile y transmisión en línea para participantes internacionales.",
    dateText: "Precio anticipado disponible",
    ctaText: "Inscribirse ahora",
    ctaLink: "/inscripciones",
    bgColor: "#5fba24",
  },
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? "-100%" : "100%",
    opacity: 0,
  }),
};

const transition = {
  duration: 0.55,
  ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
};

export default function ImageCarousel() {
  const [[current, direction], setCurrent] = useState([0, 0]);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const paginate = useCallback((newDirection: number) => {
    setCurrent(([prev]) => {
      const next = (prev + newDirection + SLIDES.length) % SLIDES.length;
      return [next, newDirection];
    });
  }, []);

  const goTo = useCallback((index: number) => {
    setCurrent(([prev]) => [index, index > prev ? 1 : -1]);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setTimeout(() => paginate(1), 6000);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [current, isPaused, paginate]);

  // Precargar todas las imágenes del carrusel en segundo plano
  useEffect(() => {
    SLIDES.forEach((slide) => {
      const img = new window.Image();
      img.src = slide.image;
    });
  }, []);

  const slide = SLIDES[current];

  return (
    <>
      <section
        className="carousel-section"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        aria-label="Carrusel de imágenes del coloquio"
      >
        <AnimatePresence initial={false} custom={direction} mode="sync">
          <motion.div
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={transition}
            className="carousel-slide"
          >
            {/* Foto de fondo — full cover */}
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              sizes="100vw"
              style={{ objectFit: "cover", objectPosition: "center" }}
              priority={current === 0}
            />

            {/* Scrim para legibilidad */}
            <div className="carousel-scrim" />

            {/* Caja de info — derecha, estilo página de referencia */}
            <div
              className="carousel-info-box"
              style={{ borderTop: `4px solid ${slide.bgColor}` }}
            >
              {/* Logo del coloquio — imagen de marca */}
              <div className="carousel-logo-wrap">
                <Image
                  src="/images/coloquio2026.png"
                  alt="VIII Coloquio Internacional de Sociología Clínica y Psicosociología"
                  width={280}
                  height={116}
                  style={{ width: "100%", height: "auto", objectFit: "contain" }}
                />
              </div>

              {/* Tema / subtítulo */}
              <p className="carousel-box-subtitle">{slide.subtitle}</p>

              {/* Fecha / dato clave */}
              <p
                className="carousel-box-date"
                style={{ color: slide.bgColor }}
              >
                {slide.dateText}
              </p>

              {/* Botón CTA — mínimo 48px altura */}
              <Link
                href={slide.ctaLink}
                className="carousel-cta"
                style={{ backgroundColor: slide.bgColor }}
                onMouseOver={(e) => {
                  e.currentTarget.style.filter = "brightness(1.12)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.filter = "brightness(1)";
                }}
              >
                {slide.ctaText} →
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Flechas de navegación — grandes para accesibilidad */}
        <button
          onClick={() => paginate(-1)}
          aria-label="Slide anterior"
          className="carousel-arrow carousel-arrow-left"
        >
          <ChevronLeft size={28} />
        </button>
        <button
          onClick={() => paginate(1)}
          aria-label="Slide siguiente"
          className="carousel-arrow carousel-arrow-right"
        >
          <ChevronRight size={28} />
        </button>

        {/* Puntos de paginación */}
        <div className="carousel-dots" aria-label="Navegación de slides">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Ir al slide ${i + 1}`}
              aria-current={i === current ? "true" : undefined}
              style={{
                width: i === current ? 28 : 10,
                height: 10,
                borderRadius: 5,
                border: "2px solid rgba(255,255,255,0.7)",
                backgroundColor: i === current ? "#ffffff" : "transparent",
                cursor: "pointer",
                transition: "all 0.3s ease",
                padding: 0,
              }}
            />
          ))}
        </div>
      </section>

      <style>{`
        /* ============ SECCIÓN ============ */
        .carousel-section {
          position: relative;
          width: 100%;
          height: 490px;
          overflow: hidden;
          background: #0a0a14;
        }

        /* ============ SLIDE (absolute para AnimatePresence) ============ */
        .carousel-slide {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
        }

        /* ============ SCRIM ============ */
        .carousel-scrim {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to right,
            rgba(0,0,0,0.10) 0%,
            rgba(0,0,0,0.10) 40%,
            rgba(0,0,0,0.50) 65%,
            rgba(0,0,0,0.70) 100%
          );
          z-index: 1;
        }

        /* ============ CAJA DE INFO — derecha ============ */
        .carousel-info-box {
          position: absolute;
          right: 48px;
          top: 50%;
          transform: translateY(-50%);
          width: 340px;
          background: rgba(6, 6, 18, 0.84);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-radius: 0 0 14px 14px;
          padding: 24px 28px 30px;
          z-index: 2;
        }

        .carousel-logo-wrap {
          margin-bottom: 14px;
        }

        .carousel-box-subtitle {
          font-family: var(--font-body);
          font-size: 14px;
          line-height: 1.65;
          color: rgba(255,255,255,0.78);
          margin-bottom: 12px;
        }

        .carousel-box-date {
          font-family: var(--font-body);
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.4px;
          margin-bottom: 18px;
          text-transform: uppercase;
        }

        .carousel-cta {
          display: inline-flex;
          align-items: center;
          min-height: 48px;
          padding: 0 22px;
          border-radius: 8px;
          color: #ffffff;
          font-family: var(--font-body);
          font-size: 15px;
          font-weight: 700;
          text-decoration: none;
          transition: filter 0.2s ease;
        }

        /* ============ FLECHAS ============ */
        .carousel-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          border: 2px solid rgba(255,255,255,0.55);
          background-color: rgba(0,0,0,0.32);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .carousel-arrow:hover {
          background-color: rgba(255,255,255,0.18);
          border-color: #ffffff;
          transform: translateY(-50%) scale(1.08);
        }

        .carousel-arrow-left  { left: 20px; }
        .carousel-arrow-right { right: 20px; }

        /* ============ PUNTOS ============ */
        .carousel-dots {
          position: absolute;
          bottom: 18px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          display: flex;
          gap: 8px;
          align-items: center;
        }

        /* ============ TABLET ============ */
        @media (min-width: 641px) and (max-width: 1024px) {
          .carousel-section { height: 440px; }
          .carousel-info-box { right: 24px; width: 300px; }
        }

        /* ============ MOBILE ============ */
        @media (max-width: 640px) {
          .carousel-section { height: 490px; }
          .carousel-scrim {
            background: linear-gradient(
              to bottom,
              rgba(0,0,0,0.05) 0%,
              rgba(0,0,0,0.10) 45%,
              rgba(0,0,0,0.80) 100%
            );
          }
          .carousel-info-box {
            position: absolute;
            right: 0; left: 0;
            bottom: 0; top: auto;
            transform: none;
            width: 100%;
            border-radius: 0;
            padding: 16px 20px 44px;
            backdrop-filter: none;
            background: rgba(6,6,18,0.90);
          }
          .carousel-logo-wrap { display: none; }
          .carousel-arrow-left  { left: 8px; }
          .carousel-arrow-right { right: 8px; }
        }
      `}</style>
    </>
  );
}
