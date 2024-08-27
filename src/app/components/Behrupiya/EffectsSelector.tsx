"use client";

export default function EffectsSelector({ selectedEffect, onEffectChange }: { selectedEffect: string; onEffectChange: (effect: string) => void }) {
  const effects = ["Cinematic", "Digital Art", "Fantasy Art", "Neonpunk"];

  return (
    <div className="my-4">
      <label>Select Effect: </label>
      <select
        value={selectedEffect}
        onChange={(e) => onEffectChange(e.target.value)}
        className="p-2 border rounded"
      >
        {effects.map((effect) => (
          <option key={effect} value={effect}>
            {effect}
          </option>
        ))}
      </select>
    </div>
  );
}
