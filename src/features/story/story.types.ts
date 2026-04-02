export type SceneId = 
  | "intro" 
  | "map" 
  | "beginning" 
  | "struggle" 
  | "breakthrough" 
  | "projects" 
  | "playground" 
  | "vision";

export interface SceneDefinition {
  id: SceneId;
  title: string;
  description: string;
  position: { x: number; y: number };
  connections: SceneId[];
}

export interface StoryState {
  currentScene: SceneId;
  visitedScenes: Set<SceneId>;
  setScene: (id: SceneId) => void;
  isTransitioning: boolean;
  setTransitioning: (status: boolean) => void;
}
