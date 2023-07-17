/* eslint-disable react-hooks/rules-of-hooks */
import Logo from "@/assets/img/logo.png";
import { AudioCallModal } from "@/components/Call/Audio/AudioCallModal";
import { AudioCallNotification } from "@/components/Call/Audio/AudioCallNotification";
import { VideoCallModal } from "@/components/Call/Video/VideoCallModal";
import { VideoCallNotification } from "@/components/Call/Video/VideoCallNotification";
import { useAuthContext } from "@/hooks/context";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { RootState } from "@/redux/reducer";
import { AudioCallActionType } from "@/redux/reducer/audioCall/audioCall.type";
import { ConversationActionType } from "@/redux/reducer/conversation/conversation.type";
import { VideoCallActionType } from "@/redux/reducer/videoCall/videoCall.type";
import { ROUTER } from "@/routes/path";
import { NotiType, renderNotification } from "@/utils/notifications";
import { SocketEvents, connectSocket, socket } from "@/utils/socket";
import {
  Anchor,
  AppShell,
  Avatar,
  Center,
  Footer,
  Group,
  Image,
  Modal,
  Navbar,
  Stack,
  Tooltip,
  UnstyledButton,
  createStyles,
  rem,
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import {
  IconFriends,
  IconInfoCircle,
  IconLogout,
  IconMessage,
  IconPhone,
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
    // case 1:
    //   return ROUTER.GROUP;
    case 1:
      return ROUTER.CALL;
    case 2:
      return ROUTER.FRIENDS;
    case 3:
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

  const { logout } = useAuthContext();

  const data = [
    { icon: IconMessage, label: "Message" },
    // { icon: IconUsersGroup, label: "Group" },
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
        console.log(data);
        renderNotification("You have new friend request", NotiType.SUCCESS);
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
          type: AudioCallActionType.PUSH_TO_AUDIO_QUEUE,
          payload: { call: data, incoming: true },
        });
      });

      socket.on(SocketEvents.VIDEO_CALL_NOTIFICATION, (data) => {
        dispatch({
          type: VideoCallActionType.PUSH_TO_VIDEO_QUEUE,
          payload: { call: data, incoming: true },
        });
      });

      socket.on(SocketEvents.AUDIO_CALL_DENIED, () => {
        dispatch({
          type: AudioCallActionType.RESET_AUDIO_QUEUE,
        });
      });

      socket.on(SocketEvents.VIDEO_CALL_DENIED, () => {
        dispatch({
          type: VideoCallActionType.RESET_VIDEO_QUEUE,
        });
      });
    }

    return () => {
      socket?.off(SocketEvents.NEW_FRIEND_REQUEST);
      socket?.off(SocketEvents.AUDIO_CALL_NOTIFICATION);
      socket?.off(SocketEvents.START_CHAT);
      socket?.off(SocketEvents.NEW_MESSAGE);
      socket?.off(SocketEvents.VIDEO_CALL_NOTIFICATION);
      socket?.off(SocketEvents.AUDIO_CALL_DENIED);
      socket?.off(SocketEvents.VIDEO_CALL_DENIED);
    };
  }, [socket]);

  if (!localStorage.getItem("token")) {
    return <Navigate to={ROUTER.LOGIN} />;
  }
  const { open_audio_notification_modal, open_audio_modal } = useAppSelector(
    (state: RootState) => state.audioCall
  );

  const { open_video_notification_modal, open_video_modal } = useAppSelector(
    (state: RootState) => state.videoCall
  );

  const selected_conversation_id = useAppSelector(
    (state: RootState) =>
      state.conversation.direct_chat.current_conversation?._id
  );
  //responsive
  const theme = useMantineTheme();
  const matches = useMediaQuery(`(min-width: ${theme.breakpoints.lg})`);

  const FooterComponet = (
    <Footer height={70} p="xs">
      <Group align="center" position="center">
        {links}
        <IconLogout
          size="1.2rem"
          stroke={1.5}
          onClick={() => {
            logout();
            navigate(ROUTER.LOGIN);
          }}
        />
      </Group>
    </Footer>
  );
  return (
    <>
      <AppShell
        padding={0}
        navbar={
          matches ? (
            <Navbar height={"100vh"} width={{ base: 80 }} p="md">
              <Center>
                <Anchor
                  href={ROUTER.BASE}
                  onClick={() => {
                    setActive(0);
                    handleChangeTab(0);
                  }}
                >
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
                  <Avatar src={""} radius={"xl"} />
                  <NavbarLink
                    icon={IconLogout}
                    label="Logout"
                    onClick={() => {
                      logout();
                      navigate(ROUTER.LOGIN);
                    }}
                  />
                </Stack>
              </Navbar.Section>
            </Navbar>
          ) : (
            <></>
          )
        }
        footer={
          matches ? <></> : selected_conversation_id ? <></> : FooterComponet
        }
      >
        <Outlet />
      </AppShell>

      {/* audio modal */}
      <Modal
        withCloseButton={false}
        centered
        opened={open_audio_notification_modal}
        onClose={() =>
          dispatch({ type: AudioCallActionType.CLOSE_AUDIO_NOTI_MODAL })
        }
      >
        <AudioCallNotification
          close={() =>
            dispatch({ type: AudioCallActionType.CLOSE_AUDIO_NOTI_MODAL })
          }
        />
      </Modal>

      <Modal
        withCloseButton={false}
        centered
        opened={open_audio_modal}
        onClose={() =>
          dispatch({
            type: AudioCallActionType.UPDATE_AUDIO_CALL_MODAL,
            payload: false,
          })
        }
      >
        <AudioCallModal
          close={() =>
            dispatch({
              type: AudioCallActionType.UPDATE_AUDIO_CALL_MODAL,
              payload: false,
            })
          }
        />
      </Modal>

      {/* video modal */}
      <Modal
        withCloseButton={false}
        centered
        opened={open_video_notification_modal}
        onClose={() =>
          dispatch({ type: VideoCallActionType.CLOSE_VIDEO_NOTI_MODAL })
        }
      >
        <VideoCallNotification
          close={() =>
            dispatch({ type: VideoCallActionType.CLOSE_VIDEO_NOTI_MODAL })
          }
        />
      </Modal>

      <Modal
        withCloseButton={false}
        centered
        opened={open_video_modal}
        onClose={() =>
          dispatch({
            type: VideoCallActionType.UPDATE_VIDEO_CALL_MODAL,
            payload: false,
          })
        }
      >
        <VideoCallModal
          close={() =>
            dispatch({
              type: VideoCallActionType.UPDATE_VIDEO_CALL_MODAL,
              payload: false,
            })
          }
        />
      </Modal>
    </>
  );
};

export default ProtectedLayout;
