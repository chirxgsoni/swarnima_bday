"use client";

import React, { useEffect, useCallback, useState } from "react";
import { content } from "@/content/content";
import Garland from "./Garland";

interface HeroProps {
  onComplete: () => void;
}

export default function Hero({ onComplete }: HeroProps) {
  const [showArrow] = useState(true);

  // Navigate to next scene on click/scroll/swipe
  const handleNext = useCallback(() => {
    onComplete();
  }, [onComplete]);

  // Wheel/swipe handler
  useEffect(() => {
    let locked = false;
    const handler = (e: WheelEvent | TouchEvent) => {
      if (locked) return;
      let delta = 0;
      if (e instanceof WheelEvent) {
        delta = e.deltaY;
      }
      if (Math.abs(delta) > 30) {
        locked = true;
        setTimeout(() => {
          locked = false;
        }, 900);
        handleNext();
      }
    };

    // Touch handling
    let touchStartY = 0;
    const touchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const touchEnd = (e: TouchEvent) => {
      const delta = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(delta) > 50) handleNext();
    };

    window.addEventListener("wheel", handler, { passive: true });
    window.addEventListener("touchstart", touchStart, { passive: true });
    window.addEventListener("touchend", touchEnd, { passive: true });

    // Auto-advance after 10s
    const autoTimer = setTimeout(handleNext, 10000);

    return () => {
      window.removeEventListener("wheel", handler);
      window.removeEventListener("touchstart", touchStart);
      window.removeEventListener("touchend", touchEnd);
      clearTimeout(autoTimer);
    };
  }, [handleNext]);

  return (
    <div className="scene" style={{ background: "#fbfaf7" }}>
      <div className="w-full h-full flex flex-col lg:flex-row items-start justify-start p-8 lg:p-16 relative overflow-hidden">
        {/* Left text block */}
        <div className="lg:w-[40%] w-full flex flex-col justify-center z-10 mt-8 lg:mt-[12vh]">
          <h1 className="font-display leading-[1.05]">
            <span
              className="block font-light text-[clamp(3rem,6vw,5.5rem)]"
              style={{ color: "#1f2a44" }}
            >
              Happy
            </span>
            <span
              className="block font-extrabold text-[clamp(3rem,6vw,5.5rem)]"
              style={{ color: "#1f2a44", letterSpacing: "-0.02em" }}
            >
              Birthday
            </span>
            <span
              className="block font-extrabold text-[clamp(3rem,6vw,5.5rem)]"
              style={{ color: "#f28c1b", letterSpacing: "-0.02em" }}
            >
              {content.name}
            </span>
          </h1>

          {/* Divider */}
          <div
            className="mt-4 mb-4"
            style={{ width: 40, height: 1, background: "#8a8f98" }}
          />

          {/* Paragraph */}
          <p
            className="font-body text-[0.85rem] leading-[1.7] max-w-[340px]"
            style={{ color: "#6b7078" }}
          >
            {content.heroParagraph}
          </p>
        </div>

        {/* Garland area */}
        <Garland className="lg:w-[60%] w-full relative lg:absolute lg:right-0 lg:bottom-0 lg:top-[20%]" />

        {/* Next arrow */}
        {showArrow && (
          <button
            onClick={handleNext}
            className="absolute bottom-8 right-8 w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors z-20 cursor-pointer"
            aria-label="Next scene"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#6b7078"
              strokeWidth="2"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
