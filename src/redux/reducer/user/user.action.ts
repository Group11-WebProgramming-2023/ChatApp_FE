import { useCallApi } from "@/configs/api";
import { API_URLS } from "@/configs/api/endpoint";
import { UpdateProfilePayload } from "@/configs/api/payload";
import { AppDispatch } from "@/redux/store";
import { Callback } from "@/types/others/callback";
import { NotiType, renderNotification } from "@/utils/notifications";
import { UserActionType, UserThunkAction } from "./user.type";

const getAllUser = () => async (dispatch: AppDispatch) => {
  const api = API_URLS.User.getUsers();

  const { response, error } = await useCallApi({ ...api });

  if (!error && response?.status === 200) {
    const { data } = response.data;
    dispatch({
      type: UserActionType.GET_ALL_USERS,
      payload: data,
    });
  } else {
    renderNotification(error.response.data.message, NotiType.ERROR);
  }
};

const getAllFriends = () => async (dispatch: AppDispatch) => {
  const api = API_URLS.User.getFriends();

  const { response, error } = await useCallApi({ ...api });

  if (!error && response?.status === 200) {
    const { data } = response.data;

    dispatch({
      type: UserActionType.GET_ALL_FRIENDS,
      payload: data,
    });
  } else {
    renderNotification(error.response.data.message, NotiType.ERROR);
  }
};

const getAllRequests = () => async (dispatch: AppDispatch) => {
  const api = API_URLS.User.getRequests();

  const { response, error } = await useCallApi({ ...api });

  if (!error && response?.status === 200) {
    const { data } = response.data;

    dispatch({
      type: UserActionType.GET_ALL_REQUEST,
      payload: data,
    });
  } else {
    renderNotification(error.response.data.message, NotiType.ERROR);
  }
};

const getProfile =
  (cb?: Callback): UserThunkAction =>
  async (dispatch: AppDispatch) => {
    const api = API_URLS.User.getProfile();
    const { response, error } = await useCallApi({ ...api });
    if (!error && response?.status === 200) {
      const { data } = response.data;

      dispatch({
        type: UserActionType.GET_PROFILE,
      });
      cb?.onSuccess?.(data);
    } else {
      renderNotification(error.response.data.message, NotiType.ERROR);
      cb?.onError?.();
    }
  };

const updateProfile =
  (payload: UpdateProfilePayload, cb?: Callback): UserThunkAction =>
  async (dispatch: AppDispatch) => {
    const api = API_URLS.User.updateProfile();
    const { response, error } = await useCallApi({ ...api, payload });
    if (!error && response?.status === 200) {
      dispatch({
        type: UserActionType.UPDATE_PROFILE,
      });
      cb?.onSuccess?.();
    } else {
      renderNotification(error.response.data.message, NotiType.ERROR);
      cb?.onError?.();
    }
  };
export const UserAction = {
  getAllUser,
  getAllFriends,
  getAllRequests,
  getProfile,
  updateProfile,
};
