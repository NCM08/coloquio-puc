// ============================================================
// components/ui/FadeInSection.tsx — ANIMACIÓN DE SCROLL (FIXED)
// ============================================================

"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface FadeInSectionProps {
    children: React.ReactNode;
    delay?: number;
    duration?: number;
    direction?: "up" | "down" | "left" | "right" | "none";
    className?: string;
    style?: React.CSSProperties;
}

export default function FadeInSection({
    children,
    delay = 0,
    duration = 0.6,
    direction = "up",
    className = "",
    style = {},
    }: FadeInSectionProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-80px 0px" });

    const offsets = {
        up: { x: 0, y: 40 },
        down: { x: 0, y: -40 },
        left: { x: 40, y: 0 },
        right: { x: -40, y: 0 },
        none: { x: 0, y: 0 },
    };

    const offset = offsets[direction];

    return (
        <motion.div
        ref={ref}
        initial={{ opacity: 0, x: offset.x, y: offset.y }}
        animate={
            isInView
            ? { opacity: 1, x: 0, y: 0 }
            : { opacity: 0, x: offset.x, y: offset.y }
        }
        transition={{
            duration,
            delay,
            ease: "easeOut",
        }}
        className={className}
        style={style}
        >
        {children}
        </motion.div>
    );
}