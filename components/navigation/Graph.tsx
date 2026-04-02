"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, animate } from "framer-motion";
import { Node } from "./Node";
import { Edge } from "./Edge";
import type { SceneKey } from "@/features/story/story.types";
import { CHAPTER_ORDER, SCENES } from "@/features/story/story.config";
import { useStoryStore } from "@/features/story/story.store";

// ── Static layout positions (Virtual pixels, Systems = 0) ───────────────────

interface LayoutPosition {
  x: number;
  y: number;
}

const NODE_POSITIONS: Record<SceneKey, LayoutPosition> = {
  intro:       { x: 0, y: 10 },
  map:         { x: 0, y: 10 },
  beginning:   { x: -1800, y: 45 },
  struggles:   { x: -1200, y: 56 },
  breakthrough:{ x: -600, y: 48 },
  systems:     { x: 0, y: 50 },     // PEAK FOCUS
  projects:    { x: 600, y: 45 },
  playground:  { x: 1200, y: 56 },
  proof:       { x: 1800, y: 48 },
  vision:      { x: 2600, y: 42 },   // THE DESTINATION
};

const EDGES = [
  { from: "beginning",   to: "struggles" },
  { from: "struggles",   to: "breakthrough" },
  { from: "breakthrough", to: "systems" },
  { from: "systems",      to: "projects" },
  { from: "projects",     to: "playground" },
  { from: "playground",   to: "proof" },
  { from: "proof",        to: "vision" },
];

interface GraphProps {
  currentScene: SceneKey;
  hoveredNode: SceneKey | null;
  onNodeClick: (key: SceneKey) => void;
  onNodeHover: (key: SceneKey | null) => void;
}

export function Graph({
  currentScene,
  hoveredNode,
  onNodeClick,
  onNodeHover,
}: GraphProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cameraX = useStoryStore((s) => s.cameraX);
  const setCameraX = useStoryStore((s) => s.setCameraX);
  
  // Motion values for smooth panning
  const x = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 100, damping: 20 });

  // Update camera on external store changes (e.g. initial load or back button)
  useEffect(() => {
    animate(x, -NODE_POSITIONS[currentScene].x, {
      type: "spring",
      stiffness: 100,
      damping: 20
    });
  }, [currentScene, x]);

  const snapToNearest = (currentOffset: number) => {
    let nearestNode = CHAPTER_ORDER[0];
    let minDistance = Infinity;

    CHAPTER_ORDER.forEach((key) => {
      const dist = Math.abs(NODE_POSITIONS[key].x + currentOffset);
      if (dist < minDistance) {
        minDistance = dist;
        nearestNode = key;
      }
    });

    // Snap to the nearest node and update store
    handleNodeFocus(nearestNode);
  };

  const handleNodeFocus = (key: SceneKey) => {
    const targetX = -NODE_POSITIONS[key].x;
    animate(x, targetX, {
      type: "spring",
      stiffness: 100,
      damping: 25
    });
    setCameraX(-targetX); // Sync with store
    onNodeClick(key);
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full overflow-hidden cursor-grab active:cursor-grabbing px-[50%]"
    >
      <motion.div
        drag="x"
        style={{ x: springX }}
        onDragEnd={(_, info) => {
          snapToNearest(x.get());
        }}
        onUpdate={(latest) => {
          // Keep store in sync for node scaling/effects
          if (typeof latest.x === "number") {
             setCameraX(-latest.x);
          }
        }}
        className="relative w-full h-full flex items-center justify-center p-20"
      >
        {/* SVG edges */}
        <svg
          className="absolute inset-0 pointer-events-none overflow-visible"
          style={{ width: "100%", height: "100%" }}
          aria-hidden="true"
        >
          <g>
            {EDGES.map(({ from, to }) => {
              const f = NODE_POSITIONS[from as SceneKey];
              const t = NODE_POSITIONS[to as SceneKey];
              const isHighlighted =
                hoveredNode === from || hoveredNode === to ||
                currentScene === from || currentScene === to;
              return (
                <Edge
                  key={`${from}-${to}`}
                  fromX={f.x}
                  fromY={f.y}
                  toX={t.x}
                  toY={t.y}
                  isHighlighted={isHighlighted}
                  useVirtualCoords
                />
              );
            })}
          </g>
        </svg>

        {/* Nodes */}
        {CHAPTER_ORDER.map((key, index) => {
          const pos = NODE_POSITIONS[key];
          return (
            <Node
              key={key}
              sceneKey={key}
              x={pos.x}
              y={pos.y}
              isActive={currentScene === key}
              isHovered={hoveredNode === key}
              onClick={handleNodeFocus}
              onHover={onNodeHover}
              index={index}
              cameraX={cameraX}
              useVirtualCoords
            />
          );
        })}
      </motion.div>
    </div>
  );
}
