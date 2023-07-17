import { BaseModel } from ".";

export interface IUser extends BaseModel {
  email: string;
  firstName: string;
  lastName: string;
  status: IUserStatus;
  avatar: string;
}

export enum IUserStatus {
  ONLINE = "ONLINE",
  OFFLINE = "OFFLINE",
}
