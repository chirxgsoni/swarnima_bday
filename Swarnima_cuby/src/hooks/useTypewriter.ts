"use client";

import { useState, useEffect, useRef, useCallback } from "react";

export function useTypewriter(text: string, speed = 45, startImmediately = false) {
  const [displayed, setDisplayed] = useState("");
  const [isDone, setIsDone] = useState(false);
  const [isStarted, setIsStarted] = useState(startImmediately);
  const indexRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  const start = useCallback(() => {
    setIsStarted(true);
    setDisplayed("");
    setIsDone(false);
    indexRef.current = 0;
  }, []);

  const reset = useCallback(() => {
    setDisplayed("");
    setIsDone(false);
    setIsStarted(false);
    indexRef.current = 0;
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    if (!isStarted) return;

    timerRef.current = setInterval(() => {
      if (indexRef.current < text.length) {
        indexRef.current++;
        setDisplayed(text.slice(0, indexRef.current));
      } else {
        setIsDone(true);
        if (timerRef.current) clearInterval(timerRef.current);
      }
    }, speed);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [text, speed, isStarted]);

  return { displayed, isDone, isStarted, start, reset };
}
