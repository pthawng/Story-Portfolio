import type { SceneKey } from "@/features/story/story.types";

export interface MapNode {
  id: SceneKey;
  label: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
}

export interface MapEdge {
  from: SceneKey;
  to: SceneKey;
}

export interface NavigationState {
  hoveredNode: SceneKey | null;
  activeNode: SceneKey | null;
}

export interface NavigationActions {
  setHoveredNode: (node: SceneKey | null) => void;
  setActiveNode: (node: SceneKey | null) => void;
}

export type NavigationStore = NavigationState & NavigationActions;
