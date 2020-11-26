const { isEmpty, isNil } = require("lodash");
const dayjs = require("dayjs");
const { errorResponse } = require("../handler/error");
const User = require("../models/user");
const Post = require("../models/post");

const post = async (req, res) => {
  if (isEmpty(req.body.content) && isNil(req.file)) {
    res.status(400).json(
      errorResponse({
        message: "Either content or media is required.",
      })
    );
    return;
  }

  //Upload Media
  let url = null;
  if (req.file) {
    if (req.file.gcsUrl) {
      url = req.file.gcsUrl;
    } else {
      return res.status(500).send("Unable to upload");
    }
  }

  const post = new Post({
    userId: req.session.user._id,
    content: req.body.content,
    dateTime: dayjs(),
    media: url,
  });
  await User.findByIdAndUpdate(req.session.user._id, {
    $push: { posts: post._id },
  });

  try {
    const newPost = await post.save();
    res.status(201).json({ success: true, post: newPost });
  } catch (err) {
    res.status(400).json(errorResponse(err));
  }
};

const share = async (req, res) => {
  try {
    const sourcePost = await Post.findById(req.params.postId);

    if (sourcePost) {
      const post = new Post({
        userId: req.session.user._id,
        content: req.body.content,
        dateTime: dayjs(),
        sourcePostId: req.params.postId,
      });

      const newPost = await post.save();
      await User.findByIdAndUpdate(req.session.user._id, {
        $push: { posts: post._id },
      });
      res.status(201).json({ success: true, post: newPost });
    } else {
      res.status(400).json(errorResponse({ message: "Post is not available" }));
    }
  } catch (err) {
    res.status(400).json(errorResponse(err));
    console.log(err);
  }
};

const del = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, _id: req.params.id });
  } catch (err) {
    res.status(400).json(errorResponse(err));
  }
};

module.exports = {
  post,
  share,
  del,
};
