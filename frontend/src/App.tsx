import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  login as loginAction,
  logout as logoutAction,
  setCurrentUser,
} from "modules/auth/actions";
import AppRouter from "common/router";
import Axios from "axios";

const App = () => {
  const dispatch = useDispatch();
  const checkAuth = async () => {
    await Axios.get("/api/user/me")
      .then((res) => {
        dispatch(loginAction());
        dispatch(setCurrentUser(res.data));
      })
      .catch((err) => {
        if (err.status === 401 || err.status === 403) {
          dispatch(logoutAction());
        }
      });
  };
  useEffect(() => {
    checkAuth();
  }, []);

  return <AppRouter />;
};

export default App;
