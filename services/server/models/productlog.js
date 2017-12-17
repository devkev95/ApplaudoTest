'use strict';
module.exports = (sequelize, DataTypes) => {
  var ProductLog = sequelize.define('ProductLog', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    previousPrice: {
      type: DataTypes.DECIMAL(5, 2),
      field: "previous_price",
      allowNull: false
    },
    newPrice: {
      type: DataTypes.DECIMAL(5, 2),
      field: "new_price",
      allowNull: false
    },
    changeDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "change_date"
    }
  }, {
    tableName: "PricesLog",
    timestamps: false
  });

  ProductLog.associate = function(models) {
    ProductLog.belongsTo(models.User, {foreignKey: "user_id", as: "user"});
    ProductLog.belongsTo(models.Product, {foreignKey: "product_id", as: "product"});
  };
  return ProductLog;
};