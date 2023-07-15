import { BaseModel } from ".";
import { IUser } from "./IUser";

export interface IRequest extends BaseModel {
  sender: IUser;
}
