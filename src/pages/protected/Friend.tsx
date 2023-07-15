import { AllUser } from "@/components/Friend/AllUser";
import { FriendRequest } from "@/components/Friend/FriendRequest";
import { ListFriend } from "@/components/Friend/ListFriend";
import { Tabs } from "@mantine/core";
import { useState } from "react";

export const Friend = () => {
  const [activeTab, setActiveTab] = useState<string | null>("friend");
  return (
    <Tabs value={activeTab} onTabChange={setActiveTab}>
      <Tabs.List>
        <Tabs.Tab value="friend">List friends</Tabs.Tab>
        <Tabs.Tab value="request">Friend requests</Tabs.Tab>
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
  );
};
