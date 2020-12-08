import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { io } from 'socket.io-client';

const socket = io();

function App() {
  const [state, setState] = useState({
    numOnlineUsers: 0,
    laughCount: 0,
  });

  useEffect(() => {
    socket.on('stateUpdate', (data: any) => {
      setState(data);
    });
  }, []);

  console.log(state);

  const sendClick = () => {
    console.log('sendClick');
    socket.emit('laugh');
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


export default App;
