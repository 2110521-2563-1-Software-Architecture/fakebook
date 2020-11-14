const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
  },
  avatar: {
    type: String,
    required: false,
  },
  posts: [{ type: Schema.Types.ObjectId, ref: "PostSchema" }],
});

UserSchema.plugin(uniqueValidator, {
  type: "",
  message: "That {PATH} is already taken.",
});

UserSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.statics.getHashPassword = function (password, salt) {
  return bcrypt.hashSync(password, salt);
};

UserSchema.statics.genSalt = function () {
  return bcrypt.genSaltSync();
};

UserSchema.statics.findByUsername = function (username, cb) {
  return this.findOne({ username }, cb);
};

module.exports = mongoose.model("UserSchema", UserSchema, "users");
