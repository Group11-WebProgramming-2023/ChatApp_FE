import { IConversation } from "@/types/models/IConversation";
import { IMessage, INewMessage } from "@/types/models/IMessage";
import { ThunkAction } from "redux-thunk";
import { RootState } from "..";

export interface ConversationState {
  direct_chat: {
    conversations: IConversation[];
    current_conversation: IConversation | null;
    current_messages: IMessage[];
  };
  group_chat: unknown;
  selected_conversation_id: string;
  seleted_to_id: string;
}

export enum ConversationActionType {
  FETCH_DIRECT_CONVERSATIONS = "FETCH_DIRECT_CONVERSATIONS",
  SELECT_CONVERSATION = "SELECT_CONVERSATION",
  GET_MESSAGES = "GET_MESSAGES",
  NEW_MESSAGE = "NEW_MESSAGE",
}

export interface FetchDirectConversations {
  type: ConversationActionType.FETCH_DIRECT_CONVERSATIONS;
  payload: IConversation[];
}

export interface SelectConversationPayload {
  conversation_id: string;
  to_id: string;
}

export interface SelectConversation {
  type: ConversationActionType.SELECT_CONVERSATION;
  payload: IConversation;
}

export interface GetMessages {
  type: ConversationActionType.GET_MESSAGES;
  payload: IMessage[];
}
export interface NewMessage {
  type: ConversationActionType.NEW_MESSAGE;
  payload: INewMessage;
}

export type ConversationAction =
  | FetchDirectConversations
  | SelectConversation
  | GetMessages
  | NewMessage;

export type ConversationThunkAction = ThunkAction<
  void,
  RootState,
  undefined,
  ConversationAction
>;
