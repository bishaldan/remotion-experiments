// src/scenes/Scene3.tsx
import React, { useMemo } from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, Audio, staticFile } from 'remotion';

// Sun component with VISIBLE RAYS
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

// Simplified Planet Label component - text directly below planet
const PlanetLabel: React.FC<{
  frame: number;
  planetName: string;
  x: number;
  y: number;
  size: number;
  index: number;
}> = ({ frame, planetName, x, y, size, index }) => {
  // Each label appears at different times
  const startFrame = 50 + index * 25;
  const fadeDuration = 30;
  
  const labelOpacity = interpolate(
    frame,
    [startFrame, startFrame + fadeDuration, startFrame + 150, startFrame + 180],
    [0, 1, 1, 0],
    { extrapolateRight: 'clamp' }
  );
  
  const textSlide = interpolate(
    frame,
    [startFrame, startFrame + fadeDuration],
    [10, 0],
    { extrapolateRight: 'clamp' }
  );
  
  // Position label directly below the planet
  // Add some spacing based on planet size
  const labelOffsetY = size / 2 + 25;
  
  return (
    <div style={{
      position: 'absolute',
      left: `calc(50% + ${x}px)`,
      top: `calc(50% + ${y + labelOffsetY}px)`,
      transform: `translate(-50%, 0) translateY(${textSlide}px)`,
      color: 'white',
      fontFamily: 'Arial, sans-serif',
      fontSize: 18, // Smaller font size
      fontWeight: 'bold',
      opacity: labelOpacity,
      background: 'rgba(0, 0, 0, 0.7)',
      backdropFilter: 'blur(5px)',
      borderRadius: '8px',
      padding: '6px 12px',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      boxShadow: '0 0 10px rgba(255, 255, 255, 0.1)',
      textAlign: 'center',
      zIndex: 100,
      whiteSpace: 'nowrap',
      pointerEvents: 'none',
    }}>
      {planetName}
    </div>
  );
};

// Planet component wrapper that includes both the planet and its label
const PlanetWithLabel: React.FC<{
  type: string;
  size: number;
  x: number;
  y: number;
  rotation: number;
  frame: number;
  name: string;
  index: number;
}> = ({ type, size, x, y, rotation, frame, name, index }) => {
  // Render the appropriate planet component
  const getPlanet = () => {
    switch (type) {
      case 'earth':
        return (
          <div style={{
            position: 'absolute',
            left: `calc(50% + ${x}px)`,
            top: `calc(50% + ${y}px)`,
            transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
            filter: 'drop-shadow(0 0 20px rgba(25, 118, 210, 0.5))',
          }}>
            {/* Atmospheric glow */}
            <div style={{
              position: 'absolute',
              top: '-25%',
              left: '-25%',
              width: '150%',
              height: '150%',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(135, 206, 235, 0.3) 0%, rgba(70, 130, 180, 0.2) 50%, transparent 70%)',
              filter: 'blur(20px)',
              opacity: 0.6,
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
                0 0 ${size * 0.6}px ${size * 0.2}px rgba(255, 255, 255, 0.3)
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
          </div>
        );
      
      case 'mercury':
        return (
          <div style={{ 
            position: 'absolute', 
            left: `calc(50% + ${x}px)`, 
            top: `calc(50% + ${y}px)`, 
            transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
            filter: 'drop-shadow(0 0 12px rgba(161, 136, 127, 0.3))',
          }}>
            <div style={{ 
              width: size, 
              height: size, 
              background: 'radial-gradient(circle at 30% 30%, #A1887F, #8D6E63, #6D4C41)',
              borderRadius: '50%',
              boxShadow: `
                inset -${size * 0.15}px -${size * 0.15}px ${size * 0.3}px rgba(0, 0, 0, 0.7),
                inset ${size * 0.1}px ${size * 0.1}px ${size * 0.2}px rgba(255, 255, 255, 0.4),
                0 0 ${size * 0.5}px ${size * 0.15}px rgba(255, 255, 255, 0.2)
              `,
            }}/>
          </div>
        );
      
      case 'venus':
        return (
          <div style={{ 
            position: 'absolute', 
            left: `calc(50% + ${x}px)`, 
            top: `calc(50% + ${y}px)`, 
            transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
            filter: 'drop-shadow(0 0 15px rgba(255, 213, 79, 0.4))',
          }}>
            <div style={{ 
              width: size, 
              height: size, 
              background: 'radial-gradient(circle at 30% 30%, #FFD54F, #FFCA28, #FFB300)',
              borderRadius: '50%',
              boxShadow: `
                inset -${size * 0.15}px -${size * 0.15}px ${size * 0.3}px rgba(0, 0, 0, 0.7),
                inset ${size * 0.1}px ${size * 0.1}px ${size * 0.2}px rgba(255, 255, 255, 0.4),
                0 0 ${size * 0.6}px ${size * 0.2}px rgba(255, 255, 255, 0.3)
              `,
            }}/>
          </div>
        );
      
      case 'mars':
        return (
          <div style={{ 
            position: 'absolute', 
            left: `calc(50% + ${x}px)`, 
            top: `calc(50% + ${y}px)`, 
            transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
            filter: 'drop-shadow(0 0 15px rgba(239, 83, 80, 0.4))',
          }}>
            <div style={{ 
              width: size, 
              height: size, 
              background: 'radial-gradient(circle at 30% 30%, #EF5350, #E53935, #C62828)',
              borderRadius: '50%',
              boxShadow: `
                inset -${size * 0.15}px -${size * 0.15}px ${size * 0.3}px rgba(0, 0, 0, 0.7),
                inset ${size * 0.1}px ${size * 0.1}px ${size * 0.2}px rgba(255, 255, 255, 0.4),
                0 0 ${size * 0.6}px ${size * 0.2}px rgba(255, 87, 34, 0.4)
              `,
            }}/>
          </div>
        );
      
      case 'jupiter':
        return (
          <div style={{ 
            position: 'absolute', 
            left: `calc(50% + ${x}px)`, 
            top: `calc(50% + ${y}px)`, 
            transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
            filter: 'drop-shadow(0 0 30px rgba(255, 152, 0, 0.5))',
          }}>
            <div style={{ 
              width: size, 
              height: size, 
              background: 'linear-gradient(45deg, #FF9800, #FF8F00, #FF6F00, #E65100)',
              borderRadius: '50%',
              boxShadow: `
                inset -${size * 0.2}px -${size * 0.2}px ${size * 0.4}px rgba(0, 0, 0, 0.8),
                inset ${size * 0.15}px ${size * 0.15}px ${size * 0.3}px rgba(255, 255, 255, 0.4),
                0 0 ${size * 0.8}px rgba(255, 152, 0, 0.6)
              `,
              position: 'relative',
              overflow: 'hidden',
            }}>
              {/* Jupiter bands */}
              <div style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                background: `
                  linear-gradient(to bottom, 
                    rgba(230, 81, 0, 0.8) 0%,
                    rgba(255, 152, 0, 0.6) 15%,
                    rgba(245, 124, 0, 0.7) 30%,
                    transparent 45%,
                    rgba(230, 81, 0, 0.8) 55%,
                    rgba(255, 152, 0, 0.6) 70%,
                    rgba(245, 124, 0, 0.7) 85%,
                    transparent 100%
                  )
                `,
                filter: 'blur(2px)',
                opacity: 0.8,
              }}/>
            </div>
          </div>
        );
      
      case 'saturn':
        const ringRotation = rotation * 0.02;
        return (
          <div style={{ 
            position: 'absolute', 
            left: `calc(50% + ${x}px)`, 
            top: `calc(50% + ${y}px)`, 
            transform: `translate(-50%, -50%)`,
            filter: 'drop-shadow(0 0 25px rgba(255, 209, 128, 0.4))',
          }}>
            {/* Rings */}
            <div style={{ 
              position: 'absolute', 
              left: '50%', 
              top: '50%', 
              transform: `translate(-50%, -50%) rotateX(75deg) rotate(${ringRotation}deg)`, 
              width: size * 2.8, 
              height: size * 0.25, 
              border: `${size * 0.12}px solid rgba(220, 220, 240, 0.8)`,
              borderRadius: '50%',
              boxShadow: '0 0 30px rgba(220, 220, 240, 0.5)',
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
                background: 'linear-gradient(45deg, #FFD180, #FFCC80, #FFB74D)',
                borderRadius: '50%',
                boxShadow: `
                  inset -${size * 0.15}px -${size * 0.15}px ${size * 0.3}px rgba(0, 0, 0, 0.7),
                  inset ${size * 0.1}px ${size * 0.1}px ${size * 0.2}px rgba(255, 255, 255, 0.4),
                  0 0 ${size * 0.7}px rgba(255, 204, 128, 0.5)
                `,
              }}/>
            </div>
          </div>
        );
      
      case 'uranus':
        return (
          <div style={{ 
            position: 'absolute', 
            left: `calc(50% + ${x}px)`, 
            top: `calc(50% + ${y}px)`, 
            transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
            filter: 'drop-shadow(0 0 18px rgba(128, 222, 234, 0.4))',
          }}>
            <div style={{ 
              width: size, 
              height: size, 
              background: 'radial-gradient(circle at 30% 30%, #80DEEA, #4DD0E1, #26C6DA)',
              borderRadius: '50%',
              boxShadow: `
                inset -${size * 0.15}px -${size * 0.15}px ${size * 0.3}px rgba(0, 0, 0, 0.7),
                inset ${size * 0.1}px ${size * 0.1}px ${size * 0.2}px rgba(255, 255, 255, 0.4),
                0 0 ${size * 0.6}px rgba(77, 208, 225, 0.5)
              `,
            }}/>
          </div>
        );
      
      case 'neptune':
        return (
          <div style={{ 
            position: 'absolute', 
            left: `calc(50% + ${x}px)`, 
            top: `calc(50% + ${y}px)`, 
            transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
            filter: 'drop-shadow(0 0 18px rgba(92, 107, 192, 0.4))',
          }}>
            <div style={{ 
              width: size, 
              height: size, 
              background: 'radial-gradient(circle at 30% 30%, #5C6BC0, #3F51B5, #303F9F)',
              borderRadius: '50%',
              boxShadow: `
                inset -${size * 0.15}px -${size * 0.15}px ${size * 0.3}px rgba(0, 0, 0, 0.7),
                inset ${size * 0.1}px ${size * 0.1}px ${size * 0.2}px rgba(255, 255, 255, 0.4),
                0 0 ${size * 0.6}px rgba(63, 81, 181, 0.5)
              `,
            }}/>
          </div>
        );
      
      default:
        return null;
    }
  };
  
  return (
    <>
      {getPlanet()}
      <PlanetLabel
        frame={frame}
        planetName={name}
        x={x}
        y={y}
        size={size}
        index={index}
      />
    </>
  );
};

export const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  
  // 10 seconds: 400 frames at 40fps
  const zoom = interpolate(frame, [0, 400], [1, 1.05], {
    extrapolateRight: 'clamp',
  });
  
  // Sun glow
  const sunGlow = interpolate(
    Math.sin(frame * 0.005),
    [-1, 1],
    [0.7, 1]
  );
  
  // Planets with DIFFERENT STARTING ANGLES (in radians)
  const planets = [
    // Each planet gets a different starting angle (in radians)
    { type: 'mercury', size: 12, orbitRadius: 120, startAngle: 0, name: 'Mercury' },
    { type: 'venus', size: 18, orbitRadius: 180, startAngle: Math.PI / 3, name: 'Venus' },
    { type: 'earth', size: 20, orbitRadius: 240, startAngle: Math.PI / 2, name: 'Earth' },
    { type: 'mars', size: 16, orbitRadius: 300, startAngle: Math.PI, name: 'Mars' },
    { type: 'jupiter', size: 55, orbitRadius: 400, startAngle: Math.PI / 4, name: 'Jupiter' },
    { type: 'saturn', size: 45, orbitRadius: 520, startAngle: (3 * Math.PI) / 4, name: 'Saturn' },
    { type: 'uranus', size: 30, orbitRadius: 650, startAngle: Math.PI / 6, name: 'Uranus' },
    { type: 'neptune', size: 29, orbitRadius: 780, startAngle: (5 * Math.PI) / 6, name: 'Neptune' },
  ];
  
  // Static background stars - pre-generated
  const staticStarPositions = useMemo(() => {
    return Array.from({ length: 400 }).map((_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.3,
      twinkleSpeed: Math.random() * 0.003 + 0.001,
      twinklePhase: Math.random() * Math.PI * 2,
      baseOpacity: 0.2 + Math.random() * 0.5,
    }));
  }, []);
  
  // Calculate twinkling
  const stars = useMemo(() => {
    return staticStarPositions.map((star) => {
      const twinkle = Math.sin(frame * star.twinkleSpeed + star.twinklePhase) * 0.5 + 0.5;
      const opacity = star.baseOpacity * twinkle;
      
      return {
        ...star,
        opacity,
      };
    });
  }, [frame, staticStarPositions]);
  
  // Distant faint stars
  const distantStars = useMemo(() => {
    return Array.from({ length: 300 }).map((_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 0.8 + 0.1,
      opacity: 0.05 + Math.random() * 0.1,
    }));
  }, []);

  return (
    <AbsoluteFill style={{ 
      backgroundColor: '#000814',
      transform: `scale(${zoom})`,
      overflow: 'hidden'
    }}>
      
      {/* AUDIO NARRATION - 10 seconds */}
      <Audio 
        src={staticFile('scene3-narration.m4a')} 
        volume={1}
      />
      
      {/* Distant stars */}
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        background: 'linear-gradient(180deg, #000205 0%, #000a14 100%)',
      }}>
        {distantStars.map((star, i) => (
          <div
            key={`distant-${i}`}
            style={{
              position: 'absolute',
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
              backgroundColor: '#ffffff',
              borderRadius: '50%',
              opacity: star.opacity,
            }}
          />
        ))}
      </div>
      
      {/* Twinkling stars */}
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
      }}>
        {stars.map((star, i) => (
          <div
            key={`twinkle-${i}`}
            style={{
              position: 'absolute',
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
              backgroundColor: '#ffffff',
              borderRadius: '50%',
              opacity: star.opacity,
              filter: `blur(${star.size * 0.2}px)`,
            }}
          />
        ))}
      </div>
      
      {/* Subtle nebula */}
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        background: `
          radial-gradient(circle at 30% 40%, rgba(0, 30, 60, 0.05) 0%, transparent 70%),
          radial-gradient(circle at 70% 60%, rgba(30, 0, 50, 0.04) 0%, transparent 70%)
        `,
        filter: 'blur(120px)',
        opacity: 0.1,
      }}/>
      
      {/* ORBITAL LINES */}
      {planets.map((planet, index) => (
        <div
          key={`orbit-${index}`}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: planet.orbitRadius * 2,
            height: planet.orbitRadius * 2 * 0.6,
            border: '1px solid rgba(100, 150, 255, 0.15)',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
      
      {/* SUN */}
      <div style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
      }}>
        <Sun size={85} glow={sunGlow} />
      </div>
      
      {/* PLANETS WITH LABELS */}
      {planets.map((planet, index) => {
        // Different orbital speeds - inner planets faster, outer planets slower
        const orbitalSpeed = 0.004 * (1 / (index + 1));
        // ADD STARTING ANGLE to orbit progress
        const orbitProgress = frame * orbitalSpeed + planet.startAngle;
        const x = planet.orbitRadius * Math.cos(orbitProgress);
        const y = planet.orbitRadius * Math.sin(orbitProgress) * 0.6;
        const rotation = frame * (index < 4 ? 0.5 : 0.3); // Inner planets rotate faster
        
        return (
          <PlanetWithLabel
            key={index}
            type={planet.type}
            size={planet.size}
            x={x}
            y={y}
            rotation={rotation}
            frame={frame}
            name={planet.name}
            index={index}
          />
        );
      })}
      
      {/* Subtle particles */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2 + frame * 0.0008;
        const radius = 60 + (i % 4) * 50;
        const particleX = radius * Math.cos(angle);
        const particleY = radius * Math.sin(angle) * 0.6;
        
        const opacity = interpolate(
          Math.sin(frame * 0.015 + i * 0.8),
          [-1, 1],
          [0.03, 0.15]
        );
        
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `calc(50% + ${particleX}px)`,
              top: `calc(50% + ${particleY}px)`,
              width: 1.2,
              height: 1.2,
              backgroundColor: '#ffffff',
              borderRadius: '50%',
              opacity,
              filter: 'blur(0.3px)',
            }}
          />
        );
      })}
      
      {/* Subtle vignette */}
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle at 50% 50%, transparent 40%, rgba(0, 0, 0, 0.15) 100%)',
        pointerEvents: 'none',
      }}/>
      
      {/* Scene indicator */}
      <div style={{
        position: 'absolute',
        bottom: 40,
        left: '50%',
        transform: 'translateX(-50%)',
        color: '#666',
        fontFamily: 'Arial, sans-serif',
        fontSize: 14,
        opacity: 0.5,
      }}>
      </div>
    </AbsoluteFill>
  );
};