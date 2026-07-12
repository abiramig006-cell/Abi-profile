"use client";

import Link from "next/link";
import { useRef } from "react";
import { useScrambleHover } from "@/hooks/useScrambleHover";
import { useMagnetic } from "@/hooks/useMagnetic";
import { useHaptic } from "@/hooks/useHaptic";

type ScrambleButtonProps = {
  href: string;
  label: string;
  className?: string;
  external?: boolean;
};

export default function ScrambleButton({
  href,
  label,
  className = "",
  external = false,
}: ScrambleButtonProps) {
  const textRef = useRef<HTMLSpanElement>(null);
  const magneticRef = useMagnetic<HTMLSpanElement>(0.25);
  const { scramble, reset } = useScrambleHover(label);
  const haptic = useHaptic();

  const classes = `group relative inline-flex text-sm uppercase tracking-[0.25em] after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100 ${className}`;

  const handlers = {
    onMouseEnter: () => textRef.current && scramble(textRef.current),
    onMouseLeave: () => textRef.current && reset(textRef.current),
    onClick: () => haptic(8),
  };

  const content = (
    <span ref={magneticRef} className="inline-block will-change-transform">
      <span ref={textRef}>{label}</span>
    </span>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} data-cursor {...handlers}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} data-cursor {...handlers}>
      {content}
    </Link>
  );
}
