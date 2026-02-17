// src/components/Planet.tsx
import React from 'react';
import { useCurrentFrame } from 'remotion';

interface PlanetProps {
  color: string;
  size: number;
  hasRing: boolean;
  rotationSpeed: number;
}

export const Planet: React.FC<PlanetProps> = ({ 
  color, 
  size, 
  hasRing, 
  rotationSpeed 
}) => {
  const frame = useCurrentFrame();
  const rotation = frame * rotationSpeed;
  
  return (
    <div style={{
      position: 'relative',
      width: size,
      height: size,
      transform: `rotate(${rotation}deg)`,
    }}>
      {/* Planet sphere */}
      <div style={{
        width: '100%',
        height: '100%',
        background: `radial-gradient(circle at 30% 30%, ${color}, ${darkenColor(color, 30)})`,
        borderRadius: '50%',
        boxShadow: `
          inset -${size * 0.1}px -${size * 0.1}px ${size * 0.2}px rgba(0, 0, 0, 0.5),
          inset ${size * 0.1}px ${size * 0.1}px ${size * 0.2}px rgba(255, 255, 255, 0.3),
          0 0 ${size * 0.3}px ${size * 0.1}px rgba(255, 255, 255, 0.2)
        `,
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Planet texture/details */}
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: `radial-gradient(circle at 70% 30%, transparent 30%, rgba(0, 0, 0, 0.2) 100%)`,
        }}/>
      </div>
      
      {/* Planetary ring */}
      {hasRing && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%) rotateX(60deg)',
          width: size * 2.5,
          height: size * 0.3,
          backgroundColor: 'transparent',
          border: `${size * 0.1}px solid rgba(200, 200, 220, 0.7)`,
          borderRadius: '50%',
          filter: 'blur(1px)',
          opacity: 0.8,
        }}>
          {/* Ring inner shadow */}
          <div style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            border: `${size * 0.05}px solid rgba(0, 0, 0, 0.3)`,
            boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.5)',
          }}/>
        </div>
      )}
      
      {/* Atmospheric glow */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        left: '-10%',
        width: '120%',
        height: '120%',
        borderRadius: '50%',
        background: `radial-gradient(circle, ${color}20 0%, transparent 70%)`,
        filter: 'blur(10px)',
        opacity: 0.5,
      }}/>
    </div>
  );
};

// Helper function to darken colors
function darkenColor(color: string, percent: number): string {
  const num = parseInt(color.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) - amt;
  const G = (num >> 8 & 0x00FF) - amt;
  const B = (num & 0x0000FF) - amt;
  
  return "#" + (
    0x1000000 +
    (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
    (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
    (B < 255 ? (B < 1 ? 0 : B) : 255)
  )
  .toString(16)
  .slice(1);
}