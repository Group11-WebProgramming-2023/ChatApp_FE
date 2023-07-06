import { Avatar, Group, Stack, Text } from "@mantine/core";
import { IconPhone, IconSearch, IconVideo } from "@tabler/icons-react";

export const Header = () => {
  return (
    <Group
      position="apart"
      align="center"
      bg={"#F7F9FD"}
      h={"10%"}
      px={"xl"}
      py={"xs"}
    >
      <Group align="center">
        <Avatar
          src={
            "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
          }
          radius={"xl"}
          size={"md"}
        />
        <Stack spacing={0}>
          <Text fw={600} fz={"sm"}>
            Hiếu Đinh
          </Text>
          <Text fz={"xs"} color="dimmed">
            Online
          </Text>
        </Stack>
      </Group>
      <Group spacing={"xl"}>
        <IconVideo size={"1rem"} />
        <IconPhone size={"1rem"} />
        <IconSearch size={"1rem"} />
      </Group>
    </Group>
  );
};
