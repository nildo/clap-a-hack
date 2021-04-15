import React, { createContext, useState } from 'react';
import { RGBColor } from 'react-color';
import { io } from 'socket.io-client';
import { ContextState } from './types';



const DEFAULT_COLOR = {
  r: 255,
  g: 0,
  b: 0,
  a: 100
};

const defaultState: ContextState = {
  socket: undefined,
  startConnection: () => undefined,
  nickname: '',
  setNickname: () => undefined,
  setUserColor: () => undefined,
  userColor: DEFAULT_COLOR,
};

export const AppContext = createContext<ContextState>(defaultState);

const AppContextProvider = ({ children }: { children: React.ReactChild }) => {

  const [socket, setSocket] = useState<ContextState['socket']>();

  const [nickname, setNickname] = useState('');
  const [userColor, setUserColor] = useState<RGBColor>(DEFAULT_COLOR);

  const startConnection = (roomId: string) => {
    const host = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : '';
    const newSocket = io(host, { query: { room: roomId, user: nickname, color: userColor } });
    setSocket(newSocket)
  }

  return (
    <AppContext.Provider value={{ socket, startConnection, nickname, setNickname, userColor, setUserColor }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContextProvider;
