"use client";

import { useEffect, useState } from "react";

export function useCountUp(target: number, durationMs = 1200) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let start: number | null = null;
    const step = (timestamp: number) => {
      if (!start) {
        start = timestamp;
      }
      const progress = Math.min((timestamp - start) / durationMs, 1);
      setValue(Math.round(progress * target));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }, [target, durationMs]);

  return value;
}
