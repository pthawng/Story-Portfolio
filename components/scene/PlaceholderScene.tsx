"use client";

import { motion } from "framer-motion";
import { SceneContainer } from "@/components/scene/SceneContainer";
import { Button } from "@/components/ui/Button";
import { useStoryStore } from "@/features/story/story.store";
import { SCENES } from "@/features/story/story.config";
import { staggerContainer, staggerItem } from "@/lib/animation";
import type { SceneKey } from "@/features/story/story.types";

interface PlaceholderSceneProps {
  sceneKey: SceneKey;
  accentColor?: string;
}

/**
 * Generic placeholder for scenes not yet built.
 * Shows the scene name, description, and a "back to map" button.
 * Replace this component with the real scene implementation later.
 */
export function PlaceholderScene({
  sceneKey,
  accentColor = "violet",
}: PlaceholderSceneProps) {
  const { setScene, goBack } = useStoryStore();
  const scene = SCENES[sceneKey];

  return (
    <SceneContainer className="bg-[#020617] flex items-center justify-center">
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-blue-900/10 blur-[80px]" />
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center flex flex-col items-center gap-6 px-6 max-w-xl"
      >
        <motion.div variants={staggerItem}>
          <span className="text-xs font-mono tracking-[0.2em] text-sky-400/60 uppercase border border-sky-400/20 rounded-full px-4 py-1.5 bg-sky-400/5">
            Chapter
          </span>
        </motion.div>

        <motion.h1
          variants={staggerItem}
          className="text-4xl sm:text-5xl font-bold text-white"
        >
          {scene.label}
        </motion.h1>

        <motion.p
          variants={staggerItem}
          className="text-white/40 text-base leading-relaxed"
        >
          {scene.description}
        </motion.p>

        <motion.div
          variants={staggerItem}
          className="flex gap-3 mt-2"
        >
          <Button
            variant="ghost"
            size="md"
            id={`btn-${sceneKey}-back`}
            onClick={goBack}
          >
            ← Back
          </Button>
          <Button
            variant="outline"
            size="md"
            id={`btn-${sceneKey}-to-map`}
            onClick={() => setScene("map")}
          >
            Story Map
          </Button>
        </motion.div>

        <motion.p variants={staggerItem} className="text-white/20 text-xs font-mono mt-2">
          — scene under construction —
        </motion.p>
      </motion.div>
    </SceneContainer>
  );
}
