export type LayoutRect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type MediaSize = "small" | "medium" | "large";

export function intersects(a: LayoutRect, b: LayoutRect): boolean {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

export function getTextSafeZone(
  viewport: HTMLElement,
  textStage: HTMLElement,
  padding = 56,
): LayoutRect {
  const vp = viewport.getBoundingClientRect();
  const ts = textStage.getBoundingClientRect();

  return {
    x: ts.left - vp.left - padding,
    y: ts.top - vp.top - padding,
    width: ts.width + padding * 2,
    height: ts.height + padding * 2,
  };
}

/** Escala 0.78 (cerca del texto) → 1 (esquinas alejadas). */
function distanceScale(
  cellCenterX: number,
  cellCenterY: number,
  textCenterX: number,
  textCenterY: number,
  viewport: LayoutRect,
): number {
  const dist = Math.hypot(cellCenterX - textCenterX, cellCenterY - textCenterY);
  const maxDist = Math.hypot(viewport.width * 0.5, viewport.height * 0.5);
  const t = Math.min(dist / maxDist, 1);
  return 0.78 + t * 0.22;
}

function transformOrigin(
  cellCenterX: number,
  cellCenterY: number,
  textCenterX: number,
  textCenterY: number,
): string {
  const x = cellCenterX <= textCenterX ? "left" : "right";
  const y = cellCenterY <= textCenterY ? "top" : "bottom";
  return `${x} ${y}`;
}

function scaledRect(rect: LayoutRect, scale: number, origin: string): LayoutRect {
  const w = rect.width * scale;
  const h = rect.height * scale;
  let x = rect.x;
  let y = rect.y;

  if (origin.startsWith("right")) x += rect.width - w;
  if (origin.endsWith("bottom")) y += rect.height - h;

  return { x, y, width: w, height: h };
}

export function applySafePinnedLayout(viewport: HTMLElement, textStage: HTMLElement) {
  const vpRect = viewport.getBoundingClientRect();
  const viewportBox: LayoutRect = {
    x: 0,
    y: 0,
    width: vpRect.width,
    height: vpRect.height,
  };
  const safeZone = getTextSafeZone(viewport, textStage, 56);
  const textCenterX = safeZone.x + safeZone.width / 2;
  const textCenterY = safeZone.y + safeZone.height / 2;

  const cells = viewport.querySelectorAll<HTMLElement>("[data-masonry-reveal]");

  cells.forEach((cell) => {
    const tile = cell.querySelector<HTMLElement>("[data-masonry-tile]");
    const rect = cell.getBoundingClientRect();
    const cellRect: LayoutRect = {
      x: rect.left - vpRect.left,
      y: rect.top - vpRect.top,
      width: rect.width,
      height: rect.height,
    };

    const cx = cellRect.x + cellRect.width / 2;
    const cy = cellRect.y + cellRect.height / 2;
    const scale = distanceScale(cx, cy, textCenterX, textCenterY, viewportBox);
    const origin = transformOrigin(cx, cy, textCenterX, textCenterY);

    if (tile) {
      tile.style.transform = `scale(${scale.toFixed(3)})`;
      tile.style.transformOrigin = origin;
    }

    const hitRect = scaledRect(cellRect, scale, origin);

    if (intersects(hitRect, safeZone)) {
      cell.style.visibility = "hidden";
      cell.dataset.layoutVisible = "false";
    } else {
      cell.style.visibility = "";
      cell.dataset.layoutVisible = "true";
    }
  });
}
