var express = require("express");
var router = express.Router();

router.get("/main", (req, res) => {
  res.send(req.path + " called");
});

router.get("/main/:hashtag", (req, res) => {
  res.send(req.path + " called");
});

router.post("/main", (req, res) => {
  res.send(req.path + " called");
});
