'use strict';
module.exports = (sequelize, DataTypes) => {
  var Product = sequelize.define('Product', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement:true
    },
    name: { 
      type: DataTypes.STRING(50),
      allowNull: false
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price: { 
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false
    }
  }, {
    tableName: "Products",
    timestamps: false
  });

  Product.associate = function(models) {
    Product.hasMany(models.ProductLog, {foreignKey: "product_id", as: "logs", onDelete: "CASCADE"}),
    Product.belongsToMany(models.User, {as : "userWhoLikedThis", through: "Likes", foreignKey: "product_id",
    timestamps: false, onDelete: "CASCADE"});
  }
  return Product;
};