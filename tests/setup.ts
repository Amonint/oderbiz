import "@testing-library/jest-dom/vitest";

const noopContext = {
  fillStyle: "",
  fillRect: () => {},
  clearRect: () => {},
} as unknown as CanvasRenderingContext2D;

(
  HTMLCanvasElement.prototype as unknown as {
    getContext: () => CanvasRenderingContext2D | null;
  }
).getContext = function getContext() {
  return noopContext;
};
