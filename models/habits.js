'use strict';
module.exports = function(sequelize, DataTypes) {
  var Habits = sequelize.define('Habits', {
    habit: DataTypes.STRING,
    achievement: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Habits;
};
