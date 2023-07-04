import { Button, Col, Grid, Group, Input } from "@mantine/core";
import { IconLink, IconMoodSmile, IconSend } from "@tabler/icons-react";

export const Footer = () => {
  return (
    <Group px={"xl"}>
      <Grid w={"100%"}>
        <Col span={11}>
          <Input
            color="blue.2"
            rightSection={<IconMoodSmile />}
            icon={<IconLink />}
            w={"100%"}
          />
        </Col>
        <Col span={1}>
          <Button color="blue.4" radius={"md"}>
            <IconSend size={"1rem"} />
          </Button>
        </Col>
      </Grid>
    </Group>
  );
};
