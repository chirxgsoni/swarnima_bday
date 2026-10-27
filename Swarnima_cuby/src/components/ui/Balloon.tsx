"use client";

import React from "react";
import { motion } from "framer-motion";

interface BalloonProps {
  color: string;
  size: number;
  x: number;
  delay: number;
}

export default function Balloon({ color, size, x, delay }: BalloonProps) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: `${x}%`, bottom: "-15%" }}
      initial={{ y: 0, opacity: 0 }}
      animate={{
        y: "-120vh",
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration: 7 + Math.random() * 3,
        delay,
        ease: "easeOut",
      }}
      aria-hidden="true"
    >
      <svg width={size} height={size * 1.3} viewBox="0 0 60 78">
        <defs>
          <radialGradient id={`bg-${color.replace("#", "")}`}>
            <stop offset="30%" stopColor={color} stopOpacity="0.9" />
            <stop offset="100%" stopColor={color} stopOpacity="0.6" />
          </radialGradient>
        </defs>
        <ellipse cx="30" cy="30" rx="28" ry="30" fill={`url(#bg-${color.replace("#", "")})`} />
        <ellipse cx="20" cy="18" rx="8" ry="10" fill="white" opacity="0.25" />
        <polygon points="28,58 32,58 30,78" fill={color} opacity="0.7" />
      </svg>
    </motion.div>
  );
}
