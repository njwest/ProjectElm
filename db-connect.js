var Sequelize = require('sequelize');

var connection = new Sequelize('elm_db', 'root', '');

var user = connection.define('users',{
  username: Sequelize.TEXT,
  password: Sequelize.TEXT,
  habit: Sequelize.TEXT,
  achievements: Sequelize.TEXT,
});

var userHabits = connection.define('user_habits',{
  user: Sequelize.TEXT,
  habit: Sequelize.TEXT
})

connection.sync().then(function () {
  user.findAll().then(function(users){
    console.log(users.length);
  });
});
