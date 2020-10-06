import { useDispatch } from "react-redux";
import Axios from "axios";
import {
  login as loginAction,
  logout as logoutAction,
} from "common/actions/auth";

export const useAuth = () => {
  const dispatch = useDispatch();
  const login = (username: String, password: String) => {
    Axios.post("/users/login", {
      username,
      password,
    })
      .then(() => {
        dispatch(loginAction());
      })
      .catch(() => {
        dispatch(logoutAction());
      });
  };
  const logout = () => {
    Axios.post("/users/logout")
      .then(() => {
        dispatch(logoutAction());
      })
      .catch(() => {
        dispatch(logoutAction());
      });
  };

  return {
    login,
    logout,
  };
};
