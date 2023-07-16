import { notifications } from "@mantine/notifications";

export enum NotiType {
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
  INFO = "INFO",
}

export interface NotiTypeDictFields {
  color: string;
  title: string;
}

export const NotiTypeDict: Record<NotiType, NotiTypeDictFields> = {
  [NotiType.ERROR]: {
    color: "red",
    title: "Error",
  },
  [NotiType.INFO]: {
    color: "blue",
    title: "Info",
  },
  [NotiType.SUCCESS]: {
    color: "green",
    title: "Success",
  },
};

export const renderNotification = (message: string, type: NotiType) => {
  notifications.show({
    title: NotiTypeDict[type].title,
    message,
    color: NotiTypeDict[type].color,
    withCloseButton: true,
    autoClose: 1200,
  });
};
