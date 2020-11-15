import { useDispatch } from "react-redux";
import Axios from "axios";
import initHttp from "common/http";
import {
  login as loginAction,
  logout as logoutAction,
  setCurrentUser,
} from "modules/auth/actions";

export const useAuth = () => {
  const dispatch = useDispatch();
  const login = (username: String, password: String) => {
    Axios.post("/api/auth/login", {
      username,
      password,
    })
      .then((res) => {
        dispatch(loginAction());
        Axios.get(`/api/user/me`).then((res) => {
          dispatch(setCurrentUser(res.data));
        });
      })
      .catch(() => {
        dispatch(logoutAction());
      });
  };
  const logout = () => {
    Axios.post(`/api/auth/logout`).then((res) => {
      dispatch(setCurrentUser(null));
    });
    dispatch(logoutAction());
  };

  return {
    login,
    logout,
  };
};
