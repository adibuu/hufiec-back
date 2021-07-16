const express = require("express");
const {
  getPosts,
  getPost,
  getPostsToCheck,
  postApprovePosts,
} = require("../controllers/post");
const Post = require("../models/post");
const paginatedPostsResults = require("../middleware/paginatedPostsResults");

const router = express.Router();

router.get("/posts", paginatedPostsResults(Post), getPosts);

router.get("/posts/:id", getPost);

router.get("/check-posts", getPostsToCheck);

router.post("/approve-posts", postApprovePosts);

module.exports = router;
