const express = require("express");
// const path = require("path");

const router = express.Router();
const postController = require("../Controllers/Post");

router.get("/create-post", postController.renderCreatePags);

router.post("/", postController.createPost);

router.post("/post/:id", postController.deletePost);

//edit-post //
router.post("/post-edit", postController.upadtePost);

// restrict oldpost //
router.get("/post-edit/:id", postController.getOldPost);

module.exports = { adminPost: router };
