"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { nodeVariants } from "@/lib/animation";
import type { SceneKey } from "@/features/story/story.types";
import { SCENES } from "@/features/story/story.config";

interface NodeProps {
  sceneKey: SceneKey;
  x: number; // percentage 0-100 or virtual px
  y: number; // percentage 0-100 or virtual px
  isActive: boolean;
  isHovered: boolean;
  onClick: (key: SceneKey) => void;
  onHover: (key: SceneKey | null) => void;
  index: number;
  cameraX?: number;
  useVirtualCoords?: boolean;
}

export function Node({
  sceneKey,
  x,
  y,
  isActive,
  isHovered,
  onClick,
  onHover,
  index,
  cameraX = 0,
  useVirtualCoords = false,
}: NodeProps) {
  const scene = SCENES[sceneKey];

  // Dynamic hierarchy sizing & depth system
  const dist = Math.abs(x - cameraX);
  const normalizedDist = Math.min(dist / 1200, 1); // Max depth effect at 1200px
  
  const isPeak = sceneKey === "systems";
  const isVision = scene.type === "vision";
  const isPrimary = scene.type === "primary";
  
  // Perspective rules
  const baseScale = isVision ? 1.4 : isPeak ? 1.2 : isPrimary ? 1 : 0.9;
  const targetScale = baseScale * (1.2 - (normalizedDist * 0.4));
  const targetOpacity = 1 - (normalizedDist * 0.6);
  const targetBlur = normalizedDist * 1.5; // Very subtle blur at distance

  const pulseDuration = isPeak ? 3 : 2;
  const size = isPeak ? "w-24 h-24" : isPrimary ? "w-20 h-20" : "w-16 h-16";

  const posStyle = useVirtualCoords 
    ? { left: `${x}px`, top: `${y}%` } 
    : { left: `${x}%`, top: `${y}%` };

  return (
    <motion.div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={posStyle}
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: targetOpacity, 
        scale: targetScale,
        y: 0,
        filter: `blur(${targetBlur}px)`
      }}
      transition={{ 
        type: "spring",
        stiffness: 120,
        damping: 20,
        delay: index * 0.05 
      }}
    >
      {/* Outer Halo Glow */}
      {(isActive || isHovered || isVision) && (
        <motion.span 
          layoutId="halo"
          className={cn(
            "absolute inset-0 rounded-full blur-md",
            isVision ? "bg-indigo-400/30 scale-[1.8]" : isPeak ? "bg-cyan-400/40 scale-[1.6]" : "bg-sky-400/30 scale-[1.4]"
          )}
          animate={{ 
            scale: isVision ? [1.6, 1.8, 1.6] : [1.3, 1.45, 1.3], 
            opacity: [0.2, 0.4, 0.2] 
          }}
          transition={{ repeat: Infinity, duration: pulseDuration, ease: "easeInOut" }}
        />
      )}

      {isVision ? (
        <motion.button
          onClick={() => onClick(sceneKey)}
          onMouseEnter={() => onHover(sceneKey)}
          onMouseLeave={() => onHover(null)}
          className="relative flex flex-col items-center group cursor-pointer"
        >
          <span className="text-[10px] font-mono tracking-[0.4em] text-indigo-400 uppercase mb-2 group-hover:text-indigo-300 transition-colors">
            End Goal
          </span>
          <h3 className="text-2xl font-bold text-white tracking-widest uppercase group-hover:scale-110 transition-transform duration-500">
            {scene.label}
          </h3>
          <div className="h-0.5 w-12 bg-gradient-to-r from-transparent via-indigo-500 to-transparent mt-2" />
        </motion.button>
      ) : (
        <motion.button
          variants={nodeVariants}
          animate={isActive ? "active" : isHovered ? "hover" : "idle"}
          onClick={() => onClick(sceneKey)}
          onMouseEnter={() => onHover(sceneKey)}
          onMouseLeave={() => onHover(null)}
          className={cn(
            "relative flex flex-col items-center justify-center",
            "rounded-full border-2 cursor-pointer transition-all duration-300",
            size,
            isActive
              ? "border-sky-300 bg-sky-600/30 text-white shadow-[0_0_30px_rgba(56,189,248,0.5)]"
              : "border-white/10 bg-slate-900/60 backdrop-blur-md text-white/40 hover:border-sky-400/50 hover:text-white"
          )}
          aria-label={`Navigate to ${scene.label}`}
        >
          {scene.chapterNumber && (
            <span className="text-[8px] font-mono opacity-50 mb-1 tracking-tighter">
              {String(scene.chapterNumber).padStart(2, "0")}
            </span>
          )}
          <span className={cn(
            "leading-tight text-center px-2 text-[11px] sm:text-xs font-semibold",
            isPeak && "text-sm font-bold text-sky-200"
          )}>
            {scene.label}
          </span>
        </motion.button>
      )}

      {/* Tooltip Preview (Only near focus) */}
      {isHovered && normalizedDist < 0.3 && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          className="absolute top-full mt-4 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
        >
          <div className="bg-slate-900/95 backdrop-blur-xl border border-sky-500/20 rounded-xl px-4 py-3 text-xs text-white/80 shadow-2xl min-w-[220px] text-center">
             <p className="text-sky-300 font-bold uppercase tracking-wider mb-1">
                Chapter 0{scene.chapterNumber}
             </p>
             {scene.description}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
