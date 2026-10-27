"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { content } from "@/content/content";
import { useTypewriter } from "@/hooks/useTypewriter";
import PhoneFrame from "@/components/ui/PhoneFrame";
import ChatBubble from "@/components/ui/ChatBubble";

interface ChatSceneProps {
  onReplay: () => void;
}

export default function ChatScene({ onReplay }: ChatSceneProps) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [showTyping, setShowTyping] = useState(false);
  const [typedSent, setTypedSent] = useState(false);
  const [showReplay, setShowReplay] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const typewriter = useTypewriter(content.chat.typedFinal, 45);
  const typewriterRef = useRef(typewriter);
  typewriterRef.current = typewriter;

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [visibleCount, typewriter.displayed, typedSent]);

  // Sequential message reveal with strict cancellation
  useEffect(() => {
    let cancelled = false;
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    const delay = (ms: number) =>
      new Promise<void>((resolve) => {
        const id = setTimeout(() => resolve(), ms);
        timeouts.push(id);
      });

    const runSequence = async () => {
      for (let i = 1; i <= content.chat.messages.length; i++) {
        await delay(1100);
        if (cancelled) return;
        setVisibleCount(i);
      }

      // Start typing after bubbles have appeared
      await delay(800);
      if (cancelled) return;
      setShowTyping(true);
      typewriterRef.current.start();
    };

    runSequence();

    return () => {
      cancelled = true;
      timeouts.forEach((id) => clearTimeout(id));
    };
  }, []);

  // When typing is done, "send" the message
  useEffect(() => {
    if (typewriter.isDone && showTyping) {
      const timer = setTimeout(() => {
        setShowTyping(false);
        setTypedSent(true);
        setTimeout(() => setShowReplay(true), 1000);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [typewriter.isDone, showTyping]);

  // The 3 photos in a line:
  // 1st: Girl (Left)
  // 2nd: Heart (Middle)
  // 3rd: Yashasvi (Right)
  const photoGirl = content.chat.backgroundPhotos[0] || {
    src: "/photos/chat_bg/girl.jpg",
    caption: "Swarnima ✨",
    alt: "Swarnima",
  };
  const photoHeart = content.chat.backgroundPhotos[1] || {
    src: "/photos/chat_bg/heart.jpg",
    caption: "Heart ❤️",
    alt: "Heart",
  };
  const photoYashasvi = content.chat.backgroundPhotos[2] || {
    src: "/photos/chat_bg/yashasvi.jpg",
    caption: "Yashasvi 💫",
    alt: "Yashasvi",
  };

  return (
    <div
      className="scene min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden py-3 px-3 sm:px-6"
      style={{
        background: `
          radial-gradient(circle at 18% 30%, rgba(244, 114, 182, 0.45), transparent 55%),
          radial-gradient(circle at 82% 35%, rgba(129, 140, 248, 0.45), transparent 55%),
          radial-gradient(circle at 50% 60%, rgba(251, 113, 133, 0.35), transparent 60%),
          #ecdcf8
        `,
      }}
    >
      {/* ── Soft Ambient Background Auras ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
        <div
          className="absolute left-[5%] top-[10%] w-[360px] h-[360px] rounded-full opacity-25 blur-3xl"
          style={{
            backgroundImage: `url(${photoGirl.src})`,
            backgroundSize: "cover",
          }}
        />
        <div
          className="absolute left-1/2 -translate-x-1/2 top-[5%] w-[380px] h-[380px] rounded-full opacity-25 blur-3xl"
          style={{
            backgroundImage: `url(${photoHeart.src})`,
            backgroundSize: "cover",
          }}
        />
        <div
          className="absolute right-[5%] top-[10%] w-[360px] h-[360px] rounded-full opacity-25 blur-3xl"
          style={{
            backgroundImage: `url(${photoYashasvi.src})`,
            backgroundSize: "cover",
          }}
        />
      </div>

      {/* ── 3 Photos in a Line (Girl on Left, Heart in Middle, Yashasvi on Right) ── */}
      <div className="z-10 flex flex-row items-center justify-center gap-3 sm:gap-6 md:gap-10 lg:gap-12 mb-3 sm:mb-4 select-none">
        {/* 1. LEFT: Girl's photo (Swarnima) */}
        <motion.div
          initial={{ opacity: 0, y: -25, rotate: -4 }}
          animate={{
            opacity: 1,
            y: [0, -6, 0],
            rotate: [-4, -2, -4],
          }}
          transition={{
            y: { duration: 5.5, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 6.5, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 0.8 },
          }}
          whileHover={{
            scale: 1.08,
            rotate: 0,
            zIndex: 40,
            transition: { duration: 0.2 },
          }}
          className="relative group cursor-pointer"
        >
          <div className="bg-white/95 backdrop-blur-md p-2 sm:p-2.5 pb-3 sm:pb-4 rounded-2xl shadow-xl border border-white/80 w-24 sm:w-32 md:w-40 lg:w-44 transition-all duration-300 group-hover:shadow-pink-400/50">
            {/* Pink heart pin */}
            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-6 h-6 z-20">
              <svg viewBox="0 0 24 24" fill="#ec4899" className="w-full h-full drop-shadow">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
            {/* Image */}
            <div className="overflow-hidden rounded-xl aspect-square bg-pink-100 shadow-inner">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photoGirl.src}
                alt={photoGirl.alt}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Caption */}
            <p className="text-center font-hand text-xs sm:text-sm md:text-base font-bold text-navy-800 mt-1.5 truncate">
              {photoGirl.caption}
            </p>
          </div>
        </motion.div>

        {/* 2. MIDDLE: Heart photo */}
        <motion.div
          initial={{ opacity: 0, y: -25, rotate: 0 }}
          animate={{
            opacity: 1,
            y: [0, -8, 0],
            scale: [1, 1.02, 1],
          }}
          transition={{
            y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.2 },
            scale: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.2 },
            opacity: { duration: 0.8 },
          }}
          whileHover={{
            scale: 1.1,
            rotate: 0,
            zIndex: 40,
            transition: { duration: 0.2 },
          }}
          className="relative group cursor-pointer"
        >
          <div className="bg-white/95 backdrop-blur-md p-2 sm:p-2.5 pb-3 sm:pb-4 rounded-2xl shadow-xl border-2 border-rose-300 w-26 sm:w-34 md:w-42 lg:w-46 transition-all duration-300 group-hover:shadow-rose-500/60">
            {/* Red heart pin */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-7 h-7 z-20">
              <svg viewBox="0 0 24 24" fill="#e11d48" className="w-full h-full drop-shadow-md">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
            {/* Image */}
            <div className="overflow-hidden rounded-xl aspect-square bg-rose-50 shadow-inner">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photoHeart.src}
                alt={photoHeart.alt}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Caption */}
            <p className="text-center font-hand text-xs sm:text-sm md:text-base font-bold text-rose-700 mt-1.5 truncate">
              {photoHeart.caption}
            </p>
          </div>
        </motion.div>

        {/* 3. RIGHT: Yashasvi photo */}
        <motion.div
          initial={{ opacity: 0, y: -25, rotate: 4 }}
          animate={{
            opacity: 1,
            y: [0, -6, 0],
            rotate: [4, 2, 4],
          }}
          transition={{
            y: { duration: 5.3, repeat: Infinity, ease: "easeInOut", delay: 0.4 },
            rotate: { duration: 6.3, repeat: Infinity, ease: "easeInOut", delay: 0.4 },
            opacity: { duration: 0.8 },
          }}
          whileHover={{
            scale: 1.08,
            rotate: 0,
            zIndex: 40,
            transition: { duration: 0.2 },
          }}
          className="relative group cursor-pointer"
        >
          <div className="bg-white/95 backdrop-blur-md p-2 sm:p-2.5 pb-3 sm:pb-4 rounded-2xl shadow-xl border border-white/80 w-24 sm:w-32 md:w-40 lg:w-44 transition-all duration-300 group-hover:shadow-indigo-400/50">
            {/* Gold star pin */}
            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-6 h-6 z-20">
              <svg viewBox="0 0 24 24" fill="#f59e0b" className="w-full h-full drop-shadow">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            </div>
            {/* Image */}
            <div className="overflow-hidden rounded-xl aspect-square bg-indigo-50 shadow-inner">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photoYashasvi.src}
                alt={photoYashasvi.alt}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Caption */}
            <p className="text-center font-hand text-xs sm:text-sm md:text-base font-bold text-navy-800 mt-1.5 truncate">
              {photoYashasvi.caption}
            </p>
          </div>
        </motion.div>
      </div>

      {/* ── Main Phone Container ── */}
      <div className="relative z-20 flex flex-col items-center gap-2">
        <PhoneFrame>
          {/* Header */}
          <div className="flex items-center gap-2 px-3 py-2 border-b border-white/5">
            {/* Avatar */}
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-pink-400 to-orange-400 overflow-hidden flex-shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={content.chat.avatar}
                alt="Contact avatar"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-[0.85rem] font-bold font-chat truncate">
                {content.chat.contactName}
              </p>
              <p className="text-gray-400 text-[0.6rem] font-chat">
                {content.chat.status}
              </p>
            </div>
          </div>

          {/* Date pill */}
          <div className="flex justify-center py-1.5">
            <div className="px-3 py-0.5 rounded-full bg-white/10 text-gray-400 text-[0.55rem] font-chat">
              Today {content.chat.time}
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 px-3 overflow-y-auto no-scrollbar flex flex-col gap-2">
            <AnimatePresence>
              {content.chat.messages.slice(0, visibleCount).map((msg, idx) => (
                <ChatBubble key={`chat-bubble-${idx}`} text={msg.text} index={idx} />
              ))}

              {/* Typed final message after send */}
              {typedSent && (
                <ChatBubble
                  key="typed-sent-message"
                  text={content.chat.typedFinal}
                  index={content.chat.messages.length}
                />
              )}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>

          {/* Input bar */}
          <div className="px-3 py-2 flex items-center gap-2">
            <div className="flex-1 h-8 rounded-full border border-white/10 bg-white/5 flex items-center px-3">
              {showTyping ? (
                <span className="text-white/80 text-[0.65rem] font-chat">
                  {typewriter.displayed}
                  <span className="animate-pulse">|</span>
                </span>
              ) : (
                <span className="text-white/30 text-[0.65rem] font-chat">iMessage</span>
              )}
            </div>
            <button
              className="w-[30px] h-[30px] rounded-full flex items-center justify-center flex-shrink-0"
              style={{
                background: "#f28c1b",
                boxShadow: "0 0 24px rgba(255,170,60,0.65)",
              }}
              aria-label="Send message"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </div>
        </PhoneFrame>

        {/* Replay button */}
        <AnimatePresence>
          {showReplay && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-white/70 text-[0.65rem] font-mono tracking-[0.2em] lowercase hover:text-white transition-colors cursor-pointer mt-1"
              onClick={onReplay}
            >
              replay
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
