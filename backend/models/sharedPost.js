const mongoose = require("mongoose");

const SharedPostSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    lowercase: true,
    required: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: false,
  },
  content: {
    type: String,
    required: false,
  },
  dateTime: {
    type: Date,
    required: true,
  },
  sourceUserId: {
    type: String,
    required: true,
  },
  sourcePostId: {
    type: String,
    lowercase: true,
    required: true,
  },
  sourceUsername: {
    type: String,
    lowercase: true,
    required: true,
  },
  sourceFullname: {
    type: String,
    required: true,
  },
  sourceAvatar: {
    type: String,
    required: false,
  },
  sourceContent: {
    type: String,
    required: false,
  },
  sourceDateTime: {
    type: Date,
    required: true,
  },
  sourceMedia: {
    type: String,
    required: false,
  },
});


module.exports = mongoose.model("SharedPostSchema", SharedPostSchema, "posts");
