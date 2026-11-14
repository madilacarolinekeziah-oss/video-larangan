import React from "react";
import {Stage} from "../components/Stage";
import {BgTopic} from "../components/backgrounds/Backgrounds";
import {Presenter} from "../components/characters/Presenter";
import {Coin, Die, Envelope, Tag} from "../components/props/Props";
import {C, OUT, TOPIC} from "../lib/theme";
import {easeOutBack, pop, seg} from "../lib/anim";
import {useShot} from "../lib/useShot";
import type {ShotProps} from "./common";

const THEME = {name: "", c1: "#e6f4f1", c2: "#bfe0d8", accent: "#1d3557", dark: "#1d3557"} as const;

const CARDS = [
  {key: "riba", label: "RIBA", theme: TOPIC.riba, at: 0.58, y: 470},
  {key: "maysir", label: "MAYSIR", theme: TOPIC.maysir, at: 0.72, y: 870},
  {key: "risywah", label: "RISYWAH", theme: TOPIC.risywah, at: 0.86, y: 1270},
] as const;

/** ADEGAN 2 — presenter di samping tiga simbol larangan */
export const TripleShot: React.FC<ShotProps> = ({shot}) => {
  const {frame, p} = useShot(shot);
  const title = easeOutBack(seg(frame, 4, 24));
  return (
    <Stage>
      <BgTopic theme={THEME} frame={frame} id="tri" />
      <Tag x={540} y={190} w={820} h={110} fill={C.navy} text="3 PRAKTIK TERLARANG" size={60} s={title} />
      {CARDS.map((c, i) => {
        const ghost = pop(p, 0.05 + i * 0.05, 0.15 + i * 0.05);
        const k = pop(p, c.at, c.at + 0.07);
        return (
          <g key={c.key}>
            <g transform={`translate(810 ${c.y}) scale(${ghost})`} opacity={Math.max(0, 1 - k) * 0.7}>
              <rect x={-230} y={-165} width={460} height={330} rx={40} fill="#fff" fillOpacity={0.5} stroke={C.navy} strokeWidth={5} strokeDasharray="16 12" />
              <text y={30} textAnchor="middle" fontSize={120} fontWeight={800} fill={C.navy} opacity={0.5}>
                ?
              </text>
            </g>
            <g transform={`translate(810 ${c.y}) scale(${k})`} opacity={k > 0 ? 1 : 0}>
              <rect x={-230} y={-158} width={460} height={330} rx={40} fill="#000" opacity={0.14} />
              <rect x={-230} y={-165} width={460} height={330} rx={40} fill="#fff" stroke={OUT} strokeWidth={7} />
              <rect x={-230} y={-165} width={460} height={64} rx={32} fill={c.theme.accent} stroke={OUT} strokeWidth={7} />
              <g transform="translate(-135 10)">
                {c.key === "riba" && (
                  <>
                    <Coin x={0} y={0} s={2.2} />
                    <text x={44} y={-34} fontSize={70} fontWeight={800} fill={C.red} stroke={OUT} strokeWidth={2} paintOrder="stroke">
                      %
                    </text>
                  </>
                )}
                {c.key === "maysir" && (
                  <>
                    <Die x={-18} y={10} s={1.05} rot={-12} face={5} />
                    <Die x={44} y={-16} s={0.8} rot={14} face={2} />
                  </>
                )}
                {c.key === "risywah" && <Envelope x={0} y={14} s={1.2} peek={0.8} />}
              </g>
              <text x={30} y={46} fontSize={64} fontWeight={800} fill={c.theme.accent}>
                {c.label}
              </text>
            </g>
          </g>
        );
      })}
      <Presenter x={300} y={1485} scale={1.28} frame={frame} mood="talk" pose="present" talking />
    </Stage>
  );
};
