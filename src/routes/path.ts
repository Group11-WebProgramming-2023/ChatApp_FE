function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_DASHBOARD = "/";

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    app: path(ROOTS_DASHBOARD, "app"),
  },
};

export const DEFAULT_PATH = PATH_DASHBOARD.general.app; // as '/app'

export const ROUTER = {
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PWD: "/forgot-password",
  RESET_PWD: "/reset-password",

  //dashboard
  BASE: "/",
  APP: "/app",
  GROUP: "/group",
  CALL: "/call",
  FRIENDS: "/friends",
  PROFILE: "/profile",
  CONVERSATION: "/conversation",
  CHATS: "/chats",
};
