"use client";

import { motion } from "framer-motion";
import { SceneContainer } from "@/components/scene/SceneContainer";
import { Graph } from "@/components/navigation/Graph";
import { Button } from "@/components/ui/Button";
import { useStoryStore } from "@/features/story/story.store";
import { useNavigationStore } from "@/features/navigation/navigation.store";
import { SCENES } from "@/features/story/story.config";
import { staggerContainer, staggerItem } from "@/lib/animation";
import type { SceneKey } from "@/features/story/story.types";

export function StoryMapScene() {
  const { currentScene, setScene, history, goBack, focusedNode } = useStoryStore();
  const { hoveredNode, setHoveredNode } = useNavigationStore();

  const handleNodeClick = (key: SceneKey) => {
    if (key !== currentScene) {
      setScene(key);
    }
  };

  // Fallback to 1 if focusedNode doesn't have a chapter (e.g. initial mount)
  const currentChapter = SCENES[focusedNode].chapterNumber || 1;
  const hoveredScene = hoveredNode ? SCENES[hoveredNode] : null;

  return (
    <SceneContainer className="bg-[#020617] flex flex-col overflow-hidden">
      {/* Background & Ambient Effects */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-900/5 blur-[120px]" />
        
        {/* Dynamic Edge Gradients for Cinematic Feel */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#020617] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#020617] to-transparent z-10 pointer-events-none" />
        
        {/* Dot Grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Header with Progress */}
      <motion.header
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-20 flex items-center justify-between px-10 pt-10 pb-4"
      >
        <motion.div variants={staggerItem} className="w-32">
          {history.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              id="btn-go-back"
              onClick={goBack}
              className="text-white/40 hover:text-white"
            >
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
              </svg>
              <span>Back</span>
            </Button>
          )}
        </motion.div>

        <motion.div variants={staggerItem} className="text-center group">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
            <span className="text-[10px] font-mono tracking-[0.3em] text-sky-400/80 uppercase">
              The Horizontal Odyssey
            </span>
          </div>
          <h2 className="text-white/40 text-sm font-medium tracking-tight">
             Current Chapter: <span className="text-white text-lg font-bold ml-1 font-mono">0{currentChapter}</span> <span className="mx-1 opacity-20">/</span> <span className="opacity-40">08</span>
          </h2>
        </motion.div>

        <motion.div variants={staggerItem} className="w-32 flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setScene("intro")}
            className="text-white/40 hover:text-white"
          >
            ← Exit Map
          </Button>
        </motion.div>
      </motion.header>

      {/* Main viewport */}
      <div className="relative flex-1 flex flex-col items-center justify-center overflow-visible">
        
        {/* Odyssey Direction Markers */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-between px-12 z-20 opacity-30">
           <div className="flex flex-col items-start gap-2">
              <span className="text-[9px] font-mono tracking-widest text-sky-400 uppercase">← Story Origins</span>
              <div className="h-px w-20 bg-gradient-to-r from-sky-500/50 to-transparent" />
           </div>
           <div className="flex flex-col items-end gap-2">
              <span className="text-[9px] font-mono tracking-widest text-indigo-400 uppercase">Evidence & Future →</span>
              <div className="h-px w-20 bg-gradient-to-l from-indigo-500/50 to-transparent" />
           </div>
        </div>

        {/* Hover Info Panel (Dynamic) */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 pointer-events-none"
          animate={{ 
            opacity: hoveredScene ? 1 : 0, 
            y: hoveredScene ? 0 : 20,
            scale: hoveredScene ? 1 : 0.95
          }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
        >
          {hoveredScene && (
            <div className="bg-slate-900/60 backdrop-blur-2xl border border-white/10 rounded-3xl px-12 py-6 text-center shadow-[0_30px_100px_rgba(0,0,0,0.6)]">
              <p className="text-sky-400 font-mono text-[10px] uppercase tracking-[0.4em] mb-2">
                Discovery Preview
              </p>
              <h3 className="text-white font-bold text-2xl mb-1 tracking-tight">
                {hoveredScene.label}
              </h3>
              <p className="text-white/40 text-sm max-w-xs mx-auto leading-relaxed">
                {hoveredScene.description}
              </p>
            </div>
          )}
        </motion.div>

        {/* Interactive Graph Canvas */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="w-full h-full relative"
        >
          <Graph
            currentScene={currentScene}
            hoveredNode={hoveredNode}
            onNodeClick={handleNodeClick}
            onNodeHover={setHoveredNode}
          />
        </motion.div>
      </div>

      {/* Footer hint */}
      <footer className="relative z-20 pb-8 text-center">
         <p className="text-white/20 text-[10px] font-mono tracking-widest uppercase mb-1">
            Drag to pan • Click to focus • Explore the depth
         </p>
      </footer>
    </SceneContainer>
  );
}
