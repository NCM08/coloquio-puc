"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const flyers = [
  "/images/flyer-1.jpg",
  "/images/flyer-2.jpg",
  "/images/flyer-3.jpg",
  "/images/flyer-4.jpg",
  "/images/flyer-5.jpg",
];

export default function FlyerCarousel() {
  const [startIndex, setStartIndex] = useState(0);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const visibleCount = 3;

  const getVisibleFlyers = () => {
    const visible = [];
    for (let i = 0; i < visibleCount; i++) {
      visible.push(flyers[(startIndex + i) % flyers.length]);
    }
    return visible;
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setStartIndex((prev) => (prev + 1) % flyers.length);
    }, 7500);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const openLightbox = (src: string) => {
    setLightboxSrc(src);
  };

  const closeLightbox = () => {
    setLightboxSrc(null);
  };

  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-10">
          Galería de Flyers Informativos
        </h2>

        {/* Carousel grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-1000">
          {getVisibleFlyers().map((src, idx) => (
            <button
              key={`${src}-${idx}`}
              onClick={() => openLightbox(src)}
              className="group relative w-full overflow-hidden rounded-lg shadow-sm
                         hover:scale-105 transition-transform duration-300 cursor-pointer
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Ampliar flyer"
            >
              <div className="relative w-full aspect-[3/4]">
                <Image
                  src={src}
                  alt={`Flyer informativo ${idx + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                  priority={idx === 0}
                />
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 rounded-lg" />
            </button>
          ))}
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {flyers.map((_, i) => (
            <button
              key={i}
              onClick={() => setStartIndex(i)}
              className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                i === startIndex % flyers.length
                  ? "bg-blue-600"
                  : "bg-slate-300 hover:bg-slate-400"
              }`}
              aria-label={`Ir al flyer ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxSrc && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-3xl w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeLightbox}
              className="absolute -top-10 right-0 text-white text-4xl font-light
                         hover:text-slate-300 transition-colors focus:outline-none"
              aria-label="Cerrar"
            >
              &times;
            </button>
            <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden shadow-2xl">
              <Image
                src={lightboxSrc}
                alt="Flyer ampliado"
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
