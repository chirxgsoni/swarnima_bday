/** SVG path helpers */

/** Get a point on an SVG path at a given percentage (0-1) */
export function getPointOnPath(
  pathEl: SVGPathElement,
  progress: number
): { x: number; y: number; angle: number } {
  const totalLength = pathEl.getTotalLength();
  const point = pathEl.getPointAtLength(progress * totalLength);

  // Get angle from tangent
  const delta = 0.001;
  const p1 = pathEl.getPointAtLength(Math.max(0, progress - delta) * totalLength);
  const p2 = pathEl.getPointAtLength(Math.min(1, progress + delta) * totalLength);
  const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x) * (180 / Math.PI);

  return { x: point.x, y: point.y, angle };
}

/** The garland SVG path with one visible loop */
export const GARLAND_PATH =
  "M -50 330 C 150 380, 250 340, 380 300 C 470 270, 520 200, 480 140 C 440 80, 350 90, 370 160 C 390 230, 500 280, 600 260 C 720 230, 840 180, 950 130 C 1010 100, 1060 80, 1100 70";
