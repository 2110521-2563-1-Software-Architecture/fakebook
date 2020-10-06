import React from "react";
import { Switch, BrowserRouter as Router } from "react-router-dom";
import PrivateRoute from "common/routes/PrivateRoute";
import PublicRoute from "common/routes/PublicRoute";
import LoginPage from "pages/LoginPage";
import AddPartyPage from "pages/AddPartyPage";
import RegisterPage from "pages/RegisterPage";
import PartyListPage from "pages/PartyListPage";

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
        <PrivateRoute path="/add-party">
          <AddPartyPage />
        </PrivateRoute>
        <PrivateRoute path="/">
          <PartyListPage />
        </PrivateRoute>
      </Switch>
    </Router>
  );
};

export default AppRouter;
