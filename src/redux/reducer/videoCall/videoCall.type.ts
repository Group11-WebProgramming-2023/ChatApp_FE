import { ThunkAction } from "redux-thunk";
import { RootState } from "..";

export interface VideoCallState {
  calllog: unknown[];
  open_video_notification_modal: boolean;
  open_video_modal: boolean;
  incoming: boolean;
  call_queue: any[];
}

export interface CallQueue {
  call: unknown;
  incoming: boolean;
}

export enum VideoCallActionType {
  GET_VIDEO_CALL_LOG = "GET_VIDEO_CALL_LOG",
  START_VIDEO_CALL = "START_VIDEO_CALL",
  PUSH_TO_VIDEO_QUEUE = "PUSH_TO_VIDEO_QUEUE",
  RESET_VIDEO_QUEUE = "RESET_VIDEO_QUEUE",
  CLOSE_VIDEO_NOTI_MODAL = "CLOSE_VIDEO_NOTI_MODAL",
  UPDATE_VIDEO_CALL_MODAL = "UPDATE_VIDEO_CALL_MODAL",
}

export interface PushToVideoQueuePayload {
  call: any;
  incoming: boolean;
}

export interface GetVideoCallLog {
  type: VideoCallActionType.GET_VIDEO_CALL_LOG;
  payload: unknown[];
}

export interface PushToVideoQueue {
  type: VideoCallActionType.PUSH_TO_VIDEO_QUEUE;
  payload: PushToVideoQueuePayload;
}

export interface ResetVideoQueue {
  type: VideoCallActionType.RESET_VIDEO_QUEUE;
}

export interface CloseVideoCallNotiModal {
  type: VideoCallActionType.CLOSE_VIDEO_NOTI_MODAL;
}

export interface UpdateVideoCallModal {
  type: VideoCallActionType.UPDATE_VIDEO_CALL_MODAL;
  payload: unknown;
}

export type VideoCallAction =
  | GetVideoCallLog
  | PushToVideoQueue
  | ResetVideoQueue
  | CloseVideoCallNotiModal
  | UpdateVideoCallModal;

export type VideoCallThunkAction = ThunkAction<
  void,
  RootState,
  undefined,
  VideoCallAction
>;
