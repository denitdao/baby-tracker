"use client";

import { useCallback } from "react";
import confetti from "canvas-confetti";

const BRAND_COLORS = ["#2b9185", "#a78bfa", "#fbbf24", "#34d399", "#faf5ee"];

export function useConfetti() {
  const burst = useCallback(() => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: BRAND_COLORS,
      ticks: 120,
      gravity: 0.9,
      scalar: 1.1,
    });
  }, []);

  const sideCannons = useCallback(() => {
    const defaults = {
      particleCount: 40,
      spread: 55,
      colors: BRAND_COLORS,
      ticks: 150,
      gravity: 0.8,
      scalar: 1.05,
    };

    confetti({ ...defaults, angle: 60, origin: { x: 0, y: 0.65 } });
    confetti({ ...defaults, angle: 120, origin: { x: 1, y: 0.65 } });
  }, []);

  const shower = useCallback(() => {
    const end = Date.now() + 2200;

    function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.3 },
        colors: BRAND_COLORS,
        ticks: 200,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.3 },
        colors: BRAND_COLORS,
        ticks: 200,
      });

      if (Date.now() < end) requestAnimationFrame(frame);
    }

    frame();
  }, []);

  return { burst, sideCannons, shower };
}
