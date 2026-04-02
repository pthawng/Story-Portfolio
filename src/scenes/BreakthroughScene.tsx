import { motion } from "motion/react";
import { useStoryStore } from "@/src/features/story/story.store";
import { SLIDE_UP, TRANSITION_DEFAULT } from "@/src/lib/animation";
import { ArrowLeft, CheckCircle2, Layers, Zap, Palette } from "lucide-react";

export default function BreakthroughScene() {
  const { setScene } = useStoryStore();

  const breakthroughs = [
    {
      icon: <Layers className="h-5 w-5 text-blue-400" />,
      title: "Architecture",
      description: "Moving from spaghetti code to modular, scalable systems. Understanding the App Router, server components, and clean separation of concerns.",
    },
    {
      icon: <Zap className="h-5 w-5 text-yellow-400" />,
      title: "Async Systems",
      description: "Mastering the flow of data. Real-time updates, optimistic UI, and robust error handling that doesn't crash the user experience.",
    },
    {
      icon: <Palette className="h-5 w-5 text-purple-400" />,
      title: "Design Thinking",
      description: "Realizing that UI is not just about colors, but about intent, accessibility, and the emotional journey of the user.",
    },
  ];

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center bg-black p-8">
      <div className="absolute inset-0 bg-[radial-gradient(#3b82f610_1px,transparent_1px)] [background-size:40px_40px] opacity-30" />
      
      <motion.div
        variants={SLIDE_UP}
        initial="initial"
        animate="animate"
        transition={TRANSITION_DEFAULT}
        className="relative z-10 w-full max-w-4xl space-y-12"
      >
        <div className="space-y-4 text-center">
          <h2 className="font-sans text-4xl font-medium tracking-tighter sm:text-5xl">
            The <span className="text-blue-500">Breakthrough</span>
          </h2>
          <p className="mx-auto max-w-xl text-lg text-gray-500">
            When the noise cleared, the patterns emerged. Complexity became clarity.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {breakthroughs.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="group relative rounded-2xl border border-white/10 bg-white/5 p-8 transition-colors hover:border-blue-500/30"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/5 transition-colors group-hover:bg-blue-500/10">
                {b.icon}
              </div>
              <h3 className="mb-3 font-sans text-xl font-medium tracking-tight text-white">
                {b.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-500">
                {b.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/5 px-4 py-2 text-xs font-mono tracking-widest text-blue-400 uppercase">
            <CheckCircle2 className="h-3 w-3" />
            Clarity Achieved
          </div>
          
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
