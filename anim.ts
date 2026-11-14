export const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const lerp2 = (a: [number, number], b: [number, number], t: number): [number, number] => [
  lerp(a[0], b[0], t),
  lerp(a[1], b[1], t),
];
/** Progres 0..1 di dalam rentang [a,b]. */
export const seg = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));
export const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
export const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
export const easeOutBack = (t: number) => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};
/** Muncul dengan sedikit membal: 0 -> 1 di rentang [a,b]. */
export const pop = (p: number, a: number, b: number) => easeOutBack(seg(p, a, b));
