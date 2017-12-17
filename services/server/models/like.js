'use strict';
module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    }
  }, {
    tableName: "Likes",
    timestamps: false
  });

  Like.associate = function(models) {
    // Associations go here
    Like.belongsTo(models.Product, { foreignKey: "product_id"});
    Like.belongsTo(models.User, { foreignKey: "user_id"});
  }
  return Like;
};