import React from "react";
import {Composition, staticFile} from "remotion";
import {getAudioDurationInSeconds} from "@remotion/media-utils";
import {MainVideo, MainProps} from "./MainVideo";
import {FPS, HEIGHT, NARRATION_FILE, NARRATION_SEC, TAIL_SEC, WIDTH} from "./data/timing";

const framesFor = (sec: number) => Math.ceil((sec + TAIL_SEC) * FPS);

export const RemotionRoot: React.FC = () => (
  <Composition
    id="TigaLarangan"
    component={MainVideo}
    width={WIDTH}
    height={HEIGHT}
    fps={FPS}
    durationInFrames={framesFor(NARRATION_SEC)}
    defaultProps={{audioSec: NARRATION_SEC} satisfies MainProps}
    calculateMetadata={async () => {
      // Durasi video = durasi narasi + TAIL_SEC (audio hanya dibaca durasinya).
      try {
        const sec = await getAudioDurationInSeconds(staticFile(NARRATION_FILE));
        return {durationInFrames: framesFor(sec), props: {audioSec: sec}};
      } catch {
        return {durationInFrames: framesFor(NARRATION_SEC), props: {audioSec: NARRATION_SEC}};
      }
    }}
  />
);
