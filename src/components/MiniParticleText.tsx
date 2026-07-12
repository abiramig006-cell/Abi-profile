"use client";

import ParticleText from "./ParticleText";

export default function MiniParticleText({ word }: { word: string }) {
  return (
    <ParticleText
      words={[word]}
      stacked={false}
      hintLetter=""
      className="h-16 w-full max-w-md md:h-20"
    />
  );
}
