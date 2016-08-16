'use strict';

var bcrypt = require('bcrypt-nodejs');


module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    habit: {
        type: DataTypes.STRING,
        // allowNull: false
    },
    streak: {
        type: DataTypes.INTEGER
    }
  }, {
    instanceMethods: {
      generateHash: function(password){
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
      },
      validPassword: function(password){
        return bcrypt.compareSync(password, this.password);
      },
    },
    classMethods: {
      associate: function(models) {

        // associations can be defined here
        User.belongsToMany(models.Habits, {through: 'userhabits'});
      }
    }
  });
  return User;
};
