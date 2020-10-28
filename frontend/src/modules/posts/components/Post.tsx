import React from "react";
import { Card, Box, Padded, Button } from "common/components";
import PostContent from "./PostContent";

type PostProps = {
  username: string;
  fullname: string;
  avatar?: string;
  dateTime: string;
  content?: string;
  media?: string;
  sourcePostId?: string;
  sourceUsername?: string;
  sourceFullname?: string;
  sourceAvatar?: string;
  sourceDateTime?: string;
  sourceContent?: string;
  sourceMedia?: string;
};

const Post = ({
  username,
  fullname,
  avatar,
  dateTime,
  content,
  media,
  sourcePostId,
  sourceUsername,
  sourceFullname,
  sourceAvatar,
  sourceDateTime,
  sourceContent,
  sourceMedia,
}: PostProps) => {
  return (
    <Card>
      <PostContent
        username={username}
        fullname={fullname}
        avatar={avatar}
        dateTime={dateTime}
        content={content}
        media={sourcePostId ? undefined : media}
      />
      {sourcePostId && (
        <Padded $all="16px" $top="0">
          <Box>
            <PostContent
              username={sourceUsername}
              fullname={sourceFullname}
              avatar={sourceAvatar}
              dateTime={sourceDateTime}
              content={sourceContent}
              media={sourceMedia}
            />
          </Box>
        </Padded>
      )}
      <Padded $all="16px" $top="0">
        <Button>Share</Button>
      </Padded>
    </Card>
  );
};

export default Post;
