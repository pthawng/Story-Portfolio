import { create } from "zustand";
import { SceneId, StoryState } from "./story.types";

export const useStoryStore = create<StoryState>((set) => ({
  currentScene: "intro",
  visitedScenes: new Set(["intro"]),
  isTransitioning: false,
  
  setScene: (id: SceneId) => set((state) => {
    const newVisited = new Set(state.visitedScenes);
    newVisited.add(id);
    return { 
      currentScene: id, 
      visitedScenes: newVisited,
      isTransitioning: true 
    };
  }),
  
  setTransitioning: (status: boolean) => set({ isTransitioning: status }),
}));
