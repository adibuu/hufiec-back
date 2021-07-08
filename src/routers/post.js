const express = require("express");
const { getPosts, getPost } = require("../controllers/post");
const Post = require("../models/post");
const paginatedResults = require("../middleware/paginatedResults");

const router = express.Router();

router.get("/posts", paginatedResults(Post), getPosts);

router.get("/posts/:id", getPost);

module.exports = router;
