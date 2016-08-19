'use strict';
module.exports = function(sequelize, DataTypes) {
  var userhabits = sequelize.define('Userhabits', {
    streak: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return userhabits;
};
