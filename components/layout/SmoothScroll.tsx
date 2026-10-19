"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { setLenis } from "@/lib/smooth-scroll";

export function SmoothScroll() {
  useEffect(() => {
    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    let lenis: Lenis | null = null;

    const syncMotionPreference = () => {
      setLenis(null);
      lenis?.destroy();
      lenis = motionPreference.matches
        ? null
        : new Lenis({
            autoRaf: true,
            anchors: true,
            allowNestedScroll: true,
            lerp: 0.085,
          });
      setLenis(lenis);
    };

    syncMotionPreference();
    motionPreference.addEventListener("change", syncMotionPreference);

    return () => {
      motionPreference.removeEventListener("change", syncMotionPreference);
      setLenis(null);
      lenis?.destroy();
    };
  }, []);

  return null;
}
