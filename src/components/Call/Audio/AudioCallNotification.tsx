import { Avatar, Button, Center, Group, Stack, Text } from "@mantine/core";
import { IconPhoneIncoming, IconPhoneOff } from "@tabler/icons-react";
import { SocketEvents, socket } from "@/utils/socket";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { RootState } from "@/redux/reducer";
import { AudioCallActionType } from "@/redux/reducer/audioCall/audioCall.type";

interface Props {
  close: () => void;
}

export const AudioCallNotification = ({ close }: Props) => {
  const dispatch = useAppDispatch();
  const [call_details] = useAppSelector(
    (state: RootState) => state.audioCall.call_queue
  );

  const handleAcceptCall = () => {
    socket.emit(SocketEvents.AUDIO_CALL_ACCEPTED, { ...call_details });
    dispatch({
      type: AudioCallActionType.UPDATE_AUDIO_CALL_MODAL,
      payload: {
        state: true,
      },
    });
  };

  const handleDenyCall = () => {
    socket.emit(SocketEvents.AUDIO_CALL_DENIED, { ...call_details });
    dispatch({
      type: AudioCallActionType.RESET_AUDIO_QUEUE,
    });
    close();
  };

  return (
    <Stack>
      <Center>
        <Avatar size={"lg"} radius={"xl"} />
      </Center>
      <Text fw={500} align="center">
        Khue Dinh calling you ...
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
