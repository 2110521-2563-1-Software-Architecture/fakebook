const express = require("express");
const router = express.Router();

router.get("/", (req, res) => res.sendStatus(200));
router.use("/user", require("./user"));
router.use("/post", require("./post"));
router.use("/auth", require("./auth"));

module.exports = router;
