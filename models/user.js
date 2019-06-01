
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING,
    about: DataTypes.TEXT
  }, {
    timestamps: false,
  })
  User.associate = models => {
    User.hasMany(models.Post, {
      as: "Posts",
      foreignKey: "user_id"
    })
  }
  return User;
}