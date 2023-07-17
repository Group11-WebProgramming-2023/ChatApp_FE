import { useAppDispatch } from "@/hooks/redux";
import { AudioCallAction } from "@/redux/reducer/audioCall/audioCall.action";
import { VideoCallAction } from "@/redux/reducer/videoCall/videoCall.action";
import { IUser } from "@/types/models/IUser";
import {
  Avatar,
  Card,
  Col,
  Grid,
  Group,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { IconPhone, IconVideo } from "@tabler/icons-react";

interface Props {
  user: IUser;
  close: () => void;
}

export const CallCard = ({ user, close }: Props) => {
  const dispatch = useAppDispatch();
  const theme = useMantineTheme();

  const handleAudioCall = () => {
    if (user._id) {
      dispatch(AudioCallAction.startAudioCall({ id: user._id }));
      close();
    }
  };

  const handleVideoCall = () => {
    if (user._id) {
      dispatch(VideoCallAction.startVideoCall({ id: user._id }));
      close();
    }
  };

  return (
    <Card>
      <Grid align="center">
        <Col span={2}>
          <Avatar radius={"xl"} />
        </Col>
        <Col span={8}>
          <Text fw={500} ml={2}>
            {user.lastName}
            {user.firstName}
          </Text>
        </Col>
        <Col span={2}>
          <Group>
            <IconPhone
              cursor={"pointer"}
              size={"1rem"}
              color={theme.colors.green[5]}
              onClick={() => handleAudioCall()}
            />
            <IconVideo
              cursor={"pointer"}
              size={"1rem"}
              color={theme.colors.green[5]}
              onClick={() => handleVideoCall()}
            />
          </Group>
        </Col>
      </Grid>
    </Card>
  );
};
