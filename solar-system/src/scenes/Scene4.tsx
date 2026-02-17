// src/scenes/Scene4.tsx
import React, { useMemo } from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, spring, useVideoConfig, Audio, staticFile } from 'remotion';

// Reuse the planet components from Scene2
const EarthPlanet: React.FC<{
  size: number;
  rotation: number;
}> = ({ size, rotation }) => {
  return (
    <div style={{
      position: 'relative',
      transform: `rotate(${rotation}deg)`,
    }}>
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
        {/* Continent shapes */}
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: `
            radial-gradient(ellipse at 55% 60%, #388E3C 0%, #2E7D32 15%, transparent 20%),
            radial-gradient(ellipse at 25% 55%, #43A047 0%, #388E3C 18%, transparent 22%),
            radial-gradient(ellipse at 70% 40%, #4CAF50 0%, #43A047 25%, transparent 28%),
            radial-gradient(ellipse at 85% 70%, #66BB6A 0%, #4CAF50 12%, transparent 15%),
            radial-gradient(ellipse at 50% 95%, #81C784 0%, #66BB6A 10%, transparent 12%)
          `,
          filter: 'blur(0.5px)',
          opacity: 0.9,
        }}/>
        
        {/* Cloud cover */}
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: `
            radial-gradient(ellipse at 10% 50%, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.7) 8%, transparent 10%),
            radial-gradient(ellipse at 40% 45%, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.65) 6%, transparent 8%),
            radial-gradient(ellipse at 75% 65%, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0.6) 7%, transparent 9%),
            radial-gradient(ellipse at 50% 15%, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.55) 5%, transparent 7%)
          `,
          filter: 'blur(1px)',
          opacity: 0.7,
          mixBlendMode: 'overlay',
        }}/>
      </div>
      
      {/* Atmospheric glow */}
      <div style={{
        position: 'absolute',
        top: '-20%',
        left: '-20%',
        width: '140%',
        height: '140%',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(135, 206, 235, 0.25) 0%, transparent 70%)',
        filter: 'blur(20px)',
        opacity: 0.8,
      }}/>
    </div>
  );
};

// Mercury component
const MercuryPlanet: React.FC<{ size: number; rotation: number }> = ({ size, rotation }) => (
  <div style={{ position: 'relative', transform: `rotate(${rotation}deg)` }}>
    <div style={{ 
      width: size, 
      height: size, 
      background: 'radial-gradient(circle at 30% 30%, #A1887F, #8D6E63, #6D4C41)', 
      borderRadius: '50%',
      boxShadow: `
        inset -${size * 0.15}px -${size * 0.15}px ${size * 0.3}px rgba(0, 0, 0, 0.7),
        inset ${size * 0.1}px ${size * 0.1}px ${size * 0.2}px rgba(255, 255, 255, 0.4)
      `,
    }}/>
  </div>
);

// Venus component
const VenusPlanet: React.FC<{ size: number; rotation: number }> = ({ size, rotation }) => (
  <div style={{ position: 'relative', transform: `rotate(${rotation}deg)` }}>
    <div style={{ 
      width: size, 
      height: size, 
      background: 'radial-gradient(circle at 30% 30%, #FFD54F, #FFCA28, #FFB300)', 
      borderRadius: '50%',
      boxShadow: `
        inset -${size * 0.15}px -${size * 0.15}px ${size * 0.3}px rgba(0, 0, 0, 0.7),
        inset ${size * 0.1}px ${size * 0.1}px ${size * 0.2}px rgba(255, 255, 255, 0.4)
      `,
    }}/>
  </div>
);

// Mars component
const MarsPlanet: React.FC<{ size: number; rotation: number }> = ({ size, rotation }) => (
  <div style={{ position: 'relative', transform: `rotate(${rotation}deg)` }}>
    <div style={{ 
      width: size, 
      height: size, 
      background: 'radial-gradient(circle at 30% 30%, #EF5350, #E53935, #C62828)', 
      borderRadius: '50%',
      boxShadow: `
        inset -${size * 0.15}px -${size * 0.15}px ${size * 0.3}px rgba(0, 0, 0, 0.7),
        inset ${size * 0.1}px ${size * 0.1}px ${size * 0.2}px rgba(255, 255, 255, 0.4)
      `,
    }}/>
  </div>
);

// Jupiter component
const JupiterPlanet: React.FC<{ size: number; rotation: number }> = ({ size, rotation }) => (
  <div style={{ position: 'relative', transform: `rotate(${rotation}deg)` }}>
    <div style={{ 
      width: size, 
      height: size, 
      background: 'linear-gradient(45deg, #FF9800, #FF8F00, #FF6F00, #E65100)', 
      borderRadius: '50%',
      boxShadow: `
        inset -${size * 0.15}px -${size * 0.15}px ${size * 0.3}px rgba(0, 0, 0, 0.7),
        inset ${size * 0.1}px ${size * 0.1}px ${size * 0.2}px rgba(255, 255, 255, 0.4)
      `,
    }}/>
  </div>
);

// Saturn component
const SaturnPlanet: React.FC<{ size: number; rotation: number }> = ({ size, rotation }) => {
  const ringRotation = rotation * 0.02;
  return (
    <div style={{ position: 'relative' }}>
      {/* Rings */}
      <div style={{ 
        position: 'absolute', 
        left: '50%', 
        top: '50%', 
        transform: `translate(-50%, -50%) rotateX(75deg) rotate(${ringRotation}deg)`, 
        width: size * 2.8, 
        height: size * 0.25, 
        border: `${size * 0.12}px solid rgba(220, 220, 240, 0.8)`, 
        borderRadius: '50%' 
      }}/>
      {/* Planet */}
      <div style={{ position: 'relative', transform: `rotate(${rotation}deg)` }}>
        <div style={{ 
          width: size, 
          height: size, 
          background: 'linear-gradient(45deg, #FFD180, #FFCC80, #FFB74D)', 
          borderRadius: '50%',
          boxShadow: `
            inset -${size * 0.15}px -${size * 0.15}px ${size * 0.3}px rgba(0, 0, 0, 0.7),
            inset ${size * 0.1}px ${size * 0.1}px ${size * 0.2}px rgba(255, 255, 255, 0.4)
          `,
        }}/>
      </div>
    </div>
  );
};

// Uranus component
const UranusPlanet: React.FC<{ size: number; rotation: number }> = ({ size, rotation }) => (
  <div style={{ position: 'relative', transform: `rotate(${rotation}deg)` }}>
    <div style={{ 
      width: size, 
      height: size, 
      background: 'radial-gradient(circle at 30% 30%, #80DEEA, #4DD0E1, #26C6DA)', 
      borderRadius: '50%',
      boxShadow: `
        inset -${size * 0.15}px -${size * 0.15}px ${size * 0.3}px rgba(0, 0, 0, 0.7),
        inset ${size * 0.1}px ${size * 0.1}px ${size * 0.2}px rgba(255, 255, 255, 0.4)
      `,
    }}/>
  </div>
);

// Neptune component
const NeptunePlanet: React.FC<{ size: number; rotation: number }> = ({ size, rotation }) => (
  <div style={{ position: 'relative', transform: `rotate(${rotation}deg)` }}>
    <div style={{ 
      width: size, 
      height: size, 
      background: 'radial-gradient(circle at 30% 30%, #5C6BC0, #3F51B5, #303F9F)', 
      borderRadius: '50%',
      boxShadow: `
        inset -${size * 0.15}px -${size * 0.15}px ${size * 0.3}px rgba(0, 0, 0, 0.7),
        inset ${size * 0.1}px ${size * 0.1}px ${size * 0.2}px rgba(255, 255, 255, 0.4)
      `,
    }}/>
  </div>
);

// Planet component for the comparison view
const PlanetDisplay: React.FC<{
  planetType: string;
  size: number;
  delay: number;
  frame: number;
}> = ({ planetType, size, delay, frame }) => {
  const { fps } = useVideoConfig();
  
  // Entrance animation
  const entrance = spring({
    frame: Math.max(0, frame - delay),
    fps,
    config: {
      damping: 20,
      mass: 0.8,
      stiffness: 100,
    },
  });
  
  const scale = interpolate(entrance, [0, 1], [0, 1]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);
  
  // Rotation animation
  const rotation = frame * 0.2;
  
  // Render the appropriate planet
  const getPlanet = () => {
    switch (planetType) {
      case 'mercury':
        return <MercuryPlanet size={size} rotation={rotation} />;
      case 'venus':
        return <VenusPlanet size={size} rotation={rotation} />;
      case 'earth':
        return <EarthPlanet size={size} rotation={rotation} />;
      case 'mars':
        return <MarsPlanet size={size} rotation={rotation} />;
      case 'jupiter':
        return <JupiterPlanet size={size} rotation={rotation} />;
      case 'saturn':
        return <SaturnPlanet size={size} rotation={rotation} />;
      case 'uranus':
        return <UranusPlanet size={size} rotation={rotation} />;
      case 'neptune':
        return <NeptunePlanet size={size} rotation={rotation} />;
      default:
        return null;
    }
  };
  
  // Get planet name with proper capitalization
  const getPlanetName = () => {
    return planetType.charAt(0).toUpperCase() + planetType.slice(1);
  };
  
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-end',
      flex: 1,
      height: '100%',
      transform: `scale(${scale})`,
      opacity,
      transition: 'opacity 0.2s ease',
    }}>
      {/* Planet */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        width: '100%',
      }}>
        {getPlanet()}
      </div>
      
      {/* Planet name */}
      <div style={{
        color: 'white',
        fontFamily: "'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif",
        fontSize: 22,
        fontWeight: 500,
        marginTop: 20,
        opacity: 0.95,
        textAlign: 'center',
        height: 30,
        textShadow: '0 0 10px rgba(255, 255, 255, 0.2)',
      }}>
        {getPlanetName()}
      </div>
    </div>
  );
};

export const Scene4: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  
  // Planets data with relative sizes
  const planets = [
    { type: 'mercury', size: 30, name: 'Mercury' },
    { type: 'venus', size: 70, name: 'Venus' },
    { type: 'earth', size: 75, name: 'Earth' },
    { type: 'mars', size: 40, name: 'Mars' },
    { type: 'jupiter', size: 200, name: 'Jupiter' },
    { type: 'saturn', size: 170, name: 'Saturn' },
    { type: 'uranus', size: 90, name: 'Uranus' },
    { type: 'neptune', size: 85, name: 'Neptune' },
  ];
  
  // Title opacity animation
  const titleOpacity = interpolate(frame, [0, 40], [0, 1]);
  
  // Background stars
  const stars = useMemo(() => {
    return Array.from({ length: 200 }).map((_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.5,
      opacity: 0.3 + Math.random() * 0.7,
    }));
  }, [width, height]);

  return (
    <AbsoluteFill style={{ 
      backgroundColor: '#000814',
      overflow: 'hidden',
    }}>
      
      {/* AUDIO NARRATION - 9 seconds */}
      <Audio 
        src={staticFile('scene4-narration.m4a')} 
        volume={1}
      />
      
      {/* Simple star background */}
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
      }}>
        {stars.map((star, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: star.x,
              top: star.y,
              width: star.size,
              height: star.size,
              backgroundColor: 'white',
              borderRadius: '50%',
              opacity: star.opacity,
            }}
          />
        ))}
      </div>
      
      {/* Subtle space gradient */}
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle at center, transparent 40%, rgba(0, 40, 80, 0.1) 100%)',
        filter: 'blur(50px)',
      }}/>
      
      {/* Main title */}
      <div style={{
        position: 'absolute',
        top: 60,
        left: '50%',
        transform: 'translateX(-50%)',
        color: 'white',
        fontFamily: "'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif",
        fontSize: 56,
        fontWeight: 700,
        textAlign: 'center',
        opacity: titleOpacity,
        background: 'linear-gradient(90deg, #FFD700, #FF8C00)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        letterSpacing: '1px',
        textShadow: '0 0 30px rgba(255, 215, 0, 0.3)',
        padding: '0 20px',
        zIndex: 10,
      }}>
        Planet Size Comparison
      </div>
      
      {/* Planets lineup - CENTERED */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        gap: 25,
        width: '95%',
        height: '70%',
        maxHeight: '500px',
        padding: '0 20px',
        zIndex: 20,
      }}>
        {planets.map((planet, index) => (
          <PlanetDisplay
            key={planet.type}
            planetType={planet.type}
            size={planet.size}
            delay={index * 5}
            frame={frame}
          />
        ))}
      </div>
      
      {/* Scale indicator */}
      <div style={{
        position: 'absolute',
        bottom: 100,
        left: '50%',
        transform: 'translateX(-50%)',
        color: '#aaa',
        fontFamily: "'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif",
        fontSize: 20,
        opacity: interpolate(frame, [40, 70], [0, 0.7]),
        textAlign: 'center',
        fontWeight: 300,
        letterSpacing: '0.5px',
        zIndex: 30,
      }}>
      </div>
      
      {/* Scene indicator */}
      <div style={{
        position: 'absolute',
        bottom: 40,
        left: '50%',
        transform: 'translateX(-50%)',
        color: '#666',
        fontFamily: "'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif",
        fontSize: 16,
        opacity: 0.5,
        fontWeight: 300,
        zIndex: 30,
      }}>
      </div>
    </AbsoluteFill>
  );
};