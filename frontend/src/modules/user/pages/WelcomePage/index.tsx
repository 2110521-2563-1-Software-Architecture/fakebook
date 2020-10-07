import React, { useState, useEffect } from "react";
import { Button, Container } from "common/components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCurrentUser } from "modules/auth/selectors";
import { User } from "common/types";
import AppBar from "common/components/AppBar";

const WelcomePage = () => {
  //   const [currentUser, setCurrentUser] = useState<User | null>(null);

  //   // Get Current User Details
  //   useEffect(() => {
  //     const getCurrentUserApi = async () => {
  //       const res = (await useSelector(getCurrentUser)) as User;
  //       setCurrentUser(res);
  //     };
  //     getCurrentUserApi();
  //   }, []);

  return (
    <>
      <AppBar />
      <Container>
        <h1>Hello</h1>
        <Link to="/user/edit">
          <Button>Edit Profile</Button>
        </Link>
      </Container>
    </>
  );
};

export default WelcomePage;
