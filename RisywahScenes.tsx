import React from "react";
import {Stage} from "../components/Stage";
import {BgMeetingBright, BgMeetingDark} from "../components/backgrounds/Backgrounds";
import {Person, PersonMood, toLocal} from "../components/characters/Person";
import {Check, Cross, Envelope, Magnifier, Scale, Tag} from "../components/props/Props";
import {C, OUT, TOPIC} from "../lib/theme";
import {easeInOut, easeOut, lerp2, pop, seg} from "../lib/anim";
import {useShot} from "../lib/useShot";
import {ShotProps, chipWidth} from "./common";

/** ADEGAN 5 — pengusaha diam-diam memberi amplop kepada panitia tender */
export const BribeStory: React.FC<ShotProps> = ({shot}) => {
  const {frame, p} = useShot(shot);
  const enter = easeOut(seg(p, 0, 0.12));
  const BX = 210;
  const BY = 1400;
  const BS = 2;
  const CS = 1.6;
  const CY = 1300;
  const C1X = 640;
  const C2X = 900;
  const slide = easeInOut(seg(p, 0.45, 0.75));
  const env = lerp2([345, 1130], [585, 1190], slide);
  const hide = seg(p, 0.76, 0.84);
  const lookB = p > 0.15 && p < 0.45 ? Math.sin(frame / 7) : 1;
  const bMood: PersonMood = p < 0.2 ? "neutral" : "sly";
  const c1Mood: PersonMood = p < 0.6 ? "neutral" : "sly";
  const c1Hand = lerp2([550, 1175], [588, 1195], seg(p, 0.55, 0.8));
  const stamp = pop(p, 0.84, 0.94);

  return (
    <Stage>
      <BgMeetingDark />
      <Tag x={540} y={110} w={chipWidth("TENDER PROYEK", 52)} h={92} fill={C.navy} text="TENDER PROYEK" size={52} />
      <Person x={C1X} y={CY} scale={CS} frame={frame} shirt="#444b5c" pants="#2b3140" badge="#e4574f" glasses mood={c1Mood} lh={toLocal(c1Hand, C1X, CY, CS)} look={p > 0.4 ? -0.6 : 0} />
      <Person x={C2X} y={CY} scale={CS} frame={frame} shirt="#444b5c" pants="#2b3140" badge="#e4574f" skin="#e8b88a" mood="neutral" look={-1} />
      {/* meja panitia */}
      <rect x={380} y={1190} width={700} height={240} fill="#7a4f2c" stroke={OUT} strokeWidth={6} />
      <rect x={380} y={1172} width={700} height={36} rx={6} fill="#9a6a3e" stroke={OUT} strokeWidth={5} />
      <Tag x={780} y={1330} w={chipWidth("PANITIA TENDER", 34)} h={62} fill="#e4574f" text="PANITIA TENDER" size={34} />
      <g transform={`translate(${(1 - enter) * -140} 0)`}>
        <Person
          x={BX}
          y={BY}
          scale={BS}
          frame={frame}
          shirt="#8a5a2a"
          pants="#3b2a1a"
          tie="#ffd04d"
          skin="#e8b88a"
          mood={bMood}
          look={lookB}
          sweat={p > 0.2}
          rh={toLocal(env, BX, BY, BS)}
        />
      </g>
      <g opacity={1 - hide}>
        <Envelope x={env[0]} y={env[1]} s={0.8 * pop(p, 0.12, 0.22)} peek={0.7} rot={-8 + slide * 8} />
      </g>
      <g transform={`translate(790 440) rotate(-12) scale(${stamp})`} opacity={stamp > 0 ? 1 : 0}>
        <circle r={116} fill="#fff" fillOpacity={0.9} stroke={C.red} strokeWidth={12} />
        <text y={20} textAnchor="middle" fontSize={78} fontWeight={800} fill={C.red}>
          SUAP
        </text>
        <Cross x={80} y={-90} s={1.6} />
      </g>
    </Stage>
  );
};

/** ADEGAN 5 (solusi) — tender transparan, persaingan sehat, penilaian adil */
export const FairStory: React.FC<ShotProps> = ({shot}) => {
  const {frame, p} = useShot(shot);
  const enter = easeOut(seg(p, 0, 0.12));
  const board = pop(p, 0.1, 0.22);
  const rows = ["Jujur", "Transparan", "Sehat"];
  const turn = Math.floor(frame / 40) % 3;
  const happy: PersonMood = p > 0.8 ? "happy" : "neutral";
  const bx = [220, 540, 860];
  const colors = ["#3fa7d6", "#e08a3c", "#7a5cc7"];

  return (
    <Stage>
      <BgMeetingBright />
      <g transform={`translate(540 520) scale(${board})`} opacity={board > 0 ? 1 : 0}>
        <rect x={-390} y={-186} width={780} height={376} rx={22} fill="none" />
        <text y={-110} textAnchor="middle" fontSize={50} fontWeight={800} fill={C.navy}>
          PENILAIAN ADIL
        </text>
        {rows.map((r, i) => {
          const k = pop(p, 0.28 + i * 0.14, 0.36 + i * 0.14);
          return (
            <g key={r} transform={`translate(-210 ${-30 + i * 76}) scale(${k})`} opacity={k > 0 ? 1 : 0}>
              <Check x={0} y={0} s={1} />
              <text x={50} y={14} fontSize={48} fontWeight={800} fill={TOPIC.risywah.dark}>
                {r}
              </text>
            </g>
          );
        })}
        <g opacity={pop(p, 0.42, 0.52)}>
          <Magnifier x={250} y={-10} s={1.2 * pop(p, 0.42, 0.52)} rot={Math.sin(frame / 14) * 8} />
        </g>
      </g>
      {/* panitia di balik meja kaca */}
      {[360, 720].map((x, i) => (
        <Person key={x} x={x} y={1112} scale={1.3} frame={frame} shirt="#444b5c" pants="#2b3140" badge="#2fa36b" skin={i ? "#e8b88a" : "#f3c9a0"} glasses={i === 0} mood={happy} look={[-0.8, 0, 0.8][turn]} />
      ))}
      <rect x={110} y={1004} width={860} height={104} rx={12} fill="#cfeef7" fillOpacity={0.88} stroke={OUT} strokeWidth={6} />
      {[360, 720].map((x, i) => {
        const k = pop(p, 0.62 + i * 0.08, 0.72 + i * 0.08);
        return (
          <g key={x} transform={`translate(${x} 1000) scale(${k})`} opacity={k > 0 ? 1 : 0}>
            <rect x={-50} y={-110} width={100} height={110} rx={12} fill="#fff" stroke={OUT} strokeWidth={5} />
            <text y={-28} textAnchor="middle" fontSize={78} fontWeight={800} fill={C.green}>
              {i ? "9" : "8"}
            </text>
          </g>
        );
      })}
      {/* pengusaha bersaing sehat */}
      <g transform={`translate(0 ${(1 - enter) * 120})`}>
        {bx.map((x, i) => (
          <Person key={x} x={x} y={1480} scale={1.3} frame={frame + i * 9} shirt={colors[i]} pants="#35435a" hat={i === 1 ? "peci" : "hair"} tie={i === 2 ? "#ffd04d" : null} mood="happy" look={i === 1 ? 0 : i === 0 ? 0.5 : -0.5}>
            <g transform="translate(100 190)">
              <rect x={-44} y={-34} width={88} height={64} rx={8} fill="#fff" stroke={OUT} strokeWidth={4} />
              <path d="M-28 20 L-28 0 M-8 20 L-8 -12 M12 20 L12 -4 M30 20 L30 -20" stroke={colors[i]} strokeWidth={9} strokeLinecap="round" />
            </g>
          </Person>
        ))}
      </g>
      <g transform={`translate(540 190) scale(${pop(p, 0.78, 0.9)})`} opacity={p > 0.78 ? 1 : 0}>
        <Scale x={0} y={0} s={0.9} tilt={Math.sin(frame / 18) * 4} />
      </g>
    </Stage>
  );
};
