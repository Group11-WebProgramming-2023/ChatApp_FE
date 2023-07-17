import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { RootState } from "@/redux/reducer";
import { UserAction } from "@/redux/reducer/user/user.action";
import { NotiType, renderNotification } from "@/utils/notifications";
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
import { IconAccessPoint } from "@tabler/icons-react";
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
      <Stack p={"xl"} w={"100%"}>
        {/* <Group>
          <Input placeholder="Tìm kiếm" />
        </Group> */}
        <Grid gutter={"xl"}>
          {allRequests.map((request) => (
            <Col span={6} key={request._id}>
              <Card radius={"md"} withBorder>
                <Grid align="center" px={"lg"}>
                  <Col span={2}>
                    <Avatar
                      src={request.sender.avatar}
                      radius={"sm"}
                      size={"lg"}
                    />
                  </Col>
                  <Col span={9}>
                    <Text fw={500}>
                      {request.sender.firstName} {request.sender.lastName}
                    </Text>
                  </Col>
                  <Col span={1}>
                    <IconAccessPoint
                      size={"1.5rem"}
                      color={theme.colors.blue[5]}
                      cursor={"pointer"}
                      onClick={() => handleAcceptRequest(request._id)}
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
