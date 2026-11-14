import React from "react";
import {Stage} from "../components/Stage";
import {BgMarket} from "../components/backgrounds/Backgrounds";
import {Presenter} from "../components/characters/Presenter";
import {Person, toLocal} from "../components/characters/Person";
import {Coin} from "../components/props/Props";
import {C, OUT} from "../lib/theme";
import {easeOut, easeOutBack, lerp2, seg} from "../lib/anim";
import {useShot} from "../lib/useShot";
import type {ShotProps} from "./common";

/** ADEGAN 1a — presenter menyapa di pusat perdagangan */
export const GreetingShot: React.FC<ShotProps> = ({shot}) => {
  const {frame, p} = useShot(shot);
  const t = easeOutBack(seg(frame, 4, 26));
  return (
    <Stage>
      <BgMarket frame={frame} />
      <g transform={`translate(540 270) scale(${t})`}>
        <rect x={-440} y={-104} width={880} height={228} rx={46} fill="#000" opacity={0.14} />
        <rect x={-440} y={-120} width={880} height={228} rx={46} fill={C.cream} stroke={OUT} strokeWidth={7} />
        <text x={0} y={-8} textAnchor="middle" fontSize={118} fontWeight={800} fill="#1f8a8a" stroke={OUT} strokeWidth={2} paintOrder="stroke">
          3 LARANGAN
        </text>
        <text x={0} y={62} textAnchor="middle" fontSize={58} fontWeight={800} fill={C.navy}>
          dalam Bisnis Islam
        </text>
      </g>
      {[
        [170, 840, 0],
        [920, 780, 1.6],
        [900, 1150, 3.1],
      ].map(([cx, cy, ph], i) => (
        <Coin key={i} x={cx} y={cy + Math.sin(frame / 14 + ph) * 14} s={1.2} rot={Math.sin(frame / 20 + ph) * 12} />
      ))}
      <Presenter x={540} y={1480} scale={1.5} frame={frame} mood="happy" pose={p < 0.4 ? "wave" : "present"} talking />
    </Stage>
  );
};

/** ADEGAN 1b — ilustrasi aktivitas jual beli */
export const MarketShot: React.FC<ShotProps> = ({shot}) => {
  const {frame, p} = useShot(shot);
  const enter = easeOut(seg(frame, 0, 16));
  const cyc = (frame % 70) / 70;
  const coinPos = lerp2([440, 1130], [300, 1215], easeOut(seg(cyc, 0.05, 0.8)));
  const q = easeOutBack(seg(p, 0.3, 0.45));
  return (
    <Stage>
      <BgMarket frame={frame} />
      {/* penjual + pembeli */}
      <g transform={`translate(${(1 - enter) * -80} 0)`}>
        <Person x={210} y={1400} scale={1.6} frame={frame} shirt="#e08a3c" apron="#fff4e0" hat="peci" mood="happy" />
        <rect x={60} y={1236} width={330} height={164} rx={10} fill="#c9935c" stroke={OUT} strokeWidth={6} />
        <rect x={50} y={1218} width={350} height={30} rx={8} fill="#e0aa6e" stroke={OUT} strokeWidth={5} />
        {[110, 170, 230, 290, 350].map((fx, i) => (
          <circle key={fx} cx={fx} cy={1200} r={22} fill={i % 2 ? "#ff9a3c" : "#e4574f"} stroke={OUT} strokeWidth={4} />
        ))}
      </g>
      <g transform={`translate(${(1 - enter) * 80} 0)`}>
        <Person
          x={540}
          y={1400}
          scale={1.6}
          frame={frame}
          hat="hijab"
          hijabColor="#9b4d63"
          shirt="#d86f8c"
          dress
          mood="happy"
          lh={toLocal(coinPos, 540, 1400, 1.6)}
        />
        <Coin x={coinPos[0]} y={coinPos[1]} s={0.75} />
      </g>
      {/* pertanyaan */}
      <g transform={`translate(540 360) scale(${q})`}>
        <rect x={-420} y={-96} width={840} height={196} rx={44} fill="#000" opacity={0.14} transform="translate(0 8)" />
        <rect x={-420} y={-100} width={840} height={196} rx={44} fill={C.cream} stroke={OUT} strokeWidth={7} />
        <text x={0} y={-12} textAnchor="middle" fontSize={62} fontWeight={800} fill={C.navy}>
          Bagaimana cara
        </text>
        <text x={0} y={62} textAnchor="middle" fontSize={62} fontWeight={800} fill="#d2691e">
          mendapatkan untung?
        </text>
      </g>
      <Presenter x={905} y={1470} scale={1.05} frame={frame} mood="talk" pose="present" talking flip />
    </Stage>
  );
};
