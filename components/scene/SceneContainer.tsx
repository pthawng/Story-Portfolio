"use client";

import { cn } from "@/lib/utils";

interface SceneContainerProps {
  children: React.ReactNode;
  className?: string;
  /** Full viewport scene (default: true) */
  fullscreen?: boolean;
}

/**
 * SceneContainer — the layout wrapper for every scene.
 * Provides a full-viewport dark canvas, centered content column,
 * and consistent padding. Scenes customize via className.
 */
export function SceneContainer({
  children,
  className,
  fullscreen = true,
}: SceneContainerProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden",
        fullscreen && "w-screen h-screen",
        className
      )}
    >
      {children}
    </div>
  );
}
