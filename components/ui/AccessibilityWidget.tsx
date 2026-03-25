"use client";

import { useState, useEffect } from "react";

const FONT_SIZES = [14, 16, 18, 20, 22];
const DEFAULT_INDEX = 1; // 16px
const STORAGE_KEY = "a11y-font-index";

export default function AccessibilityWidget() {
  const [fontIndex, setFontIndex] = useState(DEFAULT_INDEX);
  const [highContrast, setHighContrast] = useState(false);
  const [open, setOpen] = useState(false);

  // Restore preferences on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved !== null) {
      const idx = parseInt(saved, 10);
      setFontIndex(idx);
      document.documentElement.style.fontSize = `${FONT_SIZES[idx]}px`;
    }
    const contrast = localStorage.getItem("a11y-contrast") === "true";
    setHighContrast(contrast);
    if (contrast) document.documentElement.classList.add("high-contrast");
  }, []);

  const changeFontSize = (delta: number) => {
    setFontIndex((prev) => {
      const next = Math.min(Math.max(prev + delta, 0), FONT_SIZES.length - 1);
      document.documentElement.style.fontSize = `${FONT_SIZES[next]}px`;
      localStorage.setItem(STORAGE_KEY, String(next));
      return next;
    });
  };

  const toggleContrast = () => {
    setHighContrast((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("high-contrast", next);
      localStorage.setItem("a11y-contrast", String(next));
      return next;
    });
  };

  const resetAll = () => {
    setFontIndex(DEFAULT_INDEX);
    document.documentElement.style.fontSize = `${FONT_SIZES[DEFAULT_INDEX]}px`;
    localStorage.setItem(STORAGE_KEY, String(DEFAULT_INDEX));
    setHighContrast(false);
    document.documentElement.classList.remove("high-contrast");
    localStorage.removeItem("a11y-contrast");
  };

  return (
    <div
      className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-2"
      aria-label="Panel de accesibilidad"
    >
      {/* Expanded panel */}
      {open && (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl p-4 flex flex-col gap-3 min-w-[180px]">
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Accesibilidad
          </p>

          {/* Font size */}
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm text-gray-700 dark:text-gray-300">Texto</span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => changeFontSize(-1)}
                disabled={fontIndex === 0}
                aria-label="Reducir tamaño de texto"
                className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center font-bold text-gray-800 dark:text-gray-200 transition-colors"
              >
                A-
              </button>
              <span className="w-9 text-center text-xs text-gray-500 dark:text-gray-400 tabular-nums">
                {FONT_SIZES[fontIndex]}px
              </span>
              <button
                onClick={() => changeFontSize(1)}
                disabled={fontIndex === FONT_SIZES.length - 1}
                aria-label="Aumentar tamaño de texto"
                className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center font-bold text-gray-800 dark:text-gray-200 transition-colors"
              >
                A+
              </button>
            </div>
          </div>

          {/* High contrast */}
          <button
            onClick={toggleContrast}
            aria-pressed={highContrast}
            className={`w-full py-1.5 rounded-lg text-sm font-medium transition-colors ${
              highContrast
                ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            {highContrast ? "◑ Alto contraste: ON" : "◑ Alto contraste"}
          </button>

          {/* Reset */}
          <button
            onClick={resetAll}
            className="w-full py-1.5 rounded-lg text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Restablecer
          </button>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Cerrar panel de accesibilidad" : "Abrir panel de accesibilidad"}
        aria-expanded={open}
        className="w-11 h-11 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg flex items-center justify-center text-xl hover:scale-105 active:scale-95 transition-transform"
        title="Accesibilidad"
      >
        ♿
      </button>
    </div>
  );
}
