import React, {useMemo} from "react";
import {AbsoluteFill, Sequence, useVideoConfig} from "remotion";
import {TRANSITION_FRAMES, buildTimeline} from "./data/timing";
import {ShotFrame} from "./components/ShotFrame";
import {Subtitle} from "./components/Subtitle";
import {AudioTrack} from "./components/AudioTrack";
import {VIEWS} from "./scenes/registry";

export type MainProps = {audioSec: number};

export const MainVideo: React.FC<MainProps> = ({audioSec}) => {
  const {fps} = useVideoConfig();
  const timeline = useMemo(() => buildTimeline(audioSec, fps), [audioSec, fps]);
  const lastIndex = timeline.shots.length - 1;

  return (
    <AbsoluteFill style={{backgroundColor: "#fff"}}>
      {timeline.shots.map((shot, i) => {
        const View = VIEWS[shot.view];
        return (
          <Sequence
            key={shot.id}
            from={shot.startFrame}
            durationInFrames={shot.durationFrames + (i === lastIndex ? 0 : TRANSITION_FRAMES)}
          >
            <ShotFrame shot={shot} first={i === 0}>
              <View shot={shot} />
            </ShotFrame>
          </Sequence>
        );
      })}
      <Subtitle captions={timeline.captions} />
      <AudioTrack timeline={timeline} />
    </AbsoluteFill>
  );
};
