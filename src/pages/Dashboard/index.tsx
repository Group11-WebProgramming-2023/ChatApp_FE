import { Col, Grid } from "@mantine/core";
import { ChatRightSidebar } from "./components/ChatRightSidebar";
import { ChatMain } from "./components/ChatMain";
import { ChatLeftiSidebar } from "./components/ChatLeftSidebar";

export const Dashboard = () => {
  return (
    <Grid p={0} gutter={0}>
      <Col span={3}>
        <ChatRightSidebar />
      </Col>
      <Col span={6}>
        <ChatMain />
      </Col>
      <Col span={3}>
        <ChatLeftiSidebar />
      </Col>
    </Grid>
  );
};
