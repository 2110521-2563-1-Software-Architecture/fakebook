const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: "UserSchema", required: true },
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
  sourcePostId: {
    type: Schema.Types.ObjectId,
    ref: "PostSchema",
    required: false,
  },
});

module.exports = mongoose.model("PostSchema", PostSchema, "posts");
