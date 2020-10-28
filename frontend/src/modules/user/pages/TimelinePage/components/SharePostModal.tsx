import React, { useState, useCallback } from "react";
import dayjs from "dayjs";
import { useSelector, useDispatch } from "react-redux";
import { unsetChosenPost } from "modules/posts/actions";
import { getCurrentUser } from "modules/auth/selectors";
import {
  Padded,
  Flex,
  Avatar,
  Textarea,
  Button,
  Box,
  Modal,
} from "common/components";
import Axios from "axios";
import Swal from "sweetalert2";
import { getChosenPost } from "modules/posts/selectors";
import PostContent from "modules/posts/components/PostContent";

const SharePostModal = () => {
  const currentUser = useSelector(getCurrentUser);
  const chosenPost = useSelector(getChosenPost);
  const dispatch = useDispatch();

  const [content, setContent] = useState("");

  const changeContent = (e) => {
    setContent(e.target.value);
  };

  const hideSharingModal = () => {
    dispatch(unsetChosenPost());
  };

  const sharePost = useCallback(() => {
    const sharingPost = {
      userId: currentUser._id,
      username: currentUser.username,
      fullname: currentUser.fullname,
      avatar: currentUser.avatar,
      content,
      dateTime: dayjs(),
    };
    Axios.post(
      `/api/post/share/${chosenPost!.sourcePostId || chosenPost!._id}`,
      sharingPost
    ).then(() => {
      Swal.fire({
        icon: "success",
        title: "Success",
      });
      setContent("");
      hideSharingModal();
    });
  }, [currentUser, content]);

  return (
    <Modal onClose={hideSharingModal} title="Share">
      <Padded $all="16px">
        <Padded $bottom="16px">
          <Flex $space="16px" $align="center">
            <Avatar
              $url={currentUser?.avatar}
              $rounded
              $size="48px"
              style={{ marginBottom: 0 }}
            />
            <h3>{currentUser?.fullname}</h3>
          </Flex>
        </Padded>
        <Padded $bottom="16px">
          <Textarea
            label=""
            placeholder="What's on your mind?"
            value={content}
            onChange={changeContent}
          />
        </Padded>
        <Flex $justify="flex-end">
          <Button onClick={sharePost}>Share</Button>
        </Flex>
        <Padded $top="16px">
          <Box>
            {chosenPost && (
              <PostContent
                postId={chosenPost.sourcePostId || chosenPost._id}
                username={chosenPost.sourceUsername || chosenPost.username}
                fullname={chosenPost.sourceFullname || chosenPost.fullname}
                avatar={chosenPost.sourceAvatar || chosenPost.avatar}
                dateTime={chosenPost.sourceDateTime || chosenPost.dateTime}
                content={chosenPost.sourceContent || chosenPost.content}
                media={chosenPost.sourceMedia || chosenPost.media}
              />
            )}
          </Box>
        </Padded>
      </Padded>
    </Modal>
  );
};

export default SharePostModal;
