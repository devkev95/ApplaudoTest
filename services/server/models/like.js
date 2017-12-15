'use strict';
module.exports = (sequelize, DataTypes) => {
  var Like = sequelize.define('Like', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        Like.belongsTo(models.Product, {foreignKey: "product_id", as: "product"});
      }
    },
    tableName: "Likes",
    timestamps: false
  });
  return Like;
};