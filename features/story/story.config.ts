import type { SceneKey, SceneMetadata } from "./story.types";

export const SCENES: Record<SceneKey, SceneMetadata> = {
  intro: {
    key: "intro",
    label: "Hello",
    description: "Identity & hook — who I am and why you should care",
    connections: ["map"],
    type: "secondary",
  },
  map: {
    key: "map",
    label: "Story Map",
    description: "Non-linear navigation hub — explore any chapter",
    connections: [
      "beginning",
      "struggles",
      "breakthrough",
      "systems",
      "projects",
      "playground",
      "proof",
      "vision",
    ],
    type: "secondary",
  },
  beginning: {
    key: "beginning",
    label: "The Beginning",
    description: "Where I started — context and origin",
    connections: ["map", "struggles"],
    type: "primary",
    chapterNumber: 1,
  },
  struggles: {
    key: "struggles",
    label: "The Struggles",
    description: "Pain points, failures, and hard lessons",
    connections: ["map", "breakthrough"],
    type: "primary",
    chapterNumber: 2,
  },
  breakthrough: {
    key: "breakthrough",
    label: "Breakthrough",
    description: "The turning point that changed everything",
    connections: ["map", "systems"],
    type: "primary",
    chapterNumber: 3,
  },
  systems: {
    key: "systems",
    label: "Systems Thinking",
    description: "How I think — mental models and frameworks",
    connections: ["map", "projects"],
    type: "primary",
    chapterNumber: 4,
  },
  projects: {
    key: "projects",
    label: "Projects",
    description: "Real work — case studies and outcomes",
    connections: ["map", "playground"],
    type: "secondary",
    chapterNumber: 5,
  },
  playground: {
    key: "playground",
    label: "Playground",
    description: "Interactive demos and experiments",
    connections: ["map", "proof"],
    type: "secondary",
    chapterNumber: 6,
  },
  proof: {
    key: "proof",
    label: "Proof",
    description: "Credibility — results, testimonials, metrics",
    connections: ["map", "vision"],
    type: "secondary",
    chapterNumber: 7,
  },
  vision: {
    key: "vision",
    label: "Vision",
    description: "Where I'm heading — closing statement",
    connections: ["map", "intro"],
    type: "vision",
    chapterNumber: 8,
  },
};

/** Navigation layout (Virtual pixels from center) */
export interface LayoutPosition {
  x: number;
  y: number;
}

export const NODE_POSITIONS: Record<SceneKey, LayoutPosition> = {
  intro:       { x: -1800, y: 10 },
  map:         { x: -1800, y: 10 },
  beginning:   { x: -1800, y: 45 },
  struggles:   { x: -1200, y: 56 },
  breakthrough:{ x: -600, y: 48 },
  systems:     { x: 0, y: 50 },
  projects:    { x: 600, y: 45 },
  playground:  { x: 1200, y: 56 },
  proof:       { x: 1800, y: 48 },
  vision:      { x: 2600, y: 42 },
};

export const EDGES = [
  { from: "beginning",   to: "struggles" },
  { from: "struggles",   to: "breakthrough" },
  { from: "breakthrough", to: "systems" },
  { from: "systems",      to: "projects" },
  { from: "projects",     to: "playground" },
  { from: "playground",   to: "proof" },
  { from: "proof",        to: "vision" },
];

/** Ordered chapter list for the map (excludes intro/map themselves) */
export const CHAPTER_ORDER: SceneKey[] = [
  "beginning",
  "struggles",
  "breakthrough",
  "systems",
  "projects",
  "playground",
  "proof",
  "vision",
];

export const INITIAL_SCENE: SceneKey = "intro";
