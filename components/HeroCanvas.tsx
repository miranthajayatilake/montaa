"use client";

import { useEffect, useRef } from "react";

// Decorative Monte Carlo rollout field: random-walk paths fan out from a single decision
// point and land in outcome bins, building a live histogram on the right edge.

const BINS = 28;
const STEPS = 90;
const MAX_PATHS = 140;
const SIGNAL = "223,241,64";

type Path = { ys: number[]; born: number; end: number };

function gauss() {
  let u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

function makePath(): Path {
  const drift = gauss() * 0.9;
  const ys = [0];
  let y = 0;
  for (let i = 1; i <= STEPS; i++) {
    const t = i / STEPS;
    // volatility grows as the horizon widens; a shock at each "decision stage"
    y += (drift / STEPS) * 2 + gauss() * 0.045 * (0.4 + t);
    if (i % 22 === 0) y += gauss() * 0.12;
    ys.push(y);
  }
  return { ys, born: performance.now(), end: y };
}

export default function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, raf = 0;
    const paths: Path[] = [];
    const hist = new Array(BINS).fill(0);
    const binOf = (y: number) => Math.max(0, Math.min(BINS - 1, Math.floor((0.5 - y / 2.4) * BINS)));

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (now: number) => {
      ctx.clearRect(0, 0, w, h);
      const x0 = w * 0.08, x1 = w * 0.84, cy = h * 0.5, amp = h * 0.42;
      // decision-stage rails
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 6]);
      ctx.strokeStyle = "rgba(255,255,255,0.09)";
      for (let s = 0; s <= 4; s++) {
        const x = x0 + ((x1 - x0) * s) / 4;
        ctx.beginPath(); ctx.moveTo(x, h * 0.06); ctx.lineTo(x, h * 0.94); ctx.stroke();
      }
      ctx.setLineDash([]);
      // paths
      for (const p of paths) {
        const age = reduced ? 99 : (now - p.born) / 1600;
        const upto = Math.min(STEPS, Math.floor(age * STEPS));
        const hot = p.end > 0.55;
        const alpha = hot ? 0.55 : 0.13;
        ctx.strokeStyle = hot ? `rgba(${SIGNAL},${alpha})` : `rgba(233,236,230,${alpha})`;
        ctx.lineWidth = hot ? 1.1 : 0.8;
        ctx.beginPath();
        for (let i = 0; i <= upto; i++) {
          const x = x0 + ((x1 - x0) * i) / STEPS;
          const y = cy - (p.ys[i] / 1.2) * amp;
          i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      // outcome histogram
      const peak = Math.max(1, ...hist);
      for (let b = 0; b < BINS; b++) {
        const y = h * 0.08 + ((h * 0.84) * b) / BINS;
        const len = (hist[b] / peak) * w * 0.12;
        const hot = b < BINS * 0.3;
        ctx.fillStyle = hot ? `rgba(${SIGNAL},0.75)` : "rgba(233,236,230,0.22)";
        ctx.fillRect(x1 + 10, y, len, (h * 0.84) / BINS - 2);
      }
      // origin node
      ctx.fillStyle = `rgb(${SIGNAL})`;
      ctx.beginPath(); ctx.arc(x0, cy, 3.5, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = `rgba(${SIGNAL},0.35)`;
      ctx.beginPath(); ctx.arc(x0, cy, 9, 0, Math.PI * 2); ctx.stroke();
    };

    const spawn = () => {
      const p = makePath();
      paths.push(p);
      hist[binOf(p.end)]++;
      if (paths.length > MAX_PATHS) {
        const old = paths.shift()!;
        hist[binOf(old.end)] = Math.max(0, hist[binOf(old.end)] - 1);
      }
    };

    resize();
    window.addEventListener("resize", resize);

    if (reduced) {
      for (let i = 0; i < MAX_PATHS; i++) spawn();
      draw(performance.now());
      return () => window.removeEventListener("resize", resize);
    }

    for (let i = 0; i < 40; i++) { spawn(); paths[i].born -= 2000; }
    let last = 0;
    const loop = (now: number) => {
      if (now - last > 90) { spawn(); last = now; }
      draw(now);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" aria-hidden />;
}
