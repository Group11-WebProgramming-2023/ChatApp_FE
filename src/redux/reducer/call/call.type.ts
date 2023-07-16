import { ThunkAction } from "redux-thunk";
import { RootState } from "..";
import { ICall } from "@/types/models/ICall";

export interface CallState {
  calllog: ICall[];
  open_audio_notification_modal: boolean;
  open_audio_modal: boolean;
  incoming: boolean;
  call_queue: any[];
}

export interface CallQueue {
  call: unknown;
  incoming: boolean;
}

export enum CallActionType {
  GET_CALL_LOG = "GET_CALL_LOG",
  START_AUDIO_CALL = "START_AUDIO_CALL",
  PUSH_TO_AUDIO_QUEUE = "PUSH_TO_AUDIO_QUEUE",
  RESET_AUDIO_QUEUE = "RESET_AUDIO_QUEUE",
  CLOSE_AUDIO_NOTI_MODAL = "CLOSE_AUDIO_NOTI_MODAL",
  UPDATE_AUDIO_CALL_MODAL = "UPDATE_AUDIO_CALL_MODAL",
}

export interface PushToAudioQueuePayload {
  call: any;
  incoming: boolean;
}

export interface GetCallLog {
  type: CallActionType.GET_CALL_LOG;
  payload: ICall[];
}

export interface PushToAudioQueue {
  type: CallActionType.PUSH_TO_AUDIO_QUEUE;
  payload: PushToAudioQueuePayload;
}

export interface ResetAudioQueue {
  type: CallActionType.RESET_AUDIO_QUEUE;
}

export interface CloseAudioCallNotiModal {
  type: CallActionType.CLOSE_AUDIO_NOTI_MODAL;
}

export interface UpdateAudioCallModal {
  type: CallActionType.UPDATE_AUDIO_CALL_MODAL;
  payload: unknown;
}

export type CallAction =
  | GetCallLog
  | PushToAudioQueue
  | ResetAudioQueue
  | CloseAudioCallNotiModal
  | UpdateAudioCallModal;

export type CallThunkAction = ThunkAction<
  void,
  RootState,
  undefined,
  CallAction
>;
