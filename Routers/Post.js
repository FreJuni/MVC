const express = require("express");

const router = express.Router();
const postController = require("../Controllers/Post");

router.get("/", postController.renderHomPages);

router.get("/post/:postID", postController.getPost);
``;

router.get("/post", postController.getPosts);

module.exports = router;
