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
  const paddingX = Math.max(12, width * 0.04);
  const paddingY = Math.max(8, height * 0.08);
  const maxWidth = width - paddingX * 2;
  const maxFont = Math.max(18, Math.min(width * 0.2, (height - paddingY * 2) * 0.96, 168));
  const minFont = Math.max(16, Math.min(width < 640 ? 20 : 24, maxFont));
  const layoutOrder = forceStacked ? [1, 0] : [0];

  for (const stackedFlag of layoutOrder) {
    const stacked = stackedFlag === 1;

    for (let fontSize = maxFont; fontSize >= minFont; fontSize -= 2) {
      ctx.font = `600 ${fontSize}px ${FONT_FAMILY}`;

      if (!stacked) {
        const spacing = fontSize * 0.35;
        const wordWidths = words.map((word) => ctx.measureText(word).width);
        const totalWidth = wordWidths.reduce((sum, w) => sum + w, 0) + spacing * (words.length - 1);

        if (totalWidth > maxWidth) continue;

        let x = Math.max(paddingX, (width - totalWidth) / 2);
        const y = height / 2;
        const placements = words.map((word, index) => {
          const placement = { text: word, x, y };
          x += wordWidths[index] + spacing;
          return placement;
        });

        const fits =
          placements[0].x >= paddingX &&
          placements[placements.length - 1].x + ctx.measureText(placements[placements.length - 1].text).width <=
            width - paddingX;

        if (fits) return { fontSize, stacked: false, placements };
        continue;
      }

      const lineHeight = fontSize * 1.15;
      const wordWidths = words.map((word) => ctx.measureText(word).width);
      const maxLineWidth = Math.max(...wordWidths);
      const totalHeight = lineHeight * words.length;

      if (maxLineWidth > maxWidth || totalHeight > height - paddingY * 2) continue;

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

  const tryInlineFallback = (fontSize: number): TextLayout | null => {
    ctx.font = `600 ${fontSize}px ${FONT_FAMILY}`;
    const spacing = fontSize * 0.22;
    const wordWidths = words.map((word) => ctx.measureText(word).width);
    const totalWidth = wordWidths.reduce((sum, w) => sum + w, 0) + spacing * Math.max(0, words.length - 1);

    if (totalWidth > maxWidth) return null;

    let x = Math.max(paddingX, (width - totalWidth) / 2);
    const y = height / 2;
    const placements = words.map((word, index) => {
      const placement = { text: word, x, y };
      x += wordWidths[index] + spacing;
      return placement;
    });

    const fits =
      placements[0].x >= paddingX &&
      placements[placements.length - 1].x + ctx.measureText(placements[placements.length - 1].text).width <=
        width - paddingX;

    if (!fits) return null;
    return { fontSize, stacked: false, placements };
  };

  for (let fontSize = minFont; fontSize >= 20; fontSize -= 2) {
    const layout = tryInlineFallback(fontSize);
    if (layout) return layout;
  }

  const fontSize = minFont;
  ctx.font = `600 ${fontSize}px ${FONT_FAMILY}`;
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
  ctx.font = `600 ${layout.fontSize}px ${FONT_FAMILY}`;

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

  const canvas = ctx.canvas;
  const dprX = canvas.width / width;
  const dprY = canvas.height / height;
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const step = Math.max(1, Math.round(gap * ((dprX + dprY) / 2)));
  const particles: Particle[] = [];

  for (let py = 0; py < imageData.height; py += step) {
    for (let px = 0; px < imageData.width; px += step) {
      const alpha = imageData.data[(py * imageData.width + px) * 4 + 3];
      if (alpha > 72) {
        const homeX = px / dprX;
        const homeY = py / dprY;
        particles.push({
          homeX,
          homeY,
          x: homeX + (Math.random() - 0.5) * width * 0.28,
          y: homeY + (Math.random() - 0.5) * height * 0.16,
          vx: 0,
          vy: 0,
          char: randomChar(),
          opacity: 0.82 + Math.random() * 0.18,
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
  const gapRef = useRef(4);
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

    const gap = height < 150 ? 2 : height < 280 ? 3 : 4;
    gapRef.current = gap;
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
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";

      const gap = gapRef.current;
      const dot = Math.max(1.7, gap * 0.92);
      const ink =
        document.documentElement.dataset.theme === "light" ? "20,20,20" : "255,255,255";

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

        const speed = Math.hypot(particle.vx, particle.vy);
        const moving = speed > 1.1 || (dist < repelRadius && dist > 0);

        if (moving) {
          if (Math.random() < 0.2) particle.char = randomChar();
          const alpha = Math.min(1, particle.opacity + speed * 0.04);
          ctx.font = `500 ${Math.max(11, gap * 3)}px ${FONT_FAMILY}`;
          ctx.fillStyle = `rgba(${ink},${alpha})`;
          ctx.fillText(particle.char, particle.x, particle.y);
        } else {
          ctx.fillStyle = `rgba(${ink},0.96)`;
          ctx.fillRect(particle.x - dot / 2, particle.y - dot / 2, dot, dot);
        }
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
      <div
        className={`flex items-center justify-center ${stacked ? "flex-col gap-y-2" : "gap-x-[0.35em]"} ${className}`}
      >
        {words.map((word) => (
          <span
            key={word}
            className="text-4xl font-medium tracking-tight text-white md:text-6xl lg:text-7xl"
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

      {showHint && hintLetter && hintPos && (
        <div className="pointer-events-none absolute bottom-1 left-1/2 z-10 -translate-x-1/2 rounded border border-white/15 bg-black/70 px-3 py-1.5 text-[10px] uppercase tracking-[0.25em] text-white/70 backdrop-blur-sm">
          Click to interact
        </div>
      )}
    </div>
  );
}
