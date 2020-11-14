import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getChosenPost } from "modules/posts/selectors";
import { Post, User } from "common/types";
import PostComponent from "modules/posts/components/Post";
import { Gap } from "common/components";
import SharePostModal from "./SharePostModal";

type TimelineProps = {
  posts: Post[];
  user: User;
  callback?: (Post) => void;
};

const Timeline = ({ posts, user, callback }: TimelineProps) => {
  const chosenPost = useSelector(getChosenPost);

  return (
    <>
      <Gap $size="32px">
        {posts.map((post, i) => (
          <PostComponent key={`post${i}`} user={user} post={post} />
        ))}
        {chosenPost && <SharePostModal user={user} callback={callback} />}
      </Gap>
    </>
  );
};

export default Timeline;
