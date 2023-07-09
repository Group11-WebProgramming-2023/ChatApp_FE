import { BaseModel } from ".";

export interface IMessage extends BaseModel {
  from: string;
  to: string;
  text: string;
  type: IMessageType;
}

export enum IMessageType {
  TEXT = "TEXT",
}
