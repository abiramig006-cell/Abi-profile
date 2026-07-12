"use client";

import { useId, useState } from "react";

type AnimatedInputProps = {
  label: string;
  type?: string;
  name: string;
  multiline?: boolean;
};

export default function AnimatedInput({
  label,
  type = "text",
  name,
  multiline = false,
}: AnimatedInputProps) {
  const id = useId();
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");
  const active = focused || value.length > 0;

  const fieldClassName =
    "w-full border-b border-white/15 bg-transparent py-3 text-white outline-none transition-all duration-300 focus:border-emerald-400/60 focus:shadow-[0_8px_24px_-12px_rgba(16,185,129,0.45)]";

  return (
    <label htmlFor={id} className="group relative block">
      <span
        className={`pointer-events-none absolute left-0 z-10 text-xs uppercase tracking-[0.25em] transition-all duration-300 ${
          active
            ? "-top-5 text-emerald-400/80"
            : multiline
              ? "top-4 text-white/40 group-hover:text-white/55"
              : "top-3 text-white/40 group-hover:text-white/55"
        }`}
      >
        {label}
      </span>

      {multiline ? (
        <textarea
          id={id}
          name={name}
          rows={4}
          value={value}
          data-form-field
          onChange={(event) => setValue(event.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`${fieldClassName} resize-none pt-6`}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          data-form-field
          onChange={(event) => setValue(event.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={fieldClassName}
        />
      )}

      <span
        className={`absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-emerald-400 transition-transform duration-500 ${
          focused ? "scale-x-100" : ""
        }`}
      />
    </label>
  );
}
