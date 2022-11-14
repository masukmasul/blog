const Post = require("../models/Post");

const postapiAction = {
  updatePost: async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (post) {
      if (req.body.username === post.username) {
        try {
          const updatePosts = await Post.findByIdAndUpdate(
            req.params.id,
            {
              $set: req.body,
            },
            { new: true }
          );

          res.status(200).json({
            posts: updatePosts,
          });
        } catch (e) {
          res.status(400).json({
            message: e.message,
          });
        }
      } else {
        res.status(400).json({
          message: "You can update your post Only  ",
        });
      }
    } else {
      res.status(400).json({
        message: "Post not found  ",
      });
    }
  },
  deletePost: async (req, res) => {
    // const post = await Post.findById(req.params.id.trim());
    // if (!validator.isMongoId(req.params.id)) {
    const posts = await Post.findById(req.params.id);

    try {
      if (posts) {
        const deleted = await posts.deleteOne();
        deleted
          ? res.status(200).json({
              message: "Post deleted succesfully",
              post: deleted,
            })
          : res.status(400).json({
              message: "Post cannot be deleted",
            });
      } else {
        res.status(400).json({
          message: "Post not found to delete",
        });
      }
    } catch (e) {
      res.status(400).json({
        message: e.message,
      });
    }
    // } else {
    //   res.status(400).json({
    //     message: "No post not found to delete",
    //   });
    // }

    // if (post) {
    // if (req.body.username === post.username) {
    //   try {
    //     const deletePosts = await post.delete();
    //     deletePosts.save();
    //     res.status(200).json({
    //       message: "Post deleted succesfully",
    //     });
    //   } catch (e) {
    //     res.status(400).json({
    //       message: e.message,
    //     });
    //   }
    //   // } else {
    //   //   res.status(400).json({
    //   //     message: "You can only delete your own posts",
    //   //   });
    //   // }
    // } else {
    //   res.status(400).json({
    //     message: "No post not found to delete",
    //   });
    // }
  },
  createPost: async (req, res) => {
    try {
      const createPosts = new Post(req.body);
      const success = await createPosts.save();
      success &&
        res.status(201).json({
          post: success,
        });
    } catch (e) {
      res.status(400).json({
        message: e.message,
      });
    }
  },
  getOnePost: async (req, res) => {
    try {
      const posts = await Post.findById(req.params.id);
      if (posts) {
        res.status(200).json({
          posts: posts,
        });
      } else {
        res.status(400).json({
          message: "Post   not found",
        });
      }
    } catch (e) {
      res.status(400).json({
        message: e.message,
      });
    }
  },

  getAllPost: async (req, res) => {
    const userName = req.query.username;
    const cateName = req.query.cate;
    try {
      let posts;
      if (userName) {
        posts = await Post.find({ username: userName });
      } else if (cateName) {
        posts = await Post.find({
          categories: {
            $in: [cateName],
          },
        });
      } else {
        posts = await Post.find();
      }
      if (posts) {
        res.status(200).json({
          posts: posts,
        });
      } else {
        res.status(200).json({
          posts: "No Posts found to show",
        });
      }
    } catch (e) {
      res.status(400).json({
        message: e.message,
      });
    }
  },
};
module.exports = postapiAction;
