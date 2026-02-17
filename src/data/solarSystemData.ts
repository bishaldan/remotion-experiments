// src/data/solarSystemData.ts
export interface PlanetData {
  id: string;
  name: string;
  color: string;
  size: number;
  orbitRadius: number;
  rotationSpeed: number;
  hasRing: boolean;
  description: string;
}

export const solarSystemData: PlanetData[] = [
  {
    id: 'sun',
    name: 'Sun',
    color: '#FFD700',
    size: 150,
    orbitRadius: 0,
    rotationSpeed: 0.2,
    hasRing: false,
    description: 'The Sun - Fusion Heart'
  },
  {
    id: 'mercury',
    name: 'Mercury',
    color: '#8C7853',
    size: 15,
    orbitRadius: 200,
    rotationSpeed: 0.5,
    hasRing: false,
    description: 'Inner Rocky World'
  },
  {
    id: 'venus',
    name: 'Venus',
    color: '#FFC649',
    size: 20,
    orbitRadius: 320,
    rotationSpeed: 0.3,
    hasRing: false,
    description: 'Toxic Greenhouse World'
  },
  {
    id: 'earth',
    name: 'Earth',
    color: '#6B93D6',
    size: 22,
    orbitRadius: 440,
    rotationSpeed: 1,
    hasRing: false,
    description: 'Our Blue Marble'
  },
  {
    id: 'mars',
    name: 'Mars',
    color: '#FF6B6B',
    size: 18,
    orbitRadius: 560,
    rotationSpeed: 0.8,
    hasRing: false,
    description: 'Red Frontier'
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    color: '#FFA726',
    size: 80,
    orbitRadius: 680,
    rotationSpeed: 0.6,
    hasRing: false,
    description: 'Storm Giant'
  },
  {
    id: 'saturn',
    name: 'Saturn',
    color: '#FFCC80',
    size: 70,
    orbitRadius: 800,
    rotationSpeed: 0.5,
    hasRing: true,
    description: 'Ringed Marvel'
  },
  {
    id: 'uranus',
    name: 'Uranus',
    color: '#80DEEA',
    size: 40,
    orbitRadius: 920,
    rotationSpeed: 0.4,
    hasRing: true,
    description: 'Ice Giant'
  },
  {
    id: 'neptune',
    name: 'Neptune',
    color: '#5C6BC0',
    size: 38,
    orbitRadius: 1040,
    rotationSpeed: 0.4,
    hasRing: true,
    description: 'Blue Windy World'
  }
];