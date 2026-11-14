import {useCurrentFrame} from "remotion";
import type {Shot} from "../data/timing";

/** frame lokal shot + progres 0..1 sepanjang shot. */
export const useShot = (shot: Shot) => {
  const frame = useCurrentFrame();
  const p = Math.min(1, Math.max(0, frame / Math.max(1, shot.durationFrames)));
  return {frame, p};
};
