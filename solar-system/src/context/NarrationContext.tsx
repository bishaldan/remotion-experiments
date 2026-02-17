import React, { createContext, useContext, useMemo } from 'react';

export interface NarrationSegment {
  id: string;
  sceneId: string;
  text: string;
  audioSrc: string;
  durationInFrames: number;
  startFrame: number;
  endFrame: number;
  fps?: number;
}

interface NarrationContextType {
  segments: NarrationSegment[];
  getSegmentForScene: (sceneId: string) => NarrationSegment | undefined;
  getSegmentStartFrame: (sceneId: string) => number;
  getSceneFrame: (frame: number, sceneId: string) => number;
  totalDuration: number;
}

const NarrationContext = createContext<NarrationContextType | null>(null);

export const useNarration = () => {
  const context = useContext(NarrationContext);
  if (!context) {
    throw new Error('useNarration must be used within NarrationProvider');
  }
  return context;
};

interface NarrationProviderProps {
  children: React.ReactNode;
  fps?: number;
}

export const NarrationProvider: React.FC<NarrationProviderProps> = ({ 
  children, 
  fps = 40 
}) => {
  const segments = useMemo<NarrationSegment[]>(() => {
    // Narration segments - you'll place your MP3 files here
    return [
      {
        id: 'scene1-narration',
        sceneId: 'Scene1',
        text: 'Welcome to our solar system. At the center, the Sun radiates powerful energy, holding all planets in its gravitational embrace. This fusion-powered star has illuminated our cosmic neighborhood for over four and a half billion years.',
        audioSrc: '/audio/scene1-narration.mp3', // Place your MP3 here
        durationInFrames: 20 * fps, // 20 seconds
        startFrame: 0,
        endFrame: 20 * fps,
        fps,
      },
      {
        id: 'scene2-narration',
        sceneId: 'Scene2',
        text: 'Our Sun is a magnificent star. These powerful solar flares and coronal mass ejections release immense energy into space, creating the solar wind that shapes the entire heliosphere.',
        audioSrc: '/audio/scene2-narration.mp3',
        durationInFrames: 10 * fps,
        startFrame: 20 * fps,
        endFrame: 30 * fps,
        fps,
      },
      {
        id: 'scene3-narration',
        sceneId: 'Scene3',
        text: 'The inner planets - Mercury, Venus, Earth, and Mars - are rocky worlds close to the Sun. Earth, our home, stands out with its abundant water and life-sustaining atmosphere. Mars, the red planet, shows evidence of ancient rivers and lakes.',
        audioSrc: '/audio/scene3-narration.mp3',
        durationInFrames: 10 * fps,
        startFrame: 30 * fps,
        endFrame: 40 * fps,
        fps,
      },
      {
        id: 'scene4-narration',
        sceneId: 'Scene4',
        text: 'Beyond the asteroid belt lie the gas giants. Jupiter, the largest planet, features its Great Red Spot - a storm larger than Earth itself. Saturn\'s spectacular rings, made of ice and rock, stretch over 280,000 kilometers in diameter.',
        audioSrc: '/audio/scene4-narration.mp3',
        durationInFrames: 10 * fps,
        startFrame: 40 * fps,
        endFrame: 50 * fps,
        fps,
      },
      {
        id: 'scene5-narration',
        sceneId: 'Scene5',
        text: 'As we zoom out, we see the full scale of our cosmic neighborhood. The Sun\'s gravitational influence extends far beyond Neptune to the Kuiper Belt and Oort Cloud. This is our tiny oasis in the vast expanse of space - a pale blue dot in an infinite cosmos.',
        audioSrc: '/audio/scene5-narration.mp3',
        durationInFrames: 10 * fps,
        startFrame: 50 * fps,
        endFrame: 60 * fps,
        fps,
      },
    ];
  }, [fps]);

  const totalDuration = useMemo(() => {
    return segments.reduce((sum, segment) => sum + segment.durationInFrames, 0);
  }, [segments]);

  const getSegmentForScene = (sceneId: string) => {
    return segments.find(s => s.sceneId === sceneId);
  };

  const getSegmentStartFrame = (sceneId: string) => {
    const segment = getSegmentForScene(sceneId);
    return segment?.startFrame || 0;
  };

  const getSceneFrame = (globalFrame: number, sceneId: string) => {
    const startFrame = getSegmentStartFrame(sceneId);
    return globalFrame - startFrame;
  };

  return (
    <NarrationContext.Provider value={{ 
      segments, 
      getSegmentForScene, 
      getSegmentStartFrame,
      getSceneFrame,
      totalDuration 
    }}>
      {children}
    </NarrationContext.Provider>
  );
};