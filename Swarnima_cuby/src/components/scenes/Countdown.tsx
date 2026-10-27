"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { content } from "@/content/content";
import { randomBetween, randomPick } from "@/lib/random";
import confetti from "canvas-confetti";

interface CountdownProps {
  onComplete: () => void;
}

type Phase = "ageFrom" | "heartBurst" | "ageTo";

/** Simple ember particle for the heart burst */
function Ember({ delay }: { delay: number }) {
  const x = randomBetween(-150, 150);
  const startY = randomBetween(-20, 20);

  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width: randomBetween(2, 5),
        height: randomBetween(2, 5),
        background: randomPick(["#ff4444", "#ff6b3d", "#ffaa3c", "#ff2a2a"]),
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${startY}px)`,
        boxShadow: "0 0 6px rgba(255,80,40,0.8)",
      }}
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: [0, 1, 0], y: randomBetween(-200, -400) }}
      transition={{ duration: randomBetween(1.5, 3), delay, ease: "easeOut" }}
    />
  );
}

/** Dust particle for the countdown number */
function DustParticle({ index }: { index: number }) {
  return (
    <motion.div
      className="absolute rounded-full bg-white"
      style={{
        width: randomBetween(1, 3),
        height: randomBetween(1, 3),
        left: `${randomBetween(30, 70)}%`,
        bottom: `${randomBetween(15, 30)}%`,
        opacity: randomBetween(0.3, 0.9),
      }}
      animate={{
        y: [0, randomBetween(-30, -80)],
        opacity: [randomBetween(0.3, 0.9), 0],
      }}
      transition={{
        duration: randomBetween(3, 6),
        delay: index * 0.1,
        repeat: Infinity,
        ease: "easeOut",
      }}
    />
  );
}

/** Balloon component for Scene 3 */
function Balloon({ color, size, x, delay }: { color: string; size: number; x: number; delay: number }) {
  const targetY = typeof window !== "undefined" ? -window.innerHeight * 1.4 : -1000;
  return (
    <motion.div
      className="absolute"
      style={{ left: `${x}%`, bottom: "-20%" }}
      initial={{ y: 0, opacity: 0 }}
      animate={{
        y: [0, targetY],
        opacity: [0, 1, 1, 0],
        x: [0, Math.sin(x) * 30, -Math.sin(x) * 20, Math.sin(x) * 15],
      }}
      transition={{ duration: randomBetween(6, 9), delay, ease: "easeOut" }}
    >
      <svg width={size} height={size * 1.3} viewBox="0 0 60 78">
        <ellipse cx="30" cy="30" rx="28" ry="30" fill={color} opacity="0.9" />
        <ellipse cx="20" cy="18" rx="8" ry="10" fill="white" opacity="0.25" />
        <polygon points="28,58 32,58 30,78" fill={color} opacity="0.7" />
      </svg>
    </motion.div>
  );
}

/** Floating letter */
function FloatingLetter({ letter, index }: { letter: string; index: number }) {
  return (
    <motion.span
      className="absolute text-white font-display text-lg font-bold pointer-events-none"
      style={{
        left: `${randomBetween(10, 90)}%`,
        top: `${randomBetween(10, 90)}%`,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 0.8, 0],
        scale: [0, 1, 0.5],
        y: randomBetween(-50, -150),
      }}
      transition={{
        duration: randomBetween(3, 5),
        delay: index * 0.15 + 0.5,
        ease: "easeOut",
      }}
    >
      {letter}
    </motion.span>
  );
}

export default function Countdown({ onComplete }: CountdownProps) {
  const [phase, setPhase] = useState<Phase>("ageFrom");
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const advancePhase = useCallback(() => {
    switch (phase) {
      case "ageFrom":
        setPhase("heartBurst");
        break;
      case "heartBurst":
        setPhase("ageTo");
        break;
      case "ageTo":
        onComplete();
        break;
    }
  }, [phase, onComplete]);

  useEffect(() => {
    if (phase === "ageTo") {
      try {
        confetti({
          particleCount: 40,
          spread: 70,
          origin: { y: 0.6 },
          colors: content.balloonColors as unknown as string[],
        });
      } catch {
        // confetti fallback
      }
    }
  }, [phase]);

  useEffect(() => {
    const durations: Record<Phase, number> = {
      ageFrom: 2500,
      heartBurst: 1800,
      ageTo: 3000,
    };

    timerRef.current = setTimeout(advancePhase, durations[phase]);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [phase, advancePhase]);

  return (
    <div className="scene" style={{ background: "#0a0e1a" }}>
      <AnimatePresence mode="wait">
        {/* Phase 1: Age From (19) with spotlight */}
        {phase === "ageFrom" && (
          <motion.div
            key="ageFrom"
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(12px)", scale: 1.15 }}
            transition={{ duration: 0.6 }}
          >
            {/* Spotlight */}
            <div className="spotlight" />

            {/* Dust particles */}
            {Array.from({ length: 35 }).map((_, i) => (
              <DustParticle key={i} index={i} />
            ))}

            {/* Age number */}
            <motion.h1
              className="text-white font-chat font-extrabold select-none"
              style={{
                fontSize: "clamp(8rem, 22vw, 18rem)",
                textShadow: "0 0 40px rgba(255,255,255,0.55)",
                lineHeight: 1,
              }}
              initial={{ scale: 0.9, filter: "blur(12px)" }}
              animate={{ scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
            >
              {content.ageFrom}
            </motion.h1>
          </motion.div>
        )}

        {/* Phase 2: Heart burst */}
        {phase === "heartBurst" && (
          <motion.div
            key="heartBurst"
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Glowing heart lobes */}
            <div
              className="absolute"
              style={{
                width: 200,
                height: 180,
                left: "calc(50% - 100px)",
                top: "calc(50% - 100px)",
                background:
                  "radial-gradient(circle at 35% 40%, #ff2a2a 0%, transparent 50%), radial-gradient(circle at 65% 40%, #ff2a2a 0%, transparent 50%)",
                filter: "blur(20px)",
                opacity: 0.9,
              }}
            />

            {/* Additional glow */}
            <motion.div
              className="absolute"
              style={{
                width: 300,
                height: 280,
                left: "calc(50% - 150px)",
                top: "calc(50% - 150px)",
                background:
                  "radial-gradient(circle at 35% 35%, rgba(255,42,42,0.5) 0%, transparent 40%), radial-gradient(circle at 65% 35%, rgba(255,42,42,0.5) 0%, transparent 40%)",
                filter: "blur(30px)",
              }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />

            {/* Embers */}
            {Array.from({ length: 50 }).map((_, i) => (
              <Ember key={i} delay={i * 0.03} />
            ))}
          </motion.div>
        )}

        {/* Phase 3: Age To (20) with balloons */}
        {phase === "ageTo" && (
          <motion.div
            key="ageTo"
            className="absolute inset-0 flex items-center justify-center overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Blurred photo background */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "url(/photos/garland/g01.webp)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "blur(18px) brightness(0.4)",
              }}
            />
            <div className="absolute inset-0 bg-black/40" />

            {/* Age number */}
            <motion.h1
              className="text-white font-chat font-extrabold select-none relative z-10"
              style={{
                fontSize: "clamp(8rem, 22vw, 18rem)",
                textShadow: "0 0 40px rgba(255,255,255,0.55)",
                lineHeight: 1,
              }}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
            >
              {content.ageTo}
            </motion.h1>

            {/* Balloons */}
            {content.balloonColors.map((color, i) => (
              <React.Fragment key={`balloon-group-${i}`}>
                <Balloon
                  color={color}
                  size={randomBetween(70, 120)}
                  x={randomBetween(5, 95)}
                  delay={i * 0.3}
                />
                <Balloon
                  color={color}
                  size={randomBetween(50, 90)}
                  x={randomBetween(5, 95)}
                  delay={i * 0.3 + 0.5}
                />
              </React.Fragment>
            ))}

            {/* Floating "Happy birthday" letters */}
            {content.birthdayLetters.map((letter, i) => (
              <FloatingLetter key={i} letter={letter} index={i} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
