const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const auth = require("../../middlewares/auth");
const gcsMiddlewares = require("../../middlewares/googleCloudStorage");
const cacheMiddleware = require("../../middlewares/cache");
const {
  getByUsername,
  getCurrentUser,
  register,
  edit,
  getPosts,
} = require("../../controllers/userController");
const multer = require("../../middlewares/multer");

// Get Current User
router.get("/me", auth, getCurrentUser);

// Get a User's Public Information
router.get("/:username", cacheMiddleware(15), getByUsername);

// Create User
router.post(
  "/register",
  [
    body("username").notEmpty(),
    body("email").isEmail(),
    body("password").notEmpty(),
    body("fullname").notEmpty(),
    multer.single("avatar"),
    gcsMiddlewares.sendUploadToGCS,
  ],
  register
);

// Edit User Infomation
router.put(
  "/edit",
  [auth, multer.single("avatar"), gcsMiddlewares.sendUploadToGCS],
  edit
);

// Get posts of a user
router.get("/posts/:username", cacheMiddleware(15), getPosts);

module.exports = router;
