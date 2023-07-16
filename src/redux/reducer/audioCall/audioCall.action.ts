import { useCallApi } from "@/configs/api";
import { API_URLS } from "@/configs/api/endpoint";
import { StartCallPayload } from "@/configs/api/payload";
import { AppDispatch } from "@/redux/store";
import { Callback } from "@/types/others/callback";
import { AudioCallActionType, AudioCallThunkAction } from "./audioCall.type";

const startAudioCall =
  (payload: StartCallPayload, cb?: Callback): AudioCallThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: AudioCallActionType.RESET_AUDIO_QUEUE });

    const api = API_URLS.User.startAudioCall();

    const { response, error } = await useCallApi({ ...api, payload });

    if (!error && response?.status === 200) {
      dispatch({
        type: AudioCallActionType.PUSH_TO_AUDIO_QUEUE,
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

export const AudioCallAction = { startAudioCall };
