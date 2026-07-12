"use client";

import Link from "next/link";

type SpacedButtonProps = {
  href: string;
  label: string;
  className?: string;
  external?: boolean;
};

export default function SpacedButton({
  href,
  label,
  className = "",
  external = false,
}: SpacedButtonProps) {
  const chars = label.split("");

  const content = (
    <span className="group inline-flex overflow-hidden">
      {chars.map((char, i) => (
        <span
          key={`${char}-${i}`}
          className="inline-block transition-transform duration-300 ease-out group-hover:-translate-y-1"
          style={{ transitionDelay: `${i * 20}ms` }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );

  const classes = `relative text-sm uppercase tracking-[0.25em] after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100 ${className}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} data-cursor>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} data-cursor>
      {content}
    </Link>
  );
}
