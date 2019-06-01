const { User, Post } = require("../models");
module.exports.getPosts = (req, res) => {
  // Post.findAll({
  //   attributes: ['id','title','content'],
  //   where: {
  //     user_id: req.user.id
  //   }
  // })
  req.user
    .getPosts({
      attributes: ["id", "title", "content"]
    })
    // User.findOne({
    //   where: {
    //     id: req.user.id
    //   },
    //   include: [{ association: "Posts",}]
    // })
    .then(posts => {
      // const posts = user.Posts;
      res.status(200).json({
        posts,
        msg: "posts loaded successfully"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({
        msg: "error in loading posts"
      });
    });
};

module.exports.addPost = (req, res) => {
  if (!req.body.title) {
    return res.status(400).json({
      msg: "no title"
    });
  }
  if (!req.body.content) {
    return res.status(400).json({
      msg: "no content"
    });
  }
  req.user
    .createPost({
      title: req.body.title,
      content: req.body.content
    })
    // Post.create({
    //   title: req.body.title,
    //   content: req.body.content,
    //   user_id: req.user.id
    // })
    .then(post => {
      res.status(200).json({
        msg: "successfully added"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({
        msg: "error in adding posts"
      });
    });
};

module.exports.editPost = (req, res) => {
  if (!req.body.title) {
    return res.status(400).json({
      msg: "no title"
    });
  }
  if (!req.body.content) {
    return res.status(400).json({
      msg: "no content"
    });
  }

  // Post.update({
  //   title: req.body.title,
  //   content: req.body.content,
  // }, {
  //   where: {
  //     id: req.body.postId
  //   }
  // })
  Post.findOne({
    where: {
      id: req.body.postId
    }
  })
    .then(post => {
      if (!post) {
        return res.status(400).json({
          msg: "no post with this id"
        });
      }
      if (post.user_id != req.user.id) {
        return res.status(400).json({
          msg: "you're not the owner of the post idiot.."
        });
      }
      post
        .update({
          title: req.body.title,
          content: req.body.content
        })
        .then(rows => {
          // if (rows > 0) {

          // }
          res.status(200).json({
            msg: "updated finally"
          });
        });
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({
        msg: "error in adding posts"
      });
    });
};
