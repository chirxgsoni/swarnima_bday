"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { preloadCriticalAssets } from "@/lib/preload";

interface StartGateProps {
  onStart: () => void;
}

export default function StartGate({ onStart }: StartGateProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    preloadCriticalAssets().finally(() => setReady(true));
    // Fallback: always show after 2s
    const t = setTimeout(() => setReady(true), 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="scene flex-col gap-6 cursor-pointer select-none" onClick={ready ? onStart : undefined}>
      <div className="absolute inset-0 bg-ink-900" />

      {/* Heart animation */}
      <motion.div
        className="relative z-10 flex flex-col items-center gap-6"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg
          width="80"
          height="80"
          viewBox="0 0 24 24"
          fill="none"
          className="drop-shadow-[0_0_30px_rgba(229,23,63,0.6)]"
        >
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill="#e5173f"
          />
        </svg>

        <motion.p
          className="text-white/80 text-sm font-mono tracking-[0.2em] uppercase"
          animate={{ opacity: ready ? [0.5, 1, 0.5] : 0.3 }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {ready ? "tap to begin" : "loading..."}
        </motion.p>
      </motion.div>
    </div>
  );
}
