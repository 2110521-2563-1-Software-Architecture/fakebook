const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
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
  media: {
    type: String,
    required: false,
  },
});


module.exports = mongoose.model("PostSchema", postSchema, "posts");
