"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { content } from "@/content/content";
import { randomBetween } from "@/lib/random";
import Polaroid from "@/components/ui/Polaroid";
import Tooltip from "@/components/ui/Tooltip";

interface PolaroidWallProps {
  onComplete: () => void;
}

export default function PolaroidWall({ onComplete }: PolaroidWallProps) {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  // Navigate handler
  const handleNext = useCallback(() => {
    onComplete();
  }, [onComplete]);

  // Wheel/swipe to advance
  useEffect(() => {
    let locked = false;
    const handler = (e: WheelEvent) => {
      if (locked || tooltipOpen) return;
      if (Math.abs(e.deltaY) > 30) {
        locked = true;
        setTimeout(() => { locked = false; }, 900);
        handleNext();
      }
    };

    let touchStartY = 0;
    const touchStart = (e: TouchEvent) => { touchStartY = e.touches[0].clientY; };
    const touchEnd = (e: TouchEvent) => {
      if (tooltipOpen) return;
      const delta = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(delta) > 50) handleNext();
    };

    window.addEventListener("wheel", handler, { passive: true });
    window.addEventListener("touchstart", touchStart, { passive: true });
    window.addEventListener("touchend", touchEnd, { passive: true });

    const autoTimer = setTimeout(handleNext, 12000);

    return () => {
      window.removeEventListener("wheel", handler);
      window.removeEventListener("touchstart", touchStart);
      window.removeEventListener("touchend", touchEnd);
      clearTimeout(autoTimer);
    };
  }, [handleNext, tooltipOpen]);

  return (
    <div className="scene relative" style={{ background: "#ecebe7" }}>
      {/* Paper texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Dim overlay when tooltip is open */}
      <AnimatePresence>
        {tooltipOpen && (
          <motion.div
            className="absolute inset-0 bg-black/25 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setTooltipOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Polaroid cards */}
      <div className="absolute inset-0">
        {content.polaroids.map((p, i) => (
          <Polaroid key={i} data={p} index={i} />
        ))}
      </div>

      {/* Butterfly sticker with tooltip */}
      <div className="absolute" style={{ left: "45%", top: "42%", zIndex: tooltipOpen ? 50 : 30 }}>
        <button
          className="cursor-pointer hover:scale-110 transition-transform"
          onClick={() => setTooltipOpen(!tooltipOpen)}
          aria-label="Click for a special message"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" opacity="0.7">
            <path d="M12 12c-2-3-6-5-8-3s0 6 3 8c1.5 1 3.5 1 5 0" fill="#88bbdd" opacity="0.6" />
            <path d="M12 12c2-3 6-5 8-3s0 6-3 8c-1.5 1-3.5 1-5 0" fill="#aaccdd" opacity="0.6" />
            <circle cx="12" cy="12" r="1" fill="#444" />
          </svg>
        </button>

        <AnimatePresence>
          {tooltipOpen && (
            <Tooltip text={content.butterflyQuote} onClose={() => setTooltipOpen(false)} />
          )}
        </AnimatePresence>
      </div>

      {/* Flower doodles */}
      {[
        { left: "15%", top: "25%", size: 20 },
        { left: "72%", top: "68%", size: 18 },
        { left: "85%", top: "20%", size: 22 },
        { left: "8%",  top: "75%", size: 16 },
      ].map((f, i) => (
        <motion.div
          key={`flower-${i}`}
          className="absolute pointer-events-none"
          style={{ left: f.left, top: f.top }}
          animate={{ y: [0, -3, 0], rotate: [0, 5, 0] }}
          transition={{ duration: randomBetween(6, 9), repeat: Infinity, ease: "easeInOut", delay: i * 0.7 }}
          aria-hidden="true"
        >
          <svg width={f.size} height={f.size} viewBox="0 0 20 20" opacity="0.5">
            <circle cx="10" cy="5" r="4" fill="#ffb6c1" />
            <circle cx="5" cy="10" r="4" fill="#ffb6c1" />
            <circle cx="15" cy="10" r="4" fill="#ffb6c1" />
            <circle cx="10" cy="15" r="4" fill="#ffb6c1" />
            <circle cx="10" cy="10" r="3" fill="#ffd700" />
          </svg>
        </motion.div>
      ))}

      {/* Next arrow */}
      <button
        onClick={handleNext}
        className="absolute bottom-8 right-8 w-12 h-12 rounded-full border-2 border-gray-400 flex items-center justify-center hover:bg-white/30 transition-colors z-20"
        aria-label="Next scene"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6b7078" strokeWidth="2">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
    </div>
  );
}
