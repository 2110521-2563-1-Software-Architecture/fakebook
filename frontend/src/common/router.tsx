import React from "react";
import { Switch, BrowserRouter as Router } from "react-router-dom";
import PrivateRoute from "common/routes/PrivateRoute";
import PublicRoute from "common/routes/PublicRoute";
import LoginPage from "modules/user/pages/LoginPage";
import RegisterPage from "modules/user/pages/RegisterPage";
import TimelinePage from "modules/user/pages/TimelinePage";
import EditProfilePage from "modules/user/pages/EditProfilePage";

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <PublicRoute path="/login">
          <LoginPage />
        </PublicRoute>
        <PublicRoute path="/register">
          <RegisterPage />
        </PublicRoute>
        <PrivateRoute path="/user/edit">
          <EditProfilePage />
        </PrivateRoute>
        <PrivateRoute path="/user/:username">
          <TimelinePage />
        </PrivateRoute>
        <PrivateRoute path="/">
          <TimelinePage />
        </PrivateRoute>
      </Switch>
    </Router>
  );
};

export default AppRouter;
