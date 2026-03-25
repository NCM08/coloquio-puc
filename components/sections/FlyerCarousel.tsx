"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RefreshCw } from "lucide-react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

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
      const realIndex = (startIndex + i) % flyers.length;
      visible.push({ src: flyers[realIndex], pageNumber: realIndex + 1 });
    }
    return visible;
  };

  const lightboxPageNumber = lightboxSrc ? flyers.indexOf(lightboxSrc) + 1 : null;

  const restartInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setStartIndex((prev) => (prev + 1) % flyers.length);
    }, 7500);
  };

  useEffect(() => {
    restartInterval();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goToPrev = () => {
    setStartIndex((prev) => (prev - 1 + flyers.length) % flyers.length);
    restartInterval();
  };

  const goToNext = () => {
    setStartIndex((prev) => (prev + 1) % flyers.length);
    restartInterval();
  };

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

        {/* Carousel grid with navigation arrows */}
        <div className="relative flex items-center">
          {/* Arrow left */}
          <button
            onClick={goToPrev}
            className="absolute -left-5 z-10 flex items-center justify-center
                       w-10 h-10 rounded-full bg-white/60 shadow-md
                       opacity-70 hover:opacity-100 transition-opacity duration-200
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Flyer anterior"
          >
            <ChevronLeft className="w-6 h-6 text-slate-700" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-1000 w-full">
            {getVisibleFlyers().map(({ src, pageNumber }, idx) => (
              <div key={`${src}-${idx}`} className="flex flex-col">
                <button
                  onClick={() => openLightbox(src)}
                  className="group relative w-full overflow-hidden rounded-lg shadow-sm
                             hover:scale-105 transition-transform duration-300 cursor-pointer
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  aria-label={`Ampliar flyer — Página ${pageNumber}`}
                >
                  <div className="relative w-full aspect-[3/4]">
                    <Image
                      src={src}
                      alt={`Flyer informativo — Página ${pageNumber} de ${flyers.length}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                      priority={idx === 0}
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 rounded-lg" />
                </button>
                <p className="text-sm text-center text-gray-600 dark:text-gray-400 mt-3 font-medium">
                  Página {pageNumber}
                </p>
              </div>
            ))}
          </div>

          {/* Arrow right */}
          <button
            onClick={goToNext}
            className="absolute -right-5 z-10 flex items-center justify-center
                       w-10 h-10 rounded-full bg-white/60 shadow-md
                       opacity-70 hover:opacity-100 transition-opacity duration-200
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Siguiente flyer"
          >
            <ChevronRight className="w-6 h-6 text-slate-700" />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {flyers.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setStartIndex(i);
                restartInterval();
              }}
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
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto
                     bg-black/80 backdrop-blur-sm py-8"
          onClick={closeLightbox}
        >
          <div
            className="relative w-full max-w-2xl mx-4 my-auto"
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
            <TransformWrapper
              initialScale={1}
              minScale={0.5}
              maxScale={5}
              wheel={{ step: 0.1 }}
              pinch={{ step: 5 }}
            >
              {({ zoomIn, zoomOut, resetTransform }) => (
                <>
                  <div className="relative w-full rounded-lg overflow-hidden shadow-2xl">
                    <TransformComponent
                      wrapperStyle={{ width: "100%", display: "block" }}
                    >
                      <Image
                        src={lightboxSrc}
                        alt={`Flyer ampliado — Página ${lightboxPageNumber} de ${flyers.length}`}
                        width={800}
                        height={1067}
                        sizes="(max-width: 768px) 100vw, 800px"
                        className="w-full h-auto max-h-[85vh] object-contain"
                        priority
                      />
                    </TransformComponent>
                  </div>

                  {/* Zoom controls pill */}
                  <div className="flex items-center justify-center gap-1 mt-3">
                    <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1.5">
                      <button
                        onClick={() => zoomIn()}
                        className="p-1.5 text-white/80 hover:text-white transition-colors rounded-full hover:bg-white/10"
                        aria-label="Acercar"
                      >
                        <ZoomIn className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => zoomOut()}
                        className="p-1.5 text-white/80 hover:text-white transition-colors rounded-full hover:bg-white/10"
                        aria-label="Alejar"
                      >
                        <ZoomOut className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => resetTransform()}
                        className="p-1.5 text-white/80 hover:text-white transition-colors rounded-full hover:bg-white/10"
                        aria-label="Restablecer zoom"
                      >
                        <RefreshCw className="w-4 h-4" />
                      </button>
                      <span className="text-white/50 text-xs font-medium pl-1 border-l border-white/20 ml-1">
                        {lightboxPageNumber} / {flyers.length}
                      </span>
                    </div>
                  </div>
                </>
              )}
            </TransformWrapper>
          </div>
        </div>
      )}
    </section>
  );
}
