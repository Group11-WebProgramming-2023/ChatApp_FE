/* eslint-disable react-hooks/rules-of-hooks */
import Logo from "@/assets/img/logo.png";
import { CallNotification } from "@/components/Call/CallNotification";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { RootState } from "@/redux/reducer";
import { CallActionType } from "@/redux/reducer/call/call.type";
import { ConversationActionType } from "@/redux/reducer/conversation/conversation.type";
import { ROUTER } from "@/routes/path";
import { NotiType, renderNotification } from "@/utils/notifications";
import { SocketEvents, connectSocket, socket } from "@/utils/socket";
import {
  Anchor,
  AppShell,
  Avatar,
  Center,
  Col,
  Grid,
  Image,
  Modal,
  Navbar,
  Stack,
  Tooltip,
  UnstyledButton,
  createStyles,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconFriends,
  IconInfoCircle,
  IconLogout,
  IconMessage,
  IconPhone,
  IconUsersGroup,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  link: {
    width: rem(50),
    height: rem(50),
    borderRadius: theme.radius.md,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[0],
    },
  },

  active: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },
}));

interface NavbarLinkProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: React.FC<any>;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  const { classes, cx } = useStyles();
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton
        onClick={() => onClick?.()}
        className={cx(classes.link, { [classes.active]: active })}
      >
        <Icon size="1.2rem" stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

const getPath = (index: number) => {
  switch (index) {
    case 0:
      return ROUTER.APP;
    case 1:
      return ROUTER.GROUP;
    case 2:
      return ROUTER.CALL;
    case 3:
      return ROUTER.FRIENDS;
    case 4:
      return ROUTER.PROFILE;
    default:
      return ROUTER.APP;
  }
};

const ProtectedLayout = () => {
  const [active, setActive] = useState(
    parseInt(localStorage.getItem("tab") || "0")
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { selected_conversation_id } = useAppSelector(
    (state: RootState) => state.conversation
  );

  const data = [
    { icon: IconMessage, label: "Message" },
    { icon: IconUsersGroup, label: "Group" },
    { icon: IconPhone, label: "Calls" },
    { icon: IconFriends, label: "Friends" },
    { icon: IconInfoCircle, label: "Profile" },
  ];

  const handleChangeTab = (index: number) => {
    localStorage.setItem("tab", index.toString());
    navigate(getPath(index));
  };

  const links = data.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => {
        setActive(index);
        handleChangeTab(index);
      }}
    />
  ));

  const userId = localStorage.getItem("userId") || "";

  useEffect(() => {
    if (userId && !socket) {
      connectSocket(userId);
    }
    if (socket) {
      socket.on(SocketEvents.NEW_FRIEND_REQUEST, (data) => {
        renderNotification("You have new friend request", NotiType.SUCCESS);
      });

      socket.on(SocketEvents.AUDIO_CALL_NOTIFICATION, (data) => {
        console.log(data);
      });

      socket.on(SocketEvents.START_CHAT, (data) => {
        dispatch({
          type: ConversationActionType.GET_MESSAGES,
          payload: data.messages,
        });
        dispatch({
          type: ConversationActionType.SELECT_CONVERSATION,
          payload: data._id,
        });
        navigate(ROUTER.APP);
      });

      socket.on(SocketEvents.NEW_MESSAGE, (data) => {
        dispatch({
          type: ConversationActionType.NEW_MESSAGE,
          payload: data,
        });
      });

      socket.on(SocketEvents.AUDIO_CALL_NOTIFICATION, (data) => {
        dispatch({
          type: CallActionType.PUSH_TO_AUDIO_QUEUE,
          payload: data,
        });
      });

      socket.emit("get_direct_conversations", { user_id: userId }, (data) => {
        dispatch({
          type: ConversationActionType.FETCH_DIRECT_CONVERSATIONS,
          payload: data,
        });
      });
    }
    return () => {
      socket.off(SocketEvents.NEW_FRIEND_REQUEST);
      socket.off(SocketEvents.AUDIO_CALL_NOTIFICATION);
      socket.off(SocketEvents.START_CHAT);
      socket.off(SocketEvents.NEW_MESSAGE);
    };
  }, [socket]);

  if (!localStorage.getItem("token")) {
    return <Navigate to={ROUTER.LOGIN} />;
  }
  const { open_audio_notification_modal } = useAppSelector(
    (state: RootState) => state.call
  );

  const [openedCallNoti, { close: closeCallNoti, open: openCallNoti }] =
    useDisclosure(open_audio_notification_modal);
  return (
    <>
      <AppShell
        m={"0px"}
        p={"0"}
        padding={0}
        h={"100vh"}
        navbar={
          <Navbar height={"100vh"} width={{ base: 80 }} p="md">
            <Center>
              <Anchor href={ROUTER.BASE}>
                <Image src={Logo} width={50} />
              </Anchor>
            </Center>
            <Navbar.Section grow mt={50}>
              <Stack justify="center" spacing={0}>
                {links}
              </Stack>
            </Navbar.Section>
            <Navbar.Section>
              <Stack align="center" spacing={0}>
                <Avatar
                  src={
                    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
                  }
                  radius={"xl"}
                />
                <NavbarLink icon={IconLogout} label="Logout" />
              </Stack>
            </Navbar.Section>
          </Navbar>
        }
      >
        <Outlet />
      </AppShell>

      <Modal centered opened={openedCallNoti} onClose={closeCallNoti}>
        <CallNotification close={closeCallNoti} />
      </Modal>
    </>
  );
};

export default ProtectedLayout;