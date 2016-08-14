'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    name: DataTypes.TEXT,
    password: DataTypes.TEXT,
    goal: DataTypes.TEXT,
    achievements: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return User;
};

// 'use strict';
module.exports = function(sequelize, DataTypes) {
  var UserHabit = sequelize.define('User_Habits', {
    streak: DataTypes.INT,
    days: DataTypes.INT,
    achievements: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models){
      }
    }
  });
  return UserHabit;
};

  var Habits = sequelize.define('Habits', {
    habit: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models){
      }
    }
  });

  var achievements = sequelize.define('Habits', {
    achievement: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models){
      }
    }
  });
