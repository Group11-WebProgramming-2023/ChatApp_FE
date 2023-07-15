import { IMessage } from "@/types/models/IMessage";
import {
  Card,
  Group,
  ScrollArea,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useEffect, useRef } from "react";

interface Props {
  messages: IMessage[];
}
export const Body = ({ messages }: Props) => {
  const isMyMessage = (from: string) => {
    const userId = localStorage.getItem("userId");
    return userId === from;
  };
  const viewport = useRef<HTMLDivElement>(null);

  const scrollToBottom = () =>
    viewport?.current?.scrollTo({
      top: viewport.current.scrollHeight,
      behavior: "smooth",
    });

  useEffect(() => {
    const scrollToBottom = () =>
      viewport?.current?.scrollTo({
        top: viewport.current.scrollHeight,
        behavior: "smooth",
      });

    scrollToBottom();
  }, []);

  const theme = useMantineTheme();

  return (
    <ScrollArea bg={"#FFF"} h={"80%"} viewportRef={viewport} type="scroll">
      <Stack justify={"flex-end"} px={"lg"} spacing={3}>
        {messages ? (
          messages.map((mes) => (
            // <Tooltip label={mes.createdAt} >
            <Group
              key={mes._id}
              position={isMyMessage(mes.from) ? "right" : "left"}
            >
              <Card
                radius={"md"}
                bg={theme.colors.blue[5]}
                p={5}
                px={"md"}
                c={"white"}
              >
                <Text fz={"xs"}>{mes.text}</Text>
              </Card>
            </Group>
            // </Tooltip>
          ))
        ) : (
          <Stack align="center" justify="center" h={"100%"}>
            <Text>Start chatting with your friend.</Text>
          </Stack>
        )}
      </Stack>
    </ScrollArea>
  );
};
