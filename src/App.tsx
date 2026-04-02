import { motion, AnimatePresence } from "motion/react";
import { useStoryStore } from "@/src/features/story/story.store";
import { FADE_IN, TRANSITION_DEFAULT } from "@/src/lib/animation";
import IntroScene from "./scenes/IntroScene";
import MapScene from "./scenes/MapScene";
import StruggleScene from "./scenes/StruggleScene";
import BreakthroughScene from "./scenes/BreakthroughScene";
import ProjectsScene from "./scenes/ProjectsScene";
import PlaygroundScene from "./scenes/PlaygroundScene";
import VisionScene from "./scenes/VisionScene";
import BeginningScene from "./scenes/BeginningScene";

export default function App() {
  const { currentScene } = useStoryStore();

  const renderScene = () => {
    switch (currentScene) {
      case "intro": return <IntroScene key="intro" />;
      case "map": return <MapScene key="map" />;
      case "beginning": return <BeginningScene key="beginning" />;
      case "struggle": return <StruggleScene key="struggle" />;
      case "breakthrough": return <BreakthroughScene key="breakthrough" />;
      case "projects": return <ProjectsScene key="projects" />;
      case "playground": return <PlaygroundScene key="playground" />;
      case "vision": return <VisionScene key="vision" />;
      default: return null;
    }
  };

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-black selection:bg-blue-500/30">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScene}
          variants={FADE_IN}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={TRANSITION_DEFAULT}
          className="h-full w-full"
        >
          {renderScene()}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
