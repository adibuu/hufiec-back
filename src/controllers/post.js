const Post = require("../models/post");
const createError = require("../utils/createError");

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
    return res.status(200).send(post);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.getPostsToCheck = async (req, res, next) => {
  try {
    const posts = await Post.find({ show: false })
      .populate("author", "editingPermissions role email")
      .exec();
    if (!posts) {
      createError("Could not find posts for approval", 404);
    }
    return res.status(200).send(posts);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.postApprovePosts = async (req, res, next) => {
  try {
    const postsToApprove = req.body.postsToApprove;
    for (const p of postsToApprove) {
      const post = await Post.findById(p);
      post.show = true;
      await post.save();
    }
    res.status(200).send({ message: "Posts successfully approved" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
