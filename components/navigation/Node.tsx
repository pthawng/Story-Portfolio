import { motion, useTransform, MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";
import { nodeVariants } from "@/lib/animation";
import type { SceneKey } from "@/features/story/story.types";
import { SCENES } from "@/features/story/story.config";

interface NodeProps {
  sceneKey: SceneKey;
  x: number; 
  y: number; 
  isActive: boolean;
  isHovered: boolean;
  onClick: (key: SceneKey) => void;
  onHover: (key: SceneKey | null) => void;
  index: number;
  cameraX: MotionValue<number>; // Changed to MotionValue
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
  cameraX,
  useVirtualCoords = false,
}: NodeProps) {
  const scene = SCENES[sceneKey];

  // Perspective rules - Driven by cameraX motion value (No re-renders!)
  // We use cameraX (focus point) to calculate distance from this node's x
  const scale = useTransform(
    cameraX, 
    [x - 1200, x, x + 1200], 
    [0.7, sceneKey === "systems" ? 1.3 : 1.1, 0.7]
  );
  
  const opacity = useTransform(
    cameraX, 
    [x - 1200, x, x + 1200], 
    [0.3, 1, 0.3]
  );

  const blurValue = useTransform(
    cameraX,
    [x - 800, x, x + 800],
    [2, 0, 2]
  );

  const pulseDuration = sceneKey === "systems" ? 3 : 2;
  const isPeak = sceneKey === "systems";
  const isVision = scene.type === "vision";
  const size = isPeak ? "w-24 h-24" : "w-20 h-20";

  const posStyle = useVirtualCoords 
    ? { left: `${x}px`, top: `${y}%` } 
    : { left: `${x}%`, top: `${y}%` };

  return (
    <motion.div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ 
        ...posStyle,
        scale,
        opacity,
        filter: useTransform(blurValue, (v) => `blur(${v}px)`)
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }} // Ensure opacity 1 is reachable on mount
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
      {isHovered && (
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
