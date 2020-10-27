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
    content: {
      type: String,
      required: true,
    },
    dateTime: {
      type: Date,
      required: true,
    },
    media: {
      type: String,
      required: false,
    }
});
  
module.exports = mongoose.model("RegularPost", regularPostSchema);