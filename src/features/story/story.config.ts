import { SceneDefinition, SceneId } from "./story.types";

export const SCENES: Record<SceneId, SceneDefinition> = {
  intro: {
    id: "intro",
    title: "The Intro",
    description: "The beginning of the story.",
    position: { x: 0, y: 0 },
    connections: ["map"],
  },
  map: {
    id: "map",
    title: "The Map",
    description: "The central navigation hub.",
    position: { x: 50, y: 50 },
    connections: ["beginning", "struggle", "breakthrough", "projects", "playground", "vision"],
  },
  beginning: {
    id: "beginning",
    title: "Beginning",
    description: "Where it all started.",
    position: { x: 20, y: 20 },
    connections: ["map"],
  },
  struggle: {
    id: "struggle",
    title: "Struggles",
    description: "The glitch in the matrix.",
    position: { x: 80, y: 20 },
    connections: ["map"],
  },
  breakthrough: {
    id: "breakthrough",
    title: "Breakthrough",
    description: "Finding the light.",
    position: { x: 20, y: 80 },
    connections: ["map"],
  },
  projects: {
    id: "projects",
    title: "Projects",
    description: "The tangible results.",
    position: { x: 80, y: 80 },
    connections: ["map"],
  },
  playground: {
    id: "playground",
    title: "Playground",
    description: "Interactive experiments.",
    position: { x: 50, y: 10 },
    connections: ["map"],
  },
  vision: {
    id: "vision",
    title: "Vision",
    description: "The future path.",
    position: { x: 50, y: 90 },
    connections: ["map"],
  },
};
