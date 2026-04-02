import { motion } from "motion/react";
import { useStoryStore } from "@/src/features/story/story.store";
import { SLIDE_UP, TRANSITION_DEFAULT } from "@/src/lib/animation";
import { ArrowLeft, History, BookOpen, Code, Compass } from "lucide-react";

export default function BeginningScene() {
  const { setScene } = useStoryStore();

  const timeline = [
    {
      icon: <Code className="h-5 w-5 text-blue-400" />,
      year: "2018",
      title: "The First Line",
      description: "A simple 'Hello World' in Python that sparked a lifelong obsession with creation.",
    },
    {
      icon: <BookOpen className="h-5 w-5 text-green-400" />,
      year: "2020",
      title: "The Self-Taught Path",
      description: "Navigating through documentation, tutorials, and countless late-night debugging sessions.",
    },
    {
      icon: <Compass className="h-5 w-5 text-purple-400" />,
      year: "2022",
      title: "Finding the Stack",
      description: "Discovering the power of React, TypeScript, and the modern web ecosystem.",
    },
  ];

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
            <History className="h-6 w-6" />
            <h2 className="font-sans text-4xl font-medium tracking-tighter sm:text-5xl">
              The <span className="text-blue-500">Beginning</span>
            </h2>
          </div>
          <p className="mx-auto max-w-xl text-lg text-gray-500">
            Every story has a starting point. This is where mine began.
          </p>
        </div>

        <div className="relative space-y-8 before:absolute before:left-6 before:top-0 before:h-full before:w-px before:bg-white/10 sm:before:left-1/2">
          {timeline.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className={`relative flex flex-col gap-4 sm:flex-row sm:items-center ${
                i % 2 === 0 ? "sm:flex-row-reverse" : ""
              }`}
            >
              <div className="absolute left-6 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-blue-500 bg-black sm:left-1/2" />
              
              <div className={`w-full sm:w-1/2 ${i % 2 === 0 ? "sm:pl-12" : "sm:pr-12"}`}>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:border-blue-500/30">
                  <div className="mb-2 flex items-center gap-2 font-mono text-xs tracking-widest text-blue-400 uppercase">
                    {item.icon}
                    <span>{item.year}</span>
                  </div>
                  <h3 className="mb-2 font-sans text-xl font-medium tracking-tight text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-500">
                    {item.description}
                  </p>
                </div>
              </div>
              <div className="hidden w-1/2 sm:block" />
            </motion.div>
          ))}
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
