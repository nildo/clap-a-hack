import React, { createContext, useState } from 'react';
import { io } from 'socket.io-client';
import { ContextState } from './types';



const defaultState: ContextState = {
  socket: undefined,
  startConnection: () => undefined,
};

export const AppContext = createContext<ContextState>(defaultState);

const AppContextProvider = ({ children }: { children: React.ReactChild }) => {

  const [socket, setSocket] = useState<ContextState['socket']>();


  const startConnection = (roomId: string) => {
    const host = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : '';
    const newSocket = io(host, { query: { room: roomId } });
    setSocket(newSocket)
  }

  return (
    <AppContext.Provider value={{ socket, startConnection }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContextProvider;
