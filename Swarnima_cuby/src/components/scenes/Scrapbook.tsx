"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { content } from "@/content/content";

interface ScrapbookProps {
  onComplete: () => void;
}

export default function Scrapbook({ onComplete }: ScrapbookProps) {
  // -1 = cover, 0..3 = spreads
  const [spreadIndex, setSpreadIndex] = useState(-1);
  const [isFlipping, setIsFlipping] = useState(false);
  const totalSpreads = content.scrapbook.spreads.length;

  const flipNext = useCallback(() => {
    if (isFlipping) return;
    setIsFlipping(true);

    if (spreadIndex >= totalSpreads - 1) {
      setTimeout(() => onComplete(), 700);
      return;
    }

    setTimeout(() => {
      setSpreadIndex((prev) => prev + 1);
      setIsFlipping(false);
    }, 850);
  }, [spreadIndex, totalSpreads, isFlipping, onComplete]);

  const flipPrev = useCallback(() => {
    if (isFlipping || spreadIndex <= -1) return;
    setIsFlipping(true);

    setTimeout(() => {
      setSpreadIndex((prev) => prev - 1);
      setIsFlipping(false);
    }, 850);
  }, [spreadIndex, isFlipping]);

  // Wheel/touch to flip
  useEffect(() => {
    let locked = false;
    const handler = (e: WheelEvent) => {
      if (locked) return;
      if (Math.abs(e.deltaY) > 30) {
        locked = true;
        setTimeout(() => { locked = false; }, 1200);
        if (e.deltaY > 0) flipNext();
        else flipPrev();
      }
    };

    let touchStartX = 0;
    const touchStart = (e: TouchEvent) => { touchStartX = e.touches[0].clientX; };
    const touchEnd = (e: TouchEvent) => {
      const delta = touchStartX - e.changedTouches[0].clientX;
      if (delta > 40) flipNext();
      else if (delta < -40) flipPrev();
    };

    window.addEventListener("wheel", handler, { passive: true });
    window.addEventListener("touchstart", touchStart, { passive: true });
    window.addEventListener("touchend", touchEnd, { passive: true });

    // Auto advance every 4.5s
    const autoTimer = setInterval(flipNext, 4500);

    return () => {
      window.removeEventListener("wheel", handler);
      window.removeEventListener("touchstart", touchStart);
      window.removeEventListener("touchend", touchEnd);
      clearInterval(autoTimer);
    };
  }, [flipNext, flipPrev]);

  const currentSpread = spreadIndex >= 0 ? content.scrapbook.spreads[spreadIndex] : null;

  // Background blurred photos
  const bgPhotos = [
    "/photos/scrapbook/swarnima_red_traditional.jpg",
    "/photos/scrapbook/flowers.jpg",
    "/photos/scrapbook/heart.jpg",
    "/photos/scrapbook/swarnima_outdoor_smile.jpg",
    "/photos/scrapbook/swarnima_blue_bindi.jpg",
    "/photos/scrapbook/swarnima_chin_rest.jpg",
  ];

  return (
    <div className="scene flex-col items-center justify-center relative overflow-hidden" style={{ background: "#06070e" }}>
      {/* Background ambient radial glow */}
      <div
        className="absolute inset-0 pointer-events-none select-none"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(244, 114, 182, 0.15), rgba(99, 102, 241, 0.1) 45%, transparent 70%)",
        }}
      />

      {/* Floating blurred background photos */}
      {bgPhotos.map((src, i) => (
        <div
          key={i}
          className="absolute rounded-2xl overflow-hidden pointer-events-none select-none transition-opacity duration-1000 hidden sm:block"
          style={{
            width: `${110 + (i % 3) * 35}px`,
            height: `${110 + (i % 3) * 35}px`,
            left: `${[4, 82, 86, 3, 76, 38][i]}%`,
            top: `${[6, 8, 68, 62, 80, 2][i]}%`,
            opacity: 0.18,
            filter: "blur(7px)",
            transform: `rotate(${[-8, 6, -12, 10, -5, 4][i]}deg)`,
          }}
          aria-hidden="true"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt="" className="w-full h-full object-cover" />
        </div>
      ))}

      {/* Title Header */}
      <div className="relative z-10 text-center mb-3 sm:mb-4">
        <p className="text-pink-300 text-xs sm:text-sm font-mono tracking-widest uppercase">
          Chapter 06 · Our Stories & Moments
        </p>
        <h2 className="text-white font-serif text-lg sm:text-2xl font-bold">
          The Scrapbook of Love 📖✨
        </h2>
      </div>

      {/* Scrapbook Container */}
      <div
        className="scrapbook-container relative cursor-pointer select-none"
        onClick={flipNext}
        style={{
          width: "min(92vw, 860px)",
          aspectRatio: "1.6",
          perspective: 2000,
        }}
      >
        <AnimatePresence mode="wait">
          {/* ── Cover Page ── */}
          {spreadIndex === -1 && (
            <motion.div
              key="cover"
              className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl border-4 border-amber-900/60"
              initial={{ rotateY: 0 }}
              exit={{ rotateY: -160, opacity: 0 }}
              transition={{ duration: 0.95, ease: [0.22, 0.61, 0.36, 1] }}
              style={{
                transformOrigin: "left center",
                background: "linear-gradient(135deg, #3d1424 0%, #220813 50%, #15030b 100%)",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.8), inset 0 0 40px rgba(0,0,0,0.7)",
              }}
            >
              {/* Gold decorative border */}
              <div className="absolute inset-4 sm:inset-6 border-2 border-amber-400/40 rounded-xl pointer-events-none flex flex-col items-center justify-between p-4 sm:p-6">
                {/* Top subtitle */}
                <div className="text-center">
                  <p className="text-amber-200/80 font-mono text-[0.65rem] sm:text-xs tracking-[0.25em] uppercase">
                    Memories & Moments
                  </p>
                  <p className="text-amber-300 font-serif text-xs sm:text-sm italic mt-0.5">
                    For Swarnima on her 20th Birthday
                  </p>
                </div>

                {/* Center Polaroid Photo */}
                <div className="relative bg-white p-2 sm:p-3 pb-5 sm:pb-7 rounded-sm shadow-2xl rotate-[-2deg] max-w-[180px] sm:max-w-[220px]">
                  {/* Decorative tape on top */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-amber-100/80 border-t border-b border-amber-300/40 shadow-sm rotate-[1deg]" />
                  <div className="aspect-square overflow-hidden rounded bg-rose-50">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/photos/scrapbook/swarnima_portrait_smile.jpg"
                      alt="Cover"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="font-hand text-center text-navy-900 text-sm sm:text-base font-bold mt-2">
                    Our Story ❤️
                  </p>
                </div>

                {/* Bottom hint */}
                <div className="text-center">
                  <p className="text-amber-200/90 font-serif text-sm sm:text-lg font-bold">
                    Swarnima & Yashasvi
                  </p>
                  <p className="text-amber-400/70 text-[0.65rem] sm:text-xs font-mono mt-1 animate-pulse">
                    Click anywhere to open the book →
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── Spreads (0..3) ── */}
          {currentSpread && (
            <motion.div
              key={`spread-${spreadIndex}`}
              className="absolute inset-0 flex rounded-2xl overflow-hidden shadow-2xl border-2 border-amber-950/40"
              initial={{ rotateY: 160, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: -160, opacity: 0 }}
              transition={{ duration: 0.85, ease: [0.22, 0.61, 0.36, 1] }}
              style={{
                transformOrigin: "left center",
                backfaceVisibility: "hidden",
                boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.9)",
              }}
            >
              {/* ── LEFT PAGE ── */}
              <div
                className="w-1/2 h-full relative overflow-hidden flex flex-col items-center justify-center p-3 sm:p-6"
                style={{
                  background: "#fbf8f2",
                  backgroundImage: "radial-gradient(#ebd9c8 0.75px, transparent 0.75px)",
                  backgroundSize: "18px 18px",
                  boxShadow: "inset -12px 0 20px -10px rgba(0,0,0,0.25)",
                }}
              >
                {/* Polaroid Photo Frame */}
                <div className="relative bg-white p-2 sm:p-3 pb-4 sm:pb-6 rounded-sm shadow-xl rotate-[-2.5deg] max-w-[85%] sm:max-w-[78%] transition-transform hover:rotate-0 hover:scale-105 duration-300">
                  {/* Top washi tape */}
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-16 sm:w-20 h-5 sm:h-6 bg-pink-200/75 border-t border-b border-pink-300/40 shadow-sm rotate-[2deg] z-10" />

                  {/* Corner Heart Sticker */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 z-20">
                    <svg viewBox="0 0 24 24" fill="#e11d48" className="w-full h-full drop-shadow">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </div>

                  {/* The Photo */}
                  <div className="aspect-[4/5] sm:aspect-square overflow-hidden rounded bg-gray-100 shadow-inner">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={currentSpread.left}
                      alt={`Story left ${spreadIndex + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Handwritten Caption */}
                  <p className="font-hand text-center text-navy-900 text-xs sm:text-base font-bold mt-2 truncate">
                    {currentSpread.leftCaption || "Precious Moment ✨"}
                  </p>
                </div>
              </div>

              {/* ── SPIRAL BINDING (Center Spine) ── */}
              <div
                className="w-4 sm:w-6 h-full flex flex-col items-center justify-around py-3 z-20 flex-shrink-0"
                style={{
                  background: "linear-gradient(90deg, #1f242e 0%, #2f3644 50%, #1f242e 100%)",
                  boxShadow: "inset 0 0 8px rgba(0,0,0,0.8)",
                }}
              >
                {Array.from({ length: 14 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-3 sm:w-4 h-2.5 sm:h-3 rounded-full border border-gray-400 shadow-inner"
                    style={{
                      background: "linear-gradient(135deg, #71717a 0%, #d4d4d8 50%, #52525b 100%)",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.6)",
                    }}
                  />
                ))}
              </div>

              {/* ── RIGHT PAGE ── */}
              <div
                className="w-1/2 h-full relative overflow-hidden flex flex-col items-center justify-center p-3 sm:p-6"
                style={{
                  background: "#fbf8f2",
                  backgroundImage: "radial-gradient(#ebd9c8 0.75px, transparent 0.75px)",
                  backgroundSize: "18px 18px",
                  boxShadow: "inset 12px 0 20px -10px rgba(0,0,0,0.25)",
                }}
              >
                {/* Photo on Right Page */}
                <div className="relative bg-white p-2 sm:p-2.5 pb-3 sm:pb-4 rounded-sm shadow-xl rotate-[2deg] max-w-[80%] sm:max-w-[72%] transition-transform hover:rotate-0 hover:scale-105 duration-300 mb-2 sm:mb-3">
                  {/* Washi tape */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 sm:w-18 h-4 sm:h-5 bg-amber-200/75 border-t border-b border-amber-300/40 shadow-sm rotate-[-1deg] z-10" />

                  {/* Corner Star Sticker */}
                  <div className="absolute -top-2 -left-2 w-5 sm:w-6 h-5 sm:h-6 z-20">
                    <svg viewBox="0 0 24 24" fill="#fbbf24" className="w-full h-full drop-shadow">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  </div>

                  {/* The Photo */}
                  <div className="aspect-[4/3] sm:aspect-square overflow-hidden rounded bg-gray-100 shadow-inner max-h-[120px] sm:max-h-[160px]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={currentSpread.right}
                      alt={`Story right ${spreadIndex + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Handwritten Caption */}
                  <p className="font-hand text-center text-navy-900 text-xs sm:text-sm font-bold mt-1.5 truncate">
                    {currentSpread.rightCaption || "Forever & Always 💕"}
                  </p>
                </div>

                {/* Quotes on Peach Highlight Strips */}
                <div className="flex flex-col gap-1.5 sm:gap-2.5 items-center w-full max-w-[90%] z-10">
                  {currentSpread.quotes.map((q, qi) => (
                    <div
                      key={qi}
                      className="px-2.5 sm:px-4 py-1 sm:py-2 rounded shadow-sm border border-orange-200/60"
                      style={{
                        background: "#f7d9c4",
                        transform: `rotate(${qi % 2 === 0 ? "-1.5deg" : "1.2deg"})`,
                      }}
                    >
                      <p className="font-serif text-[0.65rem] sm:text-xs md:text-sm text-gray-900 italic text-center font-medium leading-relaxed">
                        &ldquo;{q}&rdquo;
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation Controls & Page Indicators */}
      <div className="flex items-center gap-4 mt-4 sm:mt-6 z-10">
        <button
          onClick={(e) => {
            e.stopPropagation();
            flipPrev();
          }}
          disabled={spreadIndex <= -1}
          className={`px-3 py-1 rounded-full text-xs font-mono tracking-wider transition-all ${
            spreadIndex <= -1
              ? "opacity-30 text-gray-500 cursor-not-allowed"
              : "bg-white/10 hover:bg-white/20 text-white cursor-pointer"
          }`}
        >
          ← Prev
        </button>

        {/* Dots */}
        <div className="flex gap-2">
          {Array.from({ length: totalSpreads + 1 }).map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === spreadIndex + 1 ? "w-6 bg-pink-400" : "w-2 bg-white/25"
              }`}
            />
          ))}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            flipNext();
          }}
          className="px-3 py-1 rounded-full text-xs font-mono tracking-wider bg-pink-500/80 hover:bg-pink-500 text-white transition-all cursor-pointer shadow-lg shadow-pink-500/30"
        >
          {spreadIndex >= totalSpreads - 1 ? "Finish →" : "Next →"}
        </button>
      </div>

      <p className="text-white/40 text-[0.65rem] font-mono mt-2 z-10">
        Click anywhere on the book or use buttons to flip pages
      </p>
    </div>
  );
}
