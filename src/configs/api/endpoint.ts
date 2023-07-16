import { HEADERS } from "./header";

export const API_URLS = {
  Auth: {
    login: () => ({
      endPoint: "/auth/login",
      method: "POST",
      headers: HEADERS.header(),
    }),
    verifyOTP: () => ({
      endPoint: "/auth/verify",
      method: "POST",
      headers: HEADERS.header(),
    }),
    register: () => ({
      endPoint: "/auth/register",
      method: "POST",
      headers: HEADERS.header(),
    }),
    forgotPassword: () => ({
      endPoint: "/auth/login",
      method: "POST",
      headers: HEADERS.header(),
    }),
    resetPassword: () => ({
      endPoint: "/auth/login",
      method: "POST",
      headers: HEADERS.header(),
    }),
  },

  User: {
    //friend
    getUsers: () => ({
      endPoint: "/user/all-users",
      method: "GET",
      headers: HEADERS.authHeader(),
    }),
    getRequests: () => ({
      endPoint: "/user/all-friend-requests",
      method: "GET",
      headers: HEADERS.authHeader(),
    }),
    getFriends: () => ({
      endPoint: "/user/all-friends",
      method: "GET",
      headers: HEADERS.authHeader(),
    }),

    getCallLog: () => ({
      endPoint: "/user/get-call-logs",
      method: "GET",
      headers: HEADERS.authHeader(),
    }),
    //audio call
    startAudioCall: () => ({
      endPoint: "/user/start-audio-call",
      method: "POST",
      headers: HEADERS.authHeader(),
    }),

    //video call
    startVideoCall: () => ({
      endPoint: "/user/start-video-call",
      method: "POST",
      headers: HEADERS.authHeader(),
    }),
  },
};
