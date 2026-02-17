// src/components/Transition.tsx
import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';

interface TransitionProps {
  type?: 'fade' | 'zoom' | 'slide';
  duration?: number;
  children: React.ReactNode;
}

export const Transition: React.FC<TransitionProps> = ({
  type = 'fade',
  duration = 30,
  children
}) => {
  const frame = useCurrentFrame();
  
  // Fade in at start of scene
  const fadeIn = interpolate(
    frame,
    [0, duration],
    [0, 1],
    { extrapolateRight: 'clamp' }
  );
  
  // Fade out at end of scene
  const fadeOut = interpolate(
    frame,
    [duration * 0.8, duration],
    [1, 0],
    { extrapolateRight: 'clamp' }
  );
  
  const opacity = Math.min(fadeIn, fadeOut);
  
  let transform = 'none';
  
  if (type === 'zoom') {
    const scale = interpolate(
      frame,
      [0, duration],
      [0.8, 1],
      { extrapolateRight: 'clamp' }
    );
    transform = `scale(${scale})`;
  } else if (type === 'slide') {
    const slide = interpolate(
      frame,
      [0, duration],
      [50, 0],
      { extrapolateRight: 'clamp' }
    );
    transform = `translateY(${slide}px)`;
  }
  
  return (
    <div style={{
      width: '100%',
      height: '100%',
      opacity,
      transform,
      transition: 'opacity 0.5s ease, transform 0.5s ease',
    }}>
      {children}
    </div>
  );
};