"use client";

import React from "react";
import { content } from "@/content/content";

interface MusicPlayerProps {
  audio: {
    isPlaying: boolean;
    isMuted: boolean;
    progress: number;
    currentTime: number;
    duration: number;
    toggle: () => void;
    toggleMute: () => void;
  };
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function MusicPlayer({ audio }: MusicPlayerProps) {
  return (
    <div className="music-pill select-none">
      {/* Album cover */}
      <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-accent-orange to-accent-red flex-shrink-0 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={content.music.cover}
          alt="Album cover"
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      </div>

      {/* Text + progress */}
      <div className="flex-1 min-w-0 flex flex-col gap-0.5">
        <p className="text-white text-[0.55rem] font-mono tracking-[0.15em] uppercase truncate leading-tight">
          {content.music.title}
        </p>
        <p className="text-white/50 text-[0.5rem] font-mono tracking-[0.15em] uppercase truncate leading-tight">
          {content.music.subtitle}
        </p>
        <div className="flex items-center gap-1 mt-0.5">
          <span className="text-[0.45rem] text-white/40 font-mono">
            {formatTime(audio.currentTime)}
          </span>
          <div className="flex-1 h-[2px] bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-white/70 rounded-full transition-all duration-300"
              style={{ width: `${audio.progress}%` }}
            />
          </div>
          <span className="text-[0.45rem] text-white/40 font-mono">
            {formatTime(audio.duration)}
          </span>
        </div>
      </div>

      {/* Play/pause button */}
      <button
        onClick={audio.toggle}
        className="w-[22px] h-[22px] rounded-full bg-white flex items-center justify-center flex-shrink-0 hover:scale-110 transition-transform"
        aria-label={audio.isPlaying ? "Pause" : "Play"}
      >
        {audio.isPlaying ? (
          <svg width="10" height="10" viewBox="0 0 10 10" fill="#0a0e1a">
            <rect x="1" y="1" width="3" height="8" rx="0.5" />
            <rect x="6" y="1" width="3" height="8" rx="0.5" />
          </svg>
        ) : (
          <svg width="10" height="10" viewBox="0 0 10 10" fill="#0a0e1a">
            <polygon points="2,1 9,5 2,9" />
          </svg>
        )}
      </button>

      {/* Mute button */}
      <button
        onClick={audio.toggleMute}
        className="w-5 h-5 flex items-center justify-center text-white/50 hover:text-white/80 transition-colors flex-shrink-0"
        aria-label={audio.isMuted ? "Unmute" : "Mute"}
      >
        {audio.isMuted ? (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
          </svg>
        ) : (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
          </svg>
        )}
      </button>
    </div>
  );
}
