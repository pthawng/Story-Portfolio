import { motion } from "motion/react";
import { useStoryStore } from "@/src/features/story/story.store";
import { SLIDE_UP, TRANSITION_DEFAULT } from "@/src/lib/animation";
import { ArrowRight } from "lucide-react";

export default function IntroScene() {
  const { setScene } = useStoryStore();

  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-black px-4">
      <motion.div
        variants={SLIDE_UP}
        initial="initial"
        animate="animate"
        transition={TRANSITION_DEFAULT}
        className="max-w-2xl text-center"
      >
        <h1 className="mb-6 font-sans text-4xl font-medium tracking-tighter sm:text-6xl">
          This is not a portfolio. <br />
          <span className="text-gray-500">It’s a story.</span>
        </h1>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setScene("map")}
          className="group relative flex items-center gap-2 overflow-hidden rounded-full border border-white/20 bg-white/5 px-8 py-4 font-mono text-sm tracking-widest uppercase transition-colors hover:bg-white hover:text-black"
        >
          Enter Experience
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </motion.button>
      </motion.div>
      
      <div className="absolute bottom-8 font-mono text-[10px] tracking-[0.2em] text-gray-600 uppercase">
        Built for the curious
      </div>
    </div>
  );
}
