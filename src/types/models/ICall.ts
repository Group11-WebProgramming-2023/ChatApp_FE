import { Icon, IconCamera, IconPhone } from "@tabler/icons-react";
import { BaseModel } from ".";
import { IUser } from "./IUser";

export interface ICall extends BaseModel {
  status: ICallStatus;
  type: ICallType;
  time: string;
  user: IUser;
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

export const ICallStatusDict: Record<
  ICallStatus,
  { label: string; color: string }
> = {
  [ICallStatus.COMING]: {
    label: "Coming",
    color: "blue",
  },
  [ICallStatus.GOING]: {
    label: "Going",
    color: "green",
  },
  [ICallStatus.MISSED]: {
    label: "Missed",
    color: "red",
  },
};

export const ICallTypeDict: Record<ICallType, { icon: Icon; color?: string }> =
  {
    [ICallType.VIDEO]: {
      icon: IconCamera,
    },
    [ICallType.VOICE]: {
      icon: IconPhone,
    },
  };
