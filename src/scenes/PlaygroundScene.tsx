import React, { useState } from "react";
import { motion } from "motion/react";
import { useStoryStore } from "@/src/features/story/story.store";
import { SLIDE_UP, TRANSITION_DEFAULT } from "@/src/lib/animation";
import { ArrowLeft, Sparkles, MousePointer2, RefreshCw } from "lucide-react";

export default function PlaygroundScene() {
  const { setScene } = useStoryStore();
  const [particles, setParticles] = useState<{ id: number; x: number; y: number }[]>([]);

  const addParticle = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setParticles((prev) => [...prev.slice(-10), { id: Date.now(), x, y }]);
  };

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center bg-black p-8">
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] [background-size:20px_20px]" />
      
      <motion.div
        variants={SLIDE_UP}
        initial="initial"
        animate="animate"
        transition={TRANSITION_DEFAULT}
        className="relative z-10 w-full max-w-4xl space-y-12"
      >
        <div className="space-y-4 text-center">
          <div className="flex items-center justify-center gap-3 text-blue-400">
            <Sparkles className="h-6 w-6" />
            <h2 className="font-sans text-4xl font-medium tracking-tighter sm:text-5xl">
              The <span className="text-blue-500">Playground</span>
            </h2>
          </div>
          <p className="mx-auto max-w-xl text-lg text-gray-500">
            Where ideas are tested and boundaries are pushed. Click inside the box to interact.
          </p>
        </div>

        <div 
          onMouseMove={addParticle}
          className="relative h-96 w-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 cursor-none"
        >
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="flex flex-col items-center gap-4 text-gray-600">
              <MousePointer2 className="h-8 w-8 animate-bounce" />
              <span className="font-mono text-xs tracking-widest uppercase">Interactive Sandbox</span>
            </div>
          </div>

          {particles.map((p) => (
            <motion.div
              key={p.id}
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 4, opacity: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              style={{ left: p.x, top: p.y }}
              className="absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/30 blur-xl"
            />
          ))}
          
          <div className="absolute bottom-6 right-6 flex items-center gap-2 rounded-full bg-black/50 px-4 py-2 text-[10px] font-mono tracking-widest text-gray-500 uppercase backdrop-blur-sm">
            <RefreshCw className="h-3 w-3 animate-spin" />
            Real-time Physics Engine
          </div>
        </div>

        <div className="flex flex-col items-center gap-6">
          <button
            onClick={() => setScene("map")}
            className="flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Map
          </button>
        </div>
      </motion.div>
    </div>
  );
}
