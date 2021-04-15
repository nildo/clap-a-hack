/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import ReactAudioPlayer from 'react-audio-player';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../context/ContextProvider';


console.log(process.env.NODE_ENV === 'development');



const MULTIPLIER = 3;

function Room() {

  const [state, setState] = useState({
    numOnlineUsers: 0,
    laughCount: 0,
  });
  const [playing1, setPlaying1] = useState(false);
  const [playing2, setPlaying2] = useState(false);
  const [playing3, setPlaying3] = useState(false);
  const [playing4, setPlaying4] = useState(false);

  const { socket, startConnection } = useContext(AppContext);

  const { id } = useParams<{ id: string }>();


  useEffect(() => {
    if (id) {
      startConnection(id)
    }
  }, [id])


  useEffect(() => {
    socket?.on('stateUpdate', (data: any) => {
      setState(data);
    });
  }, [socket]);

  useEffect(() => {
    const { numOnlineUsers, laughCount } = state;
    const meter = Math.min(1, laughCount / (MULTIPLIER * numOnlineUsers));
    if (meter >= 0.25 && !playing1) {
      setPlaying1(true);
      setTimeout(() => {
        setPlaying1(false);
      }, 3000);
    } else if (meter >= 0.5 && !playing2) {
      setPlaying2(true);
      setTimeout(() => {
        setPlaying2(false);
      }, 5000);
    } else if (meter >= 0.75 && !playing3) {
      setPlaying3(true);
      setTimeout(() => {
        setPlaying3(false);
      }, 11000);
    } else if (meter === 1 && !playing4) {
      setPlaying4(true);
      setTimeout(() => {
        setPlaying4(false);
      }, 9000);
    }
  }, [playing1, playing2, playing3, playing4, state])

  const sendClick = () => {
    socket?.emit('laugh');
  }

  const { numOnlineUsers, laughCount } = state;

  return (
    <Wrapper onClick={sendClick}>
      <Row>
        <Column>Online:</Column>
        <Column>{numOnlineUsers}</Column>
      </Row>
      <Row>
        <Column>Laughs:</Column>
        <Column>{laughCount}</Column>
      </Row>
      {playing1 && <ReactAudioPlayer src="laugh-01.mp3" autoPlay />}
      {playing2 && <ReactAudioPlayer src="laugh-02.mp3" autoPlay />}
      {playing3 && <ReactAudioPlayer src="laugh-03.mp3" autoPlay />}
      {playing4 && <ReactAudioPlayer src="clap.mp3" autoPlay />}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Row = styled.div`
  margin: 10px 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Column = styled.div`
  margin: 0 10px;
`;


export default Room;
