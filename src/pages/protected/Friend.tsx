import { AllUser } from "@/components/Friend/AllUser";
import { FriendRequest } from "@/components/Friend/FriendRequest";
import { ListFriend } from "@/components/Friend/ListFriend";
import { Stack, Tabs, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useState } from "react";

export const Friend = () => {
  const [activeTab, setActiveTab] = useState<string | null>("friend");
  const theme = useMantineTheme();
  const matches = useMediaQuery(`(min-width: ${theme.breakpoints.lg})`);
  return (
    <Stack
      h={matches ? "100vh" : "calc(100vh - 70px)"}
      w={"100vw - 80px"}
      p={"xl"}
    >
      <Tabs value={activeTab} onTabChange={setActiveTab}>
        <Tabs.List>
          <Tabs.Tab value="friend">Friends</Tabs.Tab>
          <Tabs.Tab value="request">Requests</Tabs.Tab>
          <Tabs.Tab value="users">Explore</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="friend">
          <ListFriend />
        </Tabs.Panel>
        <Tabs.Panel value="request">
          <FriendRequest />
        </Tabs.Panel>
        <Tabs.Panel value="users">
          <AllUser />
        </Tabs.Panel>
      </Tabs>
    </Stack>
  );
};
