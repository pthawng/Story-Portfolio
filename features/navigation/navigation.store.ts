"use client";

import { create } from "zustand";
import type { SceneKey } from "@/features/story/story.types";
import type { NavigationStore } from "./navigation.types";

export const useNavigationStore = create<NavigationStore>()((set) => ({
  hoveredNode: null,
  activeNode: null,

  setHoveredNode: (node: SceneKey | null) => set({ hoveredNode: node }),
  setActiveNode: (node: SceneKey | null) => set({ activeNode: node }),
}));
