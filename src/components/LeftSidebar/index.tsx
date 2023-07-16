import {
  Avatar,
  Col,
  Divider,
  Grid,
  Group,
  Image,
  Stack,
  Text,
} from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";

export const LeftiSidebar = () => {
  return (
    <Stack p={"xs"} bg={"#F8FAFF"} h={"100vh - 80"} spacing={"xs"}>
      <Text fw={"bold"} fz={"lg"} my={"sm"}>
        Contact Info
      </Text>
      <Divider />
      <Group align="center" spacing={"xl"}>
        <Avatar
          src={
            "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
          }
          size={"lg"}
          radius={"xl"}
        />
        <Stack spacing={0}>
          <Text fw={500}>Hiếu Đinh</Text>
          <Text fz={"sm"} color="dimmed">
            0942893001
          </Text>
        </Stack>
      </Group>
      <Divider />
      <Stack spacing={0}>
        <Text fw={500}>About</Text>
        <Text fz={"sm"} color="dimmed">
          Hi there, I am using this app.
        </Text>
      </Stack>
      <Divider />
      <Stack spacing={5}>
        <Group position="apart" align="center">
          <Text>Media, links and docs</Text>
          <Group align="center" spacing={3}>
            <Text color="dimmed">201</Text>
            <IconChevronRight size={"1rem"} color="gray" />
          </Group>
        </Group>
        <Group mt={"md"}>
          <Grid w={"100%"}>
            <Col span={3}>
              <Image withPlaceholder />
            </Col>
            <Col span={3}>
              <Image withPlaceholder />
            </Col>
            <Col span={3}>
              <Image withPlaceholder />
            </Col>
            <Col span={3}>
              <Image withPlaceholder />
            </Col>
          </Grid>
        </Group>
      </Stack>
      <Divider />
    </Stack>
  );
};
