import React, { useEffect, useState } from "react";
import Axios from "axios";
import {
  Container,
  Padded,
  AppBar,
  Flex,
  Gap,
  Avatar,
} from "common/components";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCurrentUser } from "modules/auth/selectors";
import { User } from "common/types";
import Timeline from "modules/user/components/Timeline";
import { narrow } from "common/styles/container";
import { Post } from "common/types";
import AddPost from "./components/AddPost";

const TimelinePage = () => {
  const { username: usernameParam } = useParams();
  const [posts, setPosts] = useState<Post[]>([]);
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

  useEffect(() => {
    // Get Posts
    const getPosts = async () => {
      const res = await Axios.get(
        `/api/user/posts/${usernameParam || currentUser?.username}`
      );
      setPosts(res.data.posts);
    };
    getPosts();
  }, [currentUser]);

  return (
    <>
      <AppBar />
      <Padded $bottom="128px">
        <Container $maxWidth={narrow}>
          <Padded $top="48px">
            <div style={{ textAlign: "center", paddingBottom: "16px" }}>
              <Gap $size="16px">
                <div style={{ margin: "auto", display: "inline-block" }}>
                  <Avatar
                    $url={displayingUser?.avatar || currentUser?.avatar}
                    $rounded
                    $size="96px"
                    style={{ marginBottom: 0 }}
                  />
                </div>
                <h1>
                  {isMyPage ? currentUser?.fullname : displayingUser?.fullname}
                </h1>
              </Gap>
            </div>
          </Padded>
          {isMyPage && (
            <Padded $bottom="32px">
              <AddPost />
            </Padded>
          )}
          <Timeline posts={posts} />
        </Container>
      </Padded>
    </>
  );
};

export default TimelinePage;
