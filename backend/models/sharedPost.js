const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const uniqueValidator = require("mongoose-unique-validator");

const regularPostSchema = new mongoose.Schema({
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
    dateTime: {
        type: Date,
        required: true,
    },
    content: {
      type: String,
      required: false,
    },
    sourceUserId: {
      type: String,
      required: true 
    },
    sourceUserId: {
      type: String,
      required: true 
    },
    sourcePostId: {
      type: String,
      required: true 
    }
});
  
module.exports = mongoose.model("RegularPost", regularPostSchema);