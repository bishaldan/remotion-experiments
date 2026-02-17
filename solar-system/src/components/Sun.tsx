// src/components/Sun.tsx
import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';

interface SunProps {
  size: number;
  glowIntensity: number;
  rotationSpeed: number;
}

export const Sun: React.FC<SunProps> = ({ size, glowIntensity, rotationSpeed }) => {
  const frame = useCurrentFrame();
  
  const rotation = frame * rotationSpeed;
  
  const flareOpacity = interpolate(
    Math.sin(frame * 0.2),
    [-1, 1],
    [0.3, 0.7]
  );
  
  return (
    <div style={{
      position: 'relative',
      width: size,
      height: size,
      transform: `rotate(${rotation}deg)`,
    }}>
      {/* Sun core */}
      <div style={{
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle at 30% 30%, #FFD700, #FF8C00)',
        borderRadius: '50%',
        boxShadow: `
          0 0 ${size * 0.5}px ${size * 0.2}px rgba(255, 215, 0, ${glowIntensity * 0.8}),
          0 0 ${size}px ${size * 0.4}px rgba(255, 140, 0, ${glowIntensity * 0.6}),
          0 0 ${size * 1.5}px ${size * 0.6}px rgba(255, 69, 0, ${glowIntensity * 0.4})
        `,
      }}/>
      
      {/* Solar flares */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * 360;
        const flareLength = size * 0.8 + Math.sin(frame * 0.1 + i) * size * 0.1;
        
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: flareLength,
              height: 4,
              background: `linear-gradient(90deg, transparent, rgba(255, 215, 0, ${flareOpacity}), transparent)`,
              transform: `translate(-50%, -50%) rotate(${angle}deg)`,
              transformOrigin: 'left center',
              filter: 'blur(1px)',
            }}
          />
        );
      })}
      
      {/* Surface granules */}
      {Array.from({ length: 20 }).map((_, i) => {
        const angle = Math.random() * 360;
        const distance = Math.random() * size * 0.4;
        const granuleSize = Math.random() * size * 0.1 + size * 0.02;
        
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
              width: granuleSize,
              height: granuleSize,
              backgroundColor: '#FF4500',
              borderRadius: '50%',
              filter: 'blur(2px)',
              opacity: 0.6 + Math.sin(frame * 0.2 + i) * 0.2,
            }}
          />
        );
      })}
    </div>
  );
};