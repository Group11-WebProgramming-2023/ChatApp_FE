import CustomLoader from "@/components/custom/CustomLoader";
import AuthLayout from "@/layouts/AuthLayout";
import ProtectedLayout from "@/layouts/ProtectedLayout";
import Page404 from "@/pages/Page404";
import { Login } from "@/pages/auth/Login/Login";
import { Register } from "@/pages/auth/Register";
import { Call } from "@/pages/protected/Call";
import { Chats } from "@/pages/protected/Chats";
import { Conversation } from "@/pages/protected/Conversation";
import { Friend } from "@/pages/protected/Friend";
import { GeneralApp } from "@/pages/protected/GeneralApp";
import { Group } from "@mantine/core";
import { Suspense, useEffect } from "react";
import { Navigate, useNavigate, useRoutes } from "react-router-dom";
import { DEFAULT_PATH, ROUTER } from "./path";
import { Profile } from "@/pages/protected/Profile";
import { SocketEvents, connectSocket, socket } from "@/utils/socket";
import { NotiType, renderNotification } from "@/utils/notifications";
import { useAppDispatch } from "@/hooks/redux";
import { ConversationActionType } from "@/redux/reducer/conversation/conversation.type";
import { ForgotPassword } from "@/pages/auth/ForgotPassword";
import { ResetPwd } from "@/pages/auth/ResetPassword";

// const Loadable = (Component) => (props) => {
//   return (
//     <Suspense fallback={<CustomLoader />}>
//       <Component {...props} />
//     </Suspense>
//   );
// };

export default function Router() {
  const userId = localStorage.getItem("userId");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (userId && socket) {
      socket.emit("get_direct_conversations", { user_id: userId }, (data) => {
        dispatch({
          type: ConversationActionType.FETCH_DIRECT_CONVERSATIONS,
          payload: data,
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return useRoutes([
    {
      path: "/",
      element: <AuthLayout />,
      children: [
        { path: ROUTER.LOGIN, element: <Login /> },
        {
          path: ROUTER.REGISTER,
          element: <Register />,
        },
        {
          path: ROUTER.FORGOT_PWD,
          element: <ForgotPassword />,
        },
        {
          path: ROUTER.RESET_PWD,
          element: <ResetPwd />,
        },
      ],
    },
    {
      path: "/",
      element: <ProtectedLayout />,
      children: [
        { element: <Navigate to={DEFAULT_PATH} replace />, index: true },
        { path: ROUTER.APP, element: <GeneralApp /> },
        { path: ROUTER.GROUP, element: <Group /> },
        { path: ROUTER.CONVERSATION, element: <Conversation /> },
        { path: ROUTER.CHATS, element: <Chats /> },
        { path: ROUTER.CALL, element: <Call /> },
        { path: ROUTER.FRIENDS, element: <Friend /> },
        { path: ROUTER.PROFILE, element: <Profile /> },
        { path: "404", element: <Page404 /> },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
  ]);
}
