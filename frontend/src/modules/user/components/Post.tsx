import React from "react";
import dayjs from "dayjs";
import { Card, Flex, Padded, Avatar, Link, Paragraph } from "common/components";
import colors from "common/styles/colors";

type PostProps = {
  media?: string;
  content: string;
  posterAvatar?: string;
  posterName: string;
  posterUsername: string;
  time: string;
};

const Post = ({
  media,
  content,
  posterAvatar,
  posterName,
  posterUsername,
  time,
}: PostProps) => {
  return (
    <Card>
      <img src={media} style={{ width: "100%" }} />
      <Padded $all="32px">
        <Padded $bottom="8px">
          <Flex $space="16px" $align="center">
            <Link to={`/user/${posterUsername}`}>
              <Avatar $url={posterAvatar} $rounded $size="48px" />
            </Link>
            <Link to={`/user/${posterUsername}`}>
              <h3>{posterName}</h3>
            </Link>
          </Flex>
        </Padded>
        <Padded $bottom="16px">
          <p style={{ color: colors.gray[500] }}>
            {dayjs(time).format("DD/MM/YYYY")}
          </p>
        </Padded>
        <Paragraph>{content}</Paragraph>
      </Padded>
    </Card>
  );
};

export default Post;
