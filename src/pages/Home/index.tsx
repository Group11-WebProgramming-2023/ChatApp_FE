import { Stack, Text, TextInput, useMantineTheme } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { Avatar, Badge, Card, Col, Grid } from "@mantine/core";

const fakeData = [
  {
    username: "Hieesu Dinh",
    avatar: "",
    message: "To thich cau",
    time: "12:12",
  },
  {
    username: "Hieesu Dinh",
    avatar: "",
    message: "To thich cau",
    time: "12:12",
  },
  {
    username: "Hieesu Dinh",
    avatar: "",
    message: "To thich cau",
    time: "12:12",
  },
  {
    username: "Hieesu Dinh",
    avatar: "",
    message: "To thich cau",
    time: "12:12",
  },
  {
    username: "Hieesu Dinh",
    avatar: "",
    message: "To thich cau",
    time: "12:12",
  },
];

export const Home = () => {
  const theme = useMantineTheme();

  return (
    <Stack spacing={"md"}>
      <Text fw={"bold"} fz={"lg"}>
        Chats
      </Text>
      <TextInput
        radius={"lg"}
        icon={<IconSearch size={"1rem"} color={theme.colors.blue[5]} />}
        placeholder="Search"
      />
      <Text fw={"bold"} color="dimmed" fz={"sm"}>
        Pinned
      </Text>
      <Stack>
        {fakeData.map((item) => (
          <ChartCard
            username={item.username}
            avatar={item.avatar}
            time={item.time}
            message={item.message}
          />
        ))}
      </Stack>
      <Text fw={"bold"} color="dimmed" fz={"sm"}>
        All chats
      </Text>
      <Stack>
        {fakeData.slice(0, 1).map((item) => (
          <ChartCard
            username={item.username}
            avatar={item.avatar}
            time={item.time}
            message={item.message}
          />
        ))}
      </Stack>
    </Stack>
  );
};

interface ChatCardProps {
  username: string;
  avatar: string;
  time: string;
  message: string;
}

const ChartCard = ({ username, avatar, time, message }: ChatCardProps) => {
  return (
    <Card p={"xs"} fz={"xs"} radius={"md"} bg={"white"}>
      <Grid align="center">
        <Col span={2}>
          <Avatar
            src={
              "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
            }
            radius={"xl"}
          />
        </Col>
        <Col span={7} pl={"sm"}>
          <Stack spacing={0}>
            <Text fw={600}>{username}</Text>
            <Text color="dimmed">{message}</Text>
          </Stack>
        </Col>
        <Col span={3}>
          <Stack spacing={0} align="center">
            <Text fw={600}>{time}</Text>
            <Badge color="blue" px={"xs"}>
              3
            </Badge>
          </Stack>
        </Col>
      </Grid>
    </Card>
  );
};
