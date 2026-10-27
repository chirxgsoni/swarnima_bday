"use client";

import React, { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAudio } from "@/hooks/useAudio";
import { content } from "@/content/content";
import StartGate from "./StartGate";
import MusicPlayer from "./MusicPlayer";
import Curtains from "./scenes/Curtains";
import Countdown from "./scenes/Countdown";
import Hero from "./scenes/Hero";
import PolaroidWall from "./scenes/PolaroidWall";
import Scrapbook from "./scenes/Scrapbook";
import PhotoGalaxy from "./scenes/PhotoGalaxy";
import ChatScene from "./scenes/ChatScene";

export type SceneId =
  | "gate"
  | "curtains"
  | "countdown"
  | "hero"
  | "wall"
  | "scrapbook"
  | "galaxy"
  | "chat";

const SCENE_ORDER: SceneId[] = [
  "curtains",
  "countdown",
  "hero",
  "wall",
  "scrapbook",
  "galaxy",
  "chat",
];

export default function Experience() {
  const [scene, setScene] = useState<SceneId>("gate");
  const audio = useAudio(content.music.src);

  const nextScene = useCallback(() => {
    setScene((prev) => {
      const idx = SCENE_ORDER.indexOf(prev);
      if (idx < SCENE_ORDER.length - 1) return SCENE_ORDER[idx + 1];
      return prev;
    });
  }, []);

  const replay = useCallback(() => {
    setScene("curtains");
    audio.restart();
  }, [audio]);

  const handleStart = useCallback(() => {
    audio.play();
    setScene("curtains");
  }, [audio]);

  // Check for autoplay query param
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("autoplay") === "1") {
      // Auto-advance for scenes 4-6
    }
  }, []);

  const showMusicPlayer =
    scene !== "gate" && scene !== "curtains" && scene !== "chat";

  return (
    <div className="relative w-screen h-dvh overflow-hidden bg-ink-900">
      <AnimatePresence mode="wait">
        {scene === "gate" && (
          <motion.div
            key="gate"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <StartGate onStart={handleStart} />
          </motion.div>
        )}

        {scene === "curtains" && (
          <motion.div
            key="curtains"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="scene"
          >
            <Curtains onComplete={nextScene} />
          </motion.div>
        )}

        {scene === "countdown" && (
          <motion.div
            key="countdown"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="scene"
          >
            <Countdown onComplete={nextScene} />
          </motion.div>
        )}

        {scene === "hero" && (
          <motion.div
            key="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="scene"
          >
            <Hero onComplete={nextScene} />
          </motion.div>
        )}

        {scene === "wall" && (
          <motion.div
            key="wall"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="scene"
          >
            <PolaroidWall onComplete={nextScene} />
          </motion.div>
        )}

        {scene === "scrapbook" && (
          <motion.div
            key="scrapbook"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="scene"
          >
            <Scrapbook onComplete={nextScene} />
          </motion.div>
        )}

        {scene === "galaxy" && (
          <motion.div
            key="galaxy"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="scene"
          >
            <PhotoGalaxy onComplete={nextScene} />
          </motion.div>
        )}

        {scene === "chat" && (
          <motion.div
            key="chat"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="scene"
          >
            <ChatScene onReplay={replay} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Persistent music player */}
      <AnimatePresence>
        {showMusicPlayer && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
          >
            <MusicPlayer audio={audio} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
