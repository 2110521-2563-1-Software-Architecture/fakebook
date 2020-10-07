import React from "react";
import { Button, Container } from "common/components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCurrentUser } from "modules/auth/selectors";
import { User } from "common/types";
import AppBar from "common/components/AppBar";

const WelcomePage = () => {
  const currentUser = useSelector(getCurrentUser);

  return (
    <>
      <AppBar />
      <Container>
        <h1>Hello, {currentUser?.fullname}</h1>
        <Link to="/user/edit">
          <Button>Edit Profile</Button>
        </Link>
      </Container>
    </>
  );
};

export default WelcomePage;
