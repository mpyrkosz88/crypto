import { authActions } from "./auth-slice";

export const setToken = () => {
  const token = localStorage.getItem("token");
};
