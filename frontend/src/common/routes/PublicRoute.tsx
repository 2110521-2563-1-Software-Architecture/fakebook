import React from "react";
import { Route } from "react-router-dom";

const PublicRoute = (props) => <Route {...props}>{props.children}</Route>;

export default PublicRoute;
