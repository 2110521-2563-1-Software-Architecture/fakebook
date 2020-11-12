import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getChosenPost } from "modules/posts/selectors";
import { Post } from "common/types";
import PostComponent from "modules/posts/components/Post";
import { Gap } from "common/components";
import SharePostModal from "./SharePostModal";

type TimelineProps = {
  posts: Post[];
};

const Timeline = ({ posts }: TimelineProps) => {
  const chosenPost = useSelector(getChosenPost);

  return (
    <>
      <Gap $size="32px">
        {posts.map((post, i) => (
          <PostComponent key={`post${i}`} post={post} />
        ))}
        {chosenPost && <SharePostModal />}
      </Gap>
    </>
  );
};

export default Timeline;
