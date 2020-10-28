import React from "react";
import { useDispatch } from "react-redux";
import { setChosenPost } from "modules/posts/actions";
import { Card, Box, Padded, Button } from "common/components";
import PostContent from "./PostContent";
import { Post as PostType } from "common/types";

type PostProps = {
  post: PostType;
};

const Post = ({ post }: PostProps) => {
  const dispatch = useDispatch();

  const showSharingModal = (post) => () => {
    console.log("hello");
    dispatch(setChosenPost(post));
  };

  return (
    <Card>
      <PostContent
        postId={post._id}
        username={post.username}
        fullname={post.fullname}
        avatar={post.avatar}
        dateTime={post.dateTime}
        content={post.content}
        media={post.sourcePostId ? undefined : post.media}
      />
      {post.sourcePostId && (
        <Padded $all="16px" $top="0">
          <Box>
            <PostContent
              postId={post.sourcePostId}
              username={post.sourceUsername}
              fullname={post.sourceFullname}
              avatar={post.sourceAvatar}
              dateTime={post.sourceDateTime}
              content={post.sourceContent}
              media={post.sourceMedia}
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
