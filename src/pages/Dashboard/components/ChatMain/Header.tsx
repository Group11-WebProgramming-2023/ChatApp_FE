import { Avatar, Group, Stack, Text } from "@mantine/core";
import { IconPhone, IconSearch, IconVideo } from "@tabler/icons-react";

export const Header = () => {
  return (
    <Group position="apart" align="center">
      <Group>
        <Avatar src={""} radius={"xl"} size={"lg"} />
        <Stack spacing={0}>
          <Text fw={600}>Hiếu Đinh</Text>
          <Text fz={"xs"}>Online</Text>
        </Stack>
      </Group>
      <Group spacing={"xl"}>
        <IconVideo size={"1.2rem"} />
        <IconPhone size={"1.2rem"} />
        <IconSearch size={"1.2rem"} />
      </Group>
    </Group>
  );
};
