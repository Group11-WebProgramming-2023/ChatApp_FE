import { linkify } from "@/utils/helpers";
import {
  Button,
  Col,
  Grid,
  Group,
  Input,
  useMantineTheme,
} from "@mantine/core";
import { IconLink, IconMoodSmile, IconSend } from "@tabler/icons-react";
import { useState } from "react";
import { containsUrl } from "../../utils/helpers";
import { socket } from "@/utils/socket";
import { useAppDispatch } from "@/hooks/redux";

interface Props {
  conversationId?: string;
}

export const Footer = ({ conversationId }: Props) => {
  const userId = localStorage.getItem("userId");
  const theme = useMantineTheme();
  const dispatch = useAppDispatch();

  const [_message, setMessage] = useState<string>("");

  const handleSendMessage = () => {
    if (userId) {
      socket.emit("text_message", {
        message: linkify(_message),
        conversation_id: "64a7ac3275f8f7a44d322d2f",
        from: userId,
        to: "64a7abd375f8f7a44d322cdc",
        type: containsUrl(_message) ? "Link" : "Text",
      });
    }
    // dispatch(ConversationActions.getDirectConversation());
  };

  return (
    <Group bg={"#F7F9FD"} h={"10%"} py={"md"} px={"xl"}>
      <Grid w={"100%"}>
        <Col span={11}>
          <Input
            color={theme.colors.blue[5]}
            rightSection={
              <IconMoodSmile color={theme.colors.blue[5]} size={"1rem"} />
            }
            icon={<IconLink color={theme.colors.blue[5]} size={"1rem"} />}
            w={"100%"}
            radius={"lg"}
            value={_message}
            placeholder="Write a message"
            onChange={(e) => setMessage(e.currentTarget.value)}
          />
        </Col>
        <Col span={1}>
          <Button
            color="blue.4"
            radius={"md"}
            onClick={() => handleSendMessage()}
          >
            <IconSend size={"0.8rem"} />
          </Button>
        </Col>
      </Grid>
    </Group>
  );
};
