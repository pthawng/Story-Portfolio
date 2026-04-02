"use client";

import { useStoryStore } from "@/features/story/story.store";
import { SceneTransition } from "@/components/scene/SceneTransition";

// Scenes
import { IntroScene } from "@/scenes/intro/IntroScene";
import { StoryMapScene } from "@/scenes/map/StoryMapScene";
import { BeginningScene } from "@/scenes/beginning/BeginningScene";
import { StrugglesScene } from "@/scenes/struggles/StrugglesScene";
import { BreakthroughScene } from "@/scenes/breakthrough/BreakthroughScene";
import { SystemsScene } from "@/scenes/systems/SystemsScene";
import { ProjectsScene } from "@/scenes/projects/ProjectsScene";
import { PlaygroundScene } from "@/scenes/playground/PlaygroundScene";
import { ProofScene } from "@/scenes/proof/ProofScene";
import { VisionScene } from "@/scenes/vision/VisionScene";
import type { SceneKey } from "@/features/story/story.types";

function renderScene(scene: SceneKey): React.ReactNode {
  switch (scene) {
    case "intro":        return <IntroScene />;
    case "map":          return <StoryMapScene />;
    case "beginning":    return <BeginningScene />;
    case "struggles":    return <StrugglesScene />;
    case "breakthrough": return <BreakthroughScene />;
    case "systems":      return <SystemsScene />;
    case "projects":     return <ProjectsScene />;
    case "playground":   return <PlaygroundScene />;
    case "proof":        return <ProofScene />;
    case "vision":       return <VisionScene />;
    default:
      // Exhaustiveness guard — TypeScript will catch missing cases
      const _exhaustive: never = scene;
      return null;
  }
}

/**
 * Experience — the scene engine root.
 * Reads currentScene from Zustand and renders the correct scene
 * inside a SceneTransition wrapper for animated scene changes.
 */
export function Experience() {
  const currentScene = useStoryStore((s) => s.currentScene);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#020617]">
      <SceneTransition sceneKey={currentScene}>
        {renderScene(currentScene)}
      </SceneTransition>
    </div>
  );
}
