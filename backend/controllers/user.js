const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const uniqueValidator = require("mongoose-unique-validator");

User.plugin(uniqueValidator, {
  type: "",
  message: "That {PATH} is already taken.",
});

User.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

User.statics.getHashPassword = function (password, salt) {
  return bcrypt.hashSync(password, salt);
};

User.statics.genSalt = function () {
  return bcrypt.genSaltSync();
};

User.statics.findByUsername = function (username, cb) {
  return this.findOne({ username }, cb);
};

module.exports = mongoose.model("user", User);
