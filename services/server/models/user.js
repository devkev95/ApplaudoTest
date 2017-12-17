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
    tableName: "Users",
    timestamps: false
  });

  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Purchase, {foreignKey: "user_id", as: "purchases"});
    User.belongsToMany(models.Product, {foreignKey: "user_id", as: "likedProducts", through: "Likes", 
    timestamps: false});
  };
  return User;
};