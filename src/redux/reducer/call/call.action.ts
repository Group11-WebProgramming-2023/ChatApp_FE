import { useCallApi } from "@/configs/api";
import { API_URLS } from "@/configs/api/endpoint";
import { StartCallPayload } from "@/configs/api/payload";
import { AppDispatch } from "@/redux/store";
import { Callback } from "@/types/others/callback";
import { CallActionType, CallThunkAction } from "./call.type";

const startAudioCall =
  (payload: StartCallPayload, cb?: Callback): CallThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: CallActionType.RESET_AUDIO_QUEUE });

    const api = API_URLS.User.startAudioCall();

    const { response, error } = await useCallApi({ ...api, payload });

    if (!error && response?.status === 200) {
      dispatch({
        type: CallActionType.PUSH_TO_AUDIO_QUEUE,
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

const getCallLog = (): CallThunkAction => async (dispatch: AppDispatch) => {
  const api = API_URLS.User.getCallLog();

  const { response, error } = await useCallApi({ ...api });
  if (!error && response?.status) {
    dispatch({
      type: CallActionType.GET_CALL_LOG,
      payload: response.data.data,
    });
  } else {
    console.log(error);
  }
};
export const CallAction = { startAudioCall, getCallLog };
