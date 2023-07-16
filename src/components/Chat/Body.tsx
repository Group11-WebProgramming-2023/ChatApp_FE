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

  useEffect(() => {
    const scrollToBottom = () =>
      viewport?.current?.scrollTo({
        top: viewport.current.scrollHeight,
        behavior: "smooth",
      });

    scrollToBottom();
  }, [messages]);

  const theme = useMantineTheme();

  return (
    <ScrollArea h={"80%"} viewportRef={viewport} type="scroll" p={"lg"}>
      {messages ? (
        messages.map((mes) => (
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
              my={2}
            >
              <Text fz={"xs"}>{mes.text}</Text>
            </Card>
          </Group>
        ))
      ) : (
        <Stack align="center" justify="center" h={"100%"}>
          <Text>Start chatting with your friend.</Text>
        </Stack>
      )}
    </ScrollArea>
  );
};
