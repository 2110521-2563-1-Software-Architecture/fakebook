import { useDispatch } from "react-redux";
import Axios from "axios";
import {
  login as loginAction,
  logout as logoutAction,
} from "modules/auth/actions";

export const useAuth = () => {
  const dispatch = useDispatch();
  const login = (username: String, password: String) => {
    Axios.post("/api/auth/login", {
      username,
      password,
    })
      .then((res) => {
        localStorage.setItem("at", res.data.access_token);
        dispatch(loginAction());
      })
      .catch(() => {
        dispatch(logoutAction());
      });
  };
  const logout = () => {
    localStorage.removeItem("at");
    dispatch(logoutAction());
  };

  return {
    login,
    logout,
  };
};