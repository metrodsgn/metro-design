import type Lenis from "lenis";

let instance: Lenis | null = null;
const scrollListeners = new Set<() => void>();

const notifyScroll = () => {
  for (const listener of scrollListeners) listener();
};

export function setLenis(next: Lenis | null) {
  instance?.off("scroll", notifyScroll);
  instance = next;
  instance?.on("scroll", notifyScroll);
}

export function getLenis() {
  return instance;
}

/** Assina os eventos de scroll do Lenis (ex.: sincronizar o ScrollTrigger). */
export function onLenisScroll(listener: () => void) {
  scrollListeners.add(listener);
  return () => {
    scrollListeners.delete(listener);
  };
}
