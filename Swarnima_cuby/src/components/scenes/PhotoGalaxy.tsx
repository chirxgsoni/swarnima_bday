"use client";

import React, { useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { content } from "@/content/content";
import { randomBetween } from "@/lib/random";

interface PhotoGalaxyProps {
  onComplete: () => void;
}

interface StarData {
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

interface PhotoData {
  src: string;
  alt: string;
  x: number;
  y: number;
  z: number;
  rx: number;
  ry: number;
  rz: number;
  size: number;
  delay: number;
  duration: number;
}

export default function PhotoGalaxy({ onComplete }: PhotoGalaxyProps) {
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  // Auto-advance after 8 seconds
  useEffect(() => {
    timerRef.current = setTimeout(onComplete, 8000);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [onComplete]);

  // Generate stars
  const stars = useMemo<StarData[]>(() =>
    Array.from({ length: 200 }, () => ({
      x: randomBetween(0, 100),
      y: randomBetween(0, 100),
      size: randomBetween(1, 2),
      delay: randomBetween(0, 5),
      duration: randomBetween(2, 5),
    })),
  []);

  // Generate photo cards with 3D positions
  const photos = useMemo<PhotoData[]>(() =>
    content.gallery.map((g, i) => ({
      src: g.src,
      alt: g.alt,
      x: randomBetween(-35, 35),
      y: randomBetween(-35, 35),
      z: randomBetween(-1200, -300),
      rx: randomBetween(-25, 25),
      ry: randomBetween(-25, 25),
      rz: randomBetween(-15, 15),
      size: randomBetween(80, 220),
      delay: i * 0.4,
      duration: randomBetween(8, 12),
    })),
  []);

  return (
    <div className="scene" style={{ background: "#05060c" }}>
      {/* Stars */}
      {stars.map((star, i) => (
        <motion.div
          key={`star-${i}`}
          className="star absolute"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
          }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          aria-hidden="true"
        />
      ))}

      {/* 3D photo container */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ perspective: 1000, transformStyle: "preserve-3d" }}
      >
        {photos.map((photo, i) => (
          <motion.div
            key={i}
            className="absolute rounded-lg overflow-hidden shadow-xl"
            style={{
              width: photo.size,
              height: photo.size * 0.75,
              transformStyle: "preserve-3d",
            }}
            initial={{
              x: `${photo.x}%`,
              y: `${photo.y}%`,
              z: photo.z,
              rotateX: photo.rx,
              rotateY: photo.ry,
              rotateZ: photo.rz,
              opacity: 0.3,
            }}
            animate={{
              z: 500,
              opacity: [0.3, 0.8, 1, 0],
              scale: [0.5, 0.8, 1.2, 1.5],
            }}
            transition={{
              duration: photo.duration,
              delay: photo.delay,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo.src}
              alt={photo.alt}
              className="w-full h-full object-cover"
              loading="lazy"
              onError={(e) => {
                const t = e.target as HTMLImageElement;
                t.style.background = "linear-gradient(135deg, #333, #555)";
                t.alt = `Galaxy photo ${i + 1}`;
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Bottom gradient transition to chat scene */}
      <motion.div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: "30%",
          background: "linear-gradient(to top, #e3d4f5, #ff6b8b44, transparent)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 5, duration: 2 }}
      />
    </div>
  );
}
