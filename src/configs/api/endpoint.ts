import { HEADERS } from "./header";

export const API_URLS = {
  Auth: {
    login: () => ({
      endPoint: "/auth/login",
      method: "POST",
      headers: HEADERS.header(),
    }),
  },
  
};
