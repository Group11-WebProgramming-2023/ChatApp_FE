import { BaseModel } from ".";
import { IMessage } from "./IMessage";
import { IUser } from "./IUser";

export interface IConversation extends BaseModel {
  participants: IUser[];
  messages: IMessage[];
}
