import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  login as loginAction,
  logout as logoutAction,
} from "common/actions/auth";
import AppRouter from "common/router";
import Axios from "axios";

const App = () => {
  const dispatch = useDispatch();
  const checkAuth = async () => {
    await Axios.get("/users/session")
      .then((res) => {
        if (res?.data) {
          dispatch(loginAction());
        } else {
          dispatch(logoutAction());
        }
      })
      .catch(() => {
        dispatch(logoutAction());
      });
  };
  useEffect(() => {
    checkAuth();
  }, []);

  return <AppRouter />;
};

export default App;
