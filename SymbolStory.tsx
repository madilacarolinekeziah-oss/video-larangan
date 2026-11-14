import React from "react";
import {Stage} from "../components/Stage";
import {BgFair, BgMeetingDark} from "../components/backgrounds/Backgrounds";
import {Person, toLocal} from "../components/characters/Person";
import {Coin, Die, Envelope, Tag} from "../components/props/Props";
import {C, OUT, TOPIC} from "../lib/theme";
import {easeInOut, easeOut, lerp2, pop, seg} from "../lib/anim";
import {useShot} from "../lib/useShot";
import {ShotProps, chipWidth} from "./common";

/** Ilustrasi simbol penjelas definisi (maysir: untung-untungan, risywah: jalan pintas). */
export const SymbolStory: React.FC<ShotProps> = ({shot}) => {
  const {frame, p} = useShot(shot);
  if (shot.topic === "risywah") return <GateScene frame={frame} p={p} />;
  return <LuckScene frame={frame} p={p} />;
};

const LuckScene: React.FC<{frame: number; p: number}> = ({frame, p}) => {
  const rolling = p < 0.6;
  const face = rolling ? (Math.floor(frame / 3) % 6) + 1 : 5;
  const face2 = rolling ? ((Math.floor(frame / 4) + 2) % 6) + 1 : 2;
  const rot = rolling ? frame * 11 : 0;
  const flip = Math.abs(Math.cos(frame / 4));
  const bounce = rolling ? Math.abs(Math.sin(frame / 6)) * 90 : 0;
  return (
    <Stage>
      <BgFair frame={frame} />
      <Tag x={540} y={390} w={chipWidth("UNTUNG-UNTUNGAN", 56)} h={110} fill={TOPIC.maysir.accent} text="UNTUNG-UNTUNGAN" size={56} s={pop(p, 0.1, 0.22)} opacity={p > 0.1 ? 1 : 0} />
      <Die x={400} y={880 - bounce} s={2.2} rot={rot} face={face} />
      <Die x={720} y={1010 - bounce * 0.7} s={1.6} rot={-rot * 0.8} face={face2} />
      <g transform={`translate(260 1240) scale(1 ${flip})`}>
        <Coin x={0} y={0} s={1.9} />
      </g>
      {[0, 1, 2].map((i) => {
        const k = pop(p, 0.62 + i * 0.07, 0.7 + i * 0.07);
        return (
          <g key={i} transform={`translate(${780 + i * 70} ${1250 - i * 30}) scale(${k})`} opacity={k > 0 ? 1 : 0}>
            <text textAnchor="middle" fontSize={120} fontWeight={800} fill="#ffd04d" stroke={OUT} strokeWidth={4} paintOrder="stroke">
              ?
            </text>
          </g>
        );
      })}
      <Tag x={540} y={1400} w={chipWidth("PERTARUHAN", 54)} h={100} fill={C.red} text="PERTARUHAN" size={54} s={pop(p, 0.55, 0.66)} opacity={p > 0.55 ? 1 : 0} />
    </Stage>
  );
};

const GateScene: React.FC<{frame: number; p: number}> = ({frame, p}) => {
  const lift = easeInOut(seg(p, 0.5, 0.7));
  const hand = lerp2([330, 1230], [470, 1130], easeOut(seg(p, 0.15, 0.4)));
  const env = lerp2([hand[0], hand[1]], [600, 1090], easeInOut(seg(p, 0.4, 0.55)));
  return (
    <Stage>
      <BgMeetingDark />
      <Tag x={540} y={700} w={chipWidth("JALAN PINTAS", 56)} h={110} fill={TOPIC.risywah.accent} text="JALAN PINTAS" size={56} s={pop(p, 0.1, 0.22)} opacity={p > 0.1 ? 1 : 0} />
      {/* palang pintu */}
      <rect x={760} y={1000} width={80} height={400} rx={10} fill="#e4574f" stroke={OUT} strokeWidth={6} />
      <g transform={`translate(800 1060) rotate(${-lift * 70})`}>
        <rect x={-560} y={-24} width={600} height={48} rx={12} fill="#fff4e0" stroke={OUT} strokeWidth={6} />
        {[-500, -380, -260, -140, -20].map((sx) => (
          <rect key={sx} x={sx} y={-24} width={50} height={48} fill="#e4574f" opacity={0.85} />
        ))}
      </g>
      <Tag x={880} y={1480} w={chipWidth("KEMUDAHAN", 38)} h={70} fill={C.navy} text="KEMUDAHAN" size={38} />
      <Person x={230} y={1400} scale={2} frame={frame} shirt="#8a5a2a" pants="#3b2a1a" tie="#ffd04d" skin="#e8b88a" mood={p < 0.2 ? "neutral" : "sly"} look={1} sweat={p > 0.3} rh={toLocal(hand, 230, 1400, 2)} />
      <Envelope x={env[0]} y={env[1]} s={0.75} peek={0.7} rot={-8} />
      <Tag x={540} y={900} w={chipWidth("TIDAK BENAR", 56)} h={110} fill={C.red} text="TIDAK BENAR" size={56} s={pop(p, 0.72, 0.84)} opacity={p > 0.72 ? 1 : 0} />
    </Stage>
  );
};
