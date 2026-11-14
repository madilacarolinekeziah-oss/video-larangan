import React from "react";
import {AbsoluteFill, useCurrentFrame} from "remotion";
import type {CaptionTiming} from "../data/timing";
import {FONT} from "../lib/theme";

const KEY = /\b(riba|maysir|risywah|mudharabah|musyarakah)\b/gi;

const renderText = (text: string) =>
  text.split(KEY).map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} style={{color: "#ffd04d", fontWeight: 800}}>
        {part.toUpperCase()}
      </span>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    ),
  );

/** Subtitle di area aman bawah (y 1500–1750). */
export const Subtitle: React.FC<{captions: CaptionTiming[]}> = ({captions}) => {
  const frame = useCurrentFrame();
  const cur = captions.find((c) => frame >= c.start && frame < c.end);
  if (!cur) return null;
  const inT = Math.min(1, (frame - cur.start) / 6);
  const outT = Math.min(1, (cur.end - frame) / 4);
  const o = Math.min(inT, outT);
  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          top: 1500,
          left: 50,
          right: 50,
          height: 250,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            opacity: o,
            transform: `translateY(${(1 - o) * 14}px)`,
            background: "rgba(22,30,50,0.84)",
            color: "#fff",
            padding: "20px 34px",
            borderRadius: 34,
            fontFamily: FONT,
            fontWeight: 600,
            fontSize: 48,
            lineHeight: 1.25,
            textAlign: "center",
            maxWidth: 980,
            boxShadow: "0 8px 0 rgba(0,0,0,0.18)",
          }}
        >
          {renderText(cur.text)}
        </div>
      </div>
    </AbsoluteFill>
  );
};
