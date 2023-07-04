import { Avatar, Badge, Card, Col, Grid, Stack, Text } from "@mantine/core";

interface Props {
  username: string;
  avatar: string;
  time: string;
  message: string;
}

export const ChartCard = ({ username, avatar, time, message }: Props) => {
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
