import React from "react";
import dayjs from "dayjs";
import {
  Card,
  Flex,
  Padded,
  Avatar,
  Link,
  Paragraph,
  Box,
  Button,
} from "common/components";
import colors from "common/styles/colors";

type PostProps = {
  username: string;
  fullname: string;
  avatar?: string;
  dateTime: string;
  content?: string;
  sourcePostId?: string;
  sourceUsername?: string;
  sourceFullname?: string;
  sourceAvatar?: string;
  sourceDateTime?: string;
  sourceContent?: string;
  sourceMedia?: string;
};

const SharedPost = ({
  username,
  fullname,
  avatar,
  dateTime,
  content,
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
        <Padded $bottom="16px">
          <p style={{ color: colors.gray[500] }}>
            {dayjs(dateTime).format("DD/MM/YYYY")}
          </p>
        </Padded>
        <Paragraph>{content}</Paragraph>
      </Padded>
      <Padded $x="16px">
        <Box>
          <Padded $all="16px">
            <Padded $bottom="8px">
              <Flex $space="16px" $align="center">
                <Link to={`/user/${sourceUsername}`}>
                  <Avatar $url={sourceAvatar} $rounded $size="48px" />
                </Link>
                <Link to={`/user/${sourceUsername}`}>
                  <h3>{sourceFullname}</h3>
                </Link>
              </Flex>
            </Padded>
            <Padded $bottom="16px">
              <p style={{ color: colors.gray[500] }}>
                {dayjs(sourceDateTime).format("DD/MM/YYYY")}
              </p>
            </Padded>
            <Padded $bottom="16px">
              <Paragraph>{sourceContent}</Paragraph>
            </Padded>
            {sourceMedia && <img src={sourceMedia} style={{ width: "100%" }} />}
          </Padded>
        </Box>
      </Padded>
      <Padded $all="16px">
        <Button>Share</Button>
      </Padded>
    </Card>
  );
};

export default SharedPost;
