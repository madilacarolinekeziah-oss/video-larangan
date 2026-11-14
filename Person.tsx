import React from "react";
import {C, OUT} from "../../lib/theme";

export type PersonMood = "neutral" | "happy" | "sad" | "worried" | "sly" | "surprised";

type Props = {
  /** posisi kaki (tengah-bawah) di kanvas */
  x: number;
  y: number;
  scale?: number;
  frame?: number;
  skin?: string;
  shirt?: string;
  pants?: string;
  hat?: "peci" | "hair" | "hijab" | "none";
  hairColor?: string;
  hijabColor?: string;
  glasses?: boolean;
  tie?: string | null;
  apron?: string | null;
  badge?: string | null;
  dress?: boolean;
  mood?: PersonMood;
  /** target tangan (koordinat LOKAL 200x300); gunakan toLocal() untuk koordinat kanvas */
  lh?: [number, number];
  rh?: [number, number];
  /** arah pandang -1..1 */
  look?: number;
  sweat?: boolean;
  children?: React.ReactNode;
};

/** konversi titik kanvas -> koordinat lokal Person */
export const toLocal = (
  w: [number, number],
  px: number,
  py: number,
  s: number,
): [number, number] => [(w[0] - px) / s + 100, (w[1] - py) / s + 300];

const armPath = (sx: number, sy: number, h: [number, number]) =>
  `M${sx} ${sy} Q${(sx + h[0]) / 2} ${(sy + h[1]) / 2 + 22} ${h[0]} ${h[1]}`;

/** Karakter pendukung chibi 2D (pengusaha, pemberi pinjaman, penjual, panitia, dll). */
export const Person: React.FC<Props> = ({
  x,
  y,
  scale = 1,
  frame = 0,
  skin = "#f3c9a0",
  shirt = "#e08a3c",
  pants = "#35435a",
  hat = "hair",
  hairColor = "#2b2118",
  hijabColor = "#9b4d63",
  glasses = false,
  tie = null,
  apron = null,
  badge = null,
  dress = false,
  mood = "neutral",
  lh = [44, 222],
  rh = [156, 222],
  look = 0,
  sweat = false,
  children,
}) => {
  const bob = Math.sin(frame / 12) * 1.8;
  const blink = frame % 100 < 4;
  const eyeY = 92;
  const ex = look * 4;
  const hijab = hat === "hijab";

  const brows =
    mood === "sad" || mood === "worried" ? (
      <>
        <path d="M68 80 L92 71" stroke={OUT} strokeWidth={3.5} strokeLinecap="round" />
        <path d="M108 71 L132 80" stroke={OUT} strokeWidth={3.5} strokeLinecap="round" />
      </>
    ) : mood === "sly" ? (
      <>
        <path d="M68 74 L92 80" stroke={OUT} strokeWidth={3.5} strokeLinecap="round" />
        <path d="M108 80 L132 72" stroke={OUT} strokeWidth={3.5} strokeLinecap="round" />
      </>
    ) : (
      <>
        <path d="M68 77 Q80 71 92 76" stroke={OUT} strokeWidth={3.5} fill="none" strokeLinecap="round" />
        <path d="M108 76 Q120 71 132 77" stroke={OUT} strokeWidth={3.5} fill="none" strokeLinecap="round" />
      </>
    );

  const eyes =
    mood === "sly" ? (
      <>
        <path d={`M${68 + ex} 92 Q${80 + ex} 98 ${92 + ex} 92`} stroke={OUT} strokeWidth={4.5} fill="none" strokeLinecap="round" />
        <path d={`M${108 + ex} 92 Q${120 + ex} 98 ${132 + ex} 92`} stroke={OUT} strokeWidth={4.5} fill="none" strokeLinecap="round" />
      </>
    ) : mood === "surprised" ? (
      <>
        <circle cx={80 + ex} cy={eyeY} r={8} fill="#fff" stroke={OUT} strokeWidth={3} />
        <circle cx={120 + ex} cy={eyeY} r={8} fill="#fff" stroke={OUT} strokeWidth={3} />
        <circle cx={80 + ex} cy={eyeY} r={3.5} fill={OUT} />
        <circle cx={120 + ex} cy={eyeY} r={3.5} fill={OUT} />
      </>
    ) : (
      <>
        <ellipse cx={80 + ex} cy={eyeY} rx={5.5} ry={blink ? 1 : 6.5} fill={OUT} />
        <ellipse cx={120 + ex} cy={eyeY} rx={5.5} ry={blink ? 1 : 6.5} fill={OUT} />
        {!blink && (
          <>
            <circle cx={78 + ex} cy={eyeY - 2.5} r={2} fill="#fff" />
            <circle cx={118 + ex} cy={eyeY - 2.5} r={2} fill="#fff" />
          </>
        )}
      </>
    );

  const mouth =
    mood === "happy" ? (
      <path d="M84 108 Q100 126 116 108" stroke={OUT} strokeWidth={4} fill="none" strokeLinecap="round" />
    ) : mood === "sad" ? (
      <path d="M88 121 Q100 108 112 121" stroke={OUT} strokeWidth={4} fill="none" strokeLinecap="round" />
    ) : mood === "worried" ? (
      <path d="M88 118 Q94 112 100 118 Q106 124 112 118" stroke={OUT} strokeWidth={4} fill="none" strokeLinecap="round" />
    ) : mood === "sly" ? (
      <path d="M86 114 Q104 124 118 106" stroke={OUT} strokeWidth={4} fill="none" strokeLinecap="round" />
    ) : mood === "surprised" ? (
      <ellipse cx={100} cy={116} rx={7} ry={9} fill="#b24a44" stroke={OUT} strokeWidth={3} />
    ) : (
      <path d="M90 114 L110 114" stroke={OUT} strokeWidth={4} strokeLinecap="round" />
    );

  return (
    <g transform={`translate(${x} ${y}) scale(${scale}) translate(-100 -300)`}>
      <ellipse cx={100} cy={298} rx={70} ry={8} fill="#5b3b20" opacity={0.16} />
      <g transform={`translate(0 ${bob})`}>
        {/* kaki / rok */}
        {dress ? (
          <path d="M60 140 Q100 128 140 140 L172 288 Q100 304 28 288 Z" fill={shirt} stroke={OUT} strokeWidth={4} strokeLinejoin="round" />
        ) : (
          <>
            <rect x={68} y={228} width={30} height={62} rx={9} fill={pants} stroke={OUT} strokeWidth={4} />
            <rect x={102} y={228} width={30} height={62} rx={9} fill={pants} stroke={OUT} strokeWidth={4} />
            <ellipse cx={80} cy={292} rx={22} ry={9} fill={C.shoe} stroke={OUT} strokeWidth={4} />
            <ellipse cx={120} cy={292} rx={22} ry={9} fill={C.shoe} stroke={OUT} strokeWidth={4} />
            <path d="M60 140 Q100 128 140 140 L146 240 Q100 250 54 240 Z" fill={shirt} stroke={OUT} strokeWidth={4} strokeLinejoin="round" />
          </>
        )}
        {dress && <ellipse cx={80} cy={294} rx={22} ry={8} fill={C.shoe} stroke={OUT} strokeWidth={4} />}
        {tie && (
          <>
            <path d="M82 138 L100 156 L118 138 L110 134 L100 146 L90 134 Z" fill="#fff" stroke={OUT} strokeWidth={3} strokeLinejoin="round" />
            <path d="M94 150 L106 150 L110 196 L100 206 L90 196 Z" fill={tie} stroke={OUT} strokeWidth={3} strokeLinejoin="round" />
          </>
        )}
        {apron && <path d="M72 158 L128 158 L134 242 Q100 250 66 242 Z" fill={apron} stroke={OUT} strokeWidth={3.5} strokeLinejoin="round" />}
        {badge && (
          <g>
            <rect x={112} y={166} width={26} height={16} rx={3} fill="#fff" stroke={OUT} strokeWidth={2.5} />
            <rect x={116} y={171} width={18} height={4} fill={badge} />
          </g>
        )}

        {/* lengan */}
        <path d={armPath(62, 150, lh)} stroke={OUT} strokeWidth={26} strokeLinecap="round" fill="none" />
        <path d={armPath(62, 150, lh)} stroke={shirt} strokeWidth={18} strokeLinecap="round" fill="none" />
        <path d={armPath(138, 150, rh)} stroke={OUT} strokeWidth={26} strokeLinecap="round" fill="none" />
        <path d={armPath(138, 150, rh)} stroke={shirt} strokeWidth={18} strokeLinecap="round" fill="none" />
        <circle cx={lh[0]} cy={lh[1]} r={12} fill={skin} stroke={OUT} strokeWidth={4} />
        <circle cx={rh[0]} cy={rh[1]} r={12} fill={skin} stroke={OUT} strokeWidth={4} />

        {/* kepala */}
        {hijab ? (
          <>
            <path d="M44 96 Q38 28 100 26 Q162 28 156 96 Q160 150 128 156 Q100 164 72 156 Q40 150 44 96 Z" fill={hijabColor} stroke={OUT} strokeWidth={4} strokeLinejoin="round" />
            <ellipse cx={100} cy={94} rx={42} ry={40} fill={skin} stroke={OUT} strokeWidth={4} />
          </>
        ) : (
          <>
            <circle cx={49} cy={94} r={9} fill={skin} stroke={OUT} strokeWidth={3.5} />
            <circle cx={151} cy={94} r={9} fill={skin} stroke={OUT} strokeWidth={3.5} />
            <ellipse cx={100} cy={88} rx={52} ry={48} fill={skin} stroke={OUT} strokeWidth={4} />
          </>
        )}
        {hat === "peci" && (
          <path d="M50 66 Q50 26 100 24 Q150 26 150 66 Q100 56 50 66 Z" fill="#2b2b2b" stroke={OUT} strokeWidth={4} strokeLinejoin="round" />
        )}
        {hat === "hair" && (
          <path d="M48 82 Q42 28 100 28 Q158 28 152 82 Q142 54 100 54 Q58 54 48 82 Z" fill={hairColor} stroke={OUT} strokeWidth={4} strokeLinejoin="round" />
        )}
        {mood === "happy" && (
          <>
            <ellipse cx={66} cy={108} rx={10} ry={6} fill="#f59b86" opacity={0.5} />
            <ellipse cx={134} cy={108} rx={10} ry={6} fill="#f59b86" opacity={0.5} />
          </>
        )}
        {brows}
        {eyes}
        {glasses && (
          <g fill="#ffffff" fillOpacity={0.25} stroke={OUT} strokeWidth={3}>
            <circle cx={80} cy={eyeY} r={15} />
            <circle cx={120} cy={eyeY} r={15} />
            <path d="M95 90 L105 90" fill="none" />
          </g>
        )}
        <ellipse cx={100} cy={103} rx={2.4} ry={2.8} fill="#c98b6a" />
        {mouth}
        {(sweat || mood === "worried") && (
          <path d="M152 52 C144 68 140 76 152 82 C164 76 160 68 152 52 Z" fill="#bfe6f7" stroke={OUT} strokeWidth={2.5} />
        )}
        {children}
      </g>
    </g>
  );
};
