const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../../models/user");
const { errorResponse } = require("../../utils/error");
const { authenticateToken } = require("../../auth");

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
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errorResponse(errors.array()));
    }

    const salt = User.genSalt();

    const user = new User({
      username: req.body.username,
      password: User.getHashPassword(req.body.password, salt),
      fullname: req.body.fullname,
      email: req.body.email,
      avatar: req.body.avatar,
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
router.put("/edit", [authenticateToken], async (req, res) => {
  try {
    if (req.body._id !== req.user._id) {
      res.status(401).json(
        errorResponse({
          message: "You are not allowed to perform this action.",
        })
      );
      return;
    }

    const data = {
      $set: req.body,
    };
    await User.findByIdAndUpdate(req.user._id, data, { new: true });
    res.json({ success: true });
  } catch (err) {
    res.status(400).json(errorResponse(err));
  }
  // TODO: Edit user information in posts
});

// Get posts of a user
router.get("/posts/:userId", async (req, res) => {
  try {
    await mongoose.connection.db
      .collection("posts")
      .find({ userId: req.params.userId })
      .toArray()
      .then((posts) => {
        res.status(200).json({ posts });
      });
  } catch (err) {
    console.log(err);
    res.status(400).json(errorResponse(err));
  }
});

module.exports = router;
