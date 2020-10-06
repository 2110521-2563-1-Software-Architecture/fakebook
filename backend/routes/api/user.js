const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../../models/User");
const { errorResponse } = require("../../utils/error");

// Create User
router.post(
  "/",
  [
    body("username").notEmpty(),
    body("email").isEmail(),
    body("password").notEmpty(),
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
    });

    try {
      const newUser = await user.save();
      res.status(201).json({ _id: newUser._id });
    } catch (err) {
      res.status(400).json(errorResponse(err));
    }
  }
);

module.exports = router;
