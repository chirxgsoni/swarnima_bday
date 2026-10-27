"use client";

import React, { useEffect, useRef } from "react";
import { content } from "@/content/content";
import { GARLAND_PATH, getPointOnPath } from "@/lib/path";

interface GarlandProps {
  className?: string;
}

export default function Garland({ className = "" }: GarlandProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const photosRef = useRef<(HTMLDivElement | null)[]>([]);
  const animFrameRef = useRef<number>();
  const progressRef = useRef(0);

  // Garland animation using requestAnimationFrame
  useEffect(() => {
    const pathEl = pathRef.current;
    if (!pathEl) return;

    const numPhotos = content.garland.length;
    const speed = 0.0003; // progress per frame (~30px/s at 60fps)

    const animate = () => {
      progressRef.current += speed;
      if (progressRef.current > 1) progressRef.current -= 1;

      for (let i = 0; i < numPhotos; i++) {
        const el = photosRef.current[i];
        if (!el) continue;

        const prog = (progressRef.current + i / numPhotos) % 1;
        const { x, y, angle } = getPointOnPath(pathEl, prog);

        // Random rotation jitter per photo (seeded by index)
        const jitter = ((i * 7 + 3) % 25) - 12;

        el.style.transform = `translate(${x - 42}px, ${y - 42}px) rotate(${angle + jitter}deg)`;
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`garland-container ${className}`}
      style={{ height: "55vh", minHeight: 300 }}
    >
      {/* SVG path (invisible, used for calculations) */}
      <svg
        viewBox="0 0 1050 400"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid meet"
        style={{ overflow: "visible" }}
      >
        <path
          ref={pathRef}
          d={GARLAND_PATH}
          fill="none"
          stroke="transparent"
          strokeWidth="1"
        />
      </svg>

      {/* Photo elements */}
      {content.garland.map((photo, i) => (
        <div
          key={i}
          ref={(el) => {
            photosRef.current[i] = el;
          }}
          className="garland-photo absolute top-0 left-0"
          style={{ willChange: "transform" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photo.src}
            alt={photo.alt}
            className="w-full h-full object-cover rounded-[2px]"
            loading="eager"
            decoding="async"
            onError={(e) => {
              const t = e.target as HTMLImageElement;
              t.style.background = "#ddd";
              t.alt = `Photo ${i + 1}`;
            }}
          />
        </div>
      ))}
    </div>
  );
}
