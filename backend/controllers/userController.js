const User = require("../models/user");
const { errorResponse } = require("../handler/error");
const { validationResult } = require("express-validator");

const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    res.json(user);
  } catch (err) {
    res.status(401).json(errorResponse(err));
  }
};

const getByUsername = async (req, res) => {
  try {
    const user = await User.findByUsername(req.params.username);
    res.json({
      _id: user._id,
      username: user.username,
      fullname: user.fullname,
      avatar: user.avatar,
    });
  } catch (err) {
    res.status(400).json(errorResponse(err));
  }
};

const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errorResponse(errors.array()));
  }

  const salt = User.genSalt();

  //Upload Media
  let url = null;
  if (req.file) {
    if (req.file.gcsUrl) {
      url = req.file.gcsUrl;
    } else {
      return res.status(500).send("Unable to upload");
    }
  }

  const user = new User({
    username: req.body.username,
    password: User.getHashPassword(req.body.password, salt),
    fullname: req.body.fullname,
    email: req.body.email,
    avatar: url,
  });

  try {
    const newUser = await user.save();
    res.status(201).json({ success: true, _id: newUser._id });
  } catch (err) {
    res.status(400).json(errorResponse(err));
  }
};

const edit = async (req, res) => {
  try {
    //Upload Media
    let url = null;
    if (req.file) {
      if (req.file.gcsUrl) {
        url = req.file.gcsUrl;
      } else {
        return res.status(500).send("Unable to upload");
      }
    }

    let data = {
      ...req.body,
    };
    if (url) data = { ...data, avatar: url };

    const update = {
      $set: data,
    };
    const updatedUser = await User.findByIdAndUpdate(
      req.session.user._id,
      update,
      {
        new: true,
      }
    );
    res.json({ success: true, user: updatedUser });
  } catch (err) {
    res.status(400).json(errorResponse(err));
  }
};

const getPosts = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username })
      .select("+posts")
      .populate({
        path: "posts",
        populate: {
          path: "sourcePostId",
          populate: {
            path: "userId",
          },
        },
      });
    res.status(200).json({ posts: user.posts.reverse() });
  } catch (err) {
    console.log(err);
    res.status(400).json(errorResponse(err));
  }
};

module.exports = { getByUsername, getCurrentUser, register, edit, getPosts };
