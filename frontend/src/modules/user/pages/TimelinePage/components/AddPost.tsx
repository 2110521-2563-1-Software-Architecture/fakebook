import React, { useState, useCallback } from "react";
import Axios from "axios";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { isEmpty, isNull } from "lodash";
import { getCurrentUser } from "modules/auth/selectors";
import { Post } from "common/types";
import { JSONtoFormData } from "common/formdata";
import {
  Card,
  Textarea,
  Padded,
  Button,
  Flex,
  Avatar,
} from "common/components";

type FormValues = {
  content: string;
  media: File | null;
};

// Validation
const disableButton = ({ content, media }: FormValues) => {
  if (isEmpty(content) && isNull(media)) return true;
  return false;
};

const AddPostPage = ({ callback }: { callback?: (Post) => void }) => {
  const currentUser = useSelector(getCurrentUser);

  const [content, setContent] = useState("");
  const [media, setMedia] = useState<File | null>(null);

  const changeContent = (e) => {
    setContent(e.target.value);
  };

  const postSubmit = useCallback(() => {
    const post = {
      content,
    };

    let formData = JSONtoFormData(post);
    formData.append("media", media);

    Axios({
      method: "POST",
      url: "/api/post/new",
      headers: { "Content-Type": "multipart/form-data" },
      data: formData,
    })
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Success",
        });
        if (callback)
          callback({
            _id: res.data.post._id,
            ...post,
            media: res.data.post.media,
          });
        setContent("");
        setMedia(null);
      })
      .catch(() => {});
  }, [currentUser, content, media]);

  const changeMedia = (e) => {
    setMedia(e.target.files[0]);
  };

  return (
    <Card>
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
        <Padded $bottom="16px">
          <h4>Upload Media</h4>
          <input
            type="file"
            name="avatar"
            accept="image/png, image/jpeg, video/mp4,video/x-m4v,video/*"
            onChange={changeMedia}
          />
        </Padded>
        <Button
          onClick={postSubmit}
          disabled={disableButton({ content, media })}
        >
          Post
        </Button>
      </Padded>
    </Card>
  );
};

export default AddPostPage;
