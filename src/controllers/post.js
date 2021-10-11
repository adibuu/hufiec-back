const Post = require("../models/post");
const createError = require("../utils/createError");
const readingTime = require("reading-time");

exports.getPosts = async (req, res, next) => {
  try {
    return res.status(200).send(res.paginatedResults);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.getPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      createError("Could not find post", 404);
    }

    const readingStats = readingTime(post.content);

    const postToSend = {
      ...post._doc,
      readingTime: Math.ceil(readingStats.minutes),
    };

    return res.status(200).send(postToSend);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
