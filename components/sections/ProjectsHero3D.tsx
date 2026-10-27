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

    let angle = window.innerWidth < 768 ? -10 : START_ANGLE;
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
      const vw = document.documentElement.clientWidth || window.innerWidth;
      const vh = window.innerHeight;
      const mobile = isMobile();
      return {
        uStart: mobile
          ? Math.max(0.34, Math.min(((vw * 0.96 - 10) / 700) * 0.9, (vh * 0.75) / 394))
          : Math.max(0.85, Math.min(vw / 1280, vh / 658)) * START_SCALE,
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
      const vw = document.documentElement.clientWidth || window.innerWidth;
      const mobile = isMobile();
      frameW = vw * (mobile ? 0.96 : 0.9);
      frameH = frameW * (mobile ? 0.58 : 658 / 1280);
      frameR = mobile ? 18 : START_RADIUS;
      scene.style.setProperty("--u", String(uCurrent));
      scene.style.setProperty("--po", poCurrent + "%");
      scene.style.setProperty("--a", angle + "deg");
      scene.style.setProperty("--wy", wyCurrent + "px");
      frame.style.width = frameW + "px";
      frame.style.height = frameH + "px";
      frame.style.borderRadius = frameR + "px";
    }

    let last = performance.now();
    let raf = 0;

    const io = new IntersectionObserver((entries) => {
      isVisible = entries[0].isIntersecting;

      if (isVisible && !reduced && !raf) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      } else if ((!isVisible || reduced) && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    }, { threshold: 0 });
    io.observe(hero);

    function tick(now: number) {
      if (now - last < 33) { raf = requestAnimationFrame(tick); return; }
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      if (isVisible && !reduced) {
        const p = scrollProgress();
        const t = Math.min(p / (1 - HOLD), 1);
        const e = easeInOutCubic(t);

        const vw = document.documentElement.clientWidth || window.innerWidth;
        const vh = window.innerHeight;
        const mobile = isMobile();
        const startW = vw * (mobile ? 0.96 : 0.9);
        const startH = startW * (mobile ? 0.58 : 658 / 1280);
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

        if (mobile) {
          // No mobile o monitor balança de leve e encara a câmera durante o
          // zoom, em vez de girar até ficar de perfil e sumir.
          const sway = -10 + Math.sin(now * 0.0005) * 7;
          const targetAngle = sway * (1 - e);
          angle += (targetAngle - angle) * 0.08;
        } else {
          const baseOmega = 360 / PERIOD;
          let targetOmega = baseOmega;
          let attract = 0;
          if (t > 0.1) {
            const intensity = t < 0.8 ? (t - 0.1) / 0.7 : 1;
            targetOmega = baseOmega * (1 - intensity);
            attract = intensity * 2.0;
          }
          omega += (targetOmega - omega) * 0.12;
          const nearest = Math.round(angle / 360) * 360;
          angle += omega * dt + (nearest - angle) * attract * dt;
        }

        if (roleHint) roleHint.style.opacity = p > 0.02 ? "0" : "1";

        scene!.style.setProperty("--u", String(uCurrent));
        scene!.style.setProperty("--po", poCurrent + "%");
        scene!.style.setProperty("--a", angle + "deg");
        scene!.style.setProperty("--wy", wyCurrent + "px");
        frame!.style.width = frameW + "px";
        frame!.style.height = frameH + "px";
        frame!.style.borderRadius = frameR + "px";
      }

      raf = isVisible && !reduced ? requestAnimationFrame(tick) : 0;
    }

    if (!reduced) raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <>
      <style>{`
        .hero3d { height: 260vh; position: relative; background: #f2f2ef; overflow-x: clip; }
        .sticky3d { position: sticky; top: 0; height: 100svh; display: grid; place-items: center; background: #f2f2ef; overflow-x: clip; }
        .frame3d { width: 90%; aspect-ratio: 1280 / 658; border-radius: 28px; overflow: hidden; background: #f2f2ef; position: relative; will-change: width, height, border-radius; }
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
        .front3d .screen .note { margin-top: calc(var(--u, 1) * 14px); color: #777; font-family: var(--font-sans); font-size: clamp(10px, calc(var(--u, 1) * 15px), 15px); letter-spacing: 0.04em; line-height: 1.3; }
        .front3d .screen .line1, .front3d .screen .line2 { color: var(--color-accent, #ff2e2e); text-shadow: 0 0 6px rgba(255,46,46,.35), 0 0 14px rgba(255,46,46,.15); line-height: 0.95; }
        .front3d .screen .line1 { font-family: var(--font-display); font-size: calc(var(--u, 1) * 74px); font-weight: 600; letter-spacing: 0; }
        .front3d .screen .line2 { font-family: var(--font-sans); font-size: calc(var(--u, 1) * 52px); font-weight: 500; letter-spacing: 0; }
        .back3d { width: calc(var(--u, 1) * 700px); height: calc(var(--u, 1) * 394px); transform: translate(-50%, -50%) rotateY(180deg) translateZ(calc(var(--u, 1) * 9px)); background: #121212; }
        .back3d .sq { position: absolute; left: 50%; top: 38%; width: calc(var(--u, 1) * 90px); height: calc(var(--u, 1) * 90px); background: #000; transform: translate(-50%, -50%); }
        .left3d { width: calc(var(--u, 1) * 18px); height: calc(var(--u, 1) * 394px); transform: translate(-50%, -50%) rotateY(-90deg) translateZ(calc(var(--u, 1) * 350px)); background: #1a1a1a; }
        .right3d { width: calc(var(--u, 1) * 18px); height: calc(var(--u, 1) * 394px); transform: translate(-50%, -50%) rotateY(90deg) translateZ(calc(var(--u, 1) * 350px)); background: #1d1d1d; }
        .top3d { width: calc(var(--u, 1) * 700px); height: calc(var(--u, 1) * 18px); transform: translate(-50%, -50%) rotateX(90deg) translateZ(calc(var(--u, 1) * 197px)); background: #0e0e0e; }
        .bottom3d { width: calc(var(--u, 1) * 700px); height: calc(var(--u, 1) * 18px); transform: translate(-50%, -50%) rotateX(-90deg) translateZ(calc(var(--u, 1) * 197px)); background: #1a1a1a; }
        .role-hint3d { position: absolute; left: 50%; bottom: 6vh; width: max-content; max-width: calc(100vw - 2rem); transform: translateX(-50%); font-size: 13px; letter-spacing: 1.5px; line-height: 1.4; text-align: center; text-transform: uppercase; color: #555; transition: opacity .4s ease; pointer-events: none; }
        @media (max-width: 767px) {
          .hero3d { height: 200vh; }
          .frame3d { width: 96%; border-radius: 18px; }
          .scene3d { perspective: calc(var(--u, 1) * 4200px); }
          .front3d .screen .line1 { font-size: min(calc(var(--u, 1) * 52px), 19vw); }
          .front3d .screen .line2 { font-size: min(calc(var(--u, 1) * 38px), 13.5vw); }
          .role-hint3d { bottom: 11vh; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero3d { height: auto; }
          .sticky3d { position: static; height: auto; padding: 7rem 0 4rem; }
          .role-hint3d { display: none; }
        }
      `}</style>

      <section
        className="hero3d"
        id="hero"
        ref={heroRef}
        aria-label="Abertura do portfólio de projetos"
      >
        <div className="sticky3d">
          <div className="frame3d" id="frame" ref={frameRef}>
            <div className="scene3d" id="scene" ref={sceneRef}>
              <div className="world3d" id="world">
                <div className="ground3d">
                  <svg className="shadow3d" viewBox="0 0 200 100" preserveAspectRatio="none" aria-hidden="true">
                    <polygon points="20,25 180,25 150,75 0,75" fill="rgba(60,60,60,0.35)" />
                  </svg>
                </div>
                <div className="panel3d" aria-hidden="true">
                  <div className="face3d front3d">
                    <div className="screen">
                      <div className="text-stack">
                        <div className="line1">Projetos</div>
                        <div className="line2">metro</div>
                        <div className="note">Branding, comunicação e audiovisual</div>
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
          <div className="role-hint3d" id="roleHint" ref={roleRef} aria-hidden="true">
            Role para explorar os projetos
          </div>
        </div>
      </section>
    </>
  );
}
