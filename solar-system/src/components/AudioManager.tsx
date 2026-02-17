import React from 'react';
import { Audio } from 'remotion';

interface AudioManagerProps {
  src: string;
  startFrom?: number;
  endAt?: number;
  volume?: number;
}

export const AudioManager: React.FC<AudioManagerProps> = ({
  src,
  startFrom = 0,
  endAt,
  volume = 1,
}) => {
  return (
    <Audio
      src={src}
      startFrom={startFrom}
      endAt={endAt}
      volume={volume}
    />
  );
};