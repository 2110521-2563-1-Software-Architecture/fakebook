import React from "react";
import dayjs from "dayjs";
import { Flex, Padded, Avatar, Link, Paragraph } from "common/components";
import colors from "common/styles/colors";

type PostContentProps = {
  username?: string;
  fullname?: string;
  avatar?: string;
  dateTime?: string;
  content?: string;
  media?: string;
};

const PostContent = ({
  username,
  fullname,
  avatar,
  dateTime,
  content,
  media,
}: PostContentProps) => {
  return (
    <>
      <Padded $all="16px">
        <Padded $bottom="8px">
          <Flex $space="16px" $align="center">
            <Link to={`/user/${username}`}>
              <Avatar $url={avatar} $rounded $size="48px" />
            </Link>
            <Link to={`/user/${username}`}>
              <h3>{fullname}</h3>
            </Link>
          </Flex>
        </Padded>
        <p style={{ color: colors.gray[500] }}>
          {dayjs(dateTime).format("DD/MM/YYYY")}
        </p>
        <Paragraph>{content}</Paragraph>
        {media && (
          <Padded $top="16px">
            <img src={media} style={{ width: "100%" }} />
          </Padded>
        )}
      </Padded>
    </>
  );
};

export default PostContent;
