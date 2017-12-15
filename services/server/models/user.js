'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull:false
    },
    email: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull:false
    },
    password: {
      type: DataTypes.CHAR(60),
      allowNull:false
    },
    firstName: {
      type: DataTypes.STRING(50),
      allowNull:false,
      field: "first_name"
    },
    lastName: {
      type: DataTypes.STRING(50),
      allowNull:false,
      field: "last_name"
    },
    role: {
      type: DataTypes.INTEGER,
      allowNull:false
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Users.hasMany(models.Purchase, {foreignKey: "user_id", as: "purchases"});
        Users.hasMany(models.Like, {foreignKey: "user_id", as: "likedProducts"});
      }
    },
    tableName: "Users",
    timestamp: false
  });
  return User;
};