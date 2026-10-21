"use client";

import { useEffect, useRef } from "react";

const PERIOD = 22;
const START_ANGLE = 25;
const START_SCALE = 1;
const START_RADIUS = 28;
const HOLD = 0.12;

export default function ProjectsHero3D() {
  const heroRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const frame = frameRef.current;
    const scene = sceneRef.current;
    const roleHint = roleRef.current;
    if (!hero || !frame || !scene) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let angle = START_ANGLE;
    let omega = 360 / PERIOD;
    let uCurrent = 0;
    let frameW = 0, frameH = 0, frameR = START_RADIUS;
    let wyCurrent = 0;
    let poCurrent = 28;
    let isVisible = true;
    let cachedU = computeU();

    const onResize = () => { cachedU = computeU(); };
    window.addEventListener("resize", onResize);

    function isMobile() { return window.innerWidth < 768; }
    function computeU() {
      const vw = window.innerWidth, vh = window.innerHeight;
      const mobile = isMobile();
      return {
        uStart: Math.max(mobile ? 0.5 : 0.85, Math.min(vw / 1280, vh / 658)) * START_SCALE,
        uEnd: Math.max(vw / 700, vh / 394) * 1.03,
      };
    }
    function easeInOutCubic(x: number) {
      return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
    }
    function scrollProgress() {
      const rect = hero!.getBoundingClientRect();
      const total = hero!.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      return Math.max(0, Math.min(1, scrolled / total));
    }

    // init
    {
      const { uStart } = cachedU;
      uCurrent = uStart;
      const vw = window.innerWidth;
      const mobile = isMobile();
      frameW = vw * (mobile ? 0.96 : 0.9);
      frameH = frameW * 658 / 1280;
      frameR = mobile ? 18 : START_RADIUS;
      scene.style.setProperty("--u", String(uCurrent));
      scene.style.setProperty("--po", poCurrent + "%");
      scene.style.setProperty("--a", angle + "deg");
      scene.style.setProperty("--wy", wyCurrent + "px");
      frame.style.width = frameW + "px";
      frame.style.height = frameH + "px";
      frame.style.borderRadius = frameR + "px";
    }

    const io = new IntersectionObserver((entries) => {
      isVisible = entries[0].isIntersecting;
    }, { threshold: 0 });
    io.observe(hero);

    let last = performance.now();
    let raf = 0;
    function tick(now: number) {
      if (now - last < 33) { raf = requestAnimationFrame(tick); return; }
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      if (isVisible && !reduced) {
        const p = scrollProgress();
        const t = Math.min(p / (1 - HOLD), 1);
        const e = easeInOutCubic(t);

        const vw = window.innerWidth, vh = window.innerHeight;
        const mobile = isMobile();
        const startW = vw * (mobile ? 0.96 : 0.9);
        const startH = startW * 658 / 1280;
        const endW = vw;
        const endH = vh;
        const targetW = startW + (endW - startW) * e;
        const targetH = startH + (endH - startH) * e;
        const startR = mobile ? 18 : START_RADIUS;
        const targetR = startR + (0 - startR) * e;
        frameW += (targetW - frameW) * 0.12;
        frameH += (targetH - frameH) * 0.12;
        frameR += (targetR - frameR) * 0.12;

        const { uStart, uEnd } = cachedU;
        const targetU = uStart + (uEnd - uStart) * e;
        uCurrent += (targetU - uCurrent) * 0.12;

        const targetPo = mobile ? 28 : 28 + (50 - 28) * e;
        poCurrent += (targetPo - poCurrent) * 0.12;
        wyCurrent += (0 - wyCurrent) * 0.12;

        const baseOmega = mobile ? 360 / 32 : 360 / PERIOD;
        let targetOmega = baseOmega;
        let attract = 0;
        if (t > 0.1) {
          const intensity = t < 0.8 ? (t - 0.1) / 0.7 : 1;
          targetOmega = baseOmega * (1 - intensity);
          attract = intensity * (mobile ? 1.0 : 2.0);
        }
        omega += (targetOmega - omega) * 0.12;
        const nearest = Math.round(angle / 360) * 360;
        angle += omega * dt + (nearest - angle) * attract * dt;

        if (roleHint) roleHint.style.opacity = p > 0.02 ? "0" : "1";

        scene!.style.setProperty("--u", String(uCurrent));
        scene!.style.setProperty("--po", poCurrent + "%");
        scene!.style.setProperty("--a", angle + "deg");
        scene!.style.setProperty("--wy", wyCurrent + "px");
        frame!.style.width = frameW + "px";
        frame!.style.height = frameH + "px";
        frame!.style.borderRadius = frameR + "px";
      }

      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <>
      <style>{`
        .hero3d { height: 260vh; position: relative; background: #f2f2ef; }
        .sticky3d { position: sticky; top: 0; height: 100svh; display: grid; place-items: center; background: #f2f2ef; }
        @media (prefers-reduced-motion: reduce) { .sticky3d { position: static; height: auto; padding: 6vh 0; } }
        .frame3d { width: 90vw; aspect-ratio: 1280 / 658; border-radius: 28px; overflow: hidden; background: #f2f2ef; position: relative; will-change: width, height, border-radius; }
        .scene3d { width: 100%; height: 100%; perspective: calc(var(--u, 1) * 3328px); perspective-origin: 50% var(--po, 28%); display: grid; place-items: center; background: #f2f2ef; overflow: hidden; transform: translateZ(0); will-change: transform; contain: layout paint; }
        .world3d { position: absolute; left: 50%; top: 50%; width: 0; height: 0; transform-style: preserve-3d; transform: translateY(var(--wy, 0px)) rotateY(var(--a, 25deg)); will-change: transform; contain: layout; }
        .ground3d { position: absolute; left: 0; top: 0; width: calc(var(--u, 1) * 1400px); height: calc(var(--u, 1) * 1400px); transform: translate(-50%, -50%) translateY(calc(var(--u, 1) * 220px)) rotateX(90deg); transform-style: preserve-3d; background-image: linear-gradient(rgba(0,0,0,.17) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.17) 1px, transparent 1px); background-size: calc(var(--u, 1) * 80px) calc(var(--u, 1) * 80px); background-position: center; mask-image: radial-gradient(circle at center, black 28%, transparent 72%); -webkit-mask-image: radial-gradient(circle at center, black 28%, transparent 72%); }
        .shadow3d { position: absolute; left: 50%; top: 50%; width: calc(var(--u, 1) * 260px); height: calc(var(--u, 1) * 130px); transform: translate(-50%, -50%); filter: blur(calc(var(--u, 1) * 3px)); opacity: .35; }
        .panel3d { position: absolute; left: 0; top: 0; width: 0; height: 0; transform-style: preserve-3d; }
        .face3d { position: absolute; left: 0; top: 0; backface-visibility: hidden; -webkit-backface-visibility: hidden; }
        .front3d { width: calc(var(--u, 1) * 700px); height: calc(var(--u, 1) * 394px); transform: translate(-50%, -50%) translateZ(calc(var(--u, 1) * 9px)); background: #222; display: grid; place-items: center; }
        .front3d .screen { position: absolute; inset: calc(var(--u, 1) * 16px); background: linear-gradient(#0a0a0a, #171717); display: grid; place-items: center; text-align: center; }
        .front3d .screen { gap: 0; }
        .front3d .screen .text-stack { display: flex; flex-direction: column; align-items: center; gap: calc(var(--u, 1) * 4px); }
        .front3d .screen .line1, .front3d .screen .line2 { color: var(--color-accent, #ff2e2e); text-shadow: 0 0 6px rgba(255,46,46,.35), 0 0 14px rgba(255,46,46,.15); line-height: 0.95; }
        .front3d .screen .line1 { font-family: var(--font-display); font-size: calc(var(--u, 1) * 74px); font-weight: 600; letter-spacing: 0; }
        .front3d .screen .line2 { font-family: var(--font-wordmark); font-size: calc(var(--u, 1) * 52px); font-weight: 500; letter-spacing: 0; }
        .back3d { width: calc(var(--u, 1) * 700px); height: calc(var(--u, 1) * 394px); transform: translate(-50%, -50%) rotateY(180deg) translateZ(calc(var(--u, 1) * 9px)); background: #121212; }
        .back3d .sq { position: absolute; left: 50%; top: 38%; width: calc(var(--u, 1) * 90px); height: calc(var(--u, 1) * 90px); background: #000; transform: translate(-50%, -50%); }
        .left3d { width: calc(var(--u, 1) * 18px); height: calc(var(--u, 1) * 394px); transform: translate(-50%, -50%) rotateY(-90deg) translateZ(calc(var(--u, 1) * 350px)); background: #1a1a1a; }
        .right3d { width: calc(var(--u, 1) * 18px); height: calc(var(--u, 1) * 394px); transform: translate(-50%, -50%) rotateY(90deg) translateZ(calc(var(--u, 1) * 350px)); background: #1d1d1d; }
        .top3d { width: calc(var(--u, 1) * 700px); height: calc(var(--u, 1) * 18px); transform: translate(-50%, -50%) rotateX(90deg) translateZ(calc(var(--u, 1) * 197px)); background: #0e0e0e; }
        .bottom3d { width: calc(var(--u, 1) * 700px); height: calc(var(--u, 1) * 18px); transform: translate(-50%, -50%) rotateX(-90deg) translateZ(calc(var(--u, 1) * 197px)); background: #1a1a1a; }
        .role-hint3d { position: absolute; left: 50%; bottom: 6vh; transform: translateX(-50%); font-size: 13px; letter-spacing: 1.5px; text-transform: uppercase; color: #555; transition: opacity .4s ease; pointer-events: none; }
        @media (max-width: 767px) {
          .hero3d { height: 200vh; }
          .frame3d { width: 96vw; border-radius: 18px; }
          .scene3d { perspective: calc(var(--u, 1) * 4200px); }
          .front3d .screen .line1 { font-size: calc(var(--u, 1) * 52px); }
          .front3d .screen .line2 { font-size: calc(var(--u, 1) * 38px); }
        }
      `}</style>

      <section className="hero3d" id="hero" ref={heroRef}>
        <div className="sticky3d">
          <div className="frame3d" id="frame" ref={frameRef}>
            <div className="scene3d" id="scene" ref={sceneRef}>
              <div className="world3d" id="world">
                <div className="ground3d">
                  <svg className="shadow3d" viewBox="0 0 200 100" preserveAspectRatio="none">
                    <polygon points="20,25 180,25 150,75 0,75" fill="rgba(60,60,60,0.35)" />
                  </svg>
                </div>
                <div className="panel3d">
                  <div className="face3d front3d">
                    <div className="screen">
                      <div className="text-stack">
                        <div className="line1">Projetos</div>
                        <div className="line2">metro</div>
                      </div>
                    </div>
                  </div>
                  <div className="face3d back3d"><div className="sq" /></div>
                  <div className="face3d left3d" />
                  <div className="face3d right3d" />
                  <div className="face3d top3d" />
                  <div className="face3d bottom3d" />
                </div>
              </div>
            </div>
          </div>
          <div className="role-hint3d" id="roleHint" ref={roleRef}>Role para baixo</div>
        </div>
      </section>
    </>
  );
}
