// src/Root.tsx
import { Composition, Sequence } from "remotion";
import { Scene1 } from "./scenes/Scene1";
import { Scene2 } from "./scenes/Scene2";
import { Scene3 } from "./scenes/Scene3";
import { Scene4 } from "./scenes/Scene4";
import { Scene5 } from "./scenes/Scene5";
import { TestAudio } from './TestAudio';

export const RemotionRoot: React.FC = () => {
  const fps = 40;
  
  // Calculate durations
  const scene1Duration = 14 * fps; // 14 seconds - 560 frames
  const scene2Duration = 10 * fps; // 10 seconds - 400 frames
  const scene3Duration = 10 * fps; // 10 seconds - 400 frames
  const scene4Duration = 10 * fps; // 10 seconds - 400 frames
  const scene5Duration = 10 * fps; // 10 seconds - 400 frames
  
  const totalDuration = scene1Duration + scene2Duration + scene3Duration + scene4Duration + scene5Duration; // 54 seconds total - 2160 frames
  
  return (
    <>
      <Composition
        id="SolarSystem"
        component={SolarSystemVideo}
        durationInFrames={totalDuration}
        fps={fps}
        width={1920}
        height={1080}
      />
      
      <Composition
        id="TestAudio"
        component={TestAudio}
        durationInFrames={14 * fps}
        fps={fps}
        width={1920}
        height={1080}
      />
      
      {/* Individual scene compositions for preview/testing */}
      <Composition
        id="Scene1-Preview"
        component={Scene1}
        durationInFrames={scene1Duration}
        fps={fps}
        width={1920}
        height={1080}
      />
      
      <Composition
        id="Scene2-Preview"
        component={Scene2}
        durationInFrames={scene2Duration}
        fps={fps}
        width={1920}
        height={1080}
      />
      
      <Composition
        id="Scene3-Preview"
        component={Scene3}
        durationInFrames={scene3Duration}
        fps={fps}
        width={1920}
        height={1080}
      />
      
      <Composition
        id="Scene4-Preview"
        component={Scene4}
        durationInFrames={scene4Duration}
        fps={fps}
        width={1920}
        height={1080}
      />
      
      <Composition
        id="Scene5-Preview"
        component={Scene5}
        durationInFrames={scene5Duration}
        fps={fps}
        width={1920}
        height={1080}
      />
    </>
  );
};

const SolarSystemVideo: React.FC = () => {
  const fps = 40;
  
  // Calculate durations
  const scene1Duration = 14 * fps;
  const scene2Duration = 10 * fps;
  const scene3Duration = 10 * fps;
  const scene4Duration = 10 * fps;
  const scene5Duration = 10 * fps;
  
  // Calculate frame positions
  const scene1Start = 0;
  const scene2Start = scene1Duration;
  const scene3Start = scene2Start + scene2Duration;
  const scene4Start = scene3Start + scene3Duration;
  const scene5Start = scene4Start + scene4Duration;
  
  return (
    <div style={{ backgroundColor: "#000", width: "100%", height: "100%" }}>
      
      {/* REMOVED ALL AUDIO FROM ROOT - Audio is now handled in individual scene components */}
      
      {/* Video sequences */}
      <Sequence from={scene1Start} durationInFrames={scene1Duration}>
        <Scene1 />
      </Sequence>
      
      <Sequence from={scene2Start} durationInFrames={scene2Duration}>
        <Scene2 />
      </Sequence>
      
      <Sequence from={scene3Start} durationInFrames={scene3Duration}>
        <Scene3 />
      </Sequence>
      
      <Sequence from={scene4Start} durationInFrames={scene4Duration}>
        <Scene4 />
      </Sequence>
      
      <Sequence from={scene5Start} durationInFrames={scene5Duration}>
        <Scene5 />
      </Sequence>
    </div>
  );
};