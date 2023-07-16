import { useCallApi } from "@/configs/api";
import { API_URLS } from "@/configs/api/endpoint";
import { StartCallPayload } from "@/configs/api/payload";
import { AppDispatch } from "@/redux/store";
import { Callback } from "@/types/others/callback";
import { VideoCallActionType, VideoCallThunkAction } from "./videoCall.type";

const startVideoCall =
  (payload: StartCallPayload, cb?: Callback): VideoCallThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: VideoCallActionType.RESET_VIDEO_QUEUE });

    const api = API_URLS.User.startVideoCall();

    const { response, error } = await useCallApi({ ...api, payload });

    if (!error && response?.status === 200) {
      dispatch({
        type: VideoCallActionType.PUSH_TO_VIDEO_QUEUE,
        payload: {
          call: response.data.data,
          incoming: false,
        },
      });
      cb?.onSuccess?.();
    } else {
      console.log(error);
    }
  };

export const VideoCallAction = { startVideoCall };
