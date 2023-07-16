import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { RootState } from "@/redux/reducer";
import { ConversationAction } from "@/redux/reducer/conversation/conversation.action";
import { ROUTER } from "@/routes/path";
import { Avatar, Group, Stack, Text, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconChevronLeft, IconPhone, IconVideo } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const theme = useMantineTheme();
  const matches = useMediaQuery(`(min-width: ${theme.breakpoints.lg})`);

  const { current_conversation } = useAppSelector(
    (state: RootState) => state.conversation.direct_chat
  );
  const user = current_conversation?.participants.filter(
    (el) => el._id !== localStorage.getItem("userId")
  )[0];

  const handleBack = () => {
    navigate(ROUTER.APP);
    dispatch(ConversationAction.SelectConversation(null));
  };
  return (
    <Group
      w={"100%"}
      position="apart"
      align="center"
      bg={"#F7F9FD"}
      h={"10%"}
      py="xs"
      px={"md"}
    >
      <Group align="center" spacing={0}>
        {matches ? null : (
          <IconChevronLeft
            size={"1.2rem"}
            cursor={"pointer"}
            color={theme.colors.blue[5]}
            onClick={handleBack}
          />
        )}
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
          color={theme.colors.blue[5]}
        />
      </Group>
    </Group>
  );
};
