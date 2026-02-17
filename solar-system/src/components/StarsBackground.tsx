// src/components/StarsBackground.tsx
import React, { useMemo } from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

export const StarsBackground: React.FC = () => {
  const frame = useCurrentFrame();
  
  const stars = useMemo(() => {
    return Array.from({ length: 300 }).map((_, i) => {
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const size = Math.random() * 2 + 0.5;
      const twinkle = Math.sin(frame * 0.05 + i) * 0.5 + 0.5;
      
      return {
        x,
        y,
        size,
        twinkle,
        opacity: interpolate(twinkle, [0, 1], [0.3, 1])
      };
    });
  }, [frame]);
  
  return (
    <div style={{
      position: 'absolute',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(180deg, #000814 0%, #001233 100%)',
    }}>
      {stars.map((star, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            backgroundColor: '#ffffff',
            borderRadius: '50%',
            opacity: star.opacity,
            filter: 'blur(0.5px)',
            boxShadow: `0 0 ${star.size * 2}px ${star.size}px rgba(255, 255, 255, 0.3)`,
          }}
        />
      ))}
    </div>
  );
};