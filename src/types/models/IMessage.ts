import { BaseModel } from ".";

export interface IMessage extends BaseModel {
  content: string;
  time: string;
  type: IMessageType;
}

export enum IMessageType {
  OUTGOING = "OUTGOING",
  INCOMING = "INCOMING",
}
