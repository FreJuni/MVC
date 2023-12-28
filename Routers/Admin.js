const express = require("express");
// const path = require("path");

const router = express.Router();
const postController = require("../Controllers/Post");

router.get("/create-post", postController.renderCreatePags);

router.post("/", postController.createPost);

module.exports = { adminPost: router };
