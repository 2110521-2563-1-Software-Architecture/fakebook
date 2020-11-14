import React from "react";
import { useDispatch } from "react-redux";
import { setChosenPost } from "modules/posts/actions";
import { Card, Box, Padded, Button } from "common/components";
import PostContent from "./PostContent";
import { Post as PostType, User } from "common/types";

type PostProps = {
  user: User;
  post: PostType;
};

const Post = ({ user, post }: PostProps) => {
  const dispatch = useDispatch();

  const showSharingModal = (post) => () => {
    console.log("hello");
    dispatch(setChosenPost(post));
  };

  return (
    <Card>
      <PostContent
        postId={post._id}
        username={user.username}
        fullname={user.fullname}
        avatar={user.avatar}
        dateTime={post.dateTime}
        content={post.content}
        media={post.sourcePostId ? undefined : post.media}
      />
      {post.sourcePostId && (
        <Padded $all="16px" $top="0">
          <Box>
            <PostContent
              postId={post.sourcePostId._id}
              username={post.sourcePostId.userId.username}
              fullname={post.sourcePostId.userId.fullname}
              avatar={post.sourcePostId.userId.avatar}
              dateTime={post.sourcePostId.dateTime}
              content={post.sourcePostId.content}
              media={post.sourcePostId.media}
            />
          </Box>
        </Padded>
      )}
      <Padded $all="16px" $top="0">
        <Button onClick={showSharingModal(post)}>Share</Button>
      </Padded>
    </Card>
  );
};

export default Post;
