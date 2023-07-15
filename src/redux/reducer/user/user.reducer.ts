import { Reducer } from "redux";
import { UserAction, UserActionType, UserState } from "./user.type";

const initialState: UserState = {
  allRequests: [],
  allUsers: [],
  allFriends: [],
};

const userReducer: Reducer<UserState, UserAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case UserActionType.GET_ALL_USERS:
      return { ...state, allUsers: action.payload };
    case UserActionType.GET_ALL_REQUEST:
      return { ...state, allRequests: action.payload };
    case UserActionType.GET_ALL_FRIENDS:
      return { ...state, allFriends: action.payload };
    default:
      return state;
  }
};

export default userReducer;
