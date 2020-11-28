const express = require("express");
const router = express.Router();
const gcsMiddlewares = require("../../middlewares/googleCloudStorage");

const auth = require("../../middlewares/auth");
const { post, share, del } = require("../../controllers/postController");
const multer = require("../../middlewares/multer");

router.post(
  "/new",
  [auth, multer.single("media"), gcsMiddlewares.sendUploadToGCS],
  post
);

router.post("/share/:postId", auth, share);

router.delete("/delete/:id", del);

module.exports = router;
