import { IMessage, IMessageType } from "@/types/models/IMessage";
import { Card, Group, Text, useMantineTheme } from "@mantine/core";

interface Props {
  message: IMessage;
}

export const Message = ({ message }: Props) => {
  const { content, type } = message;
  const theme = useMantineTheme();
  return (
    <Group position={type === IMessageType.OUTGOING ? "right" : "left"}>
      <Card radius={"md"} bg={theme.colors.blue[5]} p={5} px={"md"} c={"white"}>
        <Text fz={"xs"}>{content}</Text>
      </Card>
    </Group>
  );
};
