import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  login as loginAction,
  logout as logoutAction,
} from "modules/auth/actions";
import AppRouter from "common/router";

const App = () => {
  const dispatch = useDispatch();
  const checkAuth = async () => {
    const token = localStorage.getItem("at");
    if (!token) {
      dispatch(logoutAction());
    } else {
      dispatch(loginAction());
    }
  };
  useEffect(() => {
    checkAuth();
  }, []);

  return <AppRouter />;
};

export default App;
