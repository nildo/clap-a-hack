import { Socket } from "socket.io-client";



export type ContextState = {
  socket?: Socket;
  startConnection: (roomId: string) => void;
}
