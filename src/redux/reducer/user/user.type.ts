import { IUser } from "@/types/models/IUser";
import { ThunkAction } from "redux-thunk";
import { RootState } from "..";
import { IRequest } from "@/types/models/IRequest";

export interface UserState {
  allUsers: IUser[];
  allRequests: IRequest[];
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
  payload: IRequest[];
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
