const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const { errorResponse } = require("../utils/error");

// Get Current User
router.get("/me", (req, res) => {
  const currentUserId = req.session.user;
  if (!currentUserId) {
    res.status(401).json(errorResponse("Authentication is required."));
    return;
  }
  User.findById(currentUserId).then((user) => {
    if (user) {
      res.json(user);
    } else {
      res.status(401).json(errorResponse("Authentication is required."));
    }
  });
});

// Check Auth
router.get("/session", (req, res) => {
  if (req.session.user) res.send(true);
  else res.send(false);
});

// Create User
router.post(
  "/",
  [
    body("username").notEmpty(),
    body("email").isEmail(),
    body("password").notEmpty(),
    body("subscribed").isBoolean(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errorResponse(errors.array()));
    }

    const salt = bcrypt.genSaltSync();

    const user = new User({
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, salt),
      email: req.body.email,
      subscribed: req.body.subscribed,
    });

    try {
      const newUser = await user.save();
      req.session.user = user._id;
      res.status(201).json({ _id: newUser._id });
    } catch (err) {
      res.status(400).json(errorResponse(err));
    }
  }
);

router.post("/login", (req, res) => {
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({ username })
    .select("+password")
    .then((user) => {
      if (!user) {
        res
          .status(401)
          .json(errorResponse({ message: "Incorrect username or password." }));
      } else if (!user.validPassword(password)) {
        res
          .status(401)
          .json(errorResponse({ message: "Incorrect username or password." }));
      } else {
        req.session.user = user._id;
        res.status(200).json("Logged in");
      }
    });
});

router.post("/logout", (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
    res.clearCookie("user_sid");
  }
  res.status(200).json("Logged out");
});

module.exports = router;
