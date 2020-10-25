import React from "react";
import { Post } from "common/types";
import PostComponent from "modules/user/components/Post";
import { Gap } from "common/components";

type TimelineProps = {
  posts: Post[];
};

const Timeline = ({ posts }: TimelineProps) => {
  return (
    <Gap $size="32px">
      {posts.map((post, i) => (
        <PostComponent
          key={`post${i}`}
          media={post.sourceMedia || post.media}
          content={post.sourceContent || post.content}
          posterName={post.sourceFullname || post.fullname}
          posterUsername={post.sourceUsername || post.username}
          posterAvatar={post.sourceAvatar || post.avatar}
          time={post.time}
        />
      ))}
    </Gap>
  );
};

export default Timeline;
