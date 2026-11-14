import React from "react";
import {Stage} from "../components/Stage";
import {BgGlow} from "../components/backgrounds/Backgrounds";
import {Presenter} from "../components/characters/Presenter";
import {Check, CrescentStar, Scale, Shield, Tag} from "../components/props/Props";
import {C, OUT} from "../lib/theme";
import {easeOutBack, pop, seg} from "../lib/anim";
import {useShot} from "../lib/useShot";
import type {ShotProps} from "./common";

const MEDALS = [
  {label: "KEADILAN", x: 190, at: 0.58},
  {label: "KEJUJURAN", x: 540, at: 0.72},
  {label: "KEBERKAHAN", x: 890, at: 0.86},
] as const;

/** ADEGAN 6a — kesimpulan: keadilan, kejujuran, keberkahan */
export const ConclusionShot: React.FC<ShotProps> = ({shot}) => {
  const {frame, p} = useShot(shot);
  const title = easeOutBack(seg(frame, 4, 24));
  const titleFade = 1 - seg(p, 0.5, 0.58);
  return (
    <Stage>
      <BgGlow frame={frame} />
      <Tag x={540} y={330} w={760} h={130} fill={C.navy} text="KESIMPULAN" size={84} s={title} opacity={titleFade} />
      {MEDALS.map((m, i) => {
        const k = pop(p, m.at, m.at + 0.07);
        const glow = 1 + 0.04 * Math.sin(frame / 6 + i);
        return (
          <g key={m.label} transform={`translate(${m.x} 330) scale(${k * glow})`} opacity={k > 0 ? 1 : 0}>
            <circle r={126} fill="#fff6d0" opacity={0.7} />
            <circle r={110} fill="#fff" stroke={OUT} strokeWidth={7} />
            <circle r={94} fill="none" stroke={C.gold} strokeWidth={8} />
            {i === 0 && <Scale x={0} y={4} s={0.85} tilt={Math.sin(frame / 16) * 3} />}
            {i === 1 && <Shield x={0} y={0} s={1.15} />}
            {i === 2 && <CrescentStar x={-6} y={0} s={1.1} />}
            <text y={190} textAnchor="middle" fontSize={44} fontWeight={800} fill={C.navy} stroke="#fff" strokeWidth={8} paintOrder="stroke">
              {m.label}
            </text>
          </g>
        );
      })}
      <Presenter x={540} y={1490} scale={1.45} frame={frame} mood="happy" pose="open" talking />
    </Stage>
  );
};

/** ADEGAN 6b — penutup */
export const ClosingShot: React.FC<ShotProps> = ({shot}) => {
  const {frame, p} = useShot(shot);
  const t = easeOutBack(seg(frame, 4, 24));
  const items = [
    {text: "Cara yang halal", at: 0.28},
    {text: "Tidak merugikan orang lain", at: 0.5},
  ];
  return (
    <Stage>
      <BgGlow frame={frame} />
      <Tag x={540} y={200} w={860} h={120} fill={C.navy} text="BISNIS YANG BERKAH" size={70} s={t} />
      {items.map((it, i) => {
        const k = pop(p, it.at, it.at + 0.08);
        return (
          <g key={it.text} transform={`translate(540 ${400 + i * 130}) scale(${k})`} opacity={k > 0 ? 1 : 0}>
            <rect x={-420} y={-44} width={840} height={110} rx={40} fill="#000" opacity={0.13} />
            <rect x={-420} y={-52} width={840} height={110} rx={40} fill="#fff" stroke={OUT} strokeWidth={6} />
            <Check x={-350} y={3} s={1.5} />
            <text x={-290} y={20} fontSize={50} fontWeight={800} fill={C.navy}>
              {it.text}
            </text>
          </g>
        );
      })}
      <CrescentStar x={900} y={800} s={1.3 * pop(p, 0.6, 0.72)} rot={-10} />
      <Presenter x={540} y={1490} scale={1.45} frame={frame} mood="happy" pose={p > 0.82 ? "wave" : "clasp"} talking />
    </Stage>
  );
};
