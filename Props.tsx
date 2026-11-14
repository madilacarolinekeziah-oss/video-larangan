import React from "react";
import {C, FONT, OUT} from "../../lib/theme";

type G = {x: number; y: number; s?: number; rot?: number; opacity?: number};
const T = (x: number, y: number, s = 1, rot = 0) => `translate(${x} ${y}) rotate(${rot}) scale(${s})`;

export const Banknote: React.FC<G & {fill?: string}> = ({x, y, s = 1, rot = 0, opacity = 1, fill = "#86d79a"}) => (
  <g transform={T(x, y, s, rot)} opacity={opacity}>
    <rect x={-110} y={-52} width={220} height={104} rx={14} fill={fill} stroke={OUT} strokeWidth={5} />
    <rect x={-96} y={-40} width={192} height={80} rx={9} fill="none" stroke="#3c8f55" strokeWidth={3} strokeDasharray="10 6" />
    <circle cx={0} cy={0} r={28} fill="#bff0c9" stroke="#3c8f55" strokeWidth={3} />
    <text x={0} y={9} textAnchor="middle" fontSize={26} fontWeight={800} fill="#256b3c">
      Rp
    </text>
  </g>
);

export const MoneyStack: React.FC<G> = ({x, y, s = 1, rot = 0, opacity = 1}) => (
  <g transform={T(x, y, s, rot)} opacity={opacity}>
    <Banknote x={-6} y={14} rot={-4} fill="#6cc785" />
    <Banknote x={4} y={4} rot={2} fill="#78d092" />
    <Banknote x={0} y={-8} rot={-1} />
    <rect x={-22} y={-62} width={44} height={124} rx={6} fill="#f3d37a" stroke={OUT} strokeWidth={4} />
  </g>
);

export const Coin: React.FC<G & {r?: number}> = ({x, y, s = 1, rot = 0, opacity = 1, r = 30}) => (
  <g transform={T(x, y, s, rot)} opacity={opacity}>
    <circle r={r} fill={C.gold} stroke={OUT} strokeWidth={5} />
    <circle r={r * 0.72} fill="none" stroke="#e0a416" strokeWidth={3} />
    <text y={r * 0.3} textAnchor="middle" fontSize={r * 0.85} fontWeight={800} fill="#b97a05">
      Rp
    </text>
  </g>
);

export const Envelope: React.FC<G & {peek?: number}> = ({x, y, s = 1, rot = 0, opacity = 1, peek = 0.6}) => (
  <g transform={T(x, y, s, rot)} opacity={opacity}>
    <rect x={-52} y={-46 - 36 * peek} width={104} height={80} rx={6} fill="#86d79a" stroke={OUT} strokeWidth={4} />
    <circle cx={0} cy={-46 - 36 * peek + 40} r={16} fill="#bff0c9" stroke="#3c8f55" strokeWidth={3} />
    <rect x={-70} y={-46} width={140} height={92} rx={10} fill="#fbeccb" stroke={OUT} strokeWidth={5} />
    <path d="M-70 -46 L0 10 L70 -46" fill="none" stroke={OUT} strokeWidth={5} strokeLinejoin="round" />
    <circle cx={0} cy={10} r={9} fill={C.red} stroke={OUT} strokeWidth={3} />
  </g>
);

const PIPS: Record<number, [number, number][]> = {
  1: [[0, 0]],
  2: [[-1, -1], [1, 1]],
  3: [[-1, -1], [0, 0], [1, 1]],
  4: [[-1, -1], [1, -1], [-1, 1], [1, 1]],
  5: [[-1, -1], [1, -1], [0, 0], [-1, 1], [1, 1]],
  6: [[-1, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [1, 1]],
};
export const Die: React.FC<G & {face?: number}> = ({x, y, s = 1, rot = 0, opacity = 1, face = 5}) => (
  <g transform={T(x, y, s, rot)} opacity={opacity}>
    <rect x={-50} y={-50} width={100} height={100} rx={18} fill="#fff" stroke={OUT} strokeWidth={5} />
    {(PIPS[face] ?? PIPS[1]).map(([px, py], i) => (
      <circle key={i} cx={px * 26} cy={py * 26} r={9} fill={face === 1 ? C.red : OUT} />
    ))}
  </g>
);

export const Scale: React.FC<G & {tilt?: number}> = ({x, y, s = 1, rot = 0, opacity = 1, tilt = 0}) => (
  <g transform={T(x, y, s, rot)} opacity={opacity}>
    <path d="M-46 86 L46 86 L30 70 L-30 70 Z" fill="#c9962a" stroke={OUT} strokeWidth={5} strokeLinejoin="round" />
    <rect x={-8} y={-60} width={16} height={134} fill="#e0ad3a" stroke={OUT} strokeWidth={4} />
    <g transform={`rotate(${tilt} 0 -60)`}>
      <rect x={-100} y={-68} width={200} height={14} rx={7} fill="#e0ad3a" stroke={OUT} strokeWidth={4} />
      {[-90, 90].map((px) => (
        <g key={px}>
          <path d={`M${px} -56 L${px - 34} 14 M${px} -56 L${px + 34} 14`} stroke={OUT} strokeWidth={3} />
          <path d={`M${px - 42} 14 L${px + 42} 14 Q${px + 36} 44 ${px} 44 Q${px - 36} 44 ${px - 42} 14 Z`} fill="#f4c75a" stroke={OUT} strokeWidth={4} strokeLinejoin="round" />
        </g>
      ))}
    </g>
    <circle cx={0} cy={-64} r={12} fill="#ffd04d" stroke={OUT} strokeWidth={4} />
  </g>
);

export const Shield: React.FC<G & {fill?: string}> = ({x, y, s = 1, rot = 0, opacity = 1, fill = C.green}) => (
  <g transform={T(x, y, s, rot)} opacity={opacity}>
    <path d="M0 -64 L54 -40 L54 8 Q54 48 0 70 Q-54 48 -54 8 L-54 -40 Z" fill={fill} stroke={OUT} strokeWidth={5} strokeLinejoin="round" />
    <path d="M-24 4 L-6 24 L28 -16" stroke="#fff" strokeWidth={12} fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </g>
);

/** Bintang segi-lima */
const starPoints = (r: number, ir: number) =>
  Array.from({length: 10}, (_, i) => {
    const a = (Math.PI / 5) * i - Math.PI / 2;
    const rr = i % 2 === 0 ? r : ir;
    return `${(Math.cos(a) * rr).toFixed(1)},${(Math.sin(a) * rr).toFixed(1)}`;
  }).join(" ");

export const CrescentStar: React.FC<G> = ({x, y, s = 1, rot = 0, opacity = 1}) => (
  <g transform={T(x, y, s, rot)} opacity={opacity}>
    <path d="M39 -45.6 A60 60 0 1 0 39 45.6 A48 48 0 1 1 39 -45.6 Z" fill={C.gold} stroke={OUT} strokeWidth={5} strokeLinejoin="round" />
    <g transform="translate(34 -2)">
      <polygon points={starPoints(26, 11)} fill={C.gold} stroke={OUT} strokeWidth={4} strokeLinejoin="round" />
    </g>
  </g>
);

export const Magnifier: React.FC<G> = ({x, y, s = 1, rot = 0, opacity = 1}) => (
  <g transform={T(x, y, s, rot)} opacity={opacity}>
    <path d="M28 28 L70 70" stroke={OUT} strokeWidth={22} strokeLinecap="round" />
    <path d="M28 28 L70 70" stroke="#b9774a" strokeWidth={12} strokeLinecap="round" />
    <circle r={44} fill="#dff4ff" fillOpacity={0.8} stroke={OUT} strokeWidth={8} />
    <path d="M-22 -10 Q-10 -28 10 -26" stroke="#fff" strokeWidth={6} fill="none" strokeLinecap="round" />
  </g>
);

export const Box: React.FC<G & {color?: string}> = ({x, y, s = 1, rot = 0, opacity = 1, color = "#e8b36a"}) => (
  <g transform={T(x, y, s, rot)} opacity={opacity}>
    <rect x={-50} y={-30} width={100} height={80} rx={6} fill={color} stroke={OUT} strokeWidth={5} />
    <path d="M-50 -30 L-30 -56 L70 -56 L50 -30 Z" fill="#f4cd8c" stroke={OUT} strokeWidth={5} strokeLinejoin="round" />
    <rect x={-12} y={-30} width={24} height={80} fill="#e4574f" stroke={OUT} strokeWidth={3} />
  </g>
);

export const Check: React.FC<G & {color?: string}> = ({x, y, s = 1, opacity = 1, color = C.green}) => (
  <g transform={T(x, y, s)} opacity={opacity}>
    <circle r={22} fill={color} stroke={OUT} strokeWidth={4} />
    <path d="M-10 1 L-2 10 L12 -8" stroke="#fff" strokeWidth={6} fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </g>
);

export const Cross: React.FC<G> = ({x, y, s = 1, opacity = 1}) => (
  <g transform={T(x, y, s)} opacity={opacity}>
    <circle r={22} fill={C.red} stroke={OUT} strokeWidth={4} />
    <path d="M-9 -9 L9 9 M9 -9 L-9 9" stroke="#fff" strokeWidth={6} strokeLinecap="round" />
  </g>
);

/** Papan angka / label dengan pop-in */
export const Tag: React.FC<{
  x: number;
  y: number;
  w: number;
  h?: number;
  fill: string;
  text: string;
  size?: number;
  color?: string;
  s?: number;
  opacity?: number;
  stroke?: string;
}> = ({x, y, w, h = 84, fill, text, size = 44, color = "#fff", s = 1, opacity = 1, stroke = OUT}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={opacity}>
    <rect x={-w / 2} y={-h / 2 + 6} width={w} height={h} rx={h / 2} fill="#000" opacity={0.15} />
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={h / 2} fill={fill} stroke={stroke} strokeWidth={5} />
    <text x={0} y={size * 0.34} textAnchor="middle" fontSize={size} fontWeight={800} fill={color} fontFamily={FONT}>
      {text}
    </text>
  </g>
);

export const BarChart: React.FC<G & {bars: number[]; grow: number; color?: string}> = ({x, y, s = 1, opacity = 1, bars, grow, color = "#3fa7d6"}) => (
  <g transform={T(x, y, s)} opacity={opacity}>
    <path d="M-90 0 L90 0 M-90 0 L-90 -120" stroke={OUT} strokeWidth={5} strokeLinecap="round" />
    {bars.map((b, i) => (
      <rect key={i} x={-72 + i * 44} y={-b * grow * 110} width={32} height={b * grow * 110} rx={5} fill={color} stroke={OUT} strokeWidth={4} />
    ))}
  </g>
);

export const Pie: React.FC<G & {frac: number; r?: number; c1?: string; c2?: string}> = ({x, y, s = 1, opacity = 1, frac, r = 100, c1 = "#ffb84d", c2 = "#3fa7d6"}) => {
  const a = frac * Math.PI * 2 - Math.PI / 2;
  const x2 = Math.cos(a) * r;
  const y2 = Math.sin(a) * r;
  const large = frac > 0.5 ? 1 : 0;
  return (
    <g transform={T(x, y, s)} opacity={opacity}>
      <circle r={r} fill={c2} stroke={OUT} strokeWidth={6} />
      <path d={`M0 0 L0 ${-r} A${r} ${r} 0 ${large} 1 ${x2.toFixed(1)} ${y2.toFixed(1)} Z`} fill={c1} stroke={OUT} strokeWidth={6} strokeLinejoin="round" />
    </g>
  );
};
