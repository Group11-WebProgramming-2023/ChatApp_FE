import { useAppDispatch } from "@/hooks/redux";
import { CallAction } from "@/redux/reducer/call/call.action";
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

  const handleCall = () => {
    console.log(user._id);
    if (user._id) {
      dispatch(CallAction.startAudioCall({ id: user._id }));
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
              onClick={() => handleCall()}
            />
            <IconVideo size={"1rem"} color={theme.colors.green[5]} />
          </Group>
        </Col>
      </Grid>
    </Card>
  );
};
