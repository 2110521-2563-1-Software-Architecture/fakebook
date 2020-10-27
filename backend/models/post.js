const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
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

// TODO Pls check the collection name whether it is the same as that of sharedPost
module.exports = mongoose.model("PostSchema", postSchema);
