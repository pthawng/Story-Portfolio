"use client";

import { motion } from "framer-motion";

interface EdgeProps {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  isHighlighted?: boolean;
  useVirtualCoords?: boolean;
}

export function Edge({ 
  fromX, 
  fromY, 
  toX, 
  toY, 
  isHighlighted, 
  useVirtualCoords = false 
}: EdgeProps) {
  const x1 = useVirtualCoords ? `${fromX}px` : `${fromX}%`;
  const x2 = useVirtualCoords ? `${toX}px` : `${toX}%`;
  const y1 = `${fromY}%`;
  const y2 = `${toY}%`;

  return (
    <g>
      {/* Background path line */}
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={isHighlighted ? "rgba(34,211,238,0.4)" : "rgba(59,130,246,0.12)"}
        strokeWidth={isHighlighted ? 2.5 : 1.5}
        strokeDasharray={isHighlighted ? "none" : "8 4"}
        className="transition-all duration-500"
      />

      {/* Animated Flowing Light overlay */}
      <motion.line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="rgba(56,189,248,0.5)"
        strokeWidth={isHighlighted ? 3 : 1.5}
        strokeDasharray="4 16"
        initial={{ strokeDashoffset: 0 }}
        animate={{ strokeDashoffset: -200 }} // Faster flow for horizontal odyssey
        transition={{
          repeat: Infinity,
          duration: 2.5,
          ease: "linear",
        }}
      />
    </g>
  );
}
