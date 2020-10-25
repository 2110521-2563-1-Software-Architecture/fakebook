import React from "react";
import { Button, Container, Padded } from "common/components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCurrentUser } from "modules/auth/selectors";
// import { User } from "common/types";
import AppBar from "common/components/AppBar";
import Timeline from "modules/user/components/Timeline";

import { postSet1 } from "modules/user/mocks/posts";

const WelcomePage = () => {
  const currentUser = useSelector(getCurrentUser);

  return (
    <>
      <AppBar />
      <Padded $bottom="128px">
        <Container $maxWidth="500px">
          <Padded $bottom="32px">
            <h1>Hello, {currentUser?.fullname}</h1>
            <Link to="/user/edit">
              <Button>Edit Profile</Button>
            </Link>
          </Padded>
          <Timeline posts={postSet1} />
        </Container>
      </Padded>
    </>
  );
};

export default WelcomePage;
