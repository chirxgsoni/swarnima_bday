"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface CurtainsProps {
  onComplete: () => void;
}

export default function Curtains({ onComplete }: CurtainsProps) {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete,
      delay: 0.6,
    });

    tl.to(leftRef.current, {
      x: "-100%",
      duration: 1.4,
      ease: "power3.inOut",
    }, 0);

    tl.to(rightRef.current, {
      x: "100%",
      duration: 1.4,
      ease: "power3.inOut",
    }, 0);

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div className="scene bg-ink-900">
      {/* Left curtain */}
      <div
        ref={leftRef}
        className="curtain-panel curtain-left"
        style={{
          background: `repeating-linear-gradient(
            90deg,
            #b3122f 0px,
            #b3122f 6px,
            #e5173f 6px,
            #e5173f 14px,
            #b3122f 14px,
            #b3122f 20px
          )`,
          boxShadow: "inset -20px 0 40px rgba(0,0,0,0.35)",
        }}
      />

      {/* Right curtain */}
      <div
        ref={rightRef}
        className="curtain-panel curtain-right"
        style={{
          background: `repeating-linear-gradient(
            90deg,
            #b3122f 0px,
            #b3122f 6px,
            #e5173f 6px,
            #e5173f 14px,
            #b3122f 14px,
            #b3122f 20px
          )`,
          boxShadow: "inset 20px 0 40px rgba(0,0,0,0.35)",
        }}
      />

      {/* Dark stage behind curtains */}
      <div className="absolute inset-0 bg-ink-900 -z-10" />
    </div>
  );
}
