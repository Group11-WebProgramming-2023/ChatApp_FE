import { useCallApi } from "@/configs/api";
import { API_URLS } from "@/configs/api/endpoint";
import { AppDispatch } from "@/redux/store";
import { Callback } from "@/types/others/callback";
import { UserActionType } from "./user.type";

const getAllUser = (cb?: Callback) => async (dispatch: AppDispatch) => {
  const api = API_URLS.User.getUsers();

  const { response, error } = await useCallApi({ ...api });

  if (!error && response?.status === 200) {
    const { data } = response.data;
    dispatch({
      type: UserActionType.GET_ALL_USERS,
      payload: data,
    });
  }
};

const getAllFriends = (cb?: Callback) => async (dispatch: AppDispatch) => {
  const api = API_URLS.User.getFriends();

  const { response, error } = await useCallApi({ ...api });

  if (!error && response?.status === 200) {
    const { data } = response.data;

    dispatch({
      type: UserActionType.GET_ALL_FRIENDS,
      payload: data,
    });
  }
};

const getAllRequests = (cb?: Callback) => async (dispatch: AppDispatch) => {
  const api = API_URLS.User.getRequests();

  const { response, error } = await useCallApi({ ...api });

  if (!error && response?.status === 200) {
    const { data } = response.data;
   
    dispatch({
      type: UserActionType.GET_ALL_REQUEST,
      payload: data,
    });
  }
};

export const UserAction = { getAllUser, getAllFriends, getAllRequests };
