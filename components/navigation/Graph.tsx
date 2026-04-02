"use client";

import React, { useRef, useEffect } from "react";
import { motion, useMotionValue, animate, useTransform } from "framer-motion";
import { useStoryStore } from "@/features/story/story.store";
import { useNavigationStore } from "@/features/navigation/navigation.store";
import { CHAPTER_ORDER, NODE_POSITIONS, EDGES } from "@/features/story/story.config";
import { Node } from "./Node";
import { Edge } from "./Edge";
import type { SceneKey } from "@/features/story/story.types";

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
  const setCameraX = useStoryStore((s) => s.setCameraX);
  const setFocusedNode = useStoryStore((s) => s.setFocusedNode);
  const focusedNode = useStoryStore((s) => s.focusedNode);
  
  // Motion values for hardware-accelerated panning
  // Force initial x to match focusedNode to ensure we start exactly at Chapter 1 or defined focus
  const x = useMotionValue(-NODE_POSITIONS[focusedNode].x);
  
  // Derived focus point for nodes/edges depth effects
  const visualCameraX = useTransform(x, (val) => -val);

  // Sync focus & Camera when scene changes (e.g. initial load or back button)
  useEffect(() => {
    // Priority: Focus on nodes the user navigated to, or stay on the current focusedNode
    const activeNode = CHAPTER_ORDER.includes(currentScene) ? currentScene : focusedNode;
    const targetX = -NODE_POSITIONS[activeNode].x;
    
    // Always sync store values on mount/scene change
    setCameraX(-targetX);
    setFocusedNode(activeNode);

    // Initial snap or transition animation if we're not at the right spot
    if (Math.abs(x.get() - targetX) > 1) {
      animate(x, targetX, {
        type: "spring",
        stiffness: 100,
        damping: 25
      });
    }
  }, [currentScene]);

  const getNearestNode = (currentOffset: number) => {
    let nearestNode = CHAPTER_ORDER[0];
    let minDistance = Infinity;

    CHAPTER_ORDER.forEach((key) => {
      const posX = NODE_POSITIONS[key].x;
      const dist = Math.abs(posX + currentOffset);
      if (dist < minDistance) {
        minDistance = dist;
        nearestNode = key;
      }
    });
    return nearestNode;
  };

  const snapToNearest = (currentOffset: number) => {
    const nearestNode = getNearestNode(currentOffset);
    snapCamera(nearestNode);
  };

  const snapCamera = (key: SceneKey) => {
    const targetX = -NODE_POSITIONS[key].x;
    animate(x, targetX, {
      type: "spring",
      stiffness: 100,
      damping: 25
    });
    setCameraX(-targetX); 
    setFocusedNode(key);
  };

  const handleNavigate = (key: SceneKey) => {
    snapCamera(key);
    onNodeClick(key);
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full overflow-hidden cursor-grab active:cursor-grabbing"
    >
      <motion.div
        drag="x"
        dragConstraints={{ left: -3200, right: 2400 }} 
        dragElastic={0.2}
        style={{ x }}
        onDragEnd={(_, info) => {
          const currentX = x.get();
          snapToNearest(currentX);
          setCameraX(-currentX);
        }}
        onUpdate={(latest: any) => {
          if (latest.x !== undefined) {
             const nearest = getNearestNode(latest.x);
             if (nearest !== focusedNode) {
                setFocusedNode(nearest);
             }
          }
        }}
        className="absolute inset-0 flex items-center justify-center touch-none"
      >
        {/* HIT AREA */}
        <div className="absolute w-[10000px] h-full bg-transparent pointer-events-auto" />

        {/* CENTERED COORDINATE SYSTEM ORIGIN */}
        <div className="relative w-0 h-0 flex items-center justify-center">
            {/* SVG edges */}
            <svg
              className="absolute inset-0 pointer-events-none overflow-visible"
              style={{ width: "1px", height: "1px" }}
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
                  onClick={handleNavigate}
                  onHover={onNodeHover}
                  index={index}
                  cameraX={visualCameraX}
                  useVirtualCoords
                />
              );
            })}
        </div>
      </motion.div>
    </div>
  );
}
