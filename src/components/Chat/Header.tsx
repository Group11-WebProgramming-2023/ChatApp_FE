import {
  Avatar,
  Group,
  Modal,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { IconPhone, IconSearch, IconVideo } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { AudioCallNotification } from "../Call/Audio/AudioCallNotification";
import { useAppSelector } from "@/hooks/redux";
import { RootState } from "@/redux/reducer";

export const Header = () => {
  const [opened, { close, open }] = useDisclosure();
  const theme = useMantineTheme();

  const { current_conversation } = useAppSelector(
    (state: RootState) => state.conversation.direct_chat
  );
  const user = current_conversation?.participants.filter(
    (el) => el._id !== localStorage.getItem("userId")
  )[0];

  return (
    <>
      <Group position="apart" align="center" bg={"#F7F9FD"} h={"10%"} p="sm">
        <Group align="center">
          <Avatar src={""} radius={"xl"} size={"lg"} />
          <Stack spacing={0}>
            <Text fw={600} fz={"sm"}>
              {`${user?.firstName} 
              ${user?.lastName}`}
            </Text>
            <Text fz={"xs"} color="dimmed">
              Online
            </Text>
          </Stack>
        </Group>
        <Group spacing={"xl"}>
          <IconVideo
            size={"1.2rem"}
            cursor={"pointer"}
            color={theme.colors.blue[5]}
          />
          <IconPhone
            size={"1.2rem"}
            cursor={"pointer"}
            onClick={open}
            color={theme.colors.blue[5]}
          />
          <IconSearch
            size={"1.2rem"}
            cursor={"pointer"}
            color={theme.colors.blue[5]}
          />
        </Group>
      </Group>

      <Modal centered opened={opened} onClose={close}>
        <AudioCallNotification close={close} />
      </Modal>
    </>
  );
};
