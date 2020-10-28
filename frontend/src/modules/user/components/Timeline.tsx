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
          content={post.content}
          fullname={post.fullname}
          username={post.username}
          avatar={post.avatar}
          dateTime={post.dateTime}
          media={post.media}
          sourcePostId={post.sourcePostId}
          sourceContent={post.sourceContent}
          sourceFullname={post.sourceFullname}
          sourceUsername={post.sourceUsername}
          sourceAvatar={post.sourceAvatar}
          sourceDateTime={post.sourceDateTime}
          sourceMedia={post.sourceMedia}
        />
      ))}
    </Gap>
  );
};

export default Timeline;
