"use client";

import { useEffect, useState } from "react";

type Step = {
  label: string;
  duration: number;
};

export function useStepFlow(steps: Step[]) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (!steps.length) {
      return;
    }

    let timeout: ReturnType<typeof setTimeout> | null = null;

    const advance = (index: number) => {
      if (index >= steps.length) {
        setCompleted(true);
        return;
      }
      setActiveIndex(index);
      timeout = setTimeout(() => advance(index + 1), steps[index].duration);
    };

    advance(0);

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [steps]);

  return { activeIndex, completed };
}
