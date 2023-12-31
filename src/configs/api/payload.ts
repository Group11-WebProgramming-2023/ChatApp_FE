export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type ForgotPasswordPayload = {
  email: string;
};

export type ResetPasswordPayload = {
  newPassword: string;
  token?: string;
};

export type VerifyOTPPayload = {
  email: string;
  otp: string;
};

export type UpdateProfilePayload = {
  firstName: string;
  lastName: string;
  avatar: string;
};
export type StartCallPayload = {
  id: string;
};

export type ApiPayload =
  | LoginPayload
  | RegisterPayload
  | ForgotPasswordPayload
  | VerifyOTPPayload
  | string
  | StartCallPayload
  | ResetPasswordPayload
  | UpdateProfilePayload;
