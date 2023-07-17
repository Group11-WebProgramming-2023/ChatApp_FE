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
import {
  IconAccessPoint,
  IconHourglassEmpty,
  IconUserOff,
} from "@tabler/icons-react";
import { useLayoutEffect } from "react";

export const FriendRequest = () => {
  const dispatch = useAppDispatch();
  const theme = useMantineTheme();
  const { allRequests } = useAppSelector((state: RootState) => state.user);

  useLayoutEffect(() => {
    dispatch(UserAction.getAllRequests());
  }, [dispatch]);

  const handleAcceptRequest = (requestId: string | undefined) => {
    if (requestId) {
      socket.emit(SocketEvents.ACCEPT_REQUEST, { request_id: requestId });
      renderNotification("You have accepted friend request", NotiType.SUCCESS);
    }
  };

  return (
    <Center>
      {allRequests.length > 0 ? (
        <Stack p={"xl"} w={"100%"}>
          <Grid gutter={"xl"}>
            {allRequests.map((request) => (
              <Col xs={12} md={6} key={request._id}>
                <Card radius={"md"} withBorder>
                  <Grid align="center" px={"xs"} w={"100%"}>
                    <Col span={2}>
                      <Avatar
                        src={request.sender.avatar}
                        radius={"xl"}
                        size={"md"}
                      />
                    </Col>
                    <Col offset={1} span={7}>
                      <Text fw={500}>
                        {request.sender.firstName} {request.sender.lastName}
                      </Text>
                    </Col>
                    <Col span={2}>
                      <Button
                        color={theme.colors.blue[5]}
                        size="sm"
                        onClick={() => handleAcceptRequest(request._id)}
                      >
                        Accept
                      </Button>
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
            You have no friend requests
          </Text>
        </Stack>
      )}
    </Center>
  );
};
