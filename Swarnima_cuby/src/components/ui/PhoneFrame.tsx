"use client";

import React from "react";

interface PhoneFrameProps {
  children: React.ReactNode;
  className?: string;
}

export default function PhoneFrame({ children, className = "" }: PhoneFrameProps) {
  return (
    <div
      className={`phone-frame flex flex-col ${className}`}
      style={{
        width: "min(280px, 90vw)",
        height: "min(500px, 58vh)",
      }}
    >
      {/* Dynamic Island */}
      <div className="dynamic-island" />

      {/* Status bar */}
      <div className="flex items-center justify-between px-4 py-1">
        <span className="text-white/60 text-[0.55rem] font-chat">5:32 PM</span>
        <div className="flex items-center gap-1">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="white" opacity="0.5">
            <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
          </svg>
          <svg width="14" height="12" viewBox="0 0 24 24" fill="white" opacity="0.5">
            <path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z" />
          </svg>
        </div>
      </div>

      {/* Content area */}
      <div className="flex-1 flex flex-col min-h-0">{children}</div>
    </div>
  );
}
