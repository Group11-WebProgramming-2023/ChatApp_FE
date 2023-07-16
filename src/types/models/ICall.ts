import { BaseModel } from ".";

export interface ICall extends BaseModel {
  firstName: string;
  lastName: string;
  incoming: boolean;
  missed: boolean;
  id: string;
}

export enum ICallStatus {
  GOING = "GOING",
  COMING = "COMING",
  MISSED = "MISSED",
}

export enum ICallType {
  VOICE = "VOICE",
  VIDEO = "VIDEO",
}
