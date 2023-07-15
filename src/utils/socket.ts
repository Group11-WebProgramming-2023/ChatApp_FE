import { IConversation } from "@/types/models/IConversation";
import { IMessage, ISocketMessage } from "@/types/models/IMessage";
import { io, Socket } from "socket.io-client";

interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  new_message: (data: IMessage) => void;
  new_friend_request: (data: ISocketMessage) => void;
  audio_call_notification: (data: AudioCallNotificationPayload) => void;
  start_chat: (data: IConversation) => void;
  audio_call_accepted: (data: FriendRequestPayload) => void;
}

export enum SocketEvents {
  GET_DIRECT_CONVERSATIONS = "get_direct_conversations",
  TEXT_MESSAGE = "text_message",
  NEW_MESSAGE = "new_message",

  //friend
  FRIEND_REQUEST = "friend_request",
  NEW_FRIEND_REQUEST = "new_friend_request",
  ACCEPT_REQUEST = "accept_request",

  //message
  GET_MESSAGES = "get_messages",
  START_CONVERSATION = "start_conversation",
  START_CHAT = "start_chat",

  //audio call
  AUDIO_CALL_NOTIFICATION = "audio_call_notification",
  START_AUDIO_CALL = "start_audio_call",
  AUDIO_CALL_DENIED = "audio_call_denied",
  AUDIO_CALL_ACCEPTED = "audio_call_accepted",
}

interface AudioCallNotificationPayload {
  from: string;
  roomID: string;
  streamID: string;
  userID: string;
  userName: string;
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

export interface FriendRequestPayload {
  from: string;
  to: string;
}

export interface StartAudioCallPayload {
  from: string;
  to: string;
  coversation_id: string;
}

export interface GetMessagePayload {
  conversation_id: string;
}

export interface StartConversationPayload {
  from: string;
  to: string;
}

//Call

interface ClientToServerEvents {
  // get_direct_conversations: (
  //   userId: string,
  //   callback: (data: unknown) => void
  // ) => void;

  //message
  get_direct_conversations: (
    args: GetDirectConversationPayload,
    callback: (data: IConversation[]) => void
  ) => void;
  text_message: (args: TextMessagePayload) => void;
  get_messages: (arg: GetMessagePayload, callback: (data: any) => void) => void;
  start_conversation: (arg: StartConversationPayload) => void;

  //friend
  friend_request: (args: FriendRequestPayload, callback: () => void) => void;
  accept_request: (args: { request_id: string }) => void;

  //call
  start_audio_call: (arg: StartAudioCallPayload, callback?: () => void) => void;
  audio_call_accepted: (arg: unknown) => void;
  audio_call_denied: (arg: unknown) => void;
}

let socket: Socket<ServerToClientEvents, ClientToServerEvents>;

const connectSocket = (user_id: string) => {
  socket = io("http://localhost:8000/", {
    query: `user_id=${user_id}`,
  });
  console.log(socket);
};

export { socket, connectSocket };
