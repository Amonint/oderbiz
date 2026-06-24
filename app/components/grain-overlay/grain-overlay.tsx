"use client";

import { useEffect, useRef } from "react";

export function GrainOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const size = 256;
    canvas.width = size;
    canvas.height = size;

    let animId: number;

    function renderNoise() {
      const imageData = ctx!.createImageData(size, size);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const v = Math.random() * 255;
        data[i] = v;
        data[i + 1] = v;
        data[i + 2] = v;
        data[i + 3] = 25;
      }

      ctx!.putImageData(imageData, 0, 0);
      animId = requestAnimationFrame(renderNoise);
    }

    renderNoise();

    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        opacity: 0.45,
        mixBlendMode: "overlay",
        zIndex: 1,
      }}
    />
  );
}
