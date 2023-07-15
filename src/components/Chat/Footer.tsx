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
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { RootState } from "@/redux/reducer";

export const Footer = () => {
  const userId = localStorage.getItem("userId");
  const theme = useMantineTheme();
  const dispatch = useAppDispatch();
  const { selected_conversation_id, seleted_to_id } = useAppSelector(
    (state: RootState) => state.conversation
  );
  const [_message, setMessage] = useState<string>("");

  const handleSendMessage = () => {
    if (userId) {
      socket.emit("text_message", {
        message: linkify(_message),
        conversation_id: selected_conversation_id,
        from: userId,
        to: seleted_to_id,
        type: containsUrl(_message) ? "Link" : "Text",
      });
      setMessage("");
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
