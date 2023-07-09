import { IConversation } from "@/types/models/IConversation";
import { io, Socket } from "socket.io-client";

interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  new_message: (data: NewMessagePayload) => void;
}

export enum SocketEvents {
  GET_DIRECT_CONVERSATIONS = "get_direct_conversations",
  TEXT_MESSAGE = "text_message",
  NEW_MESSAGE = "new_message",
}

interface GetDirectConversationPayload {
  user_id: string;
}

interface TextMessagePayload {
  message: string;
  conversation_id: string;
  from: string;
  to: string;
  type: string;
}

export interface NewMessagePayload {
  conversation_id: string;
  message: string;
}

interface ClientToServerEvents {
  // get_direct_conversations: (
  //   userId: string,
  //   callback: (data: unknown) => void
  // ) => void;
  get_direct_conversations: (
    args: GetDirectConversationPayload,
    callback: (data: IConversation[]) => void
  ) => void;
  text_message: (args: TextMessagePayload) => void;
}

let socket: Socket<ServerToClientEvents, ClientToServerEvents> = io();

const connectSocket = (user_id: string) => {
  socket = io("http://localhost:8000/", {
    query: `user_id=${user_id}`,
  });
};

export { socket, connectSocket };
