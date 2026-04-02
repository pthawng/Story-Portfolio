import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useStoryStore } from "@/src/features/story/story.store";
import { SLIDE_UP, TRANSITION_DEFAULT, FADE_IN } from "@/src/lib/animation";
import { ArrowLeft, ArrowRight, Brain, Gamepad2, Layers, Cpu, CheckCircle2 } from "lucide-react";

interface Project {
  id: string;
  title: string;
  icon: React.ReactNode;
  problem: string;
  constraints: string[];
  solution: string;
  result: string;
  tech: string[];
}

const PROJECTS: Project[] = [
  {
    id: "maze",
    title: "Maze AI Game",
    icon: <Gamepad2 className="h-6 w-6 text-blue-400" />,
    problem: "Traditional pathfinding algorithms are predictable and lack the 'human' element of exploration.",
    constraints: ["Real-time execution", "Browser-based performance", "Dynamic maze generation"],
    solution: "Implemented a hybrid A* algorithm with a custom heuristic that simulates curiosity and risk-taking behavior.",
    result: "A challenging, non-deterministic game experience with 98% positive user engagement.",
    tech: ["TypeScript", "Canvas API", "Web Workers"],
  },
  {
    id: "rag",
    title: "RAG Q&A System",
    icon: <Brain className="h-6 w-6 text-purple-400" />,
    problem: "LLMs hallucinate when asked about specific, private documentation or niche technical stacks.",
    constraints: ["Low latency", "High accuracy", "Scalable vector storage"],
    solution: "Built a Retrieval-Augmented Generation pipeline using Pinecone for vector search and LangChain for orchestration.",
    result: "Reduced hallucination rate by 85% and improved response relevance for internal docs.",
    tech: ["Next.js", "Pinecone", "OpenAI API", "LangChain"],
  },
];

export default function ProjectsScene() {
  const { setScene } = useStoryStore();
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const project = PROJECTS[activeProjectIndex];

  const nextProject = () => setActiveProjectIndex((prev) => (prev + 1) % PROJECTS.length);
  const prevProject = () => setActiveProjectIndex((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length);

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center bg-black p-8">
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] [background-size:20px_20px]" />
      
      <motion.div
        variants={SLIDE_UP}
        initial="initial"
        animate="animate"
        transition={TRANSITION_DEFAULT}
        className="relative z-10 w-full max-w-5xl space-y-12"
      >
        <div className="flex items-center justify-between">
          <button
            onClick={() => setScene("map")}
            className="flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Map
          </button>
          
          <div className="flex items-center gap-4">
            <button
              onClick={prevProject}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-colors hover:bg-white/10"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <span className="font-mono text-xs tracking-widest text-gray-500 uppercase">
              {activeProjectIndex + 1} / {PROJECTS.length}
            </span>
            <button
              onClick={nextProject}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-colors hover:bg-white/10"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={project.id}
            variants={FADE_IN}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={TRANSITION_DEFAULT}
            className="grid gap-12 sm:grid-cols-2"
          >
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 border border-white/10">
                  {project.icon}
                </div>
                <h2 className="font-sans text-3xl font-medium tracking-tighter sm:text-4xl">
                  {project.title}
                </h2>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <h4 className="font-mono text-[10px] tracking-widest text-gray-500 uppercase">Problem</h4>
                  <p className="text-lg text-gray-300">{project.problem}</p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-mono text-[10px] tracking-widest text-gray-500 uppercase">Constraints</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.constraints.map((c, i) => (
                      <span key={i} className="rounded-full border border-white/5 bg-white/5 px-3 py-1 text-xs text-gray-400">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-mono text-[10px] tracking-widest text-gray-500 uppercase">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t, i) => (
                      <span key={i} className="rounded-full border border-blue-500/10 bg-blue-500/5 px-3 py-1 text-xs text-blue-400">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8 rounded-3xl border border-white/10 bg-white/5 p-8 sm:p-12">
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-blue-400">
                  <Cpu className="h-5 w-5" />
                  <h4 className="font-mono text-xs tracking-widest uppercase">Solution Architecture</h4>
                </div>
                <p className="text-lg leading-relaxed text-gray-300">
                  {project.solution}
                </p>
                
                <div className="h-px w-full bg-white/10" />
                
                <div className="flex items-center gap-3 text-green-400">
                  <CheckCircle2 className="h-5 w-5" />
                  <h4 className="font-mono text-xs tracking-widest uppercase">The Result</h4>
                </div>
                <p className="text-lg leading-relaxed text-gray-300">
                  {project.result}
                </p>
              </div>
              
              <div className="relative h-32 w-full overflow-hidden rounded-2xl bg-black/50 border border-white/5">
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                  <Layers className="h-16 w-16 text-white" />
                </div>
                <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.05)_50%,transparent_100%)] animate-pulse" />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
