import { motion } from "motion/react";
import { useStoryStore } from "@/src/features/story/story.store";
import { SCENES } from "@/src/features/story/story.config";
import { SceneId } from "@/src/features/story/story.types";
import { cn } from "@/src/lib/utils";
import { TRANSITION_DEFAULT } from "@/src/lib/animation";

export default function MapScene() {
  const { setScene, visitedScenes } = useStoryStore();

  const nodes = Object.values(SCENES).filter(s => s.id !== "intro" && s.id !== "map");

  return (
    <div className="relative h-full w-full bg-black flex items-center justify-center overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff10_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      
      <div className="relative z-10 grid h-full w-full max-w-4xl grid-cols-2 gap-8 p-12 sm:grid-cols-3">
        {nodes.map((node, index) => {
          const isVisited = visitedScenes.has(node.id);
          
          return (
            <motion.button
              key={node.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ ...TRANSITION_DEFAULT, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setScene(node.id)}
              className={cn(
                "group relative flex flex-col items-start justify-end overflow-hidden rounded-2xl border p-6 text-left transition-all",
                isVisited 
                  ? "border-white/20 bg-white/5 hover:border-white/40" 
                  : "border-white/10 bg-black hover:border-white/30"
              )}
            >
              <div className="mb-2 font-mono text-[10px] tracking-widest text-gray-500 uppercase">
                Scene {index + 1}
              </div>
              <h3 className="mb-1 font-sans text-xl font-medium tracking-tight group-hover:text-blue-400">
                {node.title}
              </h3>
              <p className="text-sm text-gray-500 line-clamp-2">
                {node.description}
              </p>
              
              {isVisited && (
                <div className="absolute top-4 right-4 h-1.5 w-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
              )}
            </motion.button>
          );
        })}
      </div>

      <div className="absolute top-12 left-1/2 -translate-x-1/2 text-center">
        <h2 className="font-mono text-xs tracking-[0.4em] text-gray-500 uppercase">
          Story Navigation Map
        </h2>
      </div>
    </div>
  );
}
