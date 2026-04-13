"use client";

import { useEffect, useRef } from "react";

export function HeroReelCanvas() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    try {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.fillStyle =
        "var(--token-2d91bfb1-1bb0-467e-bf37-8ef020f4f815, rgb(217, 217, 217))";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    } catch {
      /* jsdom no implementa canvas 2d */
    }
  }, []);

  return (
    <div
      className=""
      style={{
        width: "100%",
        height: "100%",
        background:
          "var(--token-2d91bfb1-1bb0-467e-bf37-8ef020f4f815, rgb(217, 217, 217))",
        overflow: "hidden",
        cursor: "pointer",
      }}
    >
      <canvas
        ref={ref}
        data-engine="three.js r136"
        width={1200}
        height={648}
        style={{ display: "block", width: "600px", height: "324px" }}
        aria-label="hero reel canvas"
      />
    </div>
  );
}
