export type LayoutRect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type CellLayout = {
  cell: HTMLElement;
  tile: HTMLElement;
  cellRect: LayoutRect;
  hitRect: LayoutRect;
  revealOrder: number;
  scale: number;
  origin: string;
  hidden: boolean;
};

export function intersects(a: LayoutRect, b: LayoutRect, gap = 16): boolean {
  return (
    a.x + gap < b.x + b.width &&
    a.x + a.width - gap > b.x &&
    a.y + gap < b.y + b.height &&
    a.y + a.height - gap > b.y
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
  return 0.88 + t * 0.12;
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

function resolveCellCollisions(layouts: CellLayout[], safeZone: LayoutRect) {
  const sorted = [...layouts].sort((a, b) => a.revealOrder - b.revealOrder);

  for (let pass = 0; pass < 12; pass += 1) {
    let changed = false;

    for (let i = 0; i < sorted.length; i += 1) {
      const current = sorted[i];
      if (current.hidden) continue;

      current.hitRect = scaledRect(current.cellRect, current.scale, current.origin);

      if (intersects(current.hitRect, safeZone)) {
        if (current.scale > 0.7) {
          current.scale = Math.max(0.7, current.scale - 0.05);
          changed = true;
        } else {
          current.hidden = true;
          changed = true;
        }
      }

      for (let j = 0; j < i; j += 1) {
        const other = sorted[j];
        if (other.hidden) continue;

        other.hitRect = scaledRect(other.cellRect, other.scale, other.origin);
        current.hitRect = scaledRect(current.cellRect, current.scale, current.origin);

        if (intersects(current.hitRect, other.hitRect)) {
          if (current.scale > 0.7) {
            current.scale = Math.max(0.7, current.scale - 0.04);
            changed = true;
          } else {
            current.hidden = true;
            changed = true;
          }
        }
      }
    }

    if (!changed) break;
  }
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

  const layouts: CellLayout[] = [];

  viewport.querySelectorAll<HTMLElement>("[data-masonry-reveal]").forEach((cell) => {
    const tile = cell.querySelector<HTMLElement>("[data-masonry-tile]");
    if (!tile) return;

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
    const revealOrder = Number(cell.getAttribute("data-reveal-order")) || 0;

    layouts.push({
      cell,
      tile,
      cellRect,
      hitRect: scaledRect(cellRect, scale, origin),
      revealOrder,
      scale,
      origin,
      hidden: false,
    });
  });

  resolveCellCollisions(layouts, safeZone);

  layouts.forEach(({ cell, tile, scale, origin, hitRect, revealOrder, hidden }) => {
    const blocked = hidden || intersects(hitRect, safeZone, 8);

    tile.style.transform = blocked ? "scale(1)" : `scale(${scale.toFixed(3)})`;
    tile.style.transformOrigin = origin;
    cell.style.zIndex = String(revealOrder);

    if (blocked) {
      cell.style.display = "none";
      cell.dataset.layoutVisible = "false";
    } else {
      cell.style.display = "";
      cell.dataset.layoutVisible = "true";
    }
  });
}
