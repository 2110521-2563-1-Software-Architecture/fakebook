const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Post = require("../../models/post");
const SharedPost = require("../../models/sharedPost");
const { errorResponse } = require("../../utils/error");
const Multer = require('multer');
const gcsMiddlewares = require('../../middlewares/googleCloudStorage');
	
const multer = Multer({
  storage: Multer.MemoryStorage,
  limits: {
    fileSize: 10 * 1024 * 1024, // Maximum file size is 10MB
  },
});
const { authenticateToken } = require("../../auth");

router.post(
  "/new",
  [
    authenticateToken,
    body("userId").notEmpty(),
    body("username").notEmpty(),
    body("dateTime").notEmpty(),
    body("fullname").notEmpty(),
    body("content").if(body("media").notEmpty()).notEmpty(),
    multer.single("media"),
    gcsMiddlewares.sendUploadToGCS,
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errorResponse(errors.array()));
    }

    if (req.user._id !== req.body.userId) {
      res.status(401).json(
        errorResponse({
          message: "You are not allowed to perform this action.",
        })
      );
      return;
    }

    //Upload Media
    let url = '';
    if (req.file && req.file.gcsUrl){
      url = req.file.gcsUrl;
    }else{
      return res.status(500).send('Unable to upload');
    }

    const post = new Post({
      userId: req.body.userId,
      username: req.body.username,
      fullname: req.body.fullname,
      avatar: req.body.avatar,
      content: req.body.content,
      dateTime: req.body.dateTime,
      media: url,
    });

    try {
      const newPost = await post.save();
      res.status(201).json({ success: true, _id: newPost._id });
    } catch (err) {
      res.status(400).json(errorResponse(err));
    }
  }
);

router.post(
  "/share/:postId",
  [
    authenticateToken,
    body("userId").notEmpty(),
    body("username").notEmpty(),
    body("fullname").notEmpty(),
    body("dateTime").notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errorResponse(errors.array()));
    }

    if (req.user._id !== req.body.userId) {
      res.status(401).json(
        errorResponse({
          message: "You are not allowed to perform this action.",
        })
      );
      return;
    }

    try {
      const sourcePost = await Post.findById(req.params.postId);
      console.log(sourcePost);
      if (sourcePost) {
        const post = new SharedPost({
          userId: req.body.userId,
          username: req.body.username,
          fullname: req.body.fullname,
          avatar: req.body.avatar,
          content: req.body.content,
          dateTime: req.body.dateTime,
          sourceUserId: sourcePost.userId,
          sourcePostId: sourcePost._id,
          sourceUsername: sourcePost.username,
          sourceFullname: sourcePost.fullname,
          sourceAvatar: sourcePost.avatar,
          sourceContent: sourcePost.content,
          sourceDateTime: sourcePost.dateTime,
          sourceMedia: sourcePost.media,
        });

        const newPost = await post.save();
        res.status(201).json({ success: true, _id: newPost._id });
      } else {
        res
          .status(400)
          .json(errorResponse({ message: "Post is not available" }));
      }
    } catch (err) {
      res.status(400).json(errorResponse(err));
    }
  }
);

router.delete("/delete/:id", async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, _id: req.params.id });
  } catch (err) {
    res.status(400).json(errorResponse(err));
  }
  // TODO SharedPost.find({ sourcePostId: req.params.id }) -> set sourceUserId, sourcePostId... to null
});

module.exports = router;
