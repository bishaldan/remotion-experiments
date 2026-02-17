// src/scenes/Scene2.tsx
import React, { useMemo } from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, Audio, staticFile } from 'remotion';

// ============= COMPONENTS MUST BE DEFINED OUTSIDE =============

// Sun component with PROPERLY CENTERED rays (enhanced from Scene1)
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

// Earth component with cinematic atmospheric effects from Scene1
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
        boxShadow: `
          inset -${size * 0.15}px -${size * 0.15}px ${size * 0.3}px rgba(0, 0, 0, 0.7),
          inset ${size * 0.1}px ${size * 0.1}px ${size * 0.2}px rgba(255, 255, 255, 0.4),
          0 0 ${size * 0.4}px ${size * 0.15}px rgba(255, 255, 255, 0.3)
        `,
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Continent shapes - enhanced from Scene1 */}
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
        
        {/* Cloud cover - animated from Scene1 */}
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
        
        {/* Specular highlight from Scene1 */}
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

// Mercury component with Scene1 lighting
const MercuryPlanet: React.FC<{ 
  size: number; 
  x: number; 
  y: number; 
  rotation: number 
}> = ({ size, x, y, rotation }) => (
  <div style={{ 
    position: 'absolute', 
    left: `calc(50% + ${x}px)`, 
    top: `calc(50% + ${y}px)`, 
    transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
  }}>
    <div style={{ 
      width: size, 
      height: size, 
      background: 'radial-gradient(circle at 30% 30%, #D7CCC8, #BCAAA4, #8D6E63)',
      borderRadius: '50%',
      boxShadow: `
        inset -${size * 0.15}px -${size * 0.15}px ${size * 0.3}px rgba(0, 0, 0, 0.7),
        inset ${size * 0.1}px ${size * 0.1}px ${size * 0.2}px rgba(255, 255, 255, 0.4),
        0 0 ${size * 0.3}px ${size * 0.1}px rgba(255, 255, 255, 0.2)
      `,
      position: 'relative',
    }}/>
  </div>
);

// Venus component with Scene1 lighting
const VenusPlanet: React.FC<{ 
  size: number; 
  x: number; 
  y: number; 
  rotation: number 
}> = ({ size, x, y, rotation }) => (
  <div style={{ 
    position: 'absolute', 
    left: `calc(50% + ${x}px)`, 
    top: `calc(50% + ${y}px)`, 
    transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
  }}>
    <div style={{ 
      width: size, 
      height: size, 
      background: 'radial-gradient(circle at 30% 30%, #FFF59D, #FFF176, #FFEE58)',
      borderRadius: '50%',
      boxShadow: `
        inset -${size * 0.15}px -${size * 0.15}px ${size * 0.3}px rgba(0, 0, 0, 0.7),
        inset ${size * 0.1}px ${size * 0.1}px ${size * 0.2}px rgba(255, 255, 255, 0.4),
        0 0 ${size * 0.3}px ${size * 0.1}px rgba(255, 255, 255, 0.2)
      `,
      position: 'relative',
    }}/>
  </div>
);

// Mars component with Scene1 lighting
const MarsPlanet: React.FC<{ 
  size: number; 
  x: number; 
  y: number; 
  rotation: number 
}> = ({ size, x, y, rotation }) => (
  <div style={{ 
    position: 'absolute', 
    left: `calc(50% + ${x}px)`, 
    top: `calc(50% + ${y}px)`, 
    transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
  }}>
    <div style={{ 
      width: size, 
      height: size, 
      background: 'radial-gradient(circle at 30% 30%, #FF8A80, #FF5252, #D32F2F)',
      borderRadius: '50%',
      boxShadow: `
        inset -${size * 0.15}px -${size * 0.15}px ${size * 0.3}px rgba(0, 0, 0, 0.7),
        inset ${size * 0.1}px ${size * 0.1}px ${size * 0.2}px rgba(255, 255, 255, 0.4),
        0 0 ${size * 0.3}px ${size * 0.1}px rgba(255, 255, 255, 0.2)
      `,
      position: 'relative',
    }}/>
  </div>
);

// Jupiter component with animated bands from Scene1
const JupiterPlanet: React.FC<{ 
  size: number; 
  x: number; 
  y: number; 
  rotation: number; 
  frame: number 
}> = ({ size, x, y, rotation, frame }) => {
  const bandAnimation = Math.sin(frame * 0.02) * 5;
  
  return (
    <div style={{ 
      position: 'absolute', 
      left: `calc(50% + ${x}px)`, 
      top: `calc(50% + ${y}px)`, 
      transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
    }}>
      <div style={{ 
        width: size, 
        height: size, 
        background: 'linear-gradient(45deg, #FFB74D, #FF9800, #F57C00, #E65100)',
        borderRadius: '50%',
        boxShadow: `
          inset -${size * 0.15}px -${size * 0.15}px ${size * 0.3}px rgba(0, 0, 0, 0.7),
          inset ${size * 0.1}px ${size * 0.1}px ${size * 0.2}px rgba(255, 255, 255, 0.4),
          0 0 ${size * 0.4}px ${size * 0.15}px rgba(255, 255, 255, 0.3)
        `,
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Jupiter's bands - animated from Scene1 */}
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
        
        {/* Great Red Spot from Scene1 */}
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
        }}/>
        
        {/* Specular highlight */}
        <div style={{
          position: 'absolute',
          top: '25%',
          left: '25%',
          width: '20%',
          height: '20%',
          background: 'radial-gradient(ellipse, rgba(255, 255, 255, 0.5) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(3px)',
          opacity: 0.3,
        }}/>
      </div>
    </div>
  );
};

// Saturn component with glowing rings from Scene1
const SaturnPlanet: React.FC<{ 
  size: number; 
  x: number; 
  y: number; 
  rotation: number 
}> = ({ size, x, y, rotation }) => {
  const ringRotation = rotation * 0.02;
  
  return (
    <div style={{ 
      position: 'absolute', 
      left: `calc(50% + ${x}px)`, 
      top: `calc(50% + ${y}px)`, 
      transform: `translate(-50%, -50%)`,
    }}>
      {/* Rings with glow from Scene1 */}
      <div style={{ 
        position: 'absolute', 
        left: '50%', 
        top: '50%', 
        transform: `translate(-50%, -50%) rotateX(75deg) rotate(${ringRotation}deg)`, 
        width: size * 3.2, 
        height: size * 0.3, 
        border: `${size * 0.15}px solid rgba(240, 240, 255, 0.9)`,
        borderRadius: '50%',
        boxShadow: `0 0 ${size * 0.2}px rgba(255, 255, 255, 0.3)`,
      }}/>
      
      {/* Inner ring shadow from Scene1 */}
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
            inset -${size * 0.15}px -${size * 0.15}px ${size * 0.3}px rgba(0, 0, 0, 0.7),
            inset ${size * 0.1}px ${size * 0.1}px ${size * 0.2}px rgba(255, 255, 255, 0.4),
            0 0 ${size * 0.4}px ${size * 0.15}px rgba(255, 255, 255, 0.3)
          `,
        }}/>
      </div>
    </div>
  );
};

// Uranus component with Scene1 lighting
const UranusPlanet: React.FC<{ 
  size: number; 
  x: number; 
  y: number; 
  rotation: number 
}> = ({ size, x, y, rotation }) => (
  <div style={{ 
    position: 'absolute', 
    left: `calc(50% + ${x}px)`, 
    top: `calc(50% + ${y}px)`, 
    transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
  }}>
    <div style={{ 
      width: size, 
      height: size, 
      background: 'radial-gradient(circle at 30% 30%, #B2EBF2, #80DEEA, #4DD0E1)',
      borderRadius: '50%',
      boxShadow: `
        inset -${size * 0.15}px -${size * 0.15}px ${size * 0.3}px rgba(0, 0, 0, 0.7),
        inset ${size * 0.1}px ${size * 0.1}px ${size * 0.2}px rgba(255, 255, 255, 0.4),
        0 0 ${size * 0.3}px ${size * 0.1}px rgba(255, 255, 255, 0.2)
      `,
      position: 'relative',
    }}/>
  </div>
);

// Neptune component with Scene1 lighting
const NeptunePlanet: React.FC<{ 
  size: number; 
  x: number; 
  y: number; 
  rotation: number 
}> = ({ size, x, y, rotation }) => (
  <div style={{ 
    position: 'absolute', 
    left: `calc(50% + ${x}px)`, 
    top: `calc(50% + ${y}px)`, 
    transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
  }}>
    <div style={{ 
      width: size, 
      height: size, 
      background: 'radial-gradient(circle at 30% 30%, #7986CB, #5C6BC0, #3F51B5)',
      borderRadius: '50%',
      boxShadow: `
        inset -${size * 0.15}px -${size * 0.15}px ${size * 0.3}px rgba(0, 0, 0, 0.7),
        inset ${size * 0.1}px ${size * 0.1}px ${size * 0.2}px rgba(255, 255, 255, 0.4),
        0 0 ${size * 0.3}px ${size * 0.1}px rgba(255, 255, 255, 0.2)
      `,
      position: 'relative',
    }}/>
  </div>
);

// Text annotation component for Sun (unchanged)
const SunAnnotation: React.FC<{ frame: number; zoom: number }> = ({ frame, zoom }) => {
  // Animation values
  const textOpacity = interpolate(frame, [20, 50, 350, 380], [0, 1, 1, 0], {
    extrapolateRight: 'clamp',
  });
  
  const textSlide = interpolate(frame, [20, 50], [50, 0], {
    extrapolateRight: 'clamp',
  });
  
  const arrowOpacity = interpolate(frame, [30, 60, 350, 380], [0, 1, 1, 0], {
    extrapolateRight: 'clamp',
  });
  
  const arrowPulse = interpolate(
    Math.sin(frame * 0.1),
    [-1, 1],
    [0.7, 1]
  );
  
  // Arrow animation - pointing to sun
  const arrowLength = 150;
  const arrowAngle = 45; // degrees
  
  // Adjust position based on zoom to stay in frame
  const textLeft = `calc(50% + ${380 / zoom}px)`;
  const textTop = `calc(50% - ${200 / zoom}px)`;
  
  return (
    <>
      {/* Arrow line pointing to sun */}
      <div style={{
        position: 'absolute',
        left: `calc(50% + ${200 / zoom}px)`,
        top: `calc(50% - ${100 / zoom}px)`,
        width: arrowLength / zoom,
        height: 2 / zoom,
        background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.8), rgba(255, 215, 0, 0.8))',
        transform: `rotate(${arrowAngle}deg)`,
        transformOrigin: 'left center',
        opacity: arrowOpacity * arrowPulse,
        filter: 'blur(0.5px)',
      }}/>
      
      {/* Arrow head */}
      <div style={{
        position: 'absolute',
        left: `calc(50% + ${(200 + arrowLength * Math.cos(arrowAngle * Math.PI / 180)) / zoom}px)`,
        top: `calc(50% - ${(100 + arrowLength * Math.sin(arrowAngle * Math.PI / 180)) / zoom}px)`,
        width: 0,
        height: 0,
        borderTop: `${8 / zoom}px solid transparent`,
        borderBottom: `${8 / zoom}px solid transparent`,
        borderLeft: `${15 / zoom}px solid rgba(255, 215, 0, 0.8)`,
        transform: `rotate(${arrowAngle}deg)`,
        opacity: arrowOpacity * arrowPulse,
        filter: 'blur(0.5px)',
      }}/>
      
      {/* Sun annotation text box - FIXED SIZE RELATIVE TO ZOOM */}
      <div style={{
        position: 'absolute',
        left: textLeft,
        top: textTop,
        color: 'white',
        fontFamily: 'Arial, sans-serif',
        opacity: textOpacity,
        transform: `translateY(${textSlide}px)`,
        maxWidth: `${400 / zoom}px`,
        background: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(10px)',
        borderRadius: `${15 / zoom}px`,
        padding: `${25 / zoom}px`,
        border: '1px solid rgba(255, 215, 0, 0.3)',
        boxShadow: '0 0 30px rgba(255, 215, 0, 0.2)',
        boxSizing: 'border-box',
      }}>
        <h2 style={{
          fontSize: `${36 / zoom}px`,
          fontWeight: 'bold',
          margin: `0 0 ${15 / zoom}px 0`,
          background: 'linear-gradient(90deg, #FFD700, #FF8C00)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0 0 20px rgba(255, 215, 0, 0.3)',
        }}>
          The Sun
        </h2>
        
        <div style={{
          fontSize: `${20 / zoom}px`,
          lineHeight: 1.5,
          opacity: 0.9,
        }}>
          <p style={{ margin: `0 0 ${10 / zoom}px 0` }}>
            <strong>Type:</strong> G-type Main Sequence Star
          </p>
          <p style={{ margin: `0 0 ${10 / zoom}px 0` }}>
            <strong>Age:</strong> 4.6 billion years
          </p>
        </div>
        
        {/* Glowing effect behind text */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '110%',
          height: '110%',
          background: 'radial-gradient(circle, rgba(255, 215, 0, 0.05) 0%, transparent 70%)',
          borderRadius: `${15 / zoom}px`,
          filter: 'blur(20px)',
          zIndex: -1,
          opacity: 0.3,
        }}/>
      </div>
      
      {/* Pulsing glow effect around text - SCALED WITH ZOOM */}
      <div style={{
        position: 'absolute',
        left: textLeft,
        top: textTop,
        width: `${400 / zoom}px`,
        height: `${220 / zoom}px`,
        borderRadius: `${15 / zoom}px`,
        background: 'radial-gradient(circle at center, rgba(255, 215, 0, 0.1) 0%, transparent 70%)',
        filter: 'blur(30px)',
        opacity: arrowOpacity * interpolate(Math.sin(frame * 0.05), [-1, 1], [0.3, 0.6]),
        transform: 'translate(-50%, -50%)',
      }}/>
    </>
  );
};

// ============= MAIN SCENE COMPONENT =============

export const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const totalFrames = 360; // 9 seconds at 40fps (9 × 40 = 360)
  
  // Camera zoom
  const zoom = interpolate(frame, [0, totalFrames], [1.5, 2.2], {
    extrapolateRight: 'clamp',
  });
  
  // Sun glow animation
  const sunGlow = interpolate(
    Math.sin(frame * 0.008),
    [-1, 1],
    [0.7, 1]
  );
  
  // All planets data with updated sizes for better visibility
  const planets = [
    { type: 'mercury', size: 20, orbitRadius: 120, startAngle: 0, rotationSpeed: 0.4 },
    { type: 'venus', size: 28, orbitRadius: 180, startAngle: Math.PI / 2.5, rotationSpeed: 0.3 },
    { type: 'earth', size: 30, orbitRadius: 240, startAngle: Math.PI / 1.8, rotationSpeed: 1.0 },
    { type: 'mars', size: 24, orbitRadius: 300, startAngle: Math.PI, rotationSpeed: 0.7 },
    { type: 'jupiter', size: 80, orbitRadius: 400, startAngle: Math.PI / 3, rotationSpeed: 0.6 },
    { type: 'saturn', size: 65, orbitRadius: 520, startAngle: (2 * Math.PI) / 3, rotationSpeed: 0.5 },
    { type: 'uranus', size: 45, orbitRadius: 650, startAngle: Math.PI / 4, rotationSpeed: 0.4 },
    { type: 'neptune', size: 43, orbitRadius: 780, startAngle: (3 * Math.PI) / 4, rotationSpeed: 0.4 },
  ];
  
  // CINEMATIC BACKGROUND STARS from Scene1
  const stars = useMemo(() => {
    return Array.from({ length: 400 }).map((_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 0.5,
      opacity: 0.2 + Math.random() * 0.8,
      twinkleSpeed: Math.random() * 0.015 + 0.005,
      twinklePhase: Math.random() * Math.PI * 2,
    }));
  }, []);
  
  // CINEMATIC SPACE DUST from Scene1
  const spaceDust = useMemo(() => {
    return Array.from({ length: 25 }).map((_, i) => ({
      angle: (i / 25) * Math.PI * 2,
      radius: 60 + (i % 6) * 80,
      speed: 0.001 + (i % 3) * 0.0005,
      size: 1 + Math.random() * 1.5,
    }));
  }, []);

  return (
    <AbsoluteFill style={{ 
      backgroundColor: '#000000',
      overflow: 'hidden',
    }}>
      
      {/* AUDIO NARRATION - 9 seconds */}
      <Audio 
        src={staticFile('scene2-narration.m4a')} 
        volume={1}
      />
      
      {/* DEEP SPACE GRADIENT from Scene1 */}
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        background: 'radial-gradient(ellipse at center, #0a0a2a 0%, #000814 40%, #000000 100%)',
      }}/>
      
      {/* CINEMATIC STARFIELD from Scene1 */}
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
      }}>
        {stars.map((star, i) => {
          const twinkle = Math.sin(frame * star.twinkleSpeed + star.twinklePhase) * 0.5 + 0.5;
          
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: star.size,
                height: star.size,
                backgroundColor: 'white',
                borderRadius: '50%',
                opacity: star.opacity * twinkle,
                filter: `blur(${star.size * 0.3}px)`,
              }}
            />
          );
        })}
      </div>
      
      {/* CINEMATIC NEBULA from Scene1 */}
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        background: `
          radial-gradient(circle at 20% 30%, rgba(100, 0, 200, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 80% 70%, rgba(0, 100, 200, 0.1) 0%, transparent 50%)
        `,
        filter: 'blur(120px)',
        opacity: 0.3,
        mixBlendMode: 'screen',
      }}/>
      
      {/* Apply zoom transform to a wrapper div */}
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        transform: `scale(${zoom})`,
        transformOrigin: 'center',
      }}>
        {/* ORBITAL LINES with cinematic glow */}
        {planets.map((planet, index) => {
          const lineGlow = interpolate(
            Math.sin(frame * 0.01 + index),
            [-1, 1],
            [0.08, 0.18]
          );
          
          return (
            <div
              key={`orbit-${index}`}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                width: planet.orbitRadius * 2,
                height: planet.orbitRadius * 2 * 0.6,
                border: `1px solid rgba(100, 150, 255, ${lineGlow})`,
                borderRadius: '50%',
                transform: 'translate(-50%, -50%)',
                boxShadow: `0 0 15px rgba(100, 150, 255, ${lineGlow * 0.5})`,
              }}
            />
          );
        })}
        
        {/* SUN WITH ENHANCED RAYS */}
        <div style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}>
          <Sun size={100} glow={sunGlow} />
        </div>
        
        {/* ALL PLANETS with Scene1 lighting and effects */}
        {planets.map((planet, index) => {
          const orbitalSpeed = 0.005 * (1 / (index + 1));
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
        
        {/* CINEMATIC SPACE DUST from Scene1 */}
        {spaceDust.map((dust, i) => {
          const particleX = dust.radius * Math.cos(dust.angle + frame * dust.speed);
          const particleY = dust.radius * Math.sin(dust.angle + frame * dust.speed) * 0.6;
          
          const opacity = interpolate(
            Math.sin(frame * 0.02 + i * 0.3),
            [-1, 1],
            [0.03, 0.12]
          );
          
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: `calc(50% + ${particleX}px)`,
                top: `calc(50% + ${particleY}px)`,
                width: dust.size,
                height: dust.size,
                backgroundColor: 'white',
                borderRadius: '50%',
                opacity,
                filter: 'blur(0.8px)',
                boxShadow: '0 0 3px rgba(255, 255, 255, 0.3)',
              }}
            />
          );
        })}
        
        {/* TRAILING EFFECTS FOR INNER PLANETS from Scene1 */}
        {planets.slice(0, 4).map((planet, index) => {
          const orbitalSpeed = 0.005 * (1 / (index + 1));
          const orbitProgress = frame * orbitalSpeed + planet.startAngle;
          const x = planet.orbitRadius * Math.cos(orbitProgress);
          const y = planet.orbitRadius * Math.sin(orbitProgress) * 0.6;
          
          const trailOpacity = interpolate(
            Math.sin(frame * 0.05 + index),
            [-1, 1],
            [0.1, 0.3]
          );
          
          return (
            <div
              key={`trail-${index}`}
              style={{
                position: 'absolute',
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                width: planet.size * 2.5,
                height: planet.size * 2.5,
                background: 'radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 70%)',
                borderRadius: '50%',
                transform: 'translate(-50%, -50%)',
                filter: 'blur(8px)',
                opacity: trailOpacity,
              }}
            />
          );
        })}
      </div>
      
      {/* CINEMATIC VIGNETTE from Scene1 */}
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle at 50% 50%, transparent 30%, rgba(0, 0, 0, 0.5) 70%, rgba(0, 0, 0, 0.7) 100%)',
        pointerEvents: 'none',
        mixBlendMode: 'multiply',
      }}/>
      
      {/* FILM GRAIN EFFECT from Scene1 */}
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundImage: `
          linear-gradient(transparent 0%, rgba(0, 0, 0, 0.08) 2%, transparent 4%),
          linear-gradient(90deg, transparent 0%, rgba(0, 0, 0, 0.04) 2%, transparent 4%)
        `,
        backgroundSize: '200px 200px',
        opacity: 0.02,
        pointerEvents: 'none',
        mixBlendMode: 'overlay',
      }}/>
      
      {/* SUN ANNOTATION - RENDERED OUTSIDE ZOOM WRAPPER TO STAY IN FRAME */}
      <SunAnnotation frame={frame} zoom={zoom} />
    </AbsoluteFill>
  );
};