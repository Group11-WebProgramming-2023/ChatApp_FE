import { BaseModel } from ".";

export interface ICall extends BaseModel {
  firstName: string;
  lastName: string;
  isCaller: boolean;
  type: ICallType;
  missed: boolean;
  id: string;
  img?: string;
}

export enum ICallStatus {
  GOING = "GOING",
  COMING = "COMING",
  MISSED = "MISSED",
}

export enum ICallType {
  VOICE = "audio",
  VIDEO = "video",
}
