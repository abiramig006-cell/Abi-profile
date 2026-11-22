"use client";

import ParticleText from "./ParticleText";

export default function MiniParticleText({ word }: { word: string }) {
  return (
    <ParticleText
      words={[word]}
      stacked={false}
      hintLetter=""
      className="h-24 w-full max-w-4xl sm:h-28 md:h-36"
    />
  );
}
