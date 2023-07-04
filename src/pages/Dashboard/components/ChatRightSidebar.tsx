import { Stack, Text, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { ChartCard } from "./ChartCard";

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

export const ChatRightSidebar = () => {
  return (
    <Stack
      bg={"#F8FAFF"}
      spacing={"md"}
      // sx={{ overflowY: "scroll" }}
      h={"100vh"}
      p={"xs"}
    >
      <Text fw={"bold"} fz={"lg"}>
        Chats
      </Text>
      <TextInput icon={<IconSearch size={"1rem"} />} placeholder="Search ..." />
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
