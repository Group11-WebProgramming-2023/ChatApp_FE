import { AllUser } from "@/components/Friend/AllUser";
import { FriendRequest } from "@/components/Friend/FriendRequest";
import { ListFriend } from "@/components/Friend/ListFriend";
import { Stack, Tabs } from "@mantine/core";
import { useState } from "react";

export const Friend = () => {
  const [activeTab, setActiveTab] = useState<string | null>("friend");
  return (
    <Stack h={"100vh - 80"} w={"100vw - 80px"} p={"xl"}>
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
