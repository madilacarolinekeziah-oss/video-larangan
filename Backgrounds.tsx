import React from "react";
import {OUT} from "../../lib/theme";

const W = 1080;
const H = 1920;

const Cloud: React.FC<{x: number; y: number; s?: number}> = ({x, y, s = 1}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} fill="#fff" opacity={0.9}>
    <ellipse cx={0} cy={0} rx={80} ry={32} />
    <ellipse cx={-40} cy={-18} rx={44} ry={32} />
    <ellipse cx={30} cy={-26} rx={52} ry={36} />
  </g>
);

export const Stripes: React.FC<{x: number; y: number; w: number; h: number; c1: string; c2: string; n?: number}> = ({x, y, w, h, c1, c2, n = 8}) => (
  <g>
    {Array.from({length: n}, (_, i) => (
      <path
        key={i}
        d={`M${x + (w / n) * i} ${y} L${x + (w / n) * (i + 1)} ${y} L${x + (w / n) * (i + 1) + 6} ${y + h} L${x + (w / n) * i - 6} ${y + h} Z`}
        fill={i % 2 ? c2 : c1}
        stroke={OUT}
        strokeWidth={4}
        strokeLinejoin="round"
      />
    ))}
  </g>
);

/** Pasar / pusat perdagangan */
export const BgMarket: React.FC<{frame: number}> = ({frame}) => (
  <g>
    <defs>
      <linearGradient id="mk-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#8fd3f0" />
        <stop offset="1" stopColor="#fff0d2" />
      </linearGradient>
    </defs>
    <rect width={W} height={H} fill="url(#mk-sky)" />
    <circle cx={880} cy={260} r={90} fill="#ffe08a" />
    <Cloud x={(frame * 0.4) % 1300 - 100} y={200} s={1.3} />
    <Cloud x={((frame * 0.25 + 600) % 1300) - 100} y={380} s={1} />
    {[40, 220, 420, 640, 840].map((x, i) => (
      <g key={x}>
        <rect x={x} y={560 + (i % 2) * 70} width={190} height={700 - (i % 2) * 70} fill={["#e6c9a8", "#d9b99a", "#f0d9b5", "#d6c1a2", "#e8cfae"][i]} stroke={OUT} strokeWidth={4} />
        {[0, 1, 2].map((r) =>
          [0, 1].map((c) => (
            <rect key={`${r}${c}`} x={x + 28 + c * 82} y={600 + (i % 2) * 70 + r * 110} width={56} height={70} rx={8} fill="#9fd3e8" stroke={OUT} strokeWidth={3} />
          )),
        )}
      </g>
    ))}
    <path d="M0 520 Q270 600 540 520 T1080 520" stroke={OUT} strokeWidth={4} fill="none" />
    {Array.from({length: 12}, (_, i) => (
      <path key={i} d={`M${i * 94 + 20} ${540 + Math.sin(i * 1.1) * 12} l28 0 l-14 44 z`} fill={["#e4574f", "#ffd04d", "#2fa36b", "#3fa7d6"][i % 4]} stroke={OUT} strokeWidth={3} strokeLinejoin="round" />
    ))}
    <Stripes x={0} y={1000} w={420} h={90} c1="#e4574f" c2="#fff4e0" />
    <Stripes x={660} y={1000} w={420} h={90} c1="#2f8fd0" c2="#fff4e0" />
    <rect x={0} y={1280} width={W} height={640} fill="#ebcf9f" />
    {Array.from({length: 9}, (_, i) => (
      <path key={i} d={`M${i * 140 - 40} 1280 L${i * 190 - 340} 1920`} stroke="#d4b27c" strokeWidth={5} />
    ))}
    <path d="M0 1280 L1080 1280" stroke={OUT} strokeWidth={5} />
  </g>
);

/** Kantor pemberi pinjaman */
export const BgOffice: React.FC = () => (
  <g>
    <rect width={W} height={H} fill="#f2e3c7" />
    <rect y={1250} width={W} height={670} fill="#9a6642" />
    <rect y={1230} width={W} height={36} fill="#7a4d2e" stroke={OUT} strokeWidth={4} />
    <rect x={110} y={220} width={420} height={500} rx={14} fill="#a9dcf2" stroke={OUT} strokeWidth={8} />
    <path d="M320 220 L320 720 M110 470 L530 470" stroke={OUT} strokeWidth={8} />
    <rect x={150} y={520} width={60} height={160} fill="#8ab7cc" />
    <rect x={240} y={450} width={70} height={230} fill="#8ab7cc" />
    <rect x={380} y={560} width={60} height={120} fill="#8ab7cc" />
    <circle cx={800} cy={360} r={96} fill="#fff" stroke={OUT} strokeWidth={8} />
    <path d="M800 360 L800 300 M800 360 L842 384" stroke={OUT} strokeWidth={8} strokeLinecap="round" />
    <rect x={640} y={560} width={300} height={190} rx={8} fill="#fff" stroke={OUT} strokeWidth={6} />
    <path d="M670 720 L730 650 L780 690 L850 610 L910 640" stroke="#e4574f" strokeWidth={8} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <rect x={430} y={1150} width={240} height={110} fill="#6fbf73" stroke={OUT} strokeWidth={5} opacity={0} />
    <ellipse cx={940} cy={1230} rx={70} ry={20} fill="#c97f4e" stroke={OUT} strokeWidth={5} />
    <path d="M940 1210 Q900 1100 930 1000 Q960 1100 940 1210 M940 1210 Q1000 1120 1010 1040 Q990 1130 940 1210" fill="#4fae62" stroke={OUT} strokeWidth={4} />
    <ellipse cx={540} cy={1700} rx={420} ry={80} fill="#c0504d" opacity={0.35} />
  </g>
);

/** Toko / usaha */
export const BgShop: React.FC<{frame?: number}> = ({frame = 0}) => (
  <g>
    <rect width={W} height={H} fill="#dff3e3" />
    <Stripes x={0} y={0} w={W} h={150} c1="#2fa36b" c2="#fff4e0" n={10} />
    <rect x={640} y={420} width={380} height={460} rx={10} fill="#c9935c" stroke={OUT} strokeWidth={6} />
    {[0, 1, 2].map((r) => (
      <g key={r}>
        <rect x={650} y={430 + r * 150} width={360} height={14} fill="#8a5a33" stroke={OUT} strokeWidth={3} />
        {[0, 1, 2].map((c) => (
          <rect key={c} x={672 + c * 112} y={380 + r * 150 + 20} width={80} height={90} rx={8} fill={["#e4574f", "#ffd04d", "#3fa7d6", "#a06ee0", "#2fa36b"][(r + c * 2) % 5]} stroke={OUT} strokeWidth={4} />
        ))}
      </g>
    ))}
    <circle cx={260} cy={400} r={80} fill="#fff" stroke={OUT} strokeWidth={7} />
    <path d={`M260 400 L260 350 M260 400 L${260 + Math.sin(frame / 30) * 6 + 30} 420`} stroke={OUT} strokeWidth={7} strokeLinecap="round" />
    <path d="M320 240 Q330 300 320 330" stroke={OUT} strokeWidth={4} fill="none" />
    <ellipse cx={320} cy={345} rx={50} ry={20} fill="#ffe08a" stroke={OUT} strokeWidth={5} />
    <rect y={1250} width={W} height={670} fill="#e9d3a6" />
    {Array.from({length: 8}, (_, i) => (
      <path key={i} d={`M${i * 160} 1250 L${i * 160 - 120} 1920`} stroke="#d1b37d" strokeWidth={5} />
    ))}
    <path d="M0 1250 L1080 1250" stroke={OUT} strokeWidth={5} />
  </g>
);

/** Wahana permainan berhadiah (malam) */
export const BgFair: React.FC<{frame: number}> = ({frame}) => (
  <g>
    <defs>
      <linearGradient id="fr-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#2a1458" />
        <stop offset="1" stopColor="#6a35b0" />
      </linearGradient>
      <linearGradient id="fr-beam" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#fff3b0" stopOpacity={0.6} />
        <stop offset="1" stopColor="#fff3b0" stopOpacity={0} />
      </linearGradient>
    </defs>
    <rect width={W} height={H} fill="url(#fr-sky)" />
    {Array.from({length: 26}, (_, i) => (
      <circle key={i} cx={(i * 211) % W} cy={(i * 137) % 700} r={2 + (i % 3)} fill="#fff" opacity={0.5 + 0.5 * Math.sin(frame / 10 + i)} />
    ))}
    <Stripes x={0} y={0} w={W} h={190} c1="#e4574f" c2="#ffd04d" n={9} />
    <path d="M0 220 Q270 300 540 220 T1080 220" stroke="#fff3b0" strokeWidth={5} fill="none" />
    {Array.from({length: 13}, (_, i) => {
      const bx = i * 90;
      const by = 220 + (i % 2 ? 22 : 40) + Math.sin(i * 0.6) * 8;
      const on = Math.floor(frame / 8 + i) % 2 === 0;
      return <circle key={i} cx={bx} cy={by} r={13} fill={on ? "#fff3b0" : "#c9a64b"} stroke={OUT} strokeWidth={3} />;
    })}
    <polygon points="360,0 720,0 900,1300 180,1300" fill="url(#fr-beam)" />
    <rect y={1300} width={W} height={620} fill="#24103f" />
    <path d="M0 1300 L1080 1300" stroke="#ffd04d" strokeWidth={8} />
  </g>
);

/** Ruang tender (gelap / tertutup) */
export const BgMeetingDark: React.FC = () => (
  <g>
    <rect width={W} height={H} fill="#264a5c" />
    <rect y={1000} width={W} height={920} fill="#1b3340" />
    <rect y={980} width={W} height={40} fill="#6b4a2e" stroke={OUT} strokeWidth={4} />
    {[160, 540, 920].map((x) => (
      <g key={x}>
        <rect x={x - 70} y={0} width={140} height={40} fill="#e9e3c9" />
        <polygon points={`${x - 70},40 ${x + 70},40 ${x + 220},640 ${x - 220},640`} fill="#fff6c9" opacity={0.08} />
      </g>
    ))}
    <rect x={200} y={170} width={680} height={400} rx={12} fill="#f4f7fa" stroke={OUT} strokeWidth={8} />
    <rect x={230} y={200} width={620} height={340} rx={6} fill="#dde7ee" />
    <rect x={280} y={240} width={520} height={20} rx={10} fill="#8aa0b2" />
    <rect x={280} y={290} width={380} height={14} rx={7} fill="#b6c5d1" />
    <rect x={280} y={320} width={440} height={14} rx={7} fill="#b6c5d1" />
    <path d="M290 500 L380 420 L450 470 L560 380 L700 450 L780 400" stroke="#d2691e" strokeWidth={9} fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </g>
);

/** Ruang tender (terang & transparan) */
export const BgMeetingBright: React.FC = () => (
  <g>
    <rect width={W} height={H} fill="#e8f5f4" />
    <rect y={1000} width={W} height={920} fill="#d9b98a" />
    <rect y={980} width={W} height={40} fill="#b48e5c" stroke={OUT} strokeWidth={4} />
    {[0, 1, 2].map((i) => (
      <rect key={i} x={40 + i * 340} y={60} width={300} height={240} rx={10} fill="#bfe6f7" stroke={OUT} strokeWidth={6} />
    ))}
    <rect x={150} y={330} width={780} height={380} rx={14} fill="#ffffff" stroke={OUT} strokeWidth={8} />
    <ellipse cx={80} cy={1000} rx={60} ry={16} fill="#c97f4e" stroke={OUT} strokeWidth={4} />
    <path d="M80 990 Q40 880 70 790 Q100 880 80 990 M80 990 Q130 900 140 830 Q120 920 80 990" fill="#4fae62" stroke={OUT} strokeWidth={4} />
  </g>
);

/** Latar presenter per topik: gradasi + pola bintang islami */
export const BgTopic: React.FC<{theme: {c1: string; c2: string; accent: string; dark: string}; frame: number; id: string}> = ({theme, frame, id}) => (
  <g>
    <defs>
      <linearGradient id={`${id}-g`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={theme.c1} />
        <stop offset="1" stopColor={theme.c2} />
      </linearGradient>
      <pattern id={`${id}-p`} width={120} height={120} patternUnits="userSpaceOnUse" patternTransform={`translate(${(frame * 0.3) % 120} ${(frame * 0.3) % 120})`}>
        <rect x={30} y={30} width={60} height={60} fill="none" stroke={theme.accent} strokeWidth={3} />
        <rect x={30} y={30} width={60} height={60} fill="none" stroke={theme.accent} strokeWidth={3} transform="rotate(45 60 60)" />
        <circle cx={0} cy={0} r={6} fill={theme.accent} />
        <circle cx={120} cy={120} r={6} fill={theme.accent} />
      </pattern>
    </defs>
    <rect width={W} height={H} fill={`url(#${id}-g)`} />
    <rect width={W} height={H} fill={`url(#${id}-p)`} opacity={0.14} />
    <circle cx={540} cy={1000} r={470} fill="#fff" opacity={0.35} />
    <circle cx={540} cy={1000} r={370} fill="#fff" opacity={0.3} />
    <rect y={1440} width={W} height={480} fill={theme.dark} opacity={0.18} />
    <ellipse cx={540} cy={1480} rx={420} ry={50} fill={theme.dark} opacity={0.18} />
  </g>
);

/** Latar kesimpulan: cahaya hangat + sinar */
export const BgGlow: React.FC<{frame: number}> = ({frame}) => (
  <g>
    <defs>
      <radialGradient id="gl-g" cx="0.5" cy="0.45" r="0.8">
        <stop offset="0" stopColor="#fff6d0" />
        <stop offset="1" stopColor="#ffc86b" />
      </radialGradient>
    </defs>
    <rect width={W} height={H} fill="url(#gl-g)" />
    <g transform={`translate(540 760) rotate(${frame * 0.25})`} opacity={0.22}>
      {Array.from({length: 14}, (_, i) => (
        <polygon key={i} points="0,0 -90,-1300 90,-1300" fill="#fff" transform={`rotate(${(360 / 14) * i})`} />
      ))}
    </g>
    {Array.from({length: 16}, (_, i) => (
      <circle key={i} cx={(i * 197 + 60) % W} cy={(i * 251 + frame * 0.6) % 1500} r={4 + (i % 3) * 2} fill="#fff" opacity={0.5 + 0.4 * Math.sin(frame / 12 + i)} />
    ))}
    <rect y={1440} width={W} height={480} fill="#c78a1f" opacity={0.2} />
    <ellipse cx={540} cy={1480} rx={420} ry={50} fill="#8a5a10" opacity={0.2} />
  </g>
);
