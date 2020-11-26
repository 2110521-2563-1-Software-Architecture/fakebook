const User = require("../models/user");
const { errorResponse } = require("../handler/error");

const login = (req, res) => {
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
        req.session.user = {
          _id: user._id,
          username: user.username,
        };
        res.status(200).json("Logged in");
      }
    });
};

const logout = (req, res) => {
  req.session.destroy();
  res.clearCookie("user_sid");
  res.status(200).json("Logged out");
};

module.exports = { login, logout };
