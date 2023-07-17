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
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconUserPlus } from "@tabler/icons-react";
import { useEffect } from "react";

export const AllUser = () => {
  const dispatch = useAppDispatch();
  const theme = useMantineTheme();
  const matches = useMediaQuery(`(min-width: ${theme.breakpoints.lg})`);
  const { allUsers } = useAppSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(UserAction.getAllUser());
  }, [dispatch]);

  const handleAddFriend = (toId: string | undefined) => {
    const userId = localStorage.getItem("userId");
    if (toId && userId) {
      socket.emit(
        SocketEvents.FRIEND_REQUEST,
        { to: toId, from: userId },
        () => {
          renderNotification("Send friend successfully", NotiType.SUCCESS);
        }
      );
    }
  };

  return (
    <Center>
      <Stack p={"md"} w={"100%"}>
        <Grid gutter={"md"}>
          {allUsers.map((user) => (
            <Col xs={12} md={6} key={user._id}>
              <Card radius={"md"} withBorder>
                <Grid align="center">
                  <Col span={2}>
                    <Avatar
                      radius={"sm"}
                      size={matches ? "lg" : "md"}
                      src={user.avatar}
                    />
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
                      size={matches ? "md" : "xs"}
                    >
                      Add
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
