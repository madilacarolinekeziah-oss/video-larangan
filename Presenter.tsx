import React from "react";
import {C, OUT} from "../../lib/theme";

export type PresenterMood = "happy" | "talk" | "worried" | "serious";
export type PresenterPose = "clasp" | "present" | "wave" | "open";

type Props = {
  /** posisi kaki (tengah-bawah) di kanvas 1080x1920 */
  x: number;
  y: number;
  scale?: number;
  frame: number;
  mood?: PresenterMood;
  pose?: PresenterPose;
  talking?: boolean;
  flip?: boolean;
};

const Rose: React.FC<{x: number; y: number; s?: number; r?: number}> = ({x, y, s = 1, r = 0}) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
    <path d="M0 10 Q4 28 -2 40" stroke={C.leaf} strokeWidth={2.5} fill="none" />
    <ellipse cx={-14} cy={26} rx={9} ry={4.5} fill={C.leaf} transform="rotate(-30 -14 26)" />
    <ellipse cx={13} cy={30} rx={9} ry={4.5} fill={C.leaf} transform="rotate(30 13 30)" />
    <circle r={14} fill={C.rose} stroke={C.roseDark} strokeWidth={2} />
    <circle r={8} fill="#ea8f8a" />
    <path d="M-4 0 A4 4 0 1 1 4 1" stroke={C.roseDark} strokeWidth={2} fill="none" />
  </g>
);

const Arm: React.FC<{d: string}> = ({d}) => (
  <g>
    <path d={d} stroke={OUT} strokeWidth={42} strokeLinecap="round" fill="none" />
    <path d={d} stroke={C.dress} strokeWidth={32} strokeLinecap="round" fill="none" />
  </g>
);

const Hand: React.FC<{x: number; y: number}> = ({x, y}) => (
  <g>
    <ellipse cx={x} cy={y} rx={19} ry={17} fill={C.skin} stroke={OUT} strokeWidth={5} />
    <path d={`M${x - 8} ${y + 2} l4 10 M${x + 2} ${y + 3} l3 10`} stroke={OUT} strokeWidth={2.5} strokeLinecap="round" />
  </g>
);

/**
 * Presenter utama: perempuan berhijab abu-abu, gamis biru motif mawar,
 * selendang oranye — mengikuti gambar referensi (chibi 2D, garis tepi tebal).
 * Sistem koordinat lokal 400 x 640, jangkar di tengah-bawah.
 */
export const Presenter: React.FC<Props> = ({
  x,
  y,
  scale = 1,
  frame,
  mood = "happy",
  pose = "clasp",
  talking = false,
  flip = false,
}) => {
  const bob = Math.sin(frame / 14) * 3;
  const tilt = Math.sin(frame / 23) * 1.6;
  const wave = Math.sin(frame / 7) * 7;
  const blink = frame % 120 < 5;
  const mouthOpen = talking
    ? (Math.sin(frame * 0.95) * 0.5 + 0.5) * (0.65 + 0.35 * Math.sin(frame * 0.31))
    : 0;

  let L = "M128 352 Q104 432 188 470";
  let R = "M272 352 Q296 432 212 470";
  let hl: [number, number] = [190, 470];
  let hr: [number, number] = [210, 470];
  let rot = 0;
  if (pose === "present") {
    R = "M272 352 Q338 380 356 436";
    hr = [358, 442];
    rot = wave * 0.45;
  } else if (pose === "wave") {
    R = "M272 352 Q346 340 354 266";
    hr = [354, 256];
    rot = wave;
  } else if (pose === "open") {
    L = "M128 352 Q62 385 44 440";
    hl = [42, 446];
    R = "M272 352 Q338 385 356 440";
    hr = [358, 446];
    rot = wave * 0.3;
  }

  const eyesClosed = mood === "happy";
  const eyeRy = blink ? 1.5 : 13;
  const mouthD =
    mood === "worried"
      ? "M184 250 Q192 242 200 250 Q208 258 216 250"
      : mood === "serious"
        ? "M186 248 L214 248"
        : `M184 243 Q200 ${243 + mouthOpen * 4} 216 243 Q214 ${249 + mouthOpen * 22} 200 ${
            251 + mouthOpen * 22
          } Q186 ${249 + mouthOpen * 22} 184 243 Z`;
  const showSmile = mouthOpen < 0.08 && (mood === "happy" || mood === "talk");

  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -scale : scale} ${scale}) translate(-200 -640)`}>
      <ellipse cx={200} cy={622} rx={125} ry={14} fill="#5b3b20" opacity={0.16} />
      <g transform={`translate(0 ${bob})`}>
        {/* kain hijab bagian belakang */}
        <path d="M296 330 C342 400 348 470 322 524 L286 480 Z" fill="#b9b0a6" stroke={OUT} strokeWidth={5} strokeLinejoin="round" />
        {/* sepatu */}
        <ellipse cx={150} cy={600} rx={32} ry={14} fill={C.shoe} stroke={OUT} strokeWidth={4} />
        <ellipse cx={250} cy={600} rx={32} ry={14} fill={C.shoe} stroke={OUT} strokeWidth={4} />
        {/* gamis */}
        <path
          d="M118 345 C150 335 250 335 282 345 C300 420 312 500 332 588 C262 614 138 614 68 588 C88 500 100 420 118 345 Z"
          fill={C.dress}
          stroke={OUT}
          strokeWidth={5}
          strokeLinejoin="round"
        />
        <path d="M150 430 Q140 510 120 596 M250 430 Q262 510 288 598 M200 460 L200 606" stroke={C.dressShade} strokeWidth={4} fill="none" strokeLinecap="round" />
        <Rose x={142} y={420} s={0.9} r={-10} />
        <Rose x={262} y={450} s={1} r={12} />
        <Rose x={196} y={505} s={1.1} r={4} />
        <Rose x={112} y={522} s={0.9} r={-18} />
        <Rose x={290} y={528} s={0.95} r={20} />
        <Rose x={156} y={566} s={0.9} r={8} />
        <Rose x={240} y={572} s={0.85} r={-8} />
        {/* selendang oranye */}
        <path
          d="M92 335 C130 355 270 355 308 335 C336 350 346 395 320 432 C300 402 260 394 200 400 C140 394 100 402 80 432 C54 395 64 350 92 335 Z"
          fill={C.scarf}
          stroke={OUT}
          strokeWidth={5}
          strokeLinejoin="round"
        />
        <path d="M84 404 C58 470 66 540 94 566 L124 546 C106 494 112 444 124 404 Z" fill={C.scarf} stroke={OUT} strokeWidth={5} strokeLinejoin="round" />
        <path d="M100 418 C86 470 90 520 104 548" stroke={C.scarfShade} strokeWidth={5} fill="none" strokeLinecap="round" />
        <path d="M120 360 C170 380 230 380 282 360" stroke={C.scarfShade} strokeWidth={5} fill="none" strokeLinecap="round" />

        {/* lengan */}
        <Arm d={L} />
        <g transform={`rotate(${rot} 272 352)`}>
          <Arm d={R} />
        </g>

        {/* kepala */}
        <g transform={`rotate(${tilt} 200 340)`}>
          <path
            d="M200 38 C290 38 340 100 340 190 C340 250 330 300 300 340 C270 372 230 372 200 362 C170 372 130 372 100 340 C70 300 60 250 60 190 C60 100 110 38 200 38 Z"
            fill={C.hijab}
            stroke={OUT}
            strokeWidth={5}
            strokeLinejoin="round"
          />
          <path d="M100 340 C130 372 170 372 200 362 C230 372 270 372 300 340 C270 332 230 338 200 338 C170 338 130 332 100 340 Z" fill={C.hijabShade} opacity={0.85} />
          <path d="M306 130 Q330 200 304 296" stroke={C.hijabShade} strokeWidth={5} fill="none" strokeLinecap="round" />
          <path d="M92 150 Q74 210 100 290" stroke={C.hijabShade} strokeWidth={4} fill="none" strokeLinecap="round" opacity={0.7} />
          {/* wajah */}
          <ellipse cx={200} cy={205} rx={84} ry={76} fill={C.skin} stroke={OUT} strokeWidth={5} />
          <path d="M112 185 C110 110 150 80 200 80 C250 80 290 110 288 185 C268 140 240 125 200 125 C160 125 132 140 112 185 Z" fill={C.hijab} stroke={OUT} strokeWidth={5} strokeLinejoin="round" />
          {/* pipi */}
          <ellipse cx={136} cy={232} rx={18} ry={10} fill="#f59b86" opacity={0.55} />
          <ellipse cx={264} cy={232} rx={18} ry={10} fill="#f59b86" opacity={0.55} />
          {/* alis */}
          {mood === "worried" ? (
            <>
              <path d="M144 180 L176 168" stroke={OUT} strokeWidth={4} strokeLinecap="round" />
              <path d="M224 168 L256 180" stroke={OUT} strokeWidth={4} strokeLinecap="round" />
            </>
          ) : (
            <>
              <path d="M144 178 Q160 168 178 175" stroke={OUT} strokeWidth={4} fill="none" strokeLinecap="round" />
              <path d="M222 175 Q240 168 256 178" stroke={OUT} strokeWidth={4} fill="none" strokeLinecap="round" />
            </>
          )}
          {/* mata */}
          {eyesClosed ? (
            <>
              <path d="M142 207 Q160 186 178 207" stroke={OUT} strokeWidth={6} fill="none" strokeLinecap="round" />
              <path d="M222 207 Q240 186 258 207" stroke={OUT} strokeWidth={6} fill="none" strokeLinecap="round" />
            </>
          ) : (
            <>
              <ellipse cx={160} cy={202} rx={10} ry={eyeRy} fill={OUT} />
              <ellipse cx={240} cy={202} rx={10} ry={eyeRy} fill={OUT} />
              {!blink && (
                <>
                  <circle cx={156} cy={196} r={4} fill="#fff" />
                  <circle cx={236} cy={196} r={4} fill="#fff" />
                  <circle cx={164} cy={208} r={2} fill="#fff" />
                  <circle cx={244} cy={208} r={2} fill="#fff" />
                </>
              )}
            </>
          )}
          <ellipse cx={200} cy={227} rx={2.8} ry={3.2} fill="#c98b6a" />
          {showSmile ? (
            <path d="M182 244 Q200 260 218 244" stroke={OUT} strokeWidth={4.5} fill="none" strokeLinecap="round" />
          ) : mood === "worried" || mood === "serious" ? (
            <path d={mouthD} stroke={OUT} strokeWidth={4.5} fill="none" strokeLinecap="round" />
          ) : (
            <g>
              <path d={mouthD} fill="#b24a44" stroke={OUT} strokeWidth={4} strokeLinejoin="round" />
            </g>
          )}
          {mood === "worried" && (
            <path d="M316 130 C306 150 302 160 316 168 C330 160 326 150 316 130 Z" fill="#bfe6f7" stroke={OUT} strokeWidth={3} />
          )}
        </g>

        <Hand x={hl[0]} y={hl[1]} />
        <g transform={`rotate(${rot} 272 352)`}>
          <Hand x={hr[0]} y={hr[1]} />
        </g>
      </g>
    </g>
  );
};
