import { Socket } from "socket.io-client";
import { RGBColor } from '../pages/Login/types';



export type ContextState = {
  socket?: Socket;
  startConnection: (roomId: string) => void;
  nickname: string;
  setNickname: (val: string) => void;
  userColor: RGBColor;
  setUserColor: (val: RGBColor) => void;
}
