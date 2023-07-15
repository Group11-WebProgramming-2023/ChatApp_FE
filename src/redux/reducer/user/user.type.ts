import { IUser } from "@/types/models/IUser";
import { ThunkAction } from "redux-thunk";
import { RootState } from "..";

export interface UserState {
  allUsers: IUser[];
  allRequests: IUser[];
  allFriends: IUser[];
}

export enum UserActionType {
  GET_ALL_USERS = "GET_ALL_USERS",
  GET_ALL_REQUEST = "GET_ALL_REQUEST",
  GET_ALL_FRIENDS = "GET_ALL_FRIENDS",
}

export interface GetAllUser {
  type: UserActionType.GET_ALL_USERS;
  payload: IUser[];
}

export interface GetAllRequest {
  type: UserActionType.GET_ALL_REQUEST;
  payload: IUser[];
}

export interface GetAllFriends {
  type: UserActionType.GET_ALL_FRIENDS;
  payload: IUser[];
}

export type UserAction = GetAllRequest | GetAllUser | GetAllFriends;

export type UserThunkAction = ThunkAction<
  void,
  RootState,
  undefined,
  UserAction
>;
