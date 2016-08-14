'use strict';
module.exports = function(sequelize, DataTypes) {
  var Achievements = sequelize.define('Achievements', {
    achievement: DataTypes.STRING,
    streak: DataTypes.INT,
    habit: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Achievements;
};