import { Reducer } from "redux";
import { CallAction, CallActionType, CallState } from "./call.type";
import { SocketEvents, socket } from "@/utils/socket";

const initialState: CallState = {
  calllog: [],
  open_audio_modal: false,
  open_audio_notification_modal: false,
  call_queue: [],
  incoming: false,
};

const callReducer: Reducer<CallState, CallAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case CallActionType.GET_CALL_LOG:
      return { ...state, calllog: action.payload };
    case CallActionType.PUSH_TO_AUDIO_QUEUE: {
      if (state.call_queue.length === 0) {
        const newCallQueue = [...state.call_queue, action.payload.call];
        if (action.payload.incoming) {
          return {
            ...state,
            call_queue: newCallQueue,
            incoming: true,
            open_audio_notification_modal: true,
          };
        } else {
          return {
            ...state,
            call_queue: newCallQueue,
            incoming: false,
            open_audio_modal: true,
          };
        }
      } else {
        socket.emit(SocketEvents.USER_IS_BUSY_AUDIO_CALL, {
          ...action.payload,
        });
        return state;
      }
    }
    case CallActionType.RESET_AUDIO_QUEUE:
      return {
        ...state,
        call_queue: [],
        open_audio_modal: false,
        open_audio_notification_modal: false,
      };
    case CallActionType.CLOSE_AUDIO_NOTI_MODAL:
      return { ...state, open_audio_notification_modal: false };
    case CallActionType.UPDATE_AUDIO_CALL_MODAL:
      return {
        ...state,
        open_audio_modal: action.payload.state,
        open_audio_notification_modal: false,
      };
    default:
      return state;
  }
};

export default callReducer;
