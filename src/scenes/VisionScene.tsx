import { motion } from "motion/react";
import { useStoryStore } from "@/src/features/story/story.store";
import { SLIDE_UP, TRANSITION_DEFAULT } from "@/src/lib/animation";
import { ArrowLeft, Rocket, Globe, Code2, Heart } from "lucide-react";

export default function VisionScene() {
  const { setScene } = useStoryStore();

  const goals = [
    {
      icon: <Rocket className="h-5 w-5 text-orange-400" />,
      title: "Pioneering AI Interfaces",
      description: "Building the next generation of human-AI interaction patterns that feel natural and empowering.",
    },
    {
      icon: <Globe className="h-5 w-5 text-green-400" />,
      title: "Open Source Contribution",
      description: "Giving back to the community that built the tools I use every day. Aiming for 100+ meaningful contributions.",
    },
    {
      icon: <Code2 className="h-5 w-5 text-blue-400" />,
      title: "Mastering Distributed Systems",
      description: "Deepening my knowledge of high-scale, low-latency architectures that power the global web.",
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
        className="relative z-10 w-full max-w-4xl space-y-16"
      >
        <div className="space-y-4 text-center">
          <h2 className="font-sans text-4xl font-medium tracking-tighter sm:text-6xl">
            The <span className="text-orange-500">Vision</span>
          </h2>
          <p className="mx-auto max-w-xl text-lg text-gray-500">
            The story doesn't end here. It's just the beginning of a new chapter.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          {goals.map((g, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="group relative rounded-2xl border border-white/10 bg-white/5 p-8 transition-colors hover:border-orange-500/30"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/5 transition-colors group-hover:bg-orange-500/10">
                {g.icon}
              </div>
              <h3 className="mb-3 font-sans text-xl font-medium tracking-tight text-white">
                {g.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-500">
                {g.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-12 text-center">
          <div className="max-w-2xl space-y-4">
            <p className="text-2xl font-medium tracking-tight text-white sm:text-3xl">
              "The best way to predict the future is to <span className="text-orange-500 italic">build it</span>."
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <Heart className="h-4 w-4 text-red-500" />
              <span>Thanks for being part of the story.</span>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <button
              onClick={() => setScene("map")}
              className="flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Map
            </button>
            
            <button
              onClick={() => setScene("intro")}
              className="rounded-full border border-white/20 bg-white/5 px-6 py-2 text-xs font-mono tracking-widest text-gray-400 uppercase transition-colors hover:bg-white hover:text-black"
            >
              Restart Story
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
