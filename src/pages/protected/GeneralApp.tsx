import { Chat } from "@/components/Chat";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { RootState } from "@/redux/reducer";
import { ConversationAction } from "@/redux/reducer/conversation/conversation.action";
import { ConversationActionType } from "@/redux/reducer/conversation/conversation.type";
import { IConversation } from "@/types/models/IConversation";
import { SocketEvents, socket } from "@/utils/socket";
import {
  Avatar,
  Card,
  Col,
  Grid,
  Stack,
  Text,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useEffect } from "react";

export const GeneralApp = () => {
  const theme = useMantineTheme();
  const dispatch = useAppDispatch();
  const userId = localStorage.getItem("userId");

  // useEffect(() => {
  //   if (userId && socket) {
  //     socket.emit("get_direct_conversations", { user_id: userId }, (data) => {
  //       console.log(data);
  //       dispatch({
  //         type: ConversationActionType.FETCH_DIRECT_CONVERSATIONS,
  //         payload: data,
  //       });
  //     });
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [userId, dispatch, socket]);

  const { conversations } = useAppSelector(
    (state: RootState) => state.conversation.direct_chat
  );

  return (
    <Grid p={0} m={0} h={"100vh"}>
      <Col span={3} p={"lg"}>
        <Stack spacing={"md"}>
          <Text fw={"bold"} fz={"lg"}>
            Chats
          </Text>
          <TextInput
            radius={"lg"}
            icon={<IconSearch size={"1rem"} color={theme.colors.blue[5]} />}
            placeholder="Search"
          />
          <Text fw={"bold"} color="dimmed" fz={"sm"}>
            Pinned
          </Text>

          <Text fw={"bold"} color="dimmed" fz={"sm"}>
            All chats
          </Text>
          <Stack>
            {conversations.map((conversation) => (
              <ConversationCard
                key={conversation._id}
                conversation={conversation}
              />
            ))}
          </Stack>
        </Stack>
      </Col>

      <Col span={6} p={"lg"}>
        <Chat />
      </Col>
    </Grid>
  );
};

interface ChatCardProps {
  conversation: IConversation;
}

const ConversationCard = ({ conversation }: ChatCardProps) => {
  const userId = localStorage.getItem("userId");

  const dispatch = useAppDispatch();
  const { selected_conversation_id } = useAppSelector(
    (state: RootState) => state.conversation
  );

  const handleSelectConversation = () => {
    if (conversation._id) {
      dispatch(ConversationAction.SelectConversation(conversation._id));
      socket.emit(
        SocketEvents.GET_MESSAGES,
        {
          conversation_id: conversation._id,
        },
        (data) =>
          dispatch({
            type: ConversationActionType.GET_MESSAGES,
            payload: data,
          })
      );
    }
  };
  const isSelectedConversation = () =>
    conversation._id == selected_conversation_id;

  return (
    <Card
      withBorder
      p={"xs"}
      fz={"xs"}
      radius={"md"}
      onClick={handleSelectConversation}
      bg={isSelectedConversation() ? "blue" : "white"}
      c={isSelectedConversation() ? "white" : ""}
    >
      <Grid align="center">
        <Col span={2}>
          <Avatar
            src={
              "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
            }
            radius={"xl"}
          />
        </Col>
        <Col span={7} pl={"sm"}>
          <Stack spacing={0}>
            <Text fw={600}>
              {
                conversation.participants.filter(
                  (item) => item._id !== userId
                )[0].firstName
              }
            </Text>
            <Text>
              {conversation.messages[conversation.messages.length - 1].from ==
                userId && `You: `}
              {conversation.messages[conversation.messages.length - 1].text}
            </Text>
          </Stack>
        </Col>
        {/* <Col span={3}>
          <Stack spacing={0} align="center">
            <Text fw={600}>{}</Text>
            <Badge color="blue" px={"xs"}>
              3
            </Badge>
          </Stack>
        </Col> */}
      </Grid>
    </Card>
  );
};
