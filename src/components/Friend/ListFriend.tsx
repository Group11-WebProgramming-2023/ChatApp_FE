import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { RootState } from "@/redux/reducer";
import { UserAction } from "@/redux/reducer/user/user.action";
import { SocketEvents, socket } from "@/utils/socket";
import {
  Avatar,
  Card,
  Center,
  Col,
  Grid,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { IconHourglassEmpty, IconMessage } from "@tabler/icons-react";
import { useEffect } from "react";

export const ListFriend = () => {
  const dispatch = useAppDispatch();
  const theme = useMantineTheme();

  const { allFriends } = useAppSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(UserAction.getAllFriends());
  }, [dispatch]);

  const handleStartConversation = (toId: string | undefined) => {
    if (toId) {
      socket.emit(SocketEvents.START_CONVERSATION, {
        from: localStorage.getItem("userId") || "",
        to: toId,
      });
    }
  };

  return (
    <Center>
      {allFriends.length > 0 ? (
        <Stack p={"md"} w={"100%"}>
          <Grid gutter={"md"} w={"100%"}>
            {allFriends.map((friend) => (
              <Col xs={12} md={6} key={friend._id}>
                <Card radius={"md"} withBorder>
                  <Grid align="center" px={"xs"} w={"100%"}>
                    <Col span={2}>
                      <Avatar
                        radius={"xl"}
                        src={friend.avatar || ""}
                        size={"md"}
                      />
                    </Col>
                    <Col offset={1} span={8}>
                      <Text fw={500}>
                        {friend.firstName} {friend.lastName}
                      </Text>
                    </Col>
                    <Col span={1}>
                      <IconMessage
                        size={"1rem"}
                        color={theme.colors.blue[5]}
                        cursor={"pointer"}
                        onClick={() => handleStartConversation(friend._id)}
                      />
                    </Col>
                  </Grid>
                </Card>
              </Col>
            ))}
          </Grid>
        </Stack>
      ) : (
        <Stack align="center" py={"xl"}>
          <IconHourglassEmpty size={"5rem"} stroke={1} />
          <Text fw={500} fz={"lg"} color="dimmed">
            You have no friends. Explore and start chatting
          </Text>
        </Stack>
      )}
    </Center>
  );
};
