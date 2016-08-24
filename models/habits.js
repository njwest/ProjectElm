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
                Habits.belongsToMany(models.User, {
<<<<<<< HEAD
                    through: 'Userhabits'
=======
                    as: 'Users',
                    through: 'Userhabits',
                    foreignKey: 'HabitId'
>>>>>>> 1e215df6583b2021ed0fce72bc01d8886f200197
                });
            }
        }
    });
    return Habits;
};
