import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { getAuthState } from "common/selectors";
import { isNil } from "lodash";

const PrivateRoute = (props) => {
  const loggedIn = useSelector(getAuthState);

  if (isNil(loggedIn)) return null;
  if (!loggedIn) {
    return <Redirect to="/login" />;
  }
  return <Route {...props}>{props.children}</Route>;
};

export default PrivateRoute;
