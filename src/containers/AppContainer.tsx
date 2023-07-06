import { Col, Grid } from "@mantine/core";
import { RightSidebarContainer } from "./RightSidebarContainer";
import { ChatContainer } from "./ChatContainer";
import { LeftiSidebar } from "@/components/LeftSidebar";

interface Props {
  children: JSX.Element;
}
export const AppContainer = ({ children }: Props) => {
  return (
    <Grid p={0} m={0} gutter={0}>
      <Col span={3}>
        <RightSidebarContainer>{children}</RightSidebarContainer>
      </Col>
      <Col span={6}>
        <ChatContainer />
      </Col>
      <Col span={3}>
        <LeftiSidebar />
      </Col>
    </Grid>
  );
};
