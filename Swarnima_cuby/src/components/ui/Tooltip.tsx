"use client";

import React from "react";
import { motion } from "framer-motion";

interface TooltipProps {
  text: string;
  onClose: () => void;
}

export default function Tooltip({ text, onClose }: TooltipProps) {
  return (
    <motion.div
      className="tooltip-card absolute left-8 top-0 z-50"
      initial={{ opacity: 0, scale: 0.8, y: 5 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 5 }}
      transition={{ duration: 0.25, ease: [0.22, 0.61, 0.36, 1] }}
      onClick={(e) => e.stopPropagation()}
    >
      <p className="font-serif text-white text-[0.8rem] leading-relaxed italic">
        {text}
      </p>
    </motion.div>
  );
}
