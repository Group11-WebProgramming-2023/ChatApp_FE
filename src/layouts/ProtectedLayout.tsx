import Logo from "@/assets/img/logo.png";
import { ROUTER } from "@/configs/routers";
import { AppContainer } from "@/containers/AppContainer";
import {
  Anchor,
  AppShell,
  Avatar,
  Center,
  Image,
  Navbar,
  Stack,
  Tooltip,
  UnstyledButton,
  createStyles,
  rem,
} from "@mantine/core";
import {
  IconFriends,
  IconLogout,
  IconMessage,
  IconPhoneCall,
  IconSettings,
} from "@tabler/icons-react";
import { useState } from "react";
import { Outlet } from "react-router-dom";

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
  onClick?(): void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  const { classes, cx } = useStyles();
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton
        onClick={onClick}
        className={cx(classes.link, { [classes.active]: active })}
      >
        <Icon size="1.2rem" stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

const ProtectedLayout = () => {
  const [active, setActive] = useState(0);

  const data = [
    { icon: IconMessage, label: "Message" },
    { icon: IconPhoneCall, label: "Call" },
    { icon: IconFriends, label: "Friends" },
  ];

  const links = data.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => setActive(index)}
    />
  ));

  return (
    <AppShell
      m={"0px"}
      padding={"0px"}
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
      <AppContainer>
        <Outlet />
      </AppContainer>
    </AppShell>
  );
};

export default ProtectedLayout;
