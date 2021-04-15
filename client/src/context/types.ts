import { Socket } from "socket.io-client";
import { RGBColor } from '../types';



export type ReactionCount = {
  [type: string]: number;
}
export type RoomState = {
  currentPresentation: number;
  presentations: Array<{name : string, reactions: ReactionCount}>
  reactions: ReactionCount,
  users: Array<{ user: string, color: RGBColor, id: string}>,
}

export type ContextState = {
  socket?: Socket;
  startConnection: (roomId: string) => void;
  nickname: string;
  setNickname: (val: string) => void;
  userColor: RGBColor;
  setUserColor: (val: RGBColor) => void;
  roomState: RoomState | any;
}


