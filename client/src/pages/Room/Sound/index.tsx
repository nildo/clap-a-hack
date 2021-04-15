import React, { useContext, useEffect, useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { AppContext } from '../../../context/ContextProvider';

const MULTIPLIER = 2;

export default function Sound() {
  const { roomState: { soundLevel = { clap: 0, laugh: 0 }, users, resultsVisible } } = useContext(AppContext);

  const [clap1, setClap1] = useState(false);
  const [clap2, setClap2] = useState(false);
  const [clap3, setClap3] = useState(false);
  const [clap4, setClap4] = useState(false);

  const [laugh1, setLaugh1] = useState(false);
  const [laugh2, setLaugh2] = useState(false);
  const [laugh3, setLaugh3] = useState(false);
  const [laugh4, setLaugh4] = useState(false);

  useEffect(() => {
    const { clap: clapCount, laugh: laughCount } = soundLevel;
    const numOnlineUsers = users.length;

    const clapMeter = Math.min(1, clapCount / (MULTIPLIER * numOnlineUsers));
    const laughMeter = Math.min(1, laughCount / (MULTIPLIER * numOnlineUsers));

    if (clapMeter > 0 && !clap1) {
      setClap1(true);
      setTimeout(() => {
        setClap1(false);
      }, 8000);
    } else if (clapMeter >= 0.25 && !clap2) {
      setClap2(true);
      setTimeout(() => {
        setClap2(false);
      }, 6000);
    } else if (clapMeter >= 0.5 && !clap3) {
      setClap3(true);
      setTimeout(() => {
        setClap3(false);
      }, 6000);
    } else if (clapMeter === 0.75 && !clap4) {
      setClap4(true);
      setTimeout(() => {
        setClap4(false);
      }, 9000);
    }

    if (laughMeter > 0 && !laugh1) {
      setLaugh1(true);
      setTimeout(() => {
        setLaugh1(false);
      }, 3000);
    } else if (laughMeter >= 0.25 && !laugh2) {
      setLaugh2(true);
      setTimeout(() => {
        setLaugh2(false);
      }, 5000);
    } else if (laughMeter >= 0.5 && !laugh3) {
      setLaugh3(true);
      setTimeout(() => {
        setLaugh3(false);
      }, 11000);
    } else if (laughMeter === 0.75 && !laugh4) {
      setLaugh4(true);
      setTimeout(() => {
        setLaugh4(false);
      }, 9000);
    }
  }, [clap1, clap2, clap3, clap4, laugh1, laugh2, laugh3, laugh4, soundLevel, users.length]);

  return (
    <div>
      {clap1 && <ReactAudioPlayer src="/applause-01.mp3" autoPlay />}
      {clap2 && <ReactAudioPlayer src="/applause-02.mp3" autoPlay />}
      {clap3 && <ReactAudioPlayer src="/applause-03.mp3" autoPlay />}
      {(resultsVisible
        || clap4) && <ReactAudioPlayer src="/applause-04.mp3" autoPlay />}
      {laugh1 && <ReactAudioPlayer src="/laugh-01.mp3" autoPlay />}
      {laugh2 && <ReactAudioPlayer src="/laugh-02.mp3" autoPlay />}
      {laugh3 && <ReactAudioPlayer src="/laugh-03.mp3" autoPlay />}
      {laugh4 && <ReactAudioPlayer src="/clap.mp3" autoPlay />}
      {resultsVisible && <ReactAudioPlayer src="/music.mp3" autoPlay />}
    </div>
  )
}
