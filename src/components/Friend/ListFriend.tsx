import { API_URLS } from "@/configs/api/endpoint";
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
import { useMediaQuery } from "@mantine/hooks";
import { IconMessage } from "@tabler/icons-react";
import { useEffect } from "react";

export const ListFriend = () => {
  const dispatch = useAppDispatch();
  const theme = useMantineTheme();
  const matches = useMediaQuery(`(min-width: ${theme.breakpoints.lg})`);
  const { allFriends } = useAppSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(UserAction.getAllFriends());
  }, []);

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
      <Stack p={"md"} w={"100%"}>
        {/* <Group>
          <Input placeholder="Tìm kiếm" />
        </Group> */}
        <Grid gutter={"md"}>
          {allFriends.map((friend) => (
            <Col sm={12} md={6} key={friend._id}>
              <Card radius={"md"} withBorder>
                <Grid align="center" px={"xs"}>
                  <Col sm={4} md={2} bg={"red"}>
                    <Avatar radius={"sm"} size={"lg"} />
                  </Col>
                  <Col sm={8} md={8}>
                    <Text fw={500}>
                      {friend.firstName} {friend.lastName}
                    </Text>
                  </Col>
                  <Col sm={1} md={2}>
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
