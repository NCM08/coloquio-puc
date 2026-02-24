// ============================================================
// components/ThemeProvider.tsx — DARK MODE SYSTEM
// ============================================================
// Agrega/quita clase "dark" en <html> para que Tailwind
// aplique estilos dark: en todos los componentes.
//
// "use client" porque usa useState/useEffect (browser only)
// ============================================================

"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

interface ThemeContextType {
    dark: boolean;
    toggleTheme: () => void;
    }

    const ThemeContext = createContext<ThemeContextType>({
    dark: false,
    toggleTheme: () => {},
    });

    // Hook personalizado — usa useTheme() en cualquier componente
    export function useTheme() {
    return useContext(ThemeContext);
    }

    export function ThemeProvider({ children }: { children: ReactNode }) {
    const [dark, setDark] = useState(false);

    useEffect(() => {
        const root = document.documentElement;
        if (dark) {
        root.classList.add("dark");
        } else {
        root.classList.remove("dark");
        }
    }, [dark]);

    const toggleTheme = () => setDark((prev) => !prev);

    return (
        <ThemeContext.Provider value={{ dark, toggleTheme }}>
        {children}
        </ThemeContext.Provider>
    );
    }