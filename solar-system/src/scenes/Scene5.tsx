// src/scenes/Scene5.tsx
import React, { useMemo } from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, Audio, staticFile } from 'remotion';

// Sun component with VISIBLE RAYS (same as Scene1)
const Sun: React.FC<{ size: number; glow: number }> = ({ size, glow }) => {
  return (
    <div style={{
      position: 'relative',
      width: size,
      height: size,
    }}>
      {/* Sun glow */}
      <div style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        width: size * 2.5,
        height: size * 2.5,
        background: 'radial-gradient(circle, rgba(255, 215, 0, 0.4) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(30px)',
        opacity: glow,
      }}/>
      
      {/* Sun core */}
      <div style={{
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle at 30% 30%, #FFD700, #FF8C00)',
        borderRadius: '50%',
        boxShadow: `
          0 0 ${size * 0.5}px ${size * 0.2}px rgba(255, 215, 0, ${glow * 0.8}),
          0 0 ${size}px ${size * 0.4}px rgba(255, 140, 0, ${glow * 0.6}),
          0 0 ${size * 1.5}px ${size * 0.6}px rgba(255, 69, 0, ${glow * 0.4})
        `,
        position: 'relative',
        zIndex: 2,
      }}/>
      
      {/* Solar flares - VISIBLE */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * 360;
        const flareLength = size * 1.5;
        
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: flareLength,
              height: 4,
              background: `linear-gradient(90deg, 
                transparent 0%, 
                rgba(255, 215, 0, 0.9) 30%, 
                rgba(255, 215, 0, 0.9) 70%, 
                transparent 100%)`,
              transform: `translate(-50%, -50%) rotate(${angle}deg)`,
              transformOrigin: 'center',
              filter: 'blur(1px)',
              zIndex: 1,
            }}
          />
        );
      })}
      
      {/* Outer glow for rays */}
      <div style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        width: size * 3,
        height: size * 3,
        background: 'radial-gradient(circle, rgba(255, 140, 0, 0.2) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(20px)',
        opacity: glow * 0.6,
        zIndex: 0,
      }}/>
    </div>
  );
};

// Earth component with cinematic atmospheric effects (same as Scene1)
const EarthPlanet: React.FC<{
  size: number;
  x: number;
  y: number;
  rotation: number;
  frame: number;
}> = ({ size, x, y, rotation, frame }) => {
  const atmospherePulse = interpolate(Math.sin(frame * 0.05), [-1, 1], [0.7, 1]);
  
  return (
    <div style={{
      position: 'absolute',
      left: `calc(50% + ${x}px)`,
      top: `calc(50% + ${y}px)`,
      transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
    }}>
      {/* Atmospheric glow - cinematic */}
      <div style={{
        position: 'absolute',
        top: '-40%',
        left: '-40%',
        width: '180%',
        height: '180%',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(135, 206, 235, 0.4) 0%, rgba(70, 130, 180, 0.2) 50%, transparent 70%)',
        filter: 'blur(30px)',
        opacity: atmospherePulse * 0.8,
        zIndex: -1,
      }}/>
      
      {/* Earth sphere */}
      <div style={{
        width: size,
        height: size,
        background: `radial-gradient(circle at 30% 30%, #1976D2, #1565C0, #0D47A1)`,
        borderRadius: '50%',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: `
          0 0 ${size * 0.5}px rgba(25, 118, 210, 0.6),
          0 0 ${size * 1}px rgba(25, 118, 210, 0.4),
          0 0 ${size * 1.5}px rgba(25, 118, 210, 0.2),
          inset -${size * 0.15}px -${size * 0.15}px ${size * 0.3}px rgba(0, 0, 0, 0.7),
          inset ${size * 0.1}px ${size * 0.1}px ${size * 0.2}px rgba(255, 255, 255, 0.4)
        `,
      }}>
        {/* Continent shapes - enhanced */}
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: `
            radial-gradient(ellipse at 55% 60%, #2E8B57 0%, #228B22 20%, transparent 25%),
            radial-gradient(ellipse at 25% 55%, #3CB371 0%, #32CD32 18%, transparent 26%),
            radial-gradient(ellipse at 70% 40%, #66CDAA 0%, #20B2AA 28%, transparent 32%),
            radial-gradient(ellipse at 85% 70%, #98FB98 0%, #90EE90 15%, transparent 19%),
            radial-gradient(ellipse at 50% 95%, #AFEEEE 0%, #7FFFD4 12%, transparent 15%)
          `,
          filter: 'blur(1px)',
          opacity: 0.9,
        }}/>
        
        {/* Cloud cover - animated */}
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: `
            radial-gradient(ellipse at ${10 + Math.sin(frame * 0.01) * 5}% 50%, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.7) 10%, transparent 12%),
            radial-gradient(ellipse at ${40 + Math.cos(frame * 0.015) * 8}% 45%, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.65) 8%, transparent 10%),
            radial-gradient(ellipse at ${75 + Math.sin(frame * 0.02) * 6}% 65%, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0.6) 9%, transparent 11%),
            radial-gradient(ellipse at 50% ${15 + Math.cos(frame * 0.01) * 4}%, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.55) 7%, transparent 9%)
          `,
          filter: 'blur(2px)',
          opacity: 0.7,
          mixBlendMode: 'overlay',
        }}/>
        
        {/* Specular highlight */}
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '20%',
          width: '30%',
          height: '30%',
          background: 'radial-gradient(ellipse, rgba(255, 255, 255, 0.6) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(5px)',
          opacity: 0.4,
        }}/>
      </div>
    </div>
  );
};

// Mercury component with glow (same as Scene1)
const MercuryPlanet: React.FC<{ size: number; x: number; y: number; rotation: number }> = ({ size, x, y, rotation }) => (
  <div style={{ 
    position: 'absolute', 
    left: `calc(50% + ${x}px)`, 
    top: `calc(50% + ${y}px)`, 
    transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
  }}>
    {/* Mercury glow */}
    <div style={{
      position: 'absolute',
      top: '-25%',
      left: '-25%',
      width: '150%',
      height: '150%',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(161, 136, 127, 0.3) 0%, transparent 70%)',
      filter: 'blur(15px)',
      opacity: 0.4,
      zIndex: -1,
    }}/>
    
    <div style={{ 
      width: size, 
      height: size, 
      background: 'radial-gradient(circle at 30% 30%, #D7CCC8, #BCAAA4, #8D6E63)',
      borderRadius: '50%',
      boxShadow: `
        0 0 ${size * 0.4}px rgba(161, 136, 127, 0.5),
        0 0 ${size * 0.8}px rgba(141, 110, 99, 0.3),
        0 0 ${size * 1.2}px rgba(109, 76, 65, 0.2),
        inset -${size * 0.15}px -${size * 0.15}px ${size * 0.3}px rgba(0, 0, 0, 0.7),
        inset ${size * 0.1}px ${size * 0.1}px ${size * 0.2}px rgba(255, 255, 255, 0.4)
      `,
    }}/>
  </div>
);

// Venus component with glow (same as Scene1)
const VenusPlanet: React.FC<{ size: number; x: number; y: number; rotation: number }> = ({ size, x, y, rotation }) => (
  <div style={{ 
    position: 'absolute', 
    left: `calc(50% + ${x}px)`, 
    top: `calc(50% + ${y}px)`, 
    transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
  }}>
    {/* Venus glow */}
    <div style={{
      position: 'absolute',
      top: '-30%',
      left: '-30%',
      width: '160%',
      height: '160%',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(255, 213, 79, 0.4) 0%, transparent 70%)',
      filter: 'blur(20px)',
      opacity: 0.5,
      zIndex: -1,
    }}/>
    
    <div style={{ 
      width: size, 
      height: size, 
      background: 'radial-gradient(circle at 30% 30%, #FFF59D, #FFF176, #FFEE58)',
      borderRadius: '50%',
      boxShadow: `
        0 0 ${size * 0.5}px rgba(255, 213, 79, 0.6),
        0 0 ${size * 1}px rgba(255, 202, 40, 0.4),
        0 0 ${size * 1.5}px rgba(255, 179, 0, 0.2),
        inset -${size * 0.15}px -${size * 0.15}px ${size * 0.3}px rgba(0, 0, 0, 0.7),
        inset ${size * 0.1}px ${size * 0.1}px ${size * 0.2}px rgba(255, 255, 255, 0.4)
      `,
    }}/>
  </div>
);

// Mars component with glow (same as Scene1)
const MarsPlanet: React.FC<{ size: number; x: number; y: number; rotation: number }> = ({ size, x, y, rotation }) => (
  <div style={{ 
    position: 'absolute', 
    left: `calc(50% + ${x}px)`, 
    top: `calc(50% + ${y}px)`, 
    transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
  }}>
    {/* Mars glow */}
    <div style={{
      position: 'absolute',
      top: '-25%',
      left: '-25%',
      width: '150%',
      height: '150%',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(239, 83, 80, 0.3) 0%, transparent 70%)',
      filter: 'blur(15px)',
      opacity: 0.4,
      zIndex: -1,
    }}/>
    
    <div style={{ 
      width: size, 
      height: size, 
      background: 'radial-gradient(circle at 30% 30%, #FF8A80, #FF5252, #D32F2F)',
      borderRadius: '50%',
      boxShadow: `
        0 0 ${size * 0.4}px rgba(239, 83, 80, 0.5),
        0 0 ${size * 0.8}px rgba(229, 57, 53, 0.3),
        0 0 ${size * 1.2}px rgba(198, 40, 40, 0.2),
        inset -${size * 0.15}px -${size * 0.15}px ${size * 0.3}px rgba(0, 0, 0, 0.7),
        inset ${size * 0.1}px ${size * 0.1}px ${size * 0.2}px rgba(255, 255, 255, 0.4)
      `,
    }}/>
  </div>
);

// Jupiter component with glow (same as Scene1)
const JupiterPlanet: React.FC<{ size: number; x: number; y: number; rotation: number; frame: number }> = ({ size, x, y, rotation, frame }) => {
  const bandAnimation = Math.sin(frame * 0.02) * 5;
  const glowPulse = interpolate(Math.sin(frame * 0.03), [-1, 1], [0.6, 1]);
  
  return (
    <div style={{ 
      position: 'absolute', 
      left: `calc(50% + ${x}px)`, 
      top: `calc(50% + ${y}px)`, 
      transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
    }}>
      {/* Jupiter glow */}
      <div style={{
        position: 'absolute',
        top: '-40%',
        left: '-40%',
        width: '180%',
        height: '180%',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255, 152, 0, 0.4) 0%, transparent 70%)',
        filter: 'blur(30px)',
        opacity: 0.5 * glowPulse,
        zIndex: -1,
      }}/>
      
      <div style={{ 
        width: size, 
        height: size, 
        background: 'linear-gradient(45deg, #FFB74D, #FF9800, #F57C00, #E65100)',
        borderRadius: '50%',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: `
          0 0 ${size * 0.8}px rgba(255, 152, 0, 0.7),
          0 0 ${size * 1.5}px rgba(255, 111, 0, 0.5),
          0 0 ${size * 2}px rgba(230, 81, 0, 0.3),
          inset -${size * 0.15}px -${size * 0.15}px ${size * 0.3}px rgba(0, 0, 0, 0.7),
          inset ${size * 0.1}px ${size * 0.1}px ${size * 0.2}px rgba(255, 255, 255, 0.4)
        `,
      }}>
        {/* Jupiter's bands */}
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: `
            linear-gradient(to bottom, 
              transparent 0%,
              rgba(230, 81, 0, 0.8) ${10 + bandAnimation}%,
              rgba(255, 152, 0, 0.6) ${20 + bandAnimation}%,
              rgba(245, 124, 0, 0.7) ${35 + bandAnimation}%,
              transparent 45%,
              rgba(230, 81, 0, 0.8) 55%,
              rgba(255, 152, 0, 0.6) 65%,
              rgba(245, 124, 0, 0.7) 80%,
              transparent 90%
            )
          `,
          filter: 'blur(2px)',
          opacity: 0.8,
        }}/>
        
        {/* Great Red Spot */}
        <div style={{
          position: 'absolute',
          top: '40%',
          left: '60%',
          width: size * 0.3,
          height: size * 0.15,
          background: 'radial-gradient(ellipse, #B71C1C, #D32F2F)',
          borderRadius: '50%',
          filter: 'blur(3px)',
          transform: 'rotate(20deg)',
          opacity: 0.9,
          boxShadow: `0 0 ${size * 0.1}px rgba(183, 28, 28, 0.8)`,
        }}/>
      </div>
    </div>
  );
};

// Saturn component with glowing rings (same as Scene1)
const SaturnPlanet: React.FC<{ size: number; x: number; y: number; rotation: number }> = ({ size, x, y, rotation }) => {
  const ringRotation = rotation * 0.02;
  
  return (
    <div style={{ 
      position: 'absolute', 
      left: `calc(50% + ${x}px)`, 
      top: `calc(50% + ${y}px)`, 
      transform: `translate(-50%, -50%)`,
    }}>
      {/* Saturn glow */}
      <div style={{
        position: 'absolute',
        top: '-35%',
        left: '-35%',
        width: '170%',
        height: '170%',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255, 224, 130, 0.4) 0%, transparent 70%)',
        filter: 'blur(25px)',
        opacity: 0.5,
        zIndex: -1,
      }}/>
      
      {/* Rings with glow */}
      <div style={{ 
        position: 'absolute', 
        left: '50%', 
        top: '50%', 
        transform: `translate(-50%, -50%) rotateX(75deg) rotate(${ringRotation}deg)`, 
        width: size * 3.2, 
        height: size * 0.3, 
        border: `${size * 0.15}px solid rgba(240, 240, 255, 0.9)`,
        borderRadius: '50%',
        boxShadow: `
          0 0 ${size * 0.3}px rgba(240, 240, 255, 0.8),
          0 0 ${size * 0.6}px rgba(220, 220, 240, 0.6),
          0 0 ${size * 0.9}px rgba(200, 200, 220, 0.4)
        `,
      }}/>
      
      {/* Inner ring shadow */}
      <div style={{ 
        position: 'absolute', 
        left: '50%', 
        top: '50%', 
        transform: `translate(-50%, -50%) rotateX(75deg) rotate(${ringRotation}deg)`, 
        width: size * 2.4, 
        height: size * 0.3, 
        border: `${size * 0.1}px solid rgba(200, 200, 220, 0.4)`,
        borderRadius: '50%',
      }}/>
      
      {/* Planet */}
      <div style={{ 
        position: 'absolute', 
        left: '50%', 
        top: '50%', 
        transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
      }}>
        <div style={{ 
          width: size, 
          height: size, 
          background: 'linear-gradient(45deg, #FFE0B2, #FFCC80, #FFB74D)',
          borderRadius: '50%',
          boxShadow: `
            0 0 ${size * 0.6}px rgba(255, 224, 178, 0.6),
            0 0 ${size * 1.2}px rgba(255, 204, 128, 0.4),
            0 0 ${size * 1.8}px rgba(255, 183, 77, 0.2),
            inset -${size * 0.15}px -${size * 0.15}px ${size * 0.3}px rgba(0, 0, 0, 0.7),
            inset ${size * 0.1}px ${size * 0.1}px ${size * 0.2}px rgba(255, 255, 255, 0.4)
          `,
        }}/>
      </div>
    </div>
  );
};

// Uranus component with glow (same as Scene1)
const UranusPlanet: React.FC<{ size: number; x: number; y: number; rotation: number }> = ({ size, x, y, rotation }) => (
  <div style={{ 
    position: 'absolute', 
    left: `calc(50% + ${x}px)`, 
    top: `calc(50% + ${y}px)`, 
    transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
  }}>
    {/* Uranus glow */}
    <div style={{
      position: 'absolute',
      top: '-30%',
      left: '-30%',
      width: '160%',
      height: '160%',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(178, 235, 242, 0.3) 0%, transparent 70%)',
      filter: 'blur(20px)',
      opacity: 0.4,
      zIndex: -1,
    }}/>
    
    <div style={{ 
      width: size, 
      height: size, 
      background: 'radial-gradient(circle at 30% 30%, #B2EBF2, #80DEEA, #4DD0E1)',
      borderRadius: '50%',
      boxShadow: `
        0 0 ${size * 0.5}px rgba(178, 235, 242, 0.5),
        0 0 ${size * 1}px rgba(128, 222, 234, 0.3),
        0 0 ${size * 1.5}px rgba(77, 208, 225, 0.2),
        inset -${size * 0.15}px -${size * 0.15}px ${size * 0.3}px rgba(0, 0, 0, 0.7),
        inset ${size * 0.1}px ${size * 0.1}px ${size * 0.2}px rgba(255, 255, 255, 0.4)
      `,
    }}/>
  </div>
);

// Neptune component with glow (same as Scene1)
const NeptunePlanet: React.FC<{ size: number; x: number; y: number; rotation: number }> = ({ size, x, y, rotation }) => (
  <div style={{ 
    position: 'absolute', 
    left: `calc(50% + ${x}px)`, 
    top: `calc(50% + ${y}px)`, 
    transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
  }}>
    {/* Neptune glow */}
    <div style={{
      position: 'absolute',
      top: '-30%',
      left: '-30%',
      width: '160%',
      height: '160%',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(92, 107, 192, 0.3) 0%, transparent 70%)',
      filter: 'blur(20px)',
      opacity: 0.4,
      zIndex: -1,
    }}/>
    
    <div style={{ 
      width: size, 
      height: size, 
      background: 'radial-gradient(circle at 30% 30%, #7986CB, #5C6BC0, #3F51B5)',
      borderRadius: '50%',
      boxShadow: `
        0 0 ${size * 0.5}px rgba(121, 134, 203, 0.5),
        0 0 ${size * 1}px rgba(92, 107, 192, 0.3),
        0 0 ${size * 1.5}px rgba(63, 81, 181, 0.2),
        inset -${size * 0.15}px -${size * 0.15}px ${size * 0.3}px rgba(0, 0, 0, 0.7),
        inset ${size * 0.1}px ${size * 0.1}px ${size * 0.2}px rgba(255, 255, 255, 0.4)
      `,
    }}/>
  </div>
);

export const Scene5: React.FC = () => {
  const frame = useCurrentFrame();
  const totalFrames = 400; // 10 seconds at 40fps
  
  // Dramatic camera zoom out: start close on Sun, end with full solar system
  const zoom = interpolate(frame, [0, totalFrames], [3, 0.15], {
    extrapolateRight: 'clamp',
  });
  
  // Sun glow animation (same as Scene1)
  const sunGlow = interpolate(
    Math.sin(frame * 0.02),
    [-1, 1],
    [0.7, 1]
  );
  
  // Sun size - fixed to 100 (same as Scene1), but scales with zoom
  const sunSize = 100;
  
  // Planets data with EXACT SAME SIZES as Scene1
  const planets = [
    { type: 'mercury', size: 15, orbitRadius: 130, startAngle: 0, rotationSpeed: 0.5 },
    { type: 'venus', size: 22, orbitRadius: 190, startAngle: Math.PI / 2.5, rotationSpeed: 0.4 },
    { type: 'earth', size: 25, orbitRadius: 260, startAngle: Math.PI / 1.8, rotationSpeed: 1.2 },
    { type: 'mars', size: 18, orbitRadius: 330, startAngle: Math.PI, rotationSpeed: 0.8 },
    { type: 'jupiter', size: 65, orbitRadius: 450, startAngle: Math.PI / 3, rotationSpeed: 0.7 },
    { type: 'saturn', size: 55, orbitRadius: 580, startAngle: (2 * Math.PI) / 3, rotationSpeed: 0.6 },
    { type: 'uranus', size: 35, orbitRadius: 700, startAngle: Math.PI / 4, rotationSpeed: 0.5 },
    { type: 'neptune', size: 34, orbitRadius: 820, startAngle: (3 * Math.PI) / 4, rotationSpeed: 0.5 },
  ];
  
  // Additional outer dwarf planets for scale (smaller than Scene1's planets)
  const dwarfPlanets = [
    { size: 8, orbitRadius: 1150, startAngle: Math.PI / 5, color: '#888888', rotationSpeed: 0.3 },
    { size: 8, orbitRadius: 1250, startAngle: (2 * Math.PI) / 5, color: '#AAAAAA', rotationSpeed: 0.2 },
    { size: 8, orbitRadius: 1350, startAngle: (3 * Math.PI) / 5, color: '#CCCCCC', rotationSpeed: 0.1 },
  ];
  
  // Kuiper belt particles
  const kuiperBelt = useMemo(() => {
    return Array.from({ length: 150 }).map((_, i) => ({
      orbitRadius: 1050 + Math.random() * 400,
      startAngle: Math.random() * Math.PI * 2,
      size: 0.8 + Math.random() * 2,
      speed: 0.0001 + Math.random() * 0.0002,
    }));
  }, []);
  
  // Background stars (same as Scene1 but more for wide view)
  const stars = useMemo(() => {
    return Array.from({ length: 1000 }).map((_, i) => ({
      x: Math.random() * 200 - 50, // Wider spread for zoom out
      y: Math.random() * 200 - 50,
      size: Math.random() * 4 + 0.5,
      opacity: 0.2 + Math.random() * 0.8,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      twinklePhase: Math.random() * Math.PI * 2,
      depth: Math.random() * 3 + 0.5, // For parallax effect
    }));
  }, []);
  
  // Lens flares for cinematic effect (same as Scene1)
  const lensFlares = useMemo(() => {
    return Array.from({ length: 8 }).map((_, i) => ({
      size: 100 + Math.random() * 300,
      opacity: 0.05 + Math.random() * 0.1,
      x: 30 + Math.random() * 40,
      y: 20 + Math.random() * 60,
      rotation: Math.random() * 360,
    }));
  }, []);

  return (
    <AbsoluteFill style={{ 
      backgroundColor: '#000000',
      overflow: 'hidden',
    }}>
      
      {/* AUDIO NARRATION - 10 seconds */}
      <Audio 
        src={staticFile('scene5-narration.m4a')} 
        volume={1}
      />
      
      {/* DEEP SPACE GRADIENT (same as Scene1) */}
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        background: 'radial-gradient(ellipse at center, #0a0a2a 0%, #000814 40%, #000000 100%)',
      }}/>
      
      {/* CINEMATIC STARFIELD WITH PARALLAX (same as Scene1 but more stars) */}
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
      }}>
        {stars.map((star, i) => {
          const twinkle = Math.sin(frame * star.twinkleSpeed + star.twinklePhase) * 0.5 + 0.5;
          const parallaxFactor = 1 / star.depth;
          const parallaxX = (frame * 0.01 * parallaxFactor) % 200;
          const parallaxY = (frame * 0.005 * parallaxFactor) % 200;
          
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: `${((star.x + parallaxX + 50) % 200) / 2}%`,
                top: `${((star.y + parallaxY + 50) % 200) / 2}%`,
                width: star.size,
                height: star.size,
                backgroundColor: 'white',
                borderRadius: '50%',
                opacity: star.opacity * twinkle * (0.5 + 0.5 * parallaxFactor),
                filter: `blur(${star.size * 0.3}px)`,
              }}
            />
          );
        })}
      </div>
      
      {/* CINEMATIC NEBULA (same as Scene1 but adjusted for wide view) */}
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        background: `
          radial-gradient(circle at 20% 30%, rgba(100, 0, 200, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 80% 70%, rgba(0, 100, 200, 0.2) 0%, transparent 50%),
          radial-gradient(circle at 50% 50%, rgba(200, 100, 0, 0.15) 0%, transparent 60%)
        `,
        filter: 'blur(150px)',
        opacity: 0.2,
        mixBlendMode: 'screen',
      }}/>
      
      {/* LENS FLARES (same as Scene1) */}
      {lensFlares.map((flare, i) => {
        const flareOpacity = interpolate(
          Math.sin(frame * 0.01 + i),
          [-1, 1],
          [flare.opacity * 0.5, flare.opacity * 1.5]
        );
        
        return (
          <div
            key={`flare-${i}`}
            style={{
              position: 'absolute',
              left: `${flare.x}%`,
              top: `${flare.y}%`,
              width: flare.size,
              height: flare.size,
              background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
              borderRadius: '50%',
              filter: 'blur(40px)',
              opacity: flareOpacity,
              transform: `rotate(${flare.rotation}deg)`,
              mixBlendMode: 'screen',
            }}
          />
        );
      })}
      
      {/* Camera zoom container */}
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        transform: `scale(${zoom})`,
        transformOrigin: 'center',
        transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
      }}>
        {/* ORBITAL LINES - Cinematic glow (same as Scene1) */}
        {planets.map((planet, index) => {
          const lineGlow = interpolate(
            Math.sin(frame * 0.01 + index),
            [-1, 1],
            [0.05, 0.15]
          );
          
          const visibleAtZoom = interpolate(zoom, [0.15, 1, 3], [1, 0.5, 0]);
          
          return (
            <div
              key={`orbit-${index}`}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                width: planet.orbitRadius * 2,
                height: planet.orbitRadius * 2 * 0.6,
                border: `1px solid rgba(100, 150, 255, ${lineGlow * visibleAtZoom})`,
                borderRadius: '50%',
                transform: 'translate(-50%, -50%)',
                boxShadow: `0 0 20px rgba(100, 150, 255, ${lineGlow * 0.5 * visibleAtZoom})`,
              }}
            />
          );
        })}
        
        {/* Kuiper belt particles */}
        {kuiperBelt.map((particle, i) => {
          const orbitProgress = frame * particle.speed + particle.startAngle;
          const x = particle.orbitRadius * Math.cos(orbitProgress);
          const y = particle.orbitRadius * Math.sin(orbitProgress) * 0.6;
          
          const visibleAtZoom = interpolate(zoom, [0.15, 0.5, 3], [1, 0.3, 0]);
          
          return (
            <div
              key={`kuiper-${i}`}
              style={{
                position: 'absolute',
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                width: particle.size,
                height: particle.size,
                backgroundColor: 'rgba(200, 200, 255, 0.3)',
                borderRadius: '50%',
                opacity: 0.2 * visibleAtZoom,
                filter: 'blur(0.5px)',
              }}
            />
          );
        })}
        
        {/* SUN - Cinematic centerpiece (same size as Scene1) */}
        <div style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}>
          <Sun size={sunSize} glow={sunGlow} />
        </div>
        
        {/* PLANETS - Cinematic versions with glow (SAME SIZES as Scene1) */}
        {planets.map((planet, index) => {
          const orbitalSpeed = 0.004 * (1 / (index + 1));
          const orbitProgress = frame * orbitalSpeed + planet.startAngle;
          const x = planet.orbitRadius * Math.cos(orbitProgress);
          const y = planet.orbitRadius * Math.sin(orbitProgress) * 0.6;
          const rotation = frame * planet.rotationSpeed;
          
          switch (planet.type) {
            case 'mercury': 
              return <MercuryPlanet key={index} size={planet.size} x={x} y={y} rotation={rotation} />;
            case 'venus': 
              return <VenusPlanet key={index} size={planet.size} x={x} y={y} rotation={rotation} />;
            case 'earth': 
              return <EarthPlanet key={index} size={planet.size} x={x} y={y} rotation={rotation} frame={frame} />;
            case 'mars': 
              return <MarsPlanet key={index} size={planet.size} x={x} y={y} rotation={rotation} />;
            case 'jupiter': 
              return <JupiterPlanet key={index} size={planet.size} x={x} y={y} rotation={rotation} frame={frame} />;
            case 'saturn': 
              return <SaturnPlanet key={index} size={planet.size} x={x} y={y} rotation={rotation} />;
            case 'uranus': 
              return <UranusPlanet key={index} size={planet.size} x={x} y={y} rotation={rotation} />;
            case 'neptune': 
              return <NeptunePlanet key={index} size={planet.size} x={x} y={y} rotation={rotation} />;
            default: 
              return null;
          }
        })}
        
        {/* DWARF PLANETS (Outer reaches) */}
        {dwarfPlanets.map((planet, index) => {
          const orbitalSpeed = 0.001 * (1 / (index + 1));
          const orbitProgress = frame * orbitalSpeed + planet.startAngle;
          const x = planet.orbitRadius * Math.cos(orbitProgress);
          const y = planet.orbitRadius * Math.sin(orbitProgress) * 0.6;
          const rotation = frame * planet.rotationSpeed;
          
          const visibleAtZoom = interpolate(zoom, [0.15, 0.8], [1, 0]);
          
          if (visibleAtZoom > 0.01) {
            return (
              <div key={`dwarf-${index}`} style={{ 
                position: 'absolute', 
                left: `calc(50% + ${x}px)`, 
                top: `calc(50% + ${y}px)`, 
                transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
              }}>
                {/* Dwarf planet glow */}
                <div style={{
                  position: 'absolute',
                  top: '-25%',
                  left: '-25%',
                  width: '150%',
                  height: '150%',
                  borderRadius: '50%',
                  background: `radial-gradient(circle, ${planet.color}30 0%, transparent 70%)`,
                  filter: 'blur(15px)',
                  opacity: 0.3 * visibleAtZoom,
                  zIndex: -1,
                }}/>
                
                <div style={{ 
                  width: planet.size, 
                  height: planet.size, 
                  background: `radial-gradient(circle at 30% 30%, ${planet.color}, ${planet.color}CC, ${planet.color}99)`,
                  borderRadius: '50%',
                  opacity: visibleAtZoom,
                  boxShadow: `
                    0 0 ${planet.size * 0.4}px ${planet.color}80,
                    0 0 ${planet.size * 0.8}px ${planet.color}60,
                    0 0 ${planet.size * 1.2}px ${planet.color}40,
                    inset -${planet.size * 0.1}px -${planet.size * 0.1}px ${planet.size * 0.2}px rgba(0, 0, 0, 0.7),
                    inset ${planet.size * 0.05}px ${planet.size * 0.05}px ${planet.size * 0.1}px rgba(255, 255, 255, 0.4)
                  `,
                }}/>
              </div>
            );
          }
          return null;
        })}
        
    
         {/* TRAILING EFFECTS FOR INNER PLANETS (same as Scene1) */}
         {planets.slice(0, 4).map((planet, index) => {
          const orbitalSpeed = 0.004 * (1 / (index + 1));
          const orbitProgress = frame * orbitalSpeed + planet.startAngle;
          const x = planet.orbitRadius * Math.cos(orbitProgress);
          const y = planet.orbitRadius * Math.sin(orbitProgress) * 0.6;


       // FIXED: Changed input range to be strictly increasing
         const visibleAtZoom = interpolate(zoom, [0.15, 1.5], [0.3, 1]);
  
         return (
           <div
            key={`trail-${index}`}
            style={{
              position: 'absolute',
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
              width: planet.size * 3,
              height: planet.size * 3,
              background: 'radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 70%)',
              borderRadius: '50%',
              transform: 'translate(-50%, -50%)',
              filter: 'blur(10px)',
              opacity: 0.3 * visibleAtZoom,
            }}
          />
        );
     })}
        
        {/* CINEMATIC SPACE DUST (same as Scene1) */}
        {Array.from({ length: 30 }).map((_, i) => {
          const angle = (i / 30) * Math.PI * 2 + frame * 0.0015;
          const radius = 80 + (i % 8) * 100;
          const particleX = radius * Math.cos(angle);
          const particleY = radius * Math.sin(angle) * 0.6;
          
          const opacity = interpolate(
            Math.sin(frame * 0.02 + i * 0.3),
            [-1, 1],
            [0.02, 0.1]
          );
          
          const size = 1 + Math.sin(frame * 0.03 + i) * 0.5;
          
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: `calc(50% + ${particleX}px)`,
                top: `calc(50% + ${particleY}px)`,
                width: size,
                height: size,
                backgroundColor: 'white',
                borderRadius: '50%',
                opacity,
                filter: 'blur(0.8px)',
                boxShadow: '0 0 5px rgba(255, 255, 255, 0.5)',
              }}
            />
          );
        })}
      </div>
      
      {/* CINEMATIC VIGNETTE (same as Scene1) */}
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle at 50% 50%, transparent 20%, rgba(0, 0, 0, 0.7) 70%, rgba(0, 0, 0, 0.9) 100%)',
        pointerEvents: 'none',
        mixBlendMode: 'multiply',
      }}/>
      
      {/* FILM GRAIN EFFECT (same as Scene1) */}
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundImage: `
          linear-gradient(transparent 0%, rgba(0, 0, 0, 0.1) 2%, transparent 4%),
          linear-gradient(90deg, transparent 0%, rgba(0, 0, 0, 0.05) 2%, transparent 4%)
        `,
        backgroundSize: '200px 200px',
        opacity: 0.03,
        pointerEvents: 'none',
        mixBlendMode: 'overlay',
      }}/>
      
      {/* Title animation - fades in as we zoom out */}
      <div style={{
        position: 'absolute',
        top: 80,
        left: '50%',
        transform: 'translateX(-50%)',
        color: 'white',
        fontFamily: "'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif",
        fontSize: 48,
        fontWeight: 700,
        textAlign: 'center',
        background: 'linear-gradient(90deg, #FFD700, #FF8C00)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        letterSpacing: '2px',
        textShadow: '0 0 30px rgba(255, 215, 0, 0.3)',
        opacity: interpolate(zoom, [0.15, 1, 2], [1, 0.5, 0]),
        transition: 'opacity 0.5s ease',
      }}>
        Our Solar System
      </div>
      
      {/* Subtitle - appears in middle of zoom */}
      <div style={{
        position: 'absolute',
        top: 140,
        left: '50%',
        transform: 'translateX(-50%)',
        color: '#aaa',
        fontFamily: "'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif",
        fontSize: 24,
        textAlign: 'center',
        opacity: interpolate(zoom, [0.15, 0.8, 1.5], [0, 1, 0]),
        transition: 'opacity 0.5s ease',
        maxWidth: '80%',
        lineHeight: 1.4,
      }}>
        A journey from the Sun to the outer reaches
      </div>
      
      {/* Timeline progress indicator */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: 3,
        background: 'linear-gradient(90deg, #FFD700, #FF8C00)',
        transform: `scaleX(${frame / totalFrames})`,
        transformOrigin: 'left center',
        opacity: 0.3,
      }}/>
    </AbsoluteFill>
  );
};