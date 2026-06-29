"use client";

import { useEffect, useRef, useCallback } from "react";
import { useLenis } from "lenis/react";

const RAINBOW_COLORS = [
  "#FDC831",
  "#F28F22",
  "#D90754",
  "#BF1071",
  "#64278C",
  "#303BEF",
] as const;

const SPLINE_STEPS = 280;
const FADE_IN_ARC = 0.04;
const IMAGE_Y_FRACS = [0.2, 0.5, 0.8] as const;
const GAP_X_FRACS = [0.2, 0.5, 0.8] as const;
const RESIZE_DEBOUNCE_MS = 120;
const PROGRESS_EPSILON = 0.002;
const MOBILE_BREAKPOINT = "(max-width: 901px)";
const MOBILE_NUMBER_GAP = 5;
const MOBILE_TOP_INSET = 24;

type RibbonMetrics = {
  ribbonWidth: number;
  lateralSpread: number;
  ribbonAlpha: number;
  exclusionPad: number;
};

function isMobileLayout(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia(MOBILE_BREAKPOINT).matches;
}

function getRibbonMetrics(isMobile: boolean): RibbonMetrics {
  return {
    ribbonWidth: 81,
    lateralSpread: isMobile ? 5.0 : 6.0,
    ribbonAlpha: isMobile ? 0.42 : 0.4,
    exclusionPad: isMobile ? 12 : 20,
  };
}

type Point = { x: number; y: number };
type Rect = { left: number; top: number; right: number; bottom: number };
type PathSegment = {
  points: Point[];
  arcLengths: number[];
  length: number;
};

type PathCache = {
  points: Point[];
  arcLengths: number[];
  totalLength: number;
  segments?: PathSegment[];
};

function smoothstep(t: number): number {
  return t * t * (3 - 2 * t);
}

function clamp01(value: number): number {
  return Math.max(0, Math.min(1, value));
}

function toLocalRect(el: Element, origin: DOMRect): Rect {
  const r = el.getBoundingClientRect();
  return {
    left: r.left - origin.left,
    top: r.top - origin.top,
    right: r.right - origin.left,
    bottom: r.bottom - origin.top,
  };
}

function expandRect(r: Rect, pad: number): Rect {
  return {
    left: r.left - pad,
    top: r.top - pad,
    right: r.right + pad,
    bottom: r.bottom + pad,
  };
}

function rectCenterX(r: Rect): number {
  return (r.left + r.right) / 2;
}

function pointInRect(p: Point, r: Rect): boolean {
  return p.x >= r.left && p.x <= r.right && p.y >= r.top && p.y <= r.bottom;
}

function clampOutOfExclusions(p: Point, exclusions: Rect[]): Point {
  let x = p.x;
  let y = p.y;

  for (const ex of exclusions) {
    if (!pointInRect({ x, y }, ex)) continue;

    const pushLeft = x - ex.left;
    const pushRight = ex.right - x;
    const pushUp = y - ex.top;
    const pushDown = ex.bottom - y;
    const min = Math.min(pushLeft, pushRight, pushUp, pushDown);

    if (min === pushLeft) x = ex.left - 8;
    else if (min === pushRight) x = ex.right + 8;
    else if (min === pushUp) y = ex.top - 8;
    else y = ex.bottom + 8;
  }

  return { x, y };
}

function catmullRom(p0: Point, p1: Point, p2: Point, p3: Point, t: number): Point {
  const t2 = t * t;
  const t3 = t2 * t;
  return {
    x:
      0.5 *
      (2 * p1.x +
        (-p0.x + p2.x) * t +
        (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 +
        (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3),
    y:
      0.5 *
      (2 * p1.y +
        (-p0.y + p2.y) * t +
        (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 +
        (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3),
  };
}

function sampleCatmullRom(controlPoints: Point[], totalSteps: number): Point[] {
  if (controlPoints.length < 2) return controlPoints;

  const pts = controlPoints;
  const ghostStart: Point = {
    x: pts[0].x + (pts[0].x - pts[1].x) * 0.35,
    y: pts[0].y + (pts[0].y - pts[1].y) * 0.35,
  };
  const ghostEnd: Point = {
    x: pts[pts.length - 1].x + (pts[pts.length - 1].x - pts[pts.length - 2].x) * 0.35,
    y: pts[pts.length - 1].y + (pts[pts.length - 1].y - pts[pts.length - 2].y) * 0.35,
  };
  const extended = [ghostStart, ...pts, ghostEnd];

  const result: Point[] = [];
  const segments = pts.length - 1;
  const stepsPerSegment = Math.max(8, Math.ceil(totalSteps / segments));

  for (let i = 0; i < segments; i++) {
    const p0 = extended[i];
    const p1 = extended[i + 1];
    const p2 = extended[i + 2];
    const p3 = extended[i + 3];
    const limit = i === segments - 1 ? stepsPerSegment : stepsPerSegment - 1;

    for (let j = 0; j <= limit; j++) {
      result.push(catmullRom(p0, p1, p2, p3, j / stepsPerSegment));
    }
  }

  return result;
}

function smoothPath(points: Point[]): Point[] {
  if (points.length < 3) return points;

  const out: Point[] = [points[0]];
  for (let i = 1; i < points.length - 1; i++) {
    out.push({
      x: (points[i - 1].x + points[i].x * 2 + points[i + 1].x) / 4,
      y: (points[i - 1].y + points[i].y * 2 + points[i + 1].y) / 4,
    });
  }
  out.push(points[points.length - 1]);
  return out;
}

function getTangent(points: Point[], index: number): { tx: number; ty: number } {
  const prev = points[Math.max(0, index - 1)];
  const next = points[Math.min(points.length - 1, index + 1)];
  const dx = next.x - prev.x;
  const dy = next.y - prev.y;
  const len = Math.hypot(dx, dy) || 1;
  return { tx: dx / len, ty: dy / len };
}

function computeArcLengths(points: Point[]): number[] {
  const lengths = [0];
  for (let i = 1; i < points.length; i++) {
    lengths.push(
      lengths[i - 1] +
        Math.hypot(points[i].x - points[i - 1].x, points[i].y - points[i - 1].y)
    );
  }
  return lengths;
}

function addGapPoints(
  controlPoints: Point[],
  fromCx: number,
  toCx: number,
  gapTop: number,
  gapBottom: number
) {
  const gapH = gapBottom - gapTop;
  if (gapH <= 12) return;

  for (const frac of GAP_X_FRACS) {
    controlPoints.push({
      x: fromCx + (toCx - fromCx) * frac,
      y: gapTop + gapH * frac,
    });
  }
}

function densifyLinear(points: Point[], steps: number): Point[] {
  if (points.length < 2) return points;

  const result: Point[] = [];
  const segments = points.length - 1;
  const stepsPerSegment = Math.max(1, Math.floor(steps / segments));

  for (let i = 0; i < segments; i++) {
    const a = points[i];
    const b = points[i + 1];
    const limit = i === segments - 1 ? stepsPerSegment : stepsPerSegment - 1;

    for (let j = 0; j <= limit; j++) {
      const t = j / stepsPerSegment;
      result.push({
        x: a.x + (b.x - a.x) * t,
        y: a.y + (b.y - a.y) * t,
      });
    }
  }

  return result;
}

function sampleMobileSegment(controlPoints: Point[], steps: number): Point[] {
  const clampedCount = controlPoints.length;

  if (clampedCount <= 2) {
    return densifyLinear(controlPoints, Math.max(2, steps));
  }

  return smoothPath(sampleCatmullRom(controlPoints, steps));
}

function buildMobilePathSegments(
  section: HTMLElement,
  containerRect: DOMRect,
  canvasHeight: number,
  exclusions: Rect[]
): PathSegment[] {
  const numbers = Array.from(
    section.querySelectorAll('[data-wave-anchor="number"]')
  );

  if (numbers.length === 0) return [];

  const numberRects = numbers.map((el) => toLocalRect(el, containerRect));
  const laneX = rectCenterX(numberRects[0]);
  const rawSegments: Point[][] = [];

  const firstStopY = numberRects[0].top - MOBILE_NUMBER_GAP;

  if (firstStopY > MOBILE_TOP_INSET + 4) {
    rawSegments.push([
      { x: laneX, y: MOBILE_TOP_INSET },
      { x: laneX, y: firstStopY },
    ]);
  }

  numberRects.forEach((nr, index) => {
    if (index >= numberRects.length - 1) return;

    const next = numberRects[index + 1];
    const segTop = nr.bottom + MOBILE_NUMBER_GAP;
    const segBottom = next.top - MOBILE_NUMBER_GAP;

    if (segBottom <= segTop) return;

    const segment: Point[] = [
      { x: laneX, y: segTop },
      { x: laneX, y: segBottom },
    ];

    if (segBottom - segTop > 80) {
      segment.splice(1, 0, { x: laneX, y: (segTop + segBottom) * 0.5 });
    }

    rawSegments.push(segment);
  });

  const lastNumber = numberRects[numberRects.length - 1];
  const closingCard = section.querySelector('[data-wave-anchor="closing-card"]');

  if (closingCard) {
    const card = toLocalRect(closingCard, containerRect);

    rawSegments.push([
      { x: laneX, y: lastNumber.bottom + MOBILE_NUMBER_GAP },
      {
        x: laneX,
        y: lastNumber.bottom + (card.top - lastNumber.bottom) * 0.45,
      },
      { x: laneX, y: card.top + 20 },
      { x: laneX, y: card.bottom - 16 },
    ]);
  } else {
    rawSegments.push([
      { x: laneX, y: lastNumber.bottom + MOBILE_NUMBER_GAP },
      { x: laneX, y: canvasHeight - 8 },
    ]);
  }

  const stepsPerSegment = Math.max(16, Math.floor(SPLINE_STEPS / rawSegments.length));

  return rawSegments
    .map((controlPoints) => {
      const clamped = controlPoints.map((p) =>
        clampOutOfExclusions(p, exclusions)
      );
      const points = sampleMobileSegment(clamped, stepsPerSegment);
      if (points.length < 2) return null;

      const arcLengths = computeArcLengths(points);
      return {
        points,
        arcLengths,
        length: arcLengths[arcLengths.length - 1],
      };
    })
    .filter((segment): segment is PathSegment => segment !== null);
}

function buildSpineControlPoints(
  section: HTMLElement,
  imageRects: Rect[],
  items: Element[],
  containerRect: DOMRect,
  canvasHeight: number,
  exclusions: Rect[]
): Point[] {
  const controlPoints: Point[] = [];
  const first = imageRects[0];
  const firstCx = rectCenterX(first);

  controlPoints.push({ x: firstCx, y: 0 });
  controlPoints.push({
    x: firstCx,
    y: Math.max(8, first.top * 0.35),
  });
  controlPoints.push({
    x: firstCx,
    y: first.top + (first.bottom - first.top) * 0.1,
  });

  imageRects.forEach((ir, index) => {
    const cx = rectCenterX(ir);
    const h = ir.bottom - ir.top;

    for (const yFrac of IMAGE_Y_FRACS) {
      controlPoints.push({ x: cx, y: ir.top + h * yFrac });
    }

    if (index < imageRects.length - 1) {
      const next = imageRects[index + 1];
      const nextCx = rectCenterX(next);

      let gapTop = ir.bottom;
      let gapBottom = next.top;

      if (items[index] && items[index + 1]) {
        gapTop = toLocalRect(items[index], containerRect).bottom;
        gapBottom = toLocalRect(items[index + 1], containerRect).top;
      }

      addGapPoints(controlPoints, cx, nextCx, gapTop, gapBottom);
    }
  });

  const last = imageRects[imageRects.length - 1];
  const lastCx = rectCenterX(last);
  const closingCard = section.querySelector('[data-wave-anchor="closing-card"]');

  if (closingCard) {
    const card = toLocalRect(closingCard, containerRect);
    const cardH = card.bottom - card.top;
    const endX = card.right - 24;

    controlPoints.push({
      x: lastCx,
      y: last.bottom + (card.top - last.bottom) * 0.35,
    });
    controlPoints.push({ x: endX, y: card.top + cardH * 0.55 });
    controlPoints.push({ x: endX, y: card.bottom - 8 });
  } else {
    controlPoints.push({ x: lastCx, y: canvasHeight - 8 });
  }

  return controlPoints.map((p) => clampOutOfExclusions(p, exclusions));
}

function buildRiverPath(
  section: HTMLElement,
  containerRect: DOMRect,
  canvasHeight: number,
  isMobile: boolean
): Point[] {
  const metrics = getRibbonMetrics(isMobile);
  const exclusions = Array.from(
    section.querySelectorAll(
      '[data-wave-zone="text"], [data-wave-zone="closing-text"]'
    )
  ).map((el) =>
    expandRect(toLocalRect(el, containerRect), metrics.exclusionPad)
  );

  const images = Array.from(
    section.querySelectorAll('[data-wave-zone="image"]')
  );
  const items = Array.from(section.querySelectorAll("[data-wave-item]"));

  if (isMobile) {
    return [];
  }

  if (images.length === 0) {
    return [];
  }

  const imageRects = images.map((el) => toLocalRect(el, containerRect));
  const controlPoints = buildSpineControlPoints(
    section,
    imageRects,
    items,
    containerRect,
    canvasHeight,
    exclusions
  );

  return smoothPath(sampleCatmullRom(controlPoints, SPLINE_STEPS));
}

function buildPathCache(
  section: HTMLElement,
  containerRect: DOMRect,
  canvasHeight: number,
  isMobile: boolean
): PathCache | null {
  const metrics = getRibbonMetrics(isMobile);
  const exclusions = Array.from(
    section.querySelectorAll(
      '[data-wave-zone="text"], [data-wave-zone="closing-text"]'
    )
  ).map((el) =>
    expandRect(toLocalRect(el, containerRect), metrics.exclusionPad)
  );

  if (isMobile) {
    const segments = buildMobilePathSegments(
      section,
      containerRect,
      canvasHeight,
      exclusions
    );
    if (segments.length === 0) return null;

    const totalLength = segments.reduce((sum, segment) => sum + segment.length, 0);
    return {
      points: segments[0].points,
      arcLengths: segments[0].arcLengths,
      totalLength,
      segments,
    };
  }

  const points = buildRiverPath(section, containerRect, canvasHeight, isMobile);
  if (points.length < 2) return null;

  const arcLengths = computeArcLengths(points);
  return {
    points,
    arcLengths,
    totalLength: arcLengths[arcLengths.length - 1],
  };
}

function trimPathByArcLength(
  points: Point[],
  arcLengths: number[],
  maxLen: number
): Point[] {
  if (maxLen <= 0 || points.length === 0) return [];
  const total = arcLengths[arcLengths.length - 1];
  if (maxLen >= total) return points;

  const result: Point[] = [points[0]];
  for (let i = 1; i < points.length; i++) {
    if (arcLengths[i] <= maxLen) {
      result.push(points[i]);
    } else {
      const prevLen = arcLengths[i - 1];
      const segLen = arcLengths[i] - prevLen;
      const t = segLen > 0 ? (maxLen - prevLen) / segLen : 0;
      result.push({
        x: points[i - 1].x + (points[i].x - points[i - 1].x) * t,
        y: points[i - 1].y + (points[i].y - points[i - 1].y) * t,
      });
      break;
    }
  }
  return result;
}

function trimSegmentsByArcLength(
  segments: PathSegment[],
  maxLen: number
): Point[][] {
  if (maxLen <= 0) return [];

  const visible: Point[][] = [];
  let remaining = maxLen;

  for (const segment of segments) {
    if (remaining <= 0) break;

    const trimmed = trimPathByArcLength(
      segment.points,
      segment.arcLengths,
      remaining
    );

    if (trimmed.length >= 2) {
      visible.push(trimmed);
    }

    remaining -= Math.min(remaining, segment.length);
  }

  return visible;
}

function appendOffsetPath(
  ctx: CanvasRenderingContext2D,
  points: Point[],
  offset: number
) {
  if (points.length < 2) return;

  const offsetPoints = points.map((p, i) => {
    const { tx, ty } = getTangent(points, i);
    const nx = -ty;
    const ny = tx;
    return { x: p.x + nx * offset, y: p.y + ny * offset };
  });

  ctx.moveTo(offsetPoints[0].x, offsetPoints[0].y);

  if (offsetPoints.length === 2) {
    ctx.lineTo(offsetPoints[1].x, offsetPoints[1].y);
    return;
  }

  for (let i = 1; i < offsetPoints.length - 1; i++) {
    const mx = (offsetPoints[i].x + offsetPoints[i + 1].x) / 2;
    const my = (offsetPoints[i].y + offsetPoints[i + 1].y) / 2;
    ctx.quadraticCurveTo(offsetPoints[i].x, offsetPoints[i].y, mx, my);
  }

  const last = offsetPoints[offsetPoints.length - 1];
  ctx.lineTo(last.x, last.y);
}

function traceSmoothPath(ctx: CanvasRenderingContext2D, points: Point[]) {
  if (points.length < 2) return;

  ctx.moveTo(points[0].x, points[0].y);

  if (points.length === 2) {
    ctx.lineTo(points[1].x, points[1].y);
    return;
  }

  for (let i = 1; i < points.length - 1; i++) {
    const mx = (points[i].x + points[i + 1].x) / 2;
    const my = (points[i].y + points[i + 1].y) / 2;
    ctx.quadraticCurveTo(points[i].x, points[i].y, mx, my);
  }

  const last = points[points.length - 1];
  ctx.lineTo(last.x, last.y);
}

function traceOffsetPath(
  ctx: CanvasRenderingContext2D,
  points: Point[],
  offset: number
) {
  if (points.length < 2) return;

  const offsetPoints = points.map((p, i) => {
    const { tx, ty } = getTangent(points, i);
    const nx = -ty;
    const ny = tx;
    return { x: p.x + nx * offset, y: p.y + ny * offset };
  });

  traceSmoothPath(ctx, offsetPoints);
}

function drawRibbon(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  cache: PathCache,
  progress: number,
  reduceMotion: boolean,
  metrics: RibbonMetrics
) {
  ctx.clearRect(0, 0, W, H);

  const effectiveProgress = reduceMotion ? 1 : progress;
  const visibleLength = cache.totalLength * effectiveProgress;
  const visibleSegments = cache.segments
    ? trimSegmentsByArcLength(cache.segments, visibleLength)
    : null;
  const visible = visibleSegments
    ? null
    : trimPathByArcLength(cache.points, cache.arcLengths, visibleLength);

  if (visibleSegments) {
    if (visibleSegments.length === 0) return;
  } else if (!visible || visible.length < 2) {
    return;
  }

  const fadeEnd = cache.totalLength * FADE_IN_ARC;
  const fadeMul = fadeEnd > 0 ? Math.min(1, visibleLength / fadeEnd) : 1;

  ctx.save();
  ctx.lineCap = visibleSegments ? "butt" : "round";
  ctx.lineJoin = "round";
  ctx.globalCompositeOperation = "lighter";

  const bandWidth = metrics.ribbonWidth / RAINBOW_COLORS.length;
  const halfBands = (RAINBOW_COLORS.length - 1) / 2;
  const alpha = metrics.ribbonAlpha * fadeMul;

  for (let idx = 0; idx < RAINBOW_COLORS.length; idx++) {
    const lateralOff = (idx - halfBands) * metrics.lateralSpread;

    ctx.beginPath();

    if (visibleSegments) {
      for (const segment of visibleSegments) {
        appendOffsetPath(ctx, segment, lateralOff);
      }
    } else {
      traceOffsetPath(ctx, visible!, lateralOff);
    }

    ctx.strokeStyle = RAINBOW_COLORS[idx];
    ctx.lineWidth = bandWidth + 3;
    ctx.globalAlpha = alpha;
    ctx.stroke();
  }

  ctx.restore();
}

function computeScrollProgress(
  section: HTMLElement,
  scrollY: number,
  vh: number
): number {
  const start = section.offsetTop - vh * 0.85;
  const end = section.offsetTop + section.offsetHeight - vh * 0.25;
  if (end <= start) return 0;
  return clamp01((scrollY - start) / (end - start));
}

export function RainbowWaveFortalezas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dprRef = useRef(1);
  const pathCacheRef = useRef<PathCache | null>(null);
  const progressRef = useRef(0);
  const lastDrawnProgressRef = useRef(-1);
  const reduceMotionRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const resizeTimerRef = useRef<number | null>(null);
  const scrollYRef = useRef(0);
  const isMobileRef = useRef(false);

  const rebuildPath = useCallback(() => {
    const section = containerRef.current?.closest("section");
    const wrap = containerRef.current;
    if (!section || !wrap) return;

    isMobileRef.current = isMobileLayout();
    const containerRect = wrap.getBoundingClientRect();
    pathCacheRef.current = buildPathCache(
      section,
      containerRect,
      wrap.offsetHeight,
      isMobileRef.current
    );
  }, []);

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    const wrap = containerRef.current;
    if (!canvas || !wrap) return;

    const dpr = window.devicePixelRatio || 1;
    dprRef.current = dpr;
    const W = wrap.offsetWidth;
    const H = wrap.offsetHeight;

    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = `${W}px`;
    canvas.style.height = `${H}px`;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    rebuildPath();
    lastDrawnProgressRef.current = -1;
  }, [rebuildPath]);

  const draw = useCallback((progress: number) => {
    const canvas = canvasRef.current;
    const cache = pathCacheRef.current;
    if (!canvas || !cache) return;

    if (
      Math.abs(progress - lastDrawnProgressRef.current) < PROGRESS_EPSILON &&
      lastDrawnProgressRef.current >= 0
    ) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    lastDrawnProgressRef.current = progress;
    progressRef.current = progress;
    const W = canvas.width / dprRef.current;
    const H = canvas.height / dprRef.current;
    drawRibbon(
      ctx,
      W,
      H,
      cache,
      progress,
      reduceMotionRef.current,
      getRibbonMetrics(isMobileRef.current)
    );
  }, []);

  const applyProgress = useCallback(() => {
    const section = containerRef.current?.closest("section");
    if (!section) return;

    if (reduceMotionRef.current) {
      draw(1);
      return;
    }

    const vh = window.innerHeight;
    const progress = smoothstep(
      computeScrollProgress(section, scrollYRef.current, vh)
    );
    draw(progress);
  }, [draw]);

  const scheduleProgressUpdate = useCallback(() => {
    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      applyProgress();
    });
  }, [applyProgress]);

  const scheduleResize = useCallback(() => {
    if (resizeTimerRef.current !== null) {
      window.clearTimeout(resizeTimerRef.current);
    }
    resizeTimerRef.current = window.setTimeout(() => {
      resizeTimerRef.current = null;
      resize();
      scheduleProgressUpdate();
    }, RESIZE_DEBOUNCE_MS);
  }, [resize, scheduleProgressUpdate]);

  useLenis((lenis) => {
    scrollYRef.current = lenis?.scroll ?? window.scrollY;
    scheduleProgressUpdate();
  });

  useEffect(() => {
    const section = containerRef.current?.closest("section");
    const wrap = containerRef.current;
    if (!section || !wrap) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileQuery = window.matchMedia(MOBILE_BREAKPOINT);
    reduceMotionRef.current = motionQuery.matches;
    isMobileRef.current = mobileQuery.matches;

    const onMotionChange = (e: MediaQueryListEvent) => {
      reduceMotionRef.current = e.matches;
      lastDrawnProgressRef.current = -1;
      scheduleProgressUpdate();
    };

    const onMobileChange = () => {
      isMobileRef.current = mobileQuery.matches;
      scheduleResize();
    };

    motionQuery.addEventListener("change", onMotionChange);
    mobileQuery.addEventListener("change", onMobileChange);

    scrollYRef.current = window.scrollY;
    resize();
    scheduleProgressUpdate();

    const onScroll = () => {
      scrollYRef.current = window.scrollY;
      scheduleProgressUpdate();
    };

    const onResize = () => {
      scheduleResize();
    };

    const observer = new ResizeObserver(() => {
      scheduleResize();
    });

    observer.observe(section);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      motionQuery.removeEventListener("change", onMotionChange);
      mobileQuery.removeEventListener("change", onMobileChange);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      observer.disconnect();
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      if (resizeTimerRef.current !== null) {
        window.clearTimeout(resizeTimerRef.current);
      }
    };
  }, [resize, scheduleProgressUpdate, scheduleResize]);

  return (
    <div
      ref={containerRef}
      data-wave-canvas-wrap=""
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
        }}
        aria-hidden="true"
      />
    </div>
  );
}
