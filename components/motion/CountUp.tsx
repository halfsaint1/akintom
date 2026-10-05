"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  useInView,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";

interface CountUpProps {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export function CountUp({
  to,
  suffix = "",
  prefix = "",
  duration = 1.6,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const value = useMotionValue(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      if (ref.current) {
        ref.current.textContent = `${prefix}${to.toLocaleString()}${suffix}`;
      }
      return;
    }
    const controls = animate(value, to, {
      duration,
      ease: "easeOut",
      onUpdate: (latest) => {
        if (ref.current) {
          ref.current.textContent = `${prefix}${Math.round(latest).toLocaleString()}${suffix}`;
        }
      },
    });
    return () => controls.stop();
  }, [inView, to, duration, prefix, suffix, value, reduceMotion]);

  return (
    <span ref={ref} className={className} aria-label={`${prefix}${to.toLocaleString()}${suffix}`}>
      {prefix}0{suffix}
    </span>
  );
}
