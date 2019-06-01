const Sequelize = require("sequelize");

const sequelize = new Sequelize('social_network', 'makmak', '12345678', {
  dialect: "postgres"
});


const models = {
  User: sequelize.import("./user"),
  Post: sequelize.import("./post")
}


Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});


models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;