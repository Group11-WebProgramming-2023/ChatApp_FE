import { BaseModel } from ".";

export interface IUser extends BaseModel {
  name: string;
  phone: string;
}
