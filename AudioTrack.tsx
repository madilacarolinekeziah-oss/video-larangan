import React from "react";
import {Audio, Sequence, interpolate, staticFile, useVideoConfig} from "remotion";
import {MUSIC_FILE, MUSIC_VOLUME, NARRATION_FILE, SFX_CUES, Timeline} from "../data/timing";

export const AudioTrack: React.FC<{timeline: Timeline}> = ({timeline}) => {
  const {durationInFrames, fps} = useVideoConfig();
  return (
    <>
      {/* narasi final — tidak diubah */}
      <Audio src={staticFile(NARRATION_FILE)} volume={1} />
      {/* musik latar lembut, jauh di bawah narasi */}
      <Audio
        src={staticFile(MUSIC_FILE)}
        loop
        volume={(f) =>
          interpolate(f, [0, 45, durationInFrames - 60, durationInFrames], [0, MUSIC_VOLUME, MUSIC_VOLUME, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })
        }
      />
      {SFX_CUES.map((cue, i) => {
        const shot = timeline.shots.find((s) => s.id === cue.shot);
        if (!shot) return null;
        const from = shot.startFrame + Math.round(cue.at * shot.durationFrames);
        return (
          <Sequence key={`${cue.shot}-${i}`} from={from} durationInFrames={Math.round(2 * fps)}>
            <Audio src={staticFile(`sfx/${cue.file}`)} volume={cue.volume ?? 0.3} />
          </Sequence>
        );
      })}
    </>
  );
};
