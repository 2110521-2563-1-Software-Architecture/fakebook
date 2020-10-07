import React, { useState, useEffect } from "react";
import { Container } from "common/components";
import { useSelector } from "react-redux";
import { getCurrentUser } from "modules/auth/selectors";
import { User } from "common/types";
import AppBar from "common/components/AppBar";

const MainUserTimeline = () => {
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
      </Container>
    </>
  );
};

export default MainUserTimeline;
