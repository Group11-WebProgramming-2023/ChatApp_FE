export const saveToken = (token: string) => {
  localStorage.setItem("token", token);
};

export const saveUserId = (userId: string) => {
  localStorage.setItem("userId", userId);
};
