import React from "react";
import {Stage} from "../components/Stage";
import {BgOffice, BgShop, Stripes} from "../components/backgrounds/Backgrounds";
import {Person, PersonMood, toLocal} from "../components/characters/Person";
import {Coin, Check, MoneyStack, Pie, Tag} from "../components/props/Props";
import {C, OUT, TOPIC} from "../lib/theme";
import {easeInOut, easeOut, lerp2, pop, seg} from "../lib/anim";
import {useShot} from "../lib/useShot";
import {ShotProps, chipWidth} from "./common";

/** ADEGAN 3 — pengusaha meminjam Rp10 juta, harus kembali Rp12 juta */
export const RibaStory: React.FC<ShotProps> = ({shot}) => {
  const {frame, p} = useShot(shot);
  const enter = easeOut(seg(p, 0, 0.1));
  const LX = 830;
  const BX = 250;
  const FY = 1400;
  const S = 2;
  const e = easeInOut(seg(p, 0.14, 0.46));
  const bundle = lerp2([700, 1090], [390, 1090], e);
  const lenderHand = lerp2(bundle, [760, 1190], seg(e, 0.5, 1));
  const borrowerHand: [number, number] = e < 0.5 ? lerp2([330, 1190], [545, 1090], e * 2) : bundle;
  const bMood: PersonMood = p < 0.18 ? "neutral" : p < 0.55 ? "happy" : p < 0.78 ? "sad" : "worried";
  const lMood: PersonMood = p < 0.5 ? "happy" : "sly";
  const pulse = 1 + 0.05 * Math.sin(frame / 4);

  return (
    <Stage>
      <BgOffice />
      <Tag x={540} y={150} w={chipWidth("RIBA", 64)} h={96} fill={TOPIC.riba.accent} text="RIBA" size={64} />
      <Tag x={540} y={300} w={820} h={90} fill={C.green} text="PINJAMAN  Rp10.000.000" size={50} s={pop(p, 0.06, 0.14)} opacity={p > 0.06 ? 1 : 0} />
      {/* meja kecil */}
      <rect x={455} y={1290} width={170} height={110} rx={10} fill="#b9814f" stroke={OUT} strokeWidth={6} />
      <rect x={440} y={1272} width={200} height={30} rx={8} fill="#d9a066" stroke={OUT} strokeWidth={5} />
      <g transform={`translate(${(1 - enter) * 120} 0)`}>
        <Person
          x={LX}
          y={FY}
          scale={S}
          frame={frame}
          shirt="#3b4a63"
          pants="#2b3447"
          tie="#c0392b"
          glasses
          skin="#e8b88a"
          mood={lMood}
          lh={toLocal(lenderHand, LX, FY, S)}
        />
      </g>
      <g transform={`translate(${(1 - enter) * -120} 0)`}>
        <Person
          x={BX}
          y={FY}
          scale={S}
          frame={frame}
          shirt="#e08a3c"
          hat="peci"
          mood={bMood}
          rh={toLocal(borrowerHand, BX, FY, S)}
        />
      </g>
      <g opacity={pop(p, 0.08, 0.14) > 0 ? 1 : 0}>
        <MoneyStack x={bundle[0]} y={bundle[1]} s={0.8 * pop(p, 0.08, 0.16)} />
      </g>
      {/* kewajiban pengembalian */}
      {(() => {
        const k = pop(p, 0.52, 0.62);
        return (
          <g transform={`translate(540 520) scale(${k})`} opacity={k > 0 ? 1 : 0}>
            <rect x={-300} y={-100} width={600} height={220} rx={30} fill="#000" opacity={0.13} />
            <rect x={-300} y={-110} width={600} height={220} rx={30} fill="#fff" stroke={OUT} strokeWidth={7} />
            <text y={-40} textAnchor="middle" fontSize={44} fontWeight={800} fill={C.navy}>
              HARUS KEMBALI
            </text>
            <text y={52} textAnchor="middle" fontSize={84} fontWeight={800} fill="#d2691e">
              Rp12.000.000
            </text>
          </g>
        );
      })()}
      {(() => {
        const k = pop(p, 0.74, 0.84);
        return (
          <g transform={`translate(540 760) rotate(-3) scale(${k * pulse})`} opacity={k > 0 ? 1 : 0}>
            <rect x={-410} y={-62} width={820} height={140} rx={40} fill="#000" opacity={0.15} />
            <rect x={-410} y={-70} width={820} height={140} rx={40} fill={C.red} stroke={OUT} strokeWidth={7} />
            <text y={20} textAnchor="middle" fontSize={58} fontWeight={800} fill="#fff">
              + Rp2.000.000 = BUNGA
            </text>
          </g>
        );
      })()}
    </Stage>
  );
};

/** ADEGAN 3 (solusi) — kerja sama mudharabah / musyarakah, bagi hasil */
export const PartnerStory: React.FC<ShotProps> = ({shot}) => {
  const {frame, p} = useShot(shot);
  const enter = easeOut(seg(p, 0, 0.15));
  const MX = 250;
  const WX = 830;
  const FY = 1400;
  const S = 2;
  const shake = easeInOut(seg(p, 0.2, 0.4));
  const wob = Math.sin(frame / 3) * 8 * shake * (p > 0.4 ? 1 : 0.4);
  const mHand = lerp2([330, 1200], [525, 1120 + wob], shake);
  const wHand = lerp2([750, 1200], [555, 1120 + wob], shake);
  const mood = p < 0.2 ? "neutral" : "happy";
  const pieK = pop(p, 0.55, 0.65);
  const targets: [number, number][] = [
    [250, 880],
    [830, 880],
  ];

  return (
    <Stage>
      <BgShop frame={frame} />
      <Tag x={330} y={230} w={chipWidth("MUDHARABAH", 40)} h={78} fill={TOPIC.riba.accent} text="MUDHARABAH" size={40} />
      <Tag x={760} y={230} w={chipWidth("MUSYARAKAH", 40)} h={78} fill={TOPIC.riba.accent} text="MUSYARAKAH" size={40} />
      {/* kios usaha */}
      <g opacity={pop(p, 0.3, 0.4) > 0 ? 1 : 0} transform={`translate(0 ${(1 - easeOut(seg(p, 0.3, 0.42))) * 40})`}>
        <rect x={410} y={700} width={260} height={160} rx={10} fill="#c9935c" stroke={OUT} strokeWidth={6} />
        <Stripes x={390} y={620} w={300} h={84} c1="#e4574f" c2="#fff4e0" n={6} />
        <Tag x={540} y={790} w={200} h={64} fill={C.navy} text="USAHA" size={36} />
      </g>
      {/* bagi hasil */}
      <g opacity={pieK > 0 ? 1 : 0}>
        <Pie x={540} y={470} s={pieK} frac={0.6} r={110} />
        <Tag x={540} y={612} w={chipWidth("BAGI HASIL", 40)} h={70} fill={C.green} text="BAGI HASIL" size={40} s={pieK} />
      </g>
      {targets.map((t, i) =>
        [0, 1, 2].map((k) => {
          const u = seg(p, 0.62 + k * 0.06 + i * 0.02, 0.8 + k * 0.04);
          if (u <= 0 || u >= 1) return null;
          const pos = lerp2([540, 480], t, easeOut(u));
          return <Coin key={`${i}${k}`} x={pos[0] + (k - 1) * 22} y={pos[1] - Math.sin(u * Math.PI) * 90} s={0.7} />;
        }),
      )}
      <g transform={`translate(${(1 - enter) * -120} 0)`}>
        <Person x={MX} y={FY} scale={S} frame={frame} shirt="#2f8f6b" hat="peci" mood={mood} rh={toLocal(mHand, MX, FY, S)} />
      </g>
      <g transform={`translate(${(1 - enter) * 120} 0)`}>
        <Person x={WX} y={FY} scale={S} frame={frame} hat="hijab" hijabColor="#9b4d63" shirt="#d86f8c" dress mood={mood} lh={toLocal(wHand, WX, FY, S)} />
      </g>
      {[250, 830].map((cx, i) => (
        <Check key={cx} x={cx} y={800} s={1.3 * pop(p, 0.84 + i * 0.04, 0.92 + i * 0.04)} />
      ))}
    </Stage>
  );
};
