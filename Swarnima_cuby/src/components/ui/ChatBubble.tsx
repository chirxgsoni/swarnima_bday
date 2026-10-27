"use client";

import React from "react";
import { motion } from "framer-motion";

interface ChatBubbleProps {
  text: string;
  index: number;
}

export default function ChatBubble({ text, index }: ChatBubbleProps) {
  return (
    <motion.div
      className="flex justify-end"
      initial={{ opacity: 0, y: 10, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.35,
        ease: [0.22, 0.61, 0.36, 1],
      }}
    >
      <div className="chat-bubble">
        {text}
      </div>
    </motion.div>
  );
}
