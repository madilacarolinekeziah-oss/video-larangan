import React from "react";
import {Stage} from "../components/Stage";
import {BgFair, BgShop} from "../components/backgrounds/Backgrounds";
import {Person, PersonMood, toLocal} from "../components/characters/Person";
import {BarChart, Box, Check, Coin, Shield, Tag} from "../components/props/Props";
import {C, OUT, TOPIC} from "../lib/theme";
import {easeInOut, easeOut, lerp, lerp2, pop, seg} from "../lib/anim";
import {useShot} from "../lib/useShot";
import {ShotProps, chipWidth} from "./common";

const SYMS = ["7", "$", "?", "★", "Rp", "7"];

/** ADEGAN 4 — investasi / permainan berhadiah yang hanya untung-untungan */
export const MaysirStory: React.FC<ShotProps> = ({shot}) => {
  const {frame, p} = useShot(shot);
  const enter = easeOut(seg(p, 0, 0.1));
  const PX = 240;
  const FY = 1400;
  const S = 2;
  const handIn = easeInOut(seg(p, 0.12, 0.2));
  const hand = lerp2([350, 1200], [440, 1110], handIn);
  const final = ["7", "?", "$"];
  const stops = [0.76, 0.81, 0.86];
  const spinning = p > 0.46;
  const lever = easeInOut(seg(p, 0.42, 0.5)) - easeInOut(seg(p, 0.52, 0.6));
  const mood: PersonMood = p < 0.4 ? "happy" : p < 0.86 ? "surprised" : "sad";
  const poster = pop(p, 0.04, 0.14);

  return (
    <Stage>
      <BgFair frame={frame} />
      {/* poster janji untung */}
      <g transform={`translate(330 400) scale(${poster})`} opacity={poster > 0 ? 1 : 0}>
        <rect x={-270} y={-150} width={540} height={330} rx={30} fill="#000" opacity={0.2} />
        <rect x={-270} y={-160} width={540} height={330} rx={30} fill="#fff4e0" stroke={OUT} strokeWidth={7} />
        <text y={-60} textAnchor="middle" fontSize={64} fontWeight={800} fill={C.red}>
          UNTUNG 100%!
        </text>
        <path d="M-190 100 L-90 20 L-30 60 L90 -20 L180 -30" stroke={C.green} strokeWidth={14} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M130 -50 L184 -30 L150 18" stroke={C.green} strokeWidth={14} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <text y={142} textAnchor="middle" fontSize={40} fontWeight={800} fill={C.navy}>
          usahanya? ???
        </text>
      </g>
      {/* mesin permainan */}
      <g transform={`translate(${(1 - enter) * 160} 0)`}>
        <rect x={580} y={740} width={380} height={660} rx={34} fill="#d33f49" stroke={OUT} strokeWidth={8} />
        <rect x={560} y={630} width={420} height={140} rx={30} fill={C.gold} stroke={OUT} strokeWidth={8} />
        <text x={770} y={725} textAnchor="middle" fontSize={56} fontWeight={800} fill="#a02020">
          UNTUNG BESAR!
        </text>
        {Array.from({length: 9}, (_, i) => (
          <circle key={i} cx={585 + i * 52} cy={645} r={9} fill={Math.floor(frame / 6 + i) % 2 ? "#fff" : "#ff7a59"} stroke={OUT} strokeWidth={3} />
        ))}
        <rect x={620} y={820} width={300} height={190} rx={18} fill="#fff4e0" stroke={OUT} strokeWidth={6} />
        {[0, 1, 2].map((i) => {
          const stopped = p >= stops[i];
          const sym = stopped ? final[i] : spinning ? SYMS[(Math.floor(frame / 2) + i * 2) % SYMS.length] : "?";
          return (
            <g key={i}>
              <rect x={632 + i * 96} y={834} width={84} height={162} rx={10} fill="#fff" stroke={OUT} strokeWidth={4} />
              <text x={674 + i * 96} y={940 + (stopped || !spinning ? 0 : Math.sin(frame * 1.7 + i) * 6)} textAnchor="middle" fontSize={88} fontWeight={800} fill={sym === "$" ? C.green : sym === "?" ? "#7a3fc7" : C.red}>
                {sym}
              </text>
            </g>
          );
        })}
        <rect x={700} y={1062} width={140} height={22} rx={11} fill="#2b2118" stroke={OUT} strokeWidth={4} />
        <text x={770} y={1128} textAnchor="middle" fontSize={34} fontWeight={800} fill="#fff4e0">
          MASUKKAN KOIN
        </text>
        <rect x={620} y={1230} width={300} height={110} rx={14} fill="#7a1f26" stroke={OUT} strokeWidth={6} />
        {/* tuas */}
        <path d={`M965 960 L1010 ${940 + lever * 130}`} stroke={OUT} strokeWidth={20} strokeLinecap="round" />
        <path d={`M965 960 L1010 ${940 + lever * 130}`} stroke="#c9c9c9" strokeWidth={10} strokeLinecap="round" />
        <circle cx={1010} cy={940 + lever * 130} r={26} fill={C.red} stroke={OUT} strokeWidth={6} />
      </g>
      {/* koin masuk ke slot */}
      {[0, 1, 2].map((k) => {
        const u = seg(p, 0.2 + k * 0.1, 0.32 + k * 0.1);
        if (u <= 0 || u >= 1) return null;
        const pos = lerp2([440, 1110], [770, 1070], easeOut(u));
        return <Coin key={k} x={pos[0]} y={pos[1] - Math.sin(u * Math.PI) * 120} s={0.8} rot={u * 360} />;
      })}
      <g transform={`translate(${(1 - enter) * -140} 0)`}>
        <Person x={PX} y={FY} scale={S} frame={frame} shirt="#4a7bd0" skin="#e8b88a" mood={mood} rh={toLocal(hand, PX, FY, S)} sweat={p > 0.84} />
      </g>
      {/* tanda tanya */}
      {[0, 1, 2].map((i) => {
        const k = pop(p, 0.55 + i * 0.05, 0.63 + i * 0.05);
        return (
          <g key={i} transform={`translate(${500 + i * 70} ${620 - i * 40 + Math.sin(frame / 8 + i) * 8}) scale(${k})`} opacity={k > 0 ? 1 : 0}>
            <text fontSize={90} fontWeight={800} fill="#ffd04d" stroke={OUT} strokeWidth={3} paintOrder="stroke" textAnchor="middle">
              ?
            </text>
          </g>
        );
      })}
      <Tag x={540} y={1470 - 20} w={chipWidth("SPEKULASI", 52)} h={92} fill={TOPIC.maysir.accent} text="SPEKULASI" size={52} s={pop(p, 0.8, 0.9)} opacity={p > 0.8 ? 1 : 0} />
    </Stage>
  );
};

/** ADEGAN 4 (solusi) — transaksi nyata, objek jelas, pencatatan & manajemen risiko */
export const TradeStory: React.FC<ShotProps> = ({shot}) => {
  const {frame, p} = useShot(shot);
  const enter = easeOut(seg(p, 0, 0.1));
  const SX = 800;
  const BX = 270;
  const FY = 1400;
  const S = 1.8;
  const ex = easeInOut(seg(p, 0.1, 0.4));
  const boxPos = lerp2([640, 1130], [440, 1130], ex);
  const coinPos = lerp2([430, 1060], [650, 1060], ex);
  const board = pop(p, 0.46, 0.56);
  const sceneMood: PersonMood = "happy";

  return (
    <Stage>
      <BgShop frame={frame} />
      {/* papan rencana & risiko */}
      <g transform={`translate(540 500) scale(${board})`} opacity={board > 0 ? 1 : 0}>
        <rect x={-450} y={-262} width={900} height={560} rx={40} fill="#000" opacity={0.13} />
        <rect x={-450} y={-270} width={900} height={560} rx={40} fill="#fff" stroke={OUT} strokeWidth={7} />
        <text y={-190} textAnchor="middle" fontSize={54} fontWeight={800} fill={C.navy}>
          RENCANA &amp; RISIKO
        </text>
        {/* catatan */}
        <g opacity={pop(p, 0.52, 0.6)} transform="translate(-290 20)">
          <rect x={-80} y={-110} width={160} height={210} rx={14} fill="#fff4e0" stroke={OUT} strokeWidth={6} />
          {[-60, -22, 16, 54].map((ly) => (
            <path key={ly} d={`M-52 ${ly} L52 ${ly}`} stroke="#8aa0b2" strokeWidth={6} strokeLinecap="round" />
          ))}
          <Check x={0} y={90} s={0.8} />
          <text y={160} textAnchor="middle" fontSize={36} fontWeight={800} fill={C.navy}>
            Catatan
          </text>
        </g>
        {/* grafik */}
        <g opacity={pop(p, 0.6, 0.68)}>
          <BarChart x={0} y={90} bars={[0.4, 0.6, 0.5, 0.9]} grow={easeOut(seg(p, 0.6, 0.8))} />
          <text y={160} textAnchor="middle" fontSize={36} fontWeight={800} fill={C.navy}>
            Rencana
          </text>
        </g>
        {/* risiko */}
        <g opacity={pop(p, 0.7, 0.78)}>
          <Shield x={290} y={10} s={1.35 * Math.min(1, pop(p, 0.7, 0.78))} />
          <text x={290} y={160} textAnchor="middle" fontSize={36} fontWeight={800} fill={C.navy}>
            Risiko
          </text>
        </g>
      </g>
      <Tag x={540} y={920} w={chipWidth("BARANG JELAS", 40)} h={72} fill={C.green} text="BARANG JELAS" size={40} s={pop(p, 0.3, 0.4)} opacity={p > 0.3 ? 1 : 0} />
      <rect x={430} y={1272} width={220} height={128} rx={10} fill="#b9814f" stroke={OUT} strokeWidth={6} />
      <rect x={415} y={1252} width={250} height={32} rx={8} fill="#d9a066" stroke={OUT} strokeWidth={5} />
      <g transform={`translate(${(1 - enter) * -120} 0)`}>
        <Person x={BX} y={FY} scale={S} frame={frame} hat="hijab" hijabColor="#9b4d63" shirt="#6fa8dc" dress mood={sceneMood} rh={toLocal(boxPos, BX, FY, S)} />
      </g>
      <g transform={`translate(${(1 - enter) * 120} 0)`}>
        <Person x={SX} y={FY} scale={S} frame={frame} hat="peci" shirt="#2f8f6b" apron="#fff4e0" mood={sceneMood} lh={toLocal(boxPos, SX, FY, S)} />
      </g>
      <Box x={boxPos[0]} y={boxPos[1]} s={0.8} />
      <Coin x={coinPos[0]} y={coinPos[1] - Math.sin(ex * Math.PI) * 60} s={0.7} opacity={ex > 0 ? 1 : 0} />
      <Coin x={640} y={1230} s={0.5} opacity={lerp(0, 1, seg(ex, 0.9, 1))} />
    </Stage>
  );
};
