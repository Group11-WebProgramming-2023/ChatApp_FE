import {
  Button,
  Col,
  Grid,
  Group,
  Input,
  useMantineTheme,
} from "@mantine/core";
import { IconLink, IconMoodSmile, IconSend } from "@tabler/icons-react";

export const Footer = () => {
  const theme = useMantineTheme();
  return (
    <Group bg={"#F7F9FD"} h={"10%"} py={"md"} px={"xl"}>
      <Grid w={"100%"}>
        <Col span={11}>
          <Input
            color={theme.colors.blue[5]}
            rightSection={
              <IconMoodSmile color={theme.colors.blue[5]} size={"1rem"} />
            }
            icon={<IconLink color={theme.colors.blue[5]} size={"1rem"} />}
            w={"100%"}
            radius={"lg"}
            placeholder="Write a message"
          />
        </Col>
        <Col span={1}>
          <Button color="blue.4" radius={"md"}>
            <IconSend size={"0.8rem"} />
          </Button>
        </Col>
      </Grid>
    </Group>
  );
};
