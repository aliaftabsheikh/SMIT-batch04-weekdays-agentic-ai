"use client";

import dynamic from "next/dynamic";

/**
 * Client-only boundary for the Three.js scene. `ssr: false` guarantees the
 * WebGL canvas is never prerendered on the server (no "window is not
 * defined"), while the rest of the page stays server-rendered.
 */
const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-40 w-40 animate-glow-pulse rounded-full bg-gradient-to-tr from-cyan via-violet to-magenta blur-2xl" />
    </div>
  ),
});

export function HeroCanvas() {
  return <HeroScene />;
}
