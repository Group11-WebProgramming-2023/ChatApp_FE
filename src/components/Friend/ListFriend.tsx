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
  Group,
  Input,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { IconMessage } from "@tabler/icons-react";
import { useEffect, useLayoutEffect } from "react";

export const ListFriend = () => {
  const dispatch = useAppDispatch();
  const theme = useMantineTheme();
  const { allFriends } = useAppSelector((state: RootState) => state.user);

  useLayoutEffect(() => {
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
    <Center w={"1080px"}>
      <Stack p={"xl"} w={"100%"}>
        <Group>
          <Input placeholder="Tìm kiếm" />
        </Group>
        <Grid gutter={"xl"}>
          {allFriends.map((friend) => (
            <Col span={6} key={friend._id}>
              <Card radius={"md"} withBorder>
                <Grid align="center" px={"lg"}>
                  <Col span={2}>
                    <Avatar radius={"sm"} size={"lg"} />
                  </Col>
                  <Col span={9}>
                    <Text fw={500}>
                      {friend.firstName} {friend.lastName}
                    </Text>
                  </Col>
                  <Col span={1}>
                    <IconMessage
                      size={"1.5rem"}
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
    </Center>
  );
};
