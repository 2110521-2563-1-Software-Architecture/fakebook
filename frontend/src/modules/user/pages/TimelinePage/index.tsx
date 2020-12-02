import React, { useCallback, useEffect, useState } from "react";
import Axios from "axios";
import { Container, Padded, AppBar, Gap, Avatar } from "common/components";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCurrentUser } from "modules/auth/selectors";
import { User } from "common/types";
import Timeline from "./components/Timeline";
import { narrow } from "common/styles/container";
import { Post } from "common/types";
import AddPost from "./components/AddPost";

const TimelinePage = () => {
  const { username: usernameParam } = useParams();
  const [posts, setPosts] = useState<Post[]>([]);
  const [displayingUser, setDisplayingUser] = useState<User | undefined>();

  const currentUser = useSelector(getCurrentUser);

  const isMyPage = usernameParam
    ? usernameParam === currentUser?.username
    : true;

  useEffect(() => {
    // Get User
    if (usernameParam) {
      Axios.get(`/api/user/${usernameParam}`)
        .then((res) => {
          if (res.data) {
            setDisplayingUser(res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    // Get Posts
    const getPosts = async () => {
      if (currentUser) {
        const res = await Axios.get(
          `/api/user/posts/${usernameParam || currentUser?.username}`
        ).catch((err) => console.log(err));
        if (res && res.data) {
          setPosts(res.data.posts);
        }
      }
    };
    getPosts();
  }, [usernameParam, currentUser]);

  const addPost = useCallback(
    (post) => {
      const appendList = [post, ...posts];
      setPosts(appendList);
    },
    [currentUser, posts]
  );

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
                    $src={
                      isMyPage ? currentUser?.avatar : displayingUser?.avatar
                    }
                    $rounded
                    $size="96px"
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
              <AddPost callback={addPost} />
            </Padded>
          )}
          <Timeline
            user={isMyPage ? currentUser : displayingUser}
            posts={posts}
            callback={addPost}
          />
        </Container>
      </Padded>
    </>
  );
};

export default TimelinePage;
