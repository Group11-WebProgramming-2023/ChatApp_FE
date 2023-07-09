import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { RootState } from "@/redux/reducer";
import { ConversationActions } from "@/redux/reducer/conversation/conversation.action";
import { IConversation } from "@/types/models/IConversation";
import {
  Avatar,
  Badge,
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
import { useDispatch } from "react-redux";

const fakeData = [
  {
    username: "Hieesu Dinh",
    avatar: "",
    message: "To thich cau",
    time: "12:12",
  },
  {
    username: "Hieesu Dinh",
    avatar: "",
    message: "To thich cau",
    time: "12:12",
  },
  {
    username: "Hieesu Dinh",
    avatar: "",
    message: "To thich cau",
    time: "12:12",
  },
  {
    username: "Hieesu Dinh",
    avatar: "",
    message: "To thich cau",
    time: "12:12",
  },
  {
    username: "Hieesu Dinh",
    avatar: "",
    message: "To thich cau",
    time: "12:12",
  },
];

export const Home = () => {
  const theme = useMantineTheme();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(ConversationActions.getDirectConversation());
  }, [dispatch]);

  const { conversations } = useAppSelector(
    (state: RootState) => state.conversation
  );
  console.log(conversations);

  return (
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
          <ChartCard conversation={conversation} />
        ))}
      </Stack>
    </Stack>
  );
};

interface ChatCardProps {
  conversation: IConversation;
}

const ChartCard = ({ conversation }: ChatCardProps) => {
  const userId = localStorage.getItem("userId");

  return (
    <Card p={"xs"} fz={"xs"} radius={"md"} bg={"white"}>
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
            <Text color="dimmed">
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
