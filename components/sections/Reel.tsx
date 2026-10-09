"use client";

import { useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { REEL } from "@/lib/constants";

export function Reel() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    video.play();
    setIsPlaying(true);
  };

  return (
    <section id="reel" className="py-24 md:py-32">
      <Container>
        <Reveal>
          <span className="text-accent text-sm font-medium tracking-widest uppercase">
            {REEL.label}
          </span>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="border-border relative mt-8 aspect-video w-full overflow-hidden rounded-lg border">
            <video
              ref={videoRef}
              src={REEL.videoSrc}
              poster={REEL.poster}
              controls={isPlaying}
              playsInline
              preload="metadata"
              className="h-full w-full object-cover"
            />

            {!isPlaying && (
              <button
                type="button"
                onClick={handlePlay}
                aria-label="Reproduzir vídeo"
                className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/40 transition-colors hover:bg-black/50"
              >
                <span className="bg-foreground text-background flex h-20 w-20 items-center justify-center rounded-full transition-transform hover:scale-110">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="ml-1"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </button>
            )}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}