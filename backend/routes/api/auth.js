const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const { errorResponse } = require("../../utils/error");
const { generateAccessToken } = require("../../auth");

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
        const token = generateAccessToken({
          username: req.body.username,
          _id: user._id.toString(),
        });
        res.status(200).json({ access_token: token });
      }
    });
});

module.exports = router;
