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
import { User } from "common/types";

type SharePostModalProps = {
  callback?: (Post) => void;
  user: User;
};

const SharePostModal = ({
  callback,
  user: displayingUser,
}: SharePostModalProps) => {
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
      content,
      dateTime: dayjs(),
    };
    Axios.post(
      `/api/post/share/${chosenPost!.sourcePostId?._id || chosenPost!._id}`,
      sharingPost
    )
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Success",
        });
        if (callback && currentUser._id === displayingUser._id) {
          callback({
            _id: res.data.post._id,
            ...sharingPost,
            sourcePostId: {
              ...(chosenPost.sourcePostId || chosenPost),
              userId: chosenPost!.sourcePostId?.userId || displayingUser,
            },
          });
        }
        setContent("");
        hideSharingModal();
      })
      .catch((err) => console.log(err));
  }, [currentUser, content]);

  return (
    <Modal onClose={hideSharingModal} title="Share">
      <Padded $all="16px">
        <Padded $bottom="16px">
          <Flex $space="16px" $align="center">
            <Avatar $src={currentUser?.avatar} $rounded $size="48px" />
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
                postId={chosenPost.sourcePostId?._id || chosenPost._id}
                username={
                  chosenPost.sourcePostId?.userId.username ||
                  displayingUser?.username
                }
                fullname={
                  chosenPost.sourcePostId?.userId.fullname ||
                  displayingUser?.fullname
                }
                avatar={
                  chosenPost.sourcePostId?.userId.avatar ||
                  displayingUser?.avatar
                }
                dateTime={
                  chosenPost.sourcePostId?.dateTime || chosenPost.dateTime
                }
                content={chosenPost.sourcePostId?.content || chosenPost.content}
                media={chosenPost.sourcePostId?.media || chosenPost.media}
              />
            )}
          </Box>
        </Padded>
      </Padded>
    </Modal>
  );
};

export default SharePostModal;
