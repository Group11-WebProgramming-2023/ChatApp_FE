/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { Reducer } from "redux";
import {
  VideoCallAction,
  VideoCallActionType,
  VideoCallState,
} from "./videoCall.type";
import { SocketEvents, socket } from "@/utils/socket";

const initialState: VideoCallState = {
  calllog: [],
  open_video_modal: false,
  open_video_notification_modal: false,
  call_queue: [],
  incoming: false,
};

const videoCallReducer: Reducer<VideoCallState, VideoCallAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case VideoCallActionType.GET_VIDEO_CALL_LOG:
      return { ...state, calllog: action.payload };
    case VideoCallActionType.PUSH_TO_VIDEO_QUEUE: {
      if (state.call_queue.length === 0) {
        const newCallQueue = [...state.call_queue, action.payload.call];
        if (action.payload.incoming) {
          return {
            ...state,
            call_queue: newCallQueue,
            incoming: true,
            open_video_notification_modal: true,
          };
        } else {
          return {
            ...state,
            call_queue: newCallQueue,
            incoming: false,
            open_video_modal: true,
          };
        }
      } else {
        socket.emit(SocketEvents.USER_IS_BUSY_VIDEO_CALL, {
          ...action.payload,
        });
        return state;
      }
    }
    case VideoCallActionType.RESET_VIDEO_QUEUE:
      return {
        ...state,
        call_queue: [],
        open_video_modal: false,
        open_video_notification_modal: false,
      };
    case VideoCallActionType.CLOSE_VIDEO_NOTI_MODAL:
      return { ...state, open_video_notification_modal: false };
    case VideoCallActionType.UPDATE_VIDEO_CALL_MODAL:
      return {
        ...state,
        open_video_modal: action.payload.state,
        open_video_notification_modal: false,
      };
    default:
      return state;
  }
};

export default videoCallReducer;
