import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { RootState } from "@/redux/reducer";
import { linkify } from "@/utils/helpers";
import { socket } from "@/utils/socket";
import {
  Button,
  Col,
  Grid,
  Group,
  Input,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { IconLink, IconMoodSmile, IconSend } from "@tabler/icons-react";
import { useState } from "react";
import { containsUrl } from "../../utils/helpers";
import { ConversationActionType } from "@/redux/reducer/conversation/conversation.type";

export const Footer = () => {
  const userId = localStorage.getItem("userId");
  const theme = useMantineTheme();
  const dispatch = useAppDispatch();
  const { current_conversation } = useAppSelector(
    (state: RootState) => state.conversation.direct_chat
  );
  const [_message, setMessage] = useState<string>("");

  const handleSendMessage = () => {
    if (userId && current_conversation) {
      socket.emit("text_message", {
        message: linkify(_message),
        conversation_id: current_conversation._id || "",
        from: userId,
        to:
          current_conversation.participants.filter((el) => el._id !== userId)[0]
            ._id || "",
        type: containsUrl(_message) ? "Link" : "Text",
      });

      socket.emit("get_direct_conversations", { user_id: userId }, (data) => {
        dispatch({
          type: ConversationActionType.FETCH_DIRECT_CONVERSATIONS,
          payload: data,
        });
      });
      setMessage("");
    }
  };

  return (
    <Group
      w={"100%"}
      position="apart"
      align="center"
      bg={"#F7F9FD"}
      h={"10%"}
      py="xs"
      px={"md"}
      spacing={0}
    >
      <Grid w={"100%"}>
        <Col span={10}>
          <TextInput
            color={theme.colors.blue[5]}
            rightSection={
              <IconMoodSmile color={theme.colors.blue[5]} size={"1rem"} />
            }
            icon={<IconLink color={theme.colors.blue[5]} size={"1rem"} />}
            radius={"lg"}
            width={"100%"}
            value={_message}
            placeholder="Write a message"
            onChange={(e) => setMessage(e.currentTarget.value)}
          />
        </Col>
        <Col span={1}>
          <Button
            color="blue.5"
            radius={"md"}
            onClick={() => handleSendMessage()}
            disabled={_message.length === 0 ? true : false}
          >
            <IconSend size={"1rem"} />
          </Button>
        </Col>
      </Grid>
    </Group>
  );
};
