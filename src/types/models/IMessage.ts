import { BaseModel } from ".";

export interface IMessage extends BaseModel {
  from: string;
  to: string;
  avatar?: string;
  text: string;
  type: IMessageType;
  conversation_id?: string;
}

export interface INewMessage extends BaseModel {
  message: IMessage;
  conversation_id: string;
}

export interface ISocketMessage extends BaseModel {
  message: string;
}

export enum IMessageType {
  TEXT = "TEXT",
}
