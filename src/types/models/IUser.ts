import { BaseModel } from ".";

export interface IUser extends BaseModel {
  email: string;
  firstName: string;
  lastName: string;
  status: IUserStatus;
}

export enum IUserStatus {
  ONLINE = "ONLINE",
  OFFLINE = "OFFLINE",
}
