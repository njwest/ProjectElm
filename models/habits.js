'use strict';


module.exports = function(sequelize, DataTypes) {
  var Habits = sequelize.define('Habits', {
    habit: {
        type: DataTypes.STRING,
        unique: true
    },
    achievement: {
        type: DataTypes.STRING,
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Habits.belongsToMany(models.User, {through: 'userhabits'});
      }
    }
  });
  return Habits;
};
