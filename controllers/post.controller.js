const { User, Post } = require("../models")
module.exports.getPosts = (req, res) => {
  Post.findAll({
    where: {
      user_id: req.user.id
    }
  }).then(posts => {
    res.status(200).json({
      posts,
      msg: "posts loaded successfully"
    })
  }).catch(err => {
    console.log(err)
    res.status(400).json({
      msg: "error in loading posts"
    })
  })
}