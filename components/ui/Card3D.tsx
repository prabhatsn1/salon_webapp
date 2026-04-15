"use client";

import { motion, useTransform, useReducedMotion } from "framer-motion";
import { ReactNode, useRef } from "react";
import { useMouseParallax } from "@/hooks/useMouseParallax";

interface Card3DProps {
  children: ReactNode;
  depth?: number;
  className?: string;
}

export default function Card3D({
  children,
  depth = 15,
  className = "",
}: Card3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduce = useReducedMotion();
  const { x, y } = useMouseParallax(ref);
  const rotateX = useTransform(y, [-0.5, 0.5], [depth, -depth]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-depth, depth]);

  if (shouldReduce) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      whileHover={{ scale: 1.02, z: 30 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`${className} cursor-pointer`}
    >
      {children}
    </motion.div>
  );
}
