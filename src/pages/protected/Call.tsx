import { CallCard } from "@/components/Call/CallCard";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { RootState } from "@/redux/reducer";
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
import { useDisclosure } from "@mantine/hooks";
import {
  IconArrowUpRight,
  IconPhone,
  IconSearch,
  IconVideo,
} from "@tabler/icons-react";
import { useEffect } from "react";

export const Call = () => {
  const theme = useMantineTheme();
  const [opened, { close, open }] = useDisclosure();
  const dispatch = useAppDispatch();

  const { allFriends } = useAppSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(UserAction.getAllFriends());
  }, []);

  return (
    <>
      <Grid m={0} p={0}>
        <Col span={3} p={"lg"}>
          <Stack spacing={"md"}>
            <Text fw={"bold"} fz={"lg"}>
              Call Log
            </Text>
            <TextInput
              radius={"lg"}
              icon={<IconSearch size={"1rem"} color={theme.colors.blue[5]} />}
              placeholder="Search"
            />
            <Group position="apart">
              <Text color={theme.colors.blue[5]} fz={"xs"}>
                Start new conservation
              </Text>
              <IconPhone
                size={"1rem"}
                color={theme.colors.blue[5]}
                cursor={"pointer"}
                onClick={open}
              />
            </Group>
            <Divider />
            <ScrollArea>
              <Stack></Stack>
            </ScrollArea>
          </Stack>
        </Col>
      </Grid>

      <Modal
        opened={opened}
        onClose={close}
        title={<Text fw={500}>Your friends</Text>}
      >
        {allFriends.map((friend) => (
          <CallCard user={friend} close={close} />
        ))}
      </Modal>
    </>
  );
};

interface Props {
  call: ICall;
}

// const CallCard = ({ call }: Props) => {
//   const theme = useMantineTheme();

//   const { user, type, status, time } = call;
//   return (
//     <Card p={"xs"} fz={"xs"} radius={"md"} bg={"white"}>
//       <Grid align="center">
//         <Col span={2}>
//           <Avatar
//             src={
//               "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
//             }
//             radius={"xl"}
//           />
//         </Col>
//         <Col span={8}>
//           <Stack spacing={0}>
//             <Text fw={600} ml={2}>
//               {user.name}
//             </Text>
//             <Group spacing={"xs"}>
//               <IconArrowUpRight size={"1rem"} color={theme.colors.blue[5]} />
//               <Text color="dimmed">{time}</Text>
//             </Group>
//           </Stack>
//         </Col>
//         <Col span={2}>
//           {type === ICallType.VOICE ? (
//             <IconPhone size={"1rem"} color={theme.colors.green[5]} />
//           ) : (
//             <IconVideo size={"1rem"} color={theme.colors.green[5]} />
//           )}
//         </Col>
//       </Grid>
//     </Card>
//   );
// };
