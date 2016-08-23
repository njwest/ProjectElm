'use strict';
module.exports = function(sequelize, DataTypes) {
  var userhabits = sequelize.define('Userhabits', {
    streak: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return userhabits;
};
