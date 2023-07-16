import { ThunkAction } from "redux-thunk";
import { RootState } from "..";

export interface AudioCallState {
  calllog: unknown[];
  open_audio_notification_modal: boolean;
  open_audio_modal: boolean;
  incoming: boolean;
  call_queue: any[];
}

export interface CallQueue {
  call: unknown;
  incoming: boolean;
}

export enum AudioCallActionType {
  GET_AUDIO_CALL_LOG = "GET_AUDIO_CALL_LOG",
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

export interface GetAudioCallLog {
  type: AudioCallActionType.GET_AUDIO_CALL_LOG;
  payload: unknown[];
}

export interface PushToAudioQueue {
  type: AudioCallActionType.PUSH_TO_AUDIO_QUEUE;
  payload: PushToAudioQueuePayload;
}

export interface ResetAudioQueue {
  type: AudioCallActionType.RESET_AUDIO_QUEUE;
}

export interface CloseAudioCallNotiModal {
  type: AudioCallActionType.CLOSE_AUDIO_NOTI_MODAL;
}

export interface UpdateAudioCallModal {
  type: AudioCallActionType.UPDATE_AUDIO_CALL_MODAL;
  payload: unknown;
}

export type AudioCallAction =
  | GetAudioCallLog
  | PushToAudioQueue
  | ResetAudioQueue
  | CloseAudioCallNotiModal
  | UpdateAudioCallModal;

export type AudioCallThunkAction = ThunkAction<
  void,
  RootState,
  undefined,
  AudioCallAction
>;
