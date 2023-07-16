import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { RootState } from "@/redux/reducer";
import { UserAction } from "@/redux/reducer/user/user.action";
import { NotiType, renderNotification } from "@/utils/notifications";
import { SocketEvents, socket } from "@/utils/socket";
import {
  Avatar,
  Button,
  Card,
  Center,
  Col,
  Grid,
  Group,
  Input,
  Stack,
  Text,
} from "@mantine/core";
import { IconUserPlus } from "@tabler/icons-react";
import { useEffect } from "react";

export const AllUser = () => {
  const dispatch = useAppDispatch();

  const { allUsers } = useAppSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(UserAction.getAllUser());
  }, []);

  const handleAddFriend = (toId: string | undefined) => {
    const userId = localStorage.getItem("userId");
    if (toId && userId) {
      socket.emit(
        SocketEvents.FRIEND_REQUEST,
        { to: toId, from: userId },
        () => {
          renderNotification("Send friend successfullt", NotiType.SUCCESS);
        }
      );
    }
  };

  return (
    <Center>
      <Stack p={"xl"} w={"100%"}>
        <Group>
          <Input placeholder="Tìm kiếm" />
        </Group>
        <Grid gutter={"xl"}>
          {allUsers.map((user) => (
            <Col span={6}>
              <Card radius={"md"} withBorder>
                <Grid align="center">
                  <Col span={2}>
                    <Avatar radius={"sm"} size={"lg"} />
                  </Col>
                  <Col span={6}>
                    <Text fw={500}>
                      {user.firstName} {user.lastName}
                    </Text>
                  </Col>
                  <Col span={3}>
                    <Button
                      rightIcon={<IconUserPlus size={"1rem"} />}
                      onClick={() => handleAddFriend(user._id)}
                    >
                      Add friend
                    </Button>
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
