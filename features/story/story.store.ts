"use client";

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { INITIAL_SCENE } from "./story.config";
import type { SceneKey, StoryStore } from "./story.types";

export const useStoryStore = create<StoryStore>()(
  devtools(
    (set, get) => ({
      // ── State ──────────────────────────────────────────────
      currentScene: INITIAL_SCENE,
      history: [],
      isTransitioning: false,
      cameraX: 0,
      focusedNode: "beginning",

      // ── Actions ────────────────────────────────────────────
      setScene: (scene: SceneKey) => {
        const { currentScene, history, isTransitioning } = get();
        if (isTransitioning || scene === currentScene) return;

        set(
          {
            history: [...history, currentScene],
            currentScene: scene,
            focusedNode: scene, // Set focus when transitioning directly
          },
          false,
          "setScene"
        );
      },

      setCameraX: (x: number) => {
        set({ cameraX: x }, false, "setCameraX");
      },

      setFocusedNode: (key: SceneKey) => {
        set({ focusedNode: key }, false, "setFocusedNode");
      },

      goBack: () => {
        const { history, isTransitioning } = get();
        if (isTransitioning || history.length === 0) return;

        const previous = history[history.length - 1];
        set(
          {
            history: history.slice(0, -1),
            currentScene: previous,
          },
          false,
          "goBack"
        );
      },

      setTransitioning: (value: boolean) => {
        set({ isTransitioning: value }, false, "setTransitioning");
      },
    }),
    { name: "StoryStore" }
  )
);
