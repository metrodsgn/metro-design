"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export function SiteIntro({ pathname }: { pathname: string }) {
  const reduceMotion = useReducedMotion();
  const [isActive, setIsActive] = useState(pathname === "/");

  const skip = () => setIsActive(false);

  return (
    <AnimatePresence>
      {isActive && !reduceMotion && pathname === "/" && (
        <motion.div
          key="site-intro"
          className="site-intro fixed inset-0 z-[100] flex items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.2, 0, 0, 1] }}
          aria-label="Abertura Metro Design"
        >
          <video
            autoPlay
            muted
            playsInline
            preload="auto"
            onEnded={skip}
            onError={skip}
            className="h-full w-full object-contain"
            aria-hidden="true"
          >
            <source src="/videos/metro-logo-intro.mp4" type="video/mp4" />
          </video>

          <button
            type="button"
            onClick={skip}
            className="absolute right-5 bottom-5 rounded-full border border-white/30 px-4 py-2 text-xs font-medium tracking-wide text-white/80 transition-colors hover:border-white hover:text-white sm:right-8 sm:bottom-8"
          >
            Pular abertura <span aria-hidden="true">↗</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
