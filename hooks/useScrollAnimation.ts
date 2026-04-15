"use client";

import { useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";

export function useScrollAnimation(
  inputRange: [number, number] = [0, 1],
  outputRange: [string, string] = ["0%", "-30%"],
) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, inputRange, outputRange);
  return { ref, scrollYProgress, y };
}

export function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}
