import { IConversation } from "@/types/models/IConversation";
import { ThunkAction } from "redux-thunk";
import { RootState } from "..";
import { NewMessagePayload } from "@/utils/socket";

export interface ConversationState {
  isFetching: boolean;
  conversations: IConversation[];
}

export enum ConversationActionType {
  CONVERSATION_ACTION_PENDING = "CONVERSATION_ACTION_PENDING",
  CONVERSATION_ACTION_FAILURE = "CONVERSATION_ACTION_FAILURE",
  GET_DIRECT_CONVERSATION = "GET_DIRECT_CONVERSATION",
  NEW_MESSAGE = "NEW_MESSAGE",
}

export interface ConversationActionPending {
  type: ConversationActionType.CONVERSATION_ACTION_PENDING;
}

export interface ConversationActionFailure {
  type: ConversationActionType.CONVERSATION_ACTION_FAILURE;
}

export interface GetDirectConversation {
  type: ConversationActionType.GET_DIRECT_CONVERSATION;
  payload: IConversation[];
}

export interface NewMessage {
  type: ConversationActionType.NEW_MESSAGE;
  payload: NewMessagePayload;
}

export type ConversationAction =
  | ConversationActionPending
  | ConversationActionFailure
  | GetDirectConversation
  | NewMessage;

export type ConversationThunkAction = ThunkAction<
  void,
  RootState,
  undefined,
  ConversationAction
>;
