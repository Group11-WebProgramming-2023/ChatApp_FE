/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react-hooks/rules-of-hooks */
import { useCallApi } from "@/configs/api";
import { API_URLS } from "@/configs/api/endpoint";
import {
  ForgotPasswordPayload,
  LoginPayload,
  RegisterPayload,
  ResetPasswordPayload,
  VerifyOTPPayload,
} from "@/configs/api/payload";
import { IUser } from "@/types/models/IUser";
import { Callback } from "@/types/others/callback";
import { NotiType, renderNotification } from "@/utils/notifications";
import { saveToken, saveUserId } from "@/utils/token";
import { createContext, useReducer } from "react";
import { AuthAction, AuthActionType } from "./action";

export interface Authorities {
  userId: string;
  isRoot: boolean;
  grantedPermissions: string[];
}

const initialState = {
  isFetching: false,
  user: null as IUser | null,
  authorities: null as Authorities | null,
  profile: null as IUser | null,
};

type AuthState = typeof initialState;

function authReducer(state = initialState, action: AuthActionType): AuthState {
  switch (action.type) {
    case AuthAction.AUTH_ACTION_PENDING:
      return { ...state, isFetching: true };
    case AuthAction.AUTH_ACTION_FAILURE:
    case AuthAction.LOGIN_SUCCESS:
    case AuthAction.REGISTER_SUCCESS:
    case AuthAction.CONFIRM_OTP_SUCCESS:
    case AuthAction.FORGOT_PWD:
    case AuthAction.RESET_PWD:
      return { ...state, isFetching: false };

    case AuthAction.LOGOUT:
      return state;
    default:
      return state;
  }
}

function useAuthReducer(_state = initialState) {
  const [state, dispatch] = useReducer(authReducer, _state);

  const login = async (payload: LoginPayload, cb?: Callback) => {
    dispatch({ type: AuthAction.AUTH_ACTION_PENDING });

    const api = API_URLS.Auth.login();

    const { response, error } = await useCallApi({ ...api, payload });

    if (!error && response?.status === 200) {
      dispatch({
        type: AuthAction.LOGIN_SUCCESS,
      });
      saveToken(response.data.token);
      saveUserId(response.data.user_id);
      renderNotification(response.data.message, NotiType.SUCCESS);
      cb?.onSuccess?.();
    } else {
      dispatch({ type: AuthAction.AUTH_ACTION_FAILURE });
      renderNotification(error.response.data.message, NotiType.ERROR);
      cb?.onError?.();
    }
  };

  const register = async (payload: RegisterPayload, cb?: Callback) => {
    dispatch({ type: AuthAction.AUTH_ACTION_PENDING });

    const api = API_URLS.Auth.register();

    const { response, error } = await useCallApi({ ...api, payload });

    if (!error && response?.status === 200) {
      dispatch({
        type: AuthAction.REGISTER_SUCCESS,
      });
      renderNotification(response.data.message, NotiType.SUCCESS);
      cb?.onSuccess?.();
    } else {
      dispatch({ type: AuthAction.AUTH_ACTION_FAILURE });
      renderNotification(error.response.data.message, NotiType.ERROR);
      cb?.onError?.();
    }
  };

  const confirmOTP = async (payload: VerifyOTPPayload, cb?: Callback) => {
    dispatch({ type: AuthAction.AUTH_ACTION_PENDING });

    const api = API_URLS.Auth.verifyOTP();

    const { response, error } = await useCallApi({ ...api, payload });

    if (!error && response?.status === 200) {
      dispatch({
        type: AuthAction.CONFIRM_OTP_SUCCESS,
      });
      renderNotification(response.data.message, NotiType.SUCCESS);
      cb?.onSuccess?.();
    } else {
      dispatch({ type: AuthAction.AUTH_ACTION_FAILURE });
      renderNotification(error.response.data.message, NotiType.ERROR);
      cb?.onError?.();
    }
  };

  const forgotPwd = async (payload: ForgotPasswordPayload, cb?: Callback) => {
    dispatch({ type: AuthAction.AUTH_ACTION_PENDING });

    const api = API_URLS.Auth.forgotPassword();

    const { response, error } = await useCallApi({ ...api, payload });

    if (!error && response?.status === 200) {
      dispatch({
        type: AuthAction.FORGOT_PWD,
      });
      renderNotification(response.data.message, NotiType.SUCCESS);
    } else {
      dispatch({ type: AuthAction.AUTH_ACTION_FAILURE });
      renderNotification(error.response.data.message, NotiType.ERROR);
      cb?.onError?.();
    }
  };

  const resetPwd = async (payload: ResetPasswordPayload, cb?: Callback) => {
    dispatch({ type: AuthAction.AUTH_ACTION_PENDING });

    const api = API_URLS.Auth.resetPassword();

    const { response, error } = await useCallApi({ ...api, payload });

    if (!error && response?.status === 200) {
      dispatch({
        type: AuthAction.RESET_PWD,
      });
      renderNotification(response.data.message, NotiType.SUCCESS);
    } else {
      dispatch({ type: AuthAction.AUTH_ACTION_FAILURE });
      renderNotification(error.response.data.message, NotiType.ERROR);
      cb?.onError?.();
    }
  };
  const logout = () => {
    dispatch({ type: AuthAction.LOGOUT });
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    renderNotification("Logout successfully", NotiType.SUCCESS);
  };

  return {
    state,
    login,
    logout,
    register,
    confirmOTP,
    forgotPwd,
    resetPwd,
  };
}

export const AuthContext = createContext<ReturnType<typeof useAuthReducer>>({
  state: initialState,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  confirmOTP: async () => {},
  forgotPwd: async () => {},
  resetPwd: async () => {},
});

interface Props {
  children: React.ReactNode | string;
}

export const AuthProvider = ({ children }: Props) => {
  const authReducer = useAuthReducer();

  return (
    <AuthContext.Provider value={authReducer}>{children}</AuthContext.Provider>
  );
};
