const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../../models/user");
const Post = require("../../models/post");
const ObjectId = require("mongoose").Types.ObjectId;
const { errorResponse } = require("../../utils/error");
const { authenticateToken } = require("../../middlewares/auth");
const Multer = require("multer");
const gcsMiddlewares = require("../../middlewares/googleCloudStorage");

const multer = Multer({
  storage: Multer.MemoryStorage,
  limits: {
    fileSize: 10 * 1024 * 1024, // Maximum file size is 10MB
  },
});

// Get Current User
router.get("/me", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json(user);
  } catch (err) {
    res.status(401).json(errorResponse(err));
  }
});

// Get a User's Public Information
router.get("/:username", async (req, res) => {
  try {
    const user = await User.findByUsername(req.params.username);
    res.json({
      _id: user._id,
      username: user.username,
      fullname: user.fullname,
      avatar: user.avatar,
    });
  } catch (err) {
    res.status(400).json(errorResponse(err));
  }
});

// Create User
router.post(
  "/register",
  [
    body("username").notEmpty(),
    body("email").isEmail(),
    body("password").notEmpty(),
    body("fullname").notEmpty(),
    multer.single("avatar"),
    gcsMiddlewares.sendUploadToGCS,
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errorResponse(errors.array()));
    }

    const salt = User.genSalt();

    //Upload Media
    let url = null;
    if (req.file) {
      if (req.file.gcsUrl) {
        url = req.file.gcsUrl;
      } else {
        return res.status(500).send("Unable to upload");
      }
    }

    const user = new User({
      username: req.body.username,
      password: User.getHashPassword(req.body.password, salt),
      fullname: req.body.fullname,
      email: req.body.email,
      avatar: url,
    });

    try {
      const newUser = await user.save();
      res.status(201).json({ success: true, _id: newUser._id });
    } catch (err) {
      res.status(400).json(errorResponse(err));
    }
  }
);

// Edit User Infomation
router.put(
  "/edit",
  [authenticateToken, multer.single("avatar"), gcsMiddlewares.sendUploadToGCS],
  async (req, res) => {
    try {
      if (req.body._id !== req.user._id) {
        res.status(401).json(
          errorResponse({
            message: "You are not allowed to perform this action.",
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

      let data = {
        ...req.body,
      };
      if (url) data = { ...data, avatar: url };

      const update = {
        $set: data,
      };
      const updatedUser = await User.findByIdAndUpdate(req.user._id, update, {
        new: true,
      });
      res.json({ success: true, user: updatedUser });
    } catch (err) {
      res.status(400).json(errorResponse(err));
    }
    // TODO: Edit user information in posts
  }
);

// Get posts of a user
router.get("/posts/:username", async (req, res) => {
  try {
    await mongoose.connection.db
      .collection("posts")
      .find({ username: req.params.username })
      .toArray()
      .then((posts) => {
        res.status(200).json({ posts: posts.reverse() });
      });
  } catch (err) {
    console.log(err);
    res.status(400).json(errorResponse(err));
  }
});

module.exports = router;
