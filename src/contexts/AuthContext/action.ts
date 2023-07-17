export enum AuthAction {
  AUTH_ACTION_PENDING = "AUTH_ACTION_PENDING",
  AUTH_ACTION_FAILURE = "AUTH_ACTION_FAILURE",

  LOGIN_SUCCESS = "LOGIN_SUCCESS",
  REGISTER_SUCCESS = "REGISTER_SUCCESS",
  CONFIRM_OTP_SUCCESS = "CONFIRM_OTP_SUCCESS",
  LOGOUT = "LOGOUT",
  FORGOT_PWD = "FORGOT_PWD",
  RESET_PWD = "RESET_PWD",
}

interface AuthActionPending {
  type: AuthAction.AUTH_ACTION_PENDING;
}

interface AuthActionFailure {
  type: AuthAction.AUTH_ACTION_FAILURE;
}

interface LoginSuccess {
  type: AuthAction.LOGIN_SUCCESS;
}

interface RegisterSuccess {
  type: AuthAction.REGISTER_SUCCESS;
}

interface ConfirmOTPSuccess {
  type: AuthAction.CONFIRM_OTP_SUCCESS;
}

interface Logout {
  type: AuthAction.LOGOUT;
}

interface ForgotPwd {
  type: AuthAction.FORGOT_PWD;
}
interface ResetPwd {
  type: AuthAction.RESET_PWD;
}

export type AuthActionType =
  | Logout
  | AuthActionPending
  | AuthActionFailure
  | LoginSuccess
  | RegisterSuccess
  | ConfirmOTPSuccess
  | ForgotPwd
  | ResetPwd;
