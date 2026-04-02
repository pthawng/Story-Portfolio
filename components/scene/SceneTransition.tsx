"use client";

import { AnimatePresence, motion } from "framer-motion";
import { fadeScaleVariants } from "@/lib/animation";
import type { SceneKey } from "@/features/story/story.types";

interface SceneTransitionProps {
  sceneKey: SceneKey;
  children: React.ReactNode;
}

/**
 * SceneTransition — wraps each scene with AnimatePresence + Framer Motion
 * fade/scale/blur transitions. The `sceneKey` drives AnimatePresence's
 * key prop so the old scene exits before the new one enters.
 */
export function SceneTransition({ sceneKey, children }: SceneTransitionProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={sceneKey}
        variants={fadeScaleVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="absolute inset-0 will-change-transform"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
