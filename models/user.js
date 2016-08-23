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
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // habits: {
        //         type: DataTypes.STRING,
        //         allowNull: false
        // },
        HabitId: {
            type: DataTypes.INTEGER,
            // allowNull: false
        },
        streak: {
            type: DataTypes.INTEGER
        }
    }, {
        instanceMethods: {
            generateHash: function(password) {
                return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
            },
            validPassword: function(password) {
                return bcrypt.compareSync(password, this.password);
            },
        },
        classMethods: {
            associate: function(models) {
                // associations can be defined here
                User.belongsToMany(models.Habits, {
                    as: 'Habits',
                    through: 'Userhabits',
                    foreignKey: 'UserId'

                });
            }
        }
    });
    return User;
};
