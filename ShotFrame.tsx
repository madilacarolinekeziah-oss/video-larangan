import React from "react";
import {AbsoluteFill, useCurrentFrame} from "remotion";
import {Shot, TRANSITION_FRAMES} from "../data/timing";

/** Transisi halus (fade) + zoom kamera lambat di setiap shot. */
export const ShotFrame: React.FC<{shot: Shot; first: boolean; children: React.ReactNode}> = ({
  shot,
  first,
  children,
}) => {
  const frame = useCurrentFrame();
  const fade = first ? 1 : Math.min(1, frame / TRANSITION_FRAMES);
  const zoom = 1 + 0.045 * Math.min(1, frame / Math.max(1, shot.durationFrames));
  return (
    <AbsoluteFill style={{opacity: fade, transform: `scale(${zoom})`, transformOrigin: "50% 52%"}}>
      {children}
    </AbsoluteFill>
  );
};
