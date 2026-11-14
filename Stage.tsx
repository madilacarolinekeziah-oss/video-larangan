import React from "react";
import {AbsoluteFill} from "remotion";
import {FONT} from "../lib/theme";

export const Stage: React.FC<{children: React.ReactNode}> = ({children}) => (
  <AbsoluteFill>
    <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{display: "block", fontFamily: FONT}}>
      {children}
    </svg>
  </AbsoluteFill>
);
