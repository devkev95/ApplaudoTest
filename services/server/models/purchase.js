'use strict';
module.exports = (sequelize, DataTypes) => {
  var Purchase = sequelize.define('Purchase', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
  }
  }, {
    tableName: "Purchases",
    timestamps: false
  });

  Purchase.associate = function(models){
    Purchase.belongsTo(models.Product, { foreignKey: "product_id", as: "product"});
    Purchase.belongsTo(models.User, { foreignKey: "user_id", as: "user"});
  }
  return Purchase;
};