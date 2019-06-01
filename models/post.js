
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define("Post", {
    title: DataTypes.STRING,
    content: DataTypes.TEXT
  })


  Post.associate = models => {
    Post.belongsTo(models.User, {
      as: "User",
      foreignKey: "user_id"
    })
  }
  return Post;
}