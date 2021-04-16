import React, { createContext, useState, useEffect } from 'react';
import { RGBColor } from 'react-color';
import { io } from 'socket.io-client';
import { ContextState, RoomState } from './types';

export const DEFAULT_COLOR = {
  r: 255,
  g: 0,
  b: 0,
  a: 100
};

const DEFAULT_ROOM_STATE = {
  currentPresentation: -1,
  presentations: [],
  reactions: {},
  users: [],
  resultsVisible: false
};


const defaultState: ContextState = {
  socket: undefined,
  startConnection: () => undefined,
  nickname: '',
  setNickname: () => undefined,
  setUserColor: () => undefined,
  userColor: DEFAULT_COLOR,
  roomState: DEFAULT_ROOM_STATE,
  getIsAdmin: () => false,
};

export const AppContext = createContext<ContextState>(defaultState);

const AppContextProvider = ({ children }: { children: React.ReactChild }) => {
  const [socket, setSocket] = useState<ContextState['socket']>();
  const [nickname, setNickname] = useState('');
  const [userColor, setUserColor] = useState<RGBColor>(DEFAULT_COLOR);
  const [roomState, setRoomState] = useState<RoomState>(DEFAULT_ROOM_STATE);

  const startConnection = (roomId: string) => {
    const host = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : '';
    const newSocket = io(host, { query: { room: roomId, user: nickname, color: JSON.stringify(userColor) } });
    console.log(userColor)
    console.log(newSocket)
    setSocket(newSocket)
  }

  useEffect(() => {
    socket?.on('stateUpdate', (data: any) => {
      setRoomState(data);
      console.log(data)
      console.log("Data", data)
    });

    socket?.on('addPresentation', (name: string) => {
      setRoomState({
        ...roomState,
        presentations: [
          ...roomState.presentations,
          {
            name,
            reactions: {}
          }
        ]
      })
    })

    socket?.on('setActivePresentation', (index: number) => {
      setRoomState({
        ...roomState,
        currentPresentation: index
      })
    })

    socket?.on('showResults', () => {
      setRoomState({
        ...roomState,
        resultsVisible: true
      })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  const getIsAdmin = () => {
    const users = roomState?.users || [];
    let admins = users.filter(user => user.isAdmin);

    return admins.find(admin => admin.user === nickname) ? true : false;
  }

  return (
    <AppContext.Provider value={{ socket, startConnection, nickname, setNickname, userColor, setUserColor, roomState, getIsAdmin }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContextProvider;
