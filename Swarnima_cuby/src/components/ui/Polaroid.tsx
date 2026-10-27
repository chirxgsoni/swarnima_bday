"use client";

import React from "react";
import { motion } from "framer-motion";
import { randomBetween } from "@/lib/random";

interface PolaroidData {
  src: string;
  caption: string;
  x: number;
  y: number;
  rot: number;
}

interface PolaroidProps {
  data: PolaroidData;
  index: number;
}

export default function Polaroid({ data, index }: PolaroidProps) {
  const floatDuration = randomBetween(6, 9);
  const floatDelay = index * 0.5;

  // Responsive sizing
  const width = typeof window !== "undefined" && window.innerWidth < 768 ? 130 : 170;

  return (
    <motion.div
      className="polaroid"
      style={{
        left: `${data.x}%`,
        top: `${data.y}%`,
        width,
        transform: `rotate(${data.rot}deg)`,
        zIndex: 10 + index,
      }}
      animate={{ y: [0, -4, 0] }}
      transition={{
        duration: floatDuration,
        delay: floatDelay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      whileHover={{
        y: -6,
        rotate: 0,
        scale: 1.05,
        zIndex: 100,
        transition: { duration: 0.25 },
      }}
    >
      {/* Heart pin */}
      <div className="heart-pin" aria-hidden="true">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#e5173f">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </div>

      {/* Photo */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={data.src}
        alt={data.caption}
        className="w-full aspect-square object-cover block"
        loading="lazy"
        onError={(e) => {
          const t = e.target as HTMLImageElement;
          t.style.background = "#ddd";
          t.style.minHeight = "100px";
        }}
      />

      {/* Caption */}
      <p className="polaroid-caption">{data.caption}</p>
    </motion.div>
  );
}
