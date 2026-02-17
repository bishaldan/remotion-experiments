// src/components/Title.tsx
import React from 'react';
import { interpolate, useCurrentFrame, spring } from 'remotion';

interface TitleProps {
  text: string;
  subtitle?: string;
  startFrame: number;
  endFrame: number;
  currentFrame: number;
}

export const Title: React.FC<TitleProps> = ({ 
  text, 
  subtitle, 
  startFrame, 
  endFrame, 
  currentFrame 
}) => {
  const fadeIn = spring({
    frame: currentFrame - startFrame,
    fps: 40,
    config: {
      damping: 100,
    },
    durationInFrames: 30,
  });
  
  const fadeOut = spring({
    frame: endFrame - currentFrame,
    fps: 40,
    config: {
      damping: 100,
    },
    durationInFrames: 30,
  });
  
  const opacity = Math.min(fadeIn, fadeOut);
  
  const textSlide = interpolate(
    currentFrame,
    [startFrame, startFrame + 20],
    [-100, 0],
    { extrapolateRight: 'clamp' }
  );
  
  const subtitleSlide = interpolate(
    currentFrame,
    [startFrame + 10, startFrame + 30],
    [-100, 0],
    { extrapolateRight: 'clamp' }
  );
  
  return (
    <div style={{
      position: 'absolute',
      bottom: 100,
      left: 100,
      color: 'white',
      fontFamily: '"Arial", sans-serif',
      opacity,
      transform: `translateY(${textSlide * 0.5}px)`,
    }}>
      <h1 style={{
        fontSize: 60,
        fontWeight: 'bold',
        margin: 0,
        textShadow: '3px 3px 10px rgba(0, 0, 0, 0.8)',
        background: 'linear-gradient(90deg, #FFFFFF, #4FC3F7)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        transform: `translateY(${textSlide}px)`,
      }}>
        {text}
      </h1>
      
      {subtitle && (
        <p style={{
          fontSize: 28,
          margin: '20px 0 0 0',
          opacity: 0.9,
          textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8)',
          transform: `translateY(${subtitleSlide}px)`,
        }}>
          {subtitle}
        </p>
      )}
    </div>
  );
};