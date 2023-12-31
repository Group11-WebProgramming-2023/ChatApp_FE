import { CallCard } from "@/components/Call/CallCard";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { RootState } from "@/redux/reducer";
import { CallAction } from "@/redux/reducer/audioCall/audioCall.action";
import { UserAction } from "@/redux/reducer/user/user.action";
import { ICall, ICallType } from "@/types/models/ICall";
import {
  Avatar,
  Card,
  Col,
  Divider,
  Grid,
  Group,
  Modal,
  ScrollArea,
  Stack,
  Text,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import {
  IconArrowDownLeft,
  IconArrowUpRight,
  IconPhone,
  IconSearch,
  IconVideo,
} from "@tabler/icons-react";
import { useEffect } from "react";

export const Call = () => {
  const theme = useMantineTheme();
  const matches = useMediaQuery(`(min-width: ${theme.breakpoints.lg})`);

  const [opened, { close, open }] = useDisclosure();
  const dispatch = useAppDispatch();

  const { allFriends } = useAppSelector((state: RootState) => state.user);
  const { calllog } = useAppSelector((state: RootState) => state.audioCall);

  useEffect(() => {
    dispatch(UserAction.getAllFriends());
    dispatch(CallAction.getCallLog());
  }, [dispatch]);

  return (
    <>
      <Grid
        m={0}
        p={0}
        // h={"100vh"}
        h={matches ? "100vh" : "calc(100vh - 70px)"}
      >
        <Col
          md={12}
          lg={3}
          p={0}
          sx={
            matches ? { borderRight: `1px solid ${theme.colors.gray[3]}` } : {}
          }
        >
          <Stack spacing={"md"} p={"lg"} h={"100%"}>
            <Text fw={"bold"} fz={"lg"}>
              Call Log
            </Text>
            <TextInput
              radius={"lg"}
              icon={<IconSearch size={"1rem"} color={theme.colors.blue[5]} />}
              placeholder="Search"
            />
            <Group position="apart">
              <Text color={theme.colors.blue[5]} fz={"sm"} fw={500}>
                Start new call
              </Text>
              <IconPhone
                size={"1.2rem"}
                color={theme.colors.blue[5]}
                cursor={"pointer"}
                onClick={open}
              />
            </Group>
            <Divider />
            <ScrollArea p={0} sx={{ flex: "1 0 0" }}>
              {calllog.map((call) => (
                <CallLogCard call={call} key={call.id} />
              ))}
            </ScrollArea>
          </Stack>
        </Col>
      </Grid>

      <Modal
        opened={opened}
        onClose={close}
        centered
        title={<Text fw={500}>Your friends</Text>}
      >
        {allFriends.map((friend) => (
          <CallCard key={friend._id} user={friend} close={close} />
        ))}
      </Modal>
    </>
  );
};

interface CallLogCardProps {
  call: ICall;
}

const CallLogCard = ({ call }: CallLogCardProps) => {
  const theme = useMantineTheme();
  return (
    <Card p={"xs"} fz={"xs"} radius={"md"} my={"xs"}>
      <Grid align="center">
        <Col span={2}>
          <Avatar src={call.img} size={"md"} radius={"xl"} />
        </Col>
        <Col span={7}>
          <Stack spacing={0}>
            <Text
              fz={"md"}
              fw={450}
            >{`${call.firstName} ${call.lastName}`}</Text>
            {!call.isCaller ? (
              <IconArrowDownLeft color={call.missed ? "red" : "green"} />
            ) : (
              <IconArrowUpRight color={call.missed ? "red" : "green"} />
            )}
          </Stack>
        </Col>
        <Col span={2}>
          <Group position="right">
            {call.type == ICallType.VIDEO ? (
              <IconVideo
                size={"1.2rem"}
                cursor={"pointer"}
                color={theme.colors.blue[5]}
              />
            ) : (
              <IconPhone
                size={"1.2rem"}
                cursor={"pointer"}
                color={theme.colors.blue[5]}
              />
            )}
          </Group>
        </Col>
      </Grid>
    </Card>
  );
};
