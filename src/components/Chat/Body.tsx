import { IMessage, IMessageType } from "@/types/models/IMessage";
import { ScrollArea, Stack } from "@mantine/core";
import { Message } from "../Message";

export const Body = () => {
  const fakeData: IMessage[] = [
    {
      content: "Say hi",
      time: "10:30",
      type: IMessageType.OUTGOING,
    },
    {
      content: "Say hi",
      time: "10:30",
      type: IMessageType.OUTGOING,
    },
    {
      content: "Say hi",
      time: "10:30",
      type: IMessageType.INCOMING,
    },
    {
      content: "Say hi",
      time: "10:30",
      type: IMessageType.INCOMING,
    },
    {
      content: "Say hi",
      time: "10:30",
      type: IMessageType.INCOMING,
    },
    {
      content: " Say hi Say hi Say hiSay hiSay hi",
      time: "10:30",
      type: IMessageType.INCOMING,
    },
    {
      content: "Say hi",
      time: "10:30",
      type: IMessageType.OUTGOING,
    },
  ];

  return (
    <ScrollArea bg={"#FFF"} h={"80%"}>
      <Stack justify={"flex-end"} px={"lg"} spacing={3}>
        {fakeData.map((message) => (
          <Message message={message} />
        ))}
      </Stack>
    </ScrollArea>
  );
};
