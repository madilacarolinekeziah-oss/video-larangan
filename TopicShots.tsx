import React from "react";
import {Stage} from "../components/Stage";
import {BgTopic} from "../components/backgrounds/Backgrounds";
import {Presenter} from "../components/characters/Presenter";
import {Coin, Die, Envelope, Shield, Tag} from "../components/props/Props";
import {C, OUT, TOPIC} from "../lib/theme";
import {easeOutBack, pop, seg} from "../lib/anim";
import {useShot} from "../lib/useShot";
import {ShotProps, chipWidth} from "./common";

const INFO = {
  riba: {n: "1", def: "Tambahan yang disyaratkan dalam pinjaman", chips: ["MUDHARABAH", "MUSYARAKAH"]},
  maysir: {n: "2", def: "Untung-untungan dan pertaruhan", chips: ["TRANSAKSI NYATA", "OBJEK JELAS"]},
  risywah: {n: "3", def: "Suap demi kemudahan yang tidak benar", chips: ["JUJUR", "TRANSPARAN", "SEHAT"]},
} as const;

/** Presenter memperkenalkan satu larangan (riba / maysir / risywah). */
export const TopicIntroShot: React.FC<ShotProps> = ({shot}) => {
  const {frame, p} = useShot(shot);
  const key = shot.topic ?? "riba";
  const theme = TOPIC[key];
  const info = INFO[key];
  const a = easeOutBack(seg(frame, 3, 22));
  const d = pop(p, 0.3, 0.4);
  const bob = Math.sin(frame / 16) * 14;
  return (
    <Stage>
      <BgTopic theme={theme} frame={frame} id={`ti-${key}`} />
      <g transform={`translate(190 250) scale(${a})`}>
        <circle r={84} fill={C.gold} stroke={OUT} strokeWidth={7} />
        <text y={34} textAnchor="middle" fontSize={100} fontWeight={800} fill={theme.dark}>
          {info.n}
        </text>
      </g>
      <Tag x={620} y={250} w={640} h={170} fill={theme.accent} text={theme.name} size={112} s={a} />
      <g transform={`translate(540 440) scale(${d})`} opacity={d > 0 ? 1 : 0}>
        <rect x={-450} y={-42} width={900} height={104} rx={34} fill="#000" opacity={0.13} />
        <rect x={-450} y={-50} width={900} height={104} rx={34} fill="#fff" stroke={OUT} strokeWidth={6} />
        <text y={14} textAnchor="middle" fontSize={44} fontWeight={800} fill={theme.dark}>
          {info.def}
        </text>
      </g>
      <g transform={`translate(0 ${bob})`}>
        {key === "riba" && <Coin x={880} y={860} s={2} />}
        {key === "maysir" && (
          <>
            <Die x={850} y={880} s={1.5} rot={-12} face={5} />
            <Die x={960} y={780} s={1.1} rot={16} face={3} />
          </>
        )}
        {key === "risywah" && <Envelope x={870} y={860} s={1.7} peek={0.8} rot={-8} />}
      </g>
      <Presenter x={540} y={1490} scale={1.5} frame={frame} mood="talk" pose="present" talking />
    </Stage>
  );
};

/** Presenter kembali menjelaskan solusi. */
export const TopicSolutionShot: React.FC<ShotProps> = ({shot}) => {
  const {frame, p} = useShot(shot);
  const key = shot.topic ?? "riba";
  const theme = TOPIC[key];
  const info = INFO[key];
  const a = easeOutBack(seg(frame, 3, 22));
  const bob = Math.sin(frame / 16) * 12;
  const n = info.chips.length;
  return (
    <Stage>
      <BgTopic theme={theme} frame={frame} id={`ts-${key}`} />
      <Tag x={540} y={230} w={720} h={150} fill={C.green} text="SOLUSINYA" size={92} s={a} />
      {info.chips.map((chip, i) => {
        const k = pop(p, 0.18 + i * 0.2, 0.28 + i * 0.2);
        return <Tag key={chip} x={500} y={410 + i * 112} w={chipWidth(chip, 46)} h={90} fill={theme.accent} text={chip} size={46} s={k} opacity={k > 0 ? 1 : 0} />;
      })}
      <g transform={`translate(0 ${bob})`}>
        <Shield x={900} y={410 + (n - 1) * 56 + 360} s={1.5 * pop(p, 0.1, 0.22)} />
      </g>
      <Presenter x={540} y={1490} scale={1.5} frame={frame} mood="happy" pose="present" talking />
    </Stage>
  );
};
