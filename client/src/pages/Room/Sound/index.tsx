import React, { useEffect, useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';

const laughTracks = ['laugh-01.mp3', 'laugh-02.mp3', 'laugh-03.mp3', 'clap.mp3'];
const clapTracks = ['applause-01.mp3', 'applause-02.mp3', 'applause-03.mp3', 'applause-04.mp3'];

export default function Sound({ soundLevels }: any) {
  const [laughPlaying, setLaughPlaying] = useState(laughTracks.map(() => false));
  const [clapPlaying, setClapPlaying] = useState(clapTracks.map(() => false));

  const stopLaugh = (i: number) => {
    const newLaughPlaying = [...laughPlaying];
    newLaughPlaying[i] = false;
    setLaughPlaying(newLaughPlaying);
  };

  const startLaugh = (i: number) => {
    if (!laughPlaying[i]) {
      const newLaughPlaying = [...laughPlaying];
      newLaughPlaying[i] = true;
      setLaughPlaying(newLaughPlaying);
      setTimeout(() => {
        stopLaugh(i);
      }, 5000);
    }
  };

  useEffect(() => {
    startLaugh(soundLevels.laugh);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [soundLevels]);

  return (
    <div>
      {laughPlaying.map((isPlaying, i) => (
        isPlaying ? <ReactAudioPlayer src={laughTracks[i]} autoPlay /> : null
      ))}
      {clapPlaying.map((isPlaying, i) => (
        isPlaying ? <ReactAudioPlayer src={clapTracks[i]} autoPlay /> : null
      ))}
    </div>
  )
}
