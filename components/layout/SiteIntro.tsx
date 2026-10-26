"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { getLenis } from "@/lib/smooth-scroll";

export function SiteIntro({ pathname }: { pathname: string }) {
  const reduceMotion = useReducedMotion();
  const [isActive, setIsActive] = useState(pathname === "/");

  useEffect(() => {
    if (!isActive || reduceMotion || pathname !== "/") return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    getLenis()?.stop();

    return () => {
      document.body.style.overflow = previousOverflow;
      getLenis()?.start();
    };
  }, [isActive, pathname, reduceMotion]);

  const skip = () => setIsActive(false);

  return (
    <AnimatePresence>
      {isActive && !reduceMotion && pathname === "/" && (
        <motion.div
          key="site-intro"
          className="site-intro fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.2, 0, 0, 1] }}
          aria-label="Abertura Metro Design"
        >
          <video
            autoPlay
            muted
            playsInline
            preload="auto"
            onLoadedMetadata={(event) => {
              event.currentTarget.playbackRate = 1.15;
            }}
            onEnded={skip}
            onError={skip}
            className="site-intro__video"
            aria-hidden="true"
          >
            <source src="/videos/metro-logo-intro.mp4" type="video/mp4" />
          </video>

          <button
            type="button"
            onClick={skip}
            className="absolute right-5 bottom-[calc(1.25rem+env(safe-area-inset-bottom))] rounded-full border border-white/30 px-4 py-2 text-xs font-medium tracking-wide text-white/80 transition-colors hover:border-white hover:text-white sm:right-8 sm:bottom-8"
          >
            Pular abertura <span aria-hidden="true">↗</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
