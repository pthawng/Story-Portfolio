export type SceneKey =
  | "intro"
  | "map"
  | "beginning"
  | "struggles"
  | "breakthrough"
  | "systems"
  | "projects"
  | "playground"
  | "proof"
  | "vision";

export interface SceneMetadata {
  key: SceneKey;
  label: string;
  description: string;
  /** Which scenes this scene can navigate to */
  connections: SceneKey[];
  /** Node hierarchy for the map */
  type: "primary" | "secondary" | "vision";
  /** Order in the narrative journey */
  chapterNumber?: number;
}

export interface StoryState {
  currentScene: SceneKey;
  history: SceneKey[];
  isTransitioning: boolean;
  /** Horizontal focus point for the story map (px/coordinate) */
  cameraX: number;
}

export interface StoryActions {
  setScene: (scene: SceneKey) => void;
  goBack: () => void;
  setTransitioning: (value: boolean) => void;
  setCameraX: (x: number) => void;
}

export type StoryStore = StoryState & StoryActions;
