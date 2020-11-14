const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Post = require("../../models/post");
const User = require("../../models/user");
const { errorResponse } = require("../../utils/error");
const Multer = require("multer");
const gcsMiddlewares = require("../../middlewares/googleCloudStorage");
const { isEmpty, isNil } = require("lodash");
const dayjs = require("dayjs");

const multer = Multer({
  storage: Multer.MemoryStorage,
  limits: {
    fileSize: 10 * 1024 * 1024, // Maximum file size is 10MB
  },
});
const { authenticateToken } = require("../../middlewares/auth");

router.post(
  "/new",
  [authenticateToken, multer.single("media"), gcsMiddlewares.sendUploadToGCS],
  async (req, res) => {
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
      userId: req.user._id,
      content: req.body.content,
      dateTime: dayjs(),
      media: url,
    });
    await User.findByIdAndUpdate(req.user._id, { $push: { posts: post._id } });

    try {
      const newPost = await post.save();
      res.status(201).json({ success: true, post: newPost });
    } catch (err) {
      res.status(400).json(errorResponse(err));
    }
  }
);

router.post("/share/:postId", authenticateToken, async (req, res) => {
  try {
    const sourcePost = await Post.findById(req.params.postId);

    if (sourcePost) {
      const post = new Post({
        userId: req.user._id,
        content: req.body.content,
        dateTime: dayjs(),
        sourcePostId: req.params.postId,
      });

      const newPost = await post.save();
      await User.findByIdAndUpdate(req.user._id, {
        $push: { posts: post._id },
      });
      res.status(201).json({ success: true, post: newPost });
    } else {
      res.status(400).json(errorResponse({ message: "Post is not available" }));
    }
  } catch (err) {
    res.status(400).json(errorResponse(err));
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, _id: req.params.id });
  } catch (err) {
    res.status(400).json(errorResponse(err));
  }
});

module.exports = router;
