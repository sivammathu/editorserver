const express = require("express");

const Chat = express.Router();

Chat.get("", (req, res, err) => {
  res.json({ msg: "Chat box is running" });
});

module.exports = Chat;
