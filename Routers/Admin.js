const express = require("express");
// const path = require("path");

const router = express.Router();
const postController = require("../Controllers/Post");

router.get("/create-post", postController.renderCreatePags);

router.post("/", postController.createPost);

router.get("/edit-post/:id", postController.getOldPost);

router.post("/edit", postController.editPost);

router.post("/delete/:id", postController.deletePost);

module.exports = { adminPost: router };
