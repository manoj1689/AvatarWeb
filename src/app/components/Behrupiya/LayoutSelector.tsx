// src/components/LayoutSelector.tsx

"use client";

export default function LayoutSelector({ selectedLayout, onLayoutChange }: { selectedLayout: string; onLayoutChange: (layout: string) => void }) {
  const layouts = ["Single Image", "Collage", "Grid"];

  return (
    <div className="my-4">
      <label>Select Layout: </label>
      <select
        value={selectedLayout}
        onChange={(e) => onLayoutChange(e.target.value)}
        className="p-2 border rounded"
      >
        {layouts.map((layout) => (
          <option key={layout} value={layout}>
            {layout}
          </option>
        ))}
      </select>
    </div>
  );
}
