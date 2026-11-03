"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { onLenisScroll, setLenis } from "@/lib/smooth-scroll";

export function SmoothScroll() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const unsubscribeScroll = onLenisScroll(() => ScrollTrigger.update());
    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    let lenis: Lenis | null = null;
    const tickLenis = (time: number) => lenis?.raf(time * 1000);
    gsap.ticker.add(tickLenis);
    gsap.ticker.lagSmoothing(0);

    const syncMotionPreference = () => {
      setLenis(null);
      lenis?.destroy();
      lenis = motionPreference.matches
        ? null
        : new Lenis({
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
      gsap.ticker.remove(tickLenis);
      gsap.ticker.lagSmoothing(500, 33);
      unsubscribeScroll();
      setLenis(null);
      lenis?.destroy();
    };
  }, []);

  return null;
}
