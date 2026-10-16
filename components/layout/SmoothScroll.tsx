"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function SmoothScroll() {
  useEffect(() => {
    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    let lenis: Lenis | null = null;

    const syncMotionPreference = () => {
      lenis?.destroy();
      lenis = motionPreference.matches
        ? null
        : new Lenis({
            autoRaf: true,
            anchors: true,
            allowNestedScroll: true,
            lerp: 0.085,
          });
    };

    syncMotionPreference();
    motionPreference.addEventListener("change", syncMotionPreference);

    return () => {
      motionPreference.removeEventListener("change", syncMotionPreference);
      lenis?.destroy();
    };
  }, []);

  return null;
}
