import { Avatar, Button, Center, Group, Stack, Text } from "@mantine/core";
import { IconPhoneIncoming, IconPhoneOff } from "@tabler/icons-react";
import { SocketEvents, socket } from "@/utils/socket";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { RootState } from "@/redux/reducer";
import { VideoCallActionType } from "@/redux/reducer/videoCall/videoCall.type";

interface Props {
  close: () => void;
}

export const VideoCallNotification = ({ close }: Props) => {
  const dispatch = useAppDispatch();
  const [call_details] = useAppSelector(
    (state: RootState) => state.videoCall.call_queue
  );

  const handleAcceptCall = () => {
    socket.emit(SocketEvents.VIDEO_CALL_ACCEPTED, {
      from: call_details.streamID,
      to: call_details.userID,
      roomID: call_details.roomID,
    });
    dispatch({
      type: VideoCallActionType.UPDATE_VIDEO_CALL_MODAL,
      payload: {
        state: true,
      },
    });
  };

  const handleDenyCall = () => {
    socket.emit(SocketEvents.VIDEO_CALL_DENIED, { ...call_details });
    dispatch({
      type: VideoCallActionType.RESET_VIDEO_QUEUE,
    });
    close();
  };

  return (
    <Stack>
      <Center>
        <Avatar size={"lg"} radius={"xl"} />
      </Center>
      <Text fw={500} align="center">
        You have incoming call
      </Text>

      <Group position={"center"}>
        <Button
          color="blue.5"
          leftIcon={<IconPhoneIncoming />}
          miw={120}
          onClick={handleAcceptCall}
        >
          Accept
        </Button>
        <Button
          color="red.5"
          leftIcon={<IconPhoneOff />}
          miw={120}
          onClick={handleDenyCall}
        >
          Deny
        </Button>
      </Group>
    </Stack>
  );
};
