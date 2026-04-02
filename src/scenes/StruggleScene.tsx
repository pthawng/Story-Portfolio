import { motion } from "motion/react";
import { useStoryStore } from "@/src/features/story/story.store";
import { SLIDE_UP, TRANSITION_DEFAULT } from "@/src/lib/animation";
import { ArrowLeft, Terminal } from "lucide-react";

export default function StruggleScene() {
  const { setScene } = useStoryStore();

  const logs = [
    "ERROR: System.Architecture.Failure: Monolithic structure detected.",
    "WARN: Async.Promise.Rejection: Unhandled state transition.",
    "FATAL: UI.Layout.Breakdown: Viewport overflow at 375px.",
    "DEBUG: Learning.Process.Active: Retrying connection to senior principles...",
    "ERROR: Code.Quality.Low: Cyclomatic complexity > 25.",
    "WARN: Design.Thinking.Missing: User intent not found.",
  ];

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center bg-black p-8 font-mono">
      <div className="absolute inset-0 bg-[radial-gradient(#ff000010_1px,transparent_1px)] [background-size:20px_20px] opacity-30" />
      
      <motion.div
        variants={SLIDE_UP}
        initial="initial"
        animate="animate"
        transition={TRANSITION_DEFAULT}
        className="relative z-10 w-full max-w-3xl space-y-8"
      >
        <div className="flex items-center gap-3 text-red-500">
          <Terminal className="h-6 w-6" />
          <h2 className="text-2xl font-bold tracking-tighter glitch-text">SYSTEM_STRUGGLE.log</h2>
        </div>

        <div className="space-y-2 rounded-lg border border-red-500/20 bg-red-500/5 p-6 text-xs text-red-400/80">
          {logs.map((log, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="border-b border-red-500/10 pb-2 last:border-0"
            >
              <span className="mr-2 opacity-50">[{new Date().toLocaleTimeString()}]</span>
              {log}
            </motion.p>
          ))}
        </div>

        <div className="space-y-4 text-gray-400">
          <p className="text-lg leading-relaxed">
            Every senior engineer starts here. In the <span className="text-white">chaos</span> of unhandled errors and broken layouts. 
            The struggle wasn't just about fixing bugs; it was about <span className="text-white italic">unlearning</span> bad habits.
          </p>
        </div>

        <button
          onClick={() => setScene("map")}
          className="flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Map
        </button>
      </motion.div>

      <div className="absolute bottom-12 right-12 text-[100px] font-bold text-red-500/5 select-none pointer-events-none">
        0xERROR
      </div>
    </div>
  );
}
