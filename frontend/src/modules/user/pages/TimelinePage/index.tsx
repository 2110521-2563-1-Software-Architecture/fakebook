import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Button, Container, Padded } from "common/components";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCurrentUser } from "modules/auth/selectors";
import { User } from "common/types";
import AppBar from "common/components/AppBar";
import Timeline from "modules/user/components/Timeline";
import { narrow } from "common/styles/container";

import { postSet1 } from "modules/user/mocks/posts";

const TimelinePage = () => {
  const { username: usernameParam } = useParams();
  const [displayingUser, setDisplayingUser] = useState<User | undefined>();
  useEffect(() => {
    if (usernameParam) {
      Axios.get(`/api/user/${usernameParam}`)
        .then((req) => {
          if (req.data) {
            setDisplayingUser(req.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const currentUser = useSelector(getCurrentUser);
  const isMyPage = usernameParam
    ? usernameParam === currentUser?.username
    : true;

  console.log(isMyPage);

  return (
    <>
      <AppBar />
      <Padded $bottom="128px">
        <Container $maxWidth={narrow}>
          {isMyPage ? (
            <Padded $bottom="32px">
              <h1>Hello, {currentUser?.fullname}</h1>
              <Link to="/user/edit">
                <Button>Edit Profile</Button>
              </Link>
            </Padded>
          ) : (
            <h1>{displayingUser?.fullname}</h1>
          )}
          <Timeline posts={postSet1} />
        </Container>
      </Padded>
    </>
  );
};

export default TimelinePage;
