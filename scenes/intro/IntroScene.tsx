"use client";

import { motion } from "framer-motion";
import { SceneContainer } from "@/components/scene/SceneContainer";
import { Button } from "@/components/ui/Button";
import { useStoryStore } from "@/features/story/story.store";
import { staggerContainer, staggerItem, glimmerVariants } from "@/lib/animation";

export function IntroScene() {
  const setScene = useStoryStore((s) => s.setScene);

  return (
    <SceneContainer className="bg-[#020617] flex items-center justify-center">
      {/* Background ambient glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 overflow-hidden"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-900/20 blur-[120px]" />
        <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-sky-900/15 blur-[80px]" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center flex flex-col items-center gap-8 px-6 max-w-3xl"
      >
        {/* Eyebrow */}
        <motion.div variants={glimmerVariants}>
          <span className="inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.3em] text-sky-400/50 uppercase border border-sky-400/20 rounded-full px-3 py-1 bg-sky-400/5">
            <span className="h-1 w-1 rounded-full bg-sky-400/50 animate-pulse" />
            Interactive Portfolio
          </span>
        </motion.div>

        {/* Identity */}
        <motion.div 
          variants={staggerItem}
          className="flex flex-col items-center gap-1"
        >
          <span className="text-sm font-medium tracking-[0.4em] text-white/60 uppercase">
            Le Phuoc Thang
          </span>
          <span className="text-[10px] font-mono tracking-[0.2em] text-white/30 uppercase">
            Software Engineer
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          variants={staggerItem}
          className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.1] sm:leading-none"
        >
          I build{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-400">
            experiences
          </span>
          ,<br />
          <span className="inline-block">not just code.</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          variants={staggerItem}
          className="text-base sm:text-lg text-white/50 max-w-md leading-relaxed px-4 sm:px-0"
        >
          A story-driven portfolio exploring how I think, what I build,
          and where I&apos;m going.{" "}
          <span className="text-white/20 block sm:inline">This is not a resume.</span>
        </motion.p>

        {/* CTA */}
        <motion.div 
          variants={staggerItem} 
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto px-6 sm:px-0"
        >
          <Button
            size="lg"
            variant="primary"
            id="btn-enter-story"
            className="w-full sm:w-auto"
            onClick={() => setScene("map")}
          >
            Enter the story
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Button>
          <Button
            size="lg"
            variant="ghost"
            id="btn-jump-projects"
            className="w-full sm:w-auto"
            onClick={() => setScene("projects")}
          >
            Skip to projects
          </Button>
        </motion.div>
      </motion.div>
    </SceneContainer>
  );
}
