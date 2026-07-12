"use client";

import { INTRO_COMPLETE_EVENT } from "@/lib/events";
import { useCallback, useEffect, useRef, useState } from "react";

const CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*!?<>[]{}";
const FONT_FAMILY = '"Geist Mono", "Courier New", monospace';

type Particle = {
  homeX: number;
  homeY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  char: string;
  opacity: number;
};

type ParticleTextProps = {
  words: string[];
  hintLetter?: string;
  stacked?: boolean;
  className?: string;
};

type TextLayout = {
  fontSize: number;
  stacked: boolean;
  placements: { text: string; x: number; y: number }[];
};

function randomChar() {
  return CHARSET[Math.floor(Math.random() * CHARSET.length)];
}

function measureLayout(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  words: string[],
  forceStacked = false,
): TextLayout {
  const paddingX = Math.max(16, width * 0.05);
  const maxWidth = width - paddingX * 2;
  const maxFont = Math.min(width * 0.14, 128);
  const minFont = width < 640 ? 26 : 32;
  const longName = words.some((word) => word.length >= 9) || words.join("").length >= 17;
  const layoutOrder = forceStacked || longName ? [1, 0] : [0, 1];

  for (const stackedFlag of layoutOrder) {
    const stacked = stackedFlag === 1;

    for (let fontSize = maxFont; fontSize >= minFont; fontSize -= 2) {
      ctx.font = `300 ${fontSize}px ${FONT_FAMILY}`;

      if (!stacked) {
        const spacing = fontSize * 0.35;
        const wordWidths = words.map((word) => ctx.measureText(word).width);
        const totalWidth = wordWidths.reduce((sum, w) => sum + w, 0) + spacing * (words.length - 1);

        if (totalWidth > maxWidth) continue;

        let x = (width - totalWidth) / 2;
        const y = height / 2;
        const placements = words.map((word, index) => {
          const placement = { text: word, x, y };
          x += wordWidths[index] + spacing;
          return placement;
        });

        const fits = placements.every(
          (placement) =>
            placement.x >= paddingX &&
            placement.x + ctx.measureText(placement.text).width <= width - paddingX,
        );

        if (fits) return { fontSize, stacked: false, placements };
        continue;
      }

      const lineHeight = fontSize * 1.15;
      const wordWidths = words.map((word) => ctx.measureText(word).width);
      const maxLineWidth = Math.max(...wordWidths);
      const totalHeight = lineHeight * words.length;

      if (maxLineWidth > maxWidth || totalHeight > height - paddingX) continue;

      const startY = (height - totalHeight) / 2 + fontSize / 2;
      const placements = words.map((word, index) => ({
        text: word,
        x: (width - wordWidths[index]) / 2,
        y: startY + index * lineHeight,
      }));

      const fits = placements.every(
        (placement) =>
          placement.x >= paddingX &&
          placement.x + ctx.measureText(placement.text).width <= width - paddingX,
      );

      if (fits) return { fontSize, stacked: true, placements };
    }
  }

  const fontSize = minFont;
  ctx.font = `300 ${fontSize}px ${FONT_FAMILY}`;
  const lineHeight = fontSize * 1.15;
  const wordWidths = words.map((word) => ctx.measureText(word).width);
  const totalHeight = lineHeight * words.length;
  const startY = (height - totalHeight) / 2 + fontSize / 2;

  return {
    fontSize,
    stacked: true,
    placements: words.map((word, index) => ({
      text: word,
      x: Math.max(paddingX, (width - wordWidths[index]) / 2),
      y: startY + index * lineHeight,
    })),
  };
}

function buildParticles(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  words: string[],
  gap: number,
  hintLetter: string,
  forceStacked = false,
) {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#fff";
  ctx.textBaseline = "middle";

  const layout = measureLayout(ctx, width, height, words, forceStacked);
  ctx.font = `300 ${layout.fontSize}px ${FONT_FAMILY}`;

  let hintPos: { x: number; y: number } | null = null;

  for (const placement of layout.placements) {
    const letterIndex = placement.text.toLowerCase().indexOf(hintLetter.toLowerCase());

    if (!hintPos && hintLetter && letterIndex >= 0) {
      const before = placement.text.slice(0, letterIndex);
      const letter = placement.text[letterIndex];
      const offset = ctx.measureText(before).width + ctx.measureText(letter).width / 2;
      hintPos = { x: placement.x + offset, y: placement.y };
    }

    ctx.fillText(placement.text, placement.x, placement.y);
  }

  const imageData = ctx.getImageData(0, 0, width, height);
  const particles: Particle[] = [];

  for (let py = 0; py < height; py += gap) {
    for (let px = 0; px < width; px += gap) {
      const alpha = imageData.data[(py * width + px) * 4 + 3];
      if (alpha > 120) {
        particles.push({
          homeX: px,
          homeY: py,
          x: px + (Math.random() - 0.5) * width * 0.35,
          y: py + (Math.random() - 0.5) * height * 0.2,
          vx: 0,
          vy: 0,
          char: randomChar(),
          opacity: 0.35 + Math.random() * 0.65,
        });
      }
    }
  }

  return { particles, hintPos };
}

export default function ParticleText({
  words,
  hintLetter = "e",
  stacked = true,
  className = "",
}: ParticleTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999, down: false });
  const rafRef = useRef(0);
  const [hintPos, setHintPos] = useState<{ x: number; y: number } | null>(null);
  const [ready, setReady] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  const init = useCallback(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const rect = container.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = Math.floor(rect.width);
    const height = Math.floor(rect.height);

    if (width <= 0 || height <= 0) return;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const gap = width < 640 ? 5 : 4;
    const { particles, hintPos: nextHint } = buildParticles(
      ctx,
      width,
      height,
      words,
      gap,
      hintLetter,
      stacked,
    );

    particlesRef.current = particles;
    setHintPos(nextHint);
    setReady(true);
  }, [words, hintLetter, stacked]);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);

    const runInit = () => init();
    runInit();

    document.fonts?.ready.then(runInit).catch(() => undefined);

    const onResize = () => init();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [init]);

  useEffect(() => {
    const onIntro = () => {
      for (const particle of particlesRef.current) {
        particle.vx += (Math.random() - 0.5) * 22;
        particle.vy += (Math.random() - 0.5) * 22;
      }
      setShowHint(true);
    };

    window.addEventListener(INTRO_COMPLETE_EVENT, onIntro);
    return () => window.removeEventListener(INTRO_COMPLETE_EVENT, onIntro);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const repelRadius = 110;
    const repelForce = 2.4;
    const spring = 0.07;
    const friction = 0.86;

    const draw = () => {
      const ctx = canvas.getContext("2d");
      const particles = particlesRef.current;
      if (!ctx || !particles.length) return;

      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const mouse = mouseRef.current;

      ctx.clearRect(0, 0, width, height);
      ctx.font = `${width < 640 ? 10 : 11}px ${FONT_FAMILY}`;
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";

      for (const particle of particles) {
        const dx = particle.x - mouse.x;
        const dy = particle.y - mouse.y;
        const dist = Math.hypot(dx, dy);

        if (dist < repelRadius && dist > 0) {
          const force = (1 - dist / repelRadius) * repelForce;
          particle.vx += (dx / dist) * force;
          particle.vy += (dy / dist) * force;
        }

        if (mouse.down) {
          particle.vx += (Math.random() - 0.5) * 3;
          particle.vy += (Math.random() - 0.5) * 3;
        }

        particle.vx += (particle.homeX - particle.x) * spring;
        particle.vy += (particle.homeY - particle.y) * spring;
        particle.vx *= friction;
        particle.vy *= friction;
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (Math.random() < 0.018) {
          particle.char = randomChar();
        }

        const speed = Math.hypot(particle.vx, particle.vy);
        const alpha = Math.min(1, particle.opacity + speed * 0.04);

        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.fillText(particle.char, particle.x, particle.y);
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [reducedMotion, ready]);

  const handlePointerMove = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    mouseRef.current.x = event.clientX - rect.left;
    mouseRef.current.y = event.clientY - rect.top;
  };

  const handlePointerLeave = () => {
    mouseRef.current.x = -9999;
    mouseRef.current.y = -9999;
    mouseRef.current.down = false;
  };

  const handlePointerDown = () => {
    mouseRef.current.down = true;
    setShowHint(false);

    for (const particle of particlesRef.current) {
      particle.vx += (Math.random() - 0.5) * 14;
      particle.vy += (Math.random() - 0.5) * 14;
    }

    window.setTimeout(() => {
      mouseRef.current.down = false;
    }, 180);
  };

  if (reducedMotion) {
    return (
      <div className={`flex flex-col items-center justify-center gap-y-2 ${className}`}>
        {words.map((word) => (
          <span
            key={word}
            className="text-4xl font-light lowercase tracking-tight text-white md:text-6xl lg:text-7xl"
          >
            {word}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      <canvas
        ref={canvasRef}
        className="block w-full cursor-crosshair touch-none"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onPointerDown={handlePointerDown}
        aria-label={words.join(" ")}
        role="img"
      />

      {showHint && hintPos && (
        <div
          className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded border border-white/15 bg-black/70 px-3 py-1.5 text-[10px] uppercase tracking-[0.25em] text-white/70 backdrop-blur-sm"
          style={{ left: hintPos.x, top: hintPos.y }}
        >
          Click to interact
        </div>
      )}
    </div>
  );
}
