import React from 'react';
import { AbsoluteFill, Audio } from 'remotion';

export const TestAudio: React.FC = () => {
  return (
    <AbsoluteFill style={{
      backgroundColor: 'black',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      fontSize: 30,
      fontFamily: 'Arial'
    }}>
      <Audio src="/scene1-narration.mp3" volume={1} />
      <div>🔊 Audio should be playing...</div>
      <div style={{ fontSize: 20, marginTop: 20, color: '#FFD700' }}>
        If you can't hear it, check:
      </div>
      <div style={{ fontSize: 16, marginTop: 10 }}>
        1. File exists at: public/audio/scene1-narration.mp3
      </div>
      <div style={{ fontSize: 16 }}>
        2. Browser isn't blocking autoplay (click anywhere)
      </div>
      <div style={{ fontSize: 16 }}>
        3. Volume is turned up
      </div>
    </AbsoluteFill>
  );
};