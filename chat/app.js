var Sequelize = require('sequelize')
  , sequelize = new Sequelize('database_name', 'username', 'password', {
      dialect: "mysql", // or 'sqlite', 'postgres', 'mariadb'
      port:    3306, // or 5432 (for postgres)
    });

sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  }, function (err) { 
    console.log('Unable to connect to the database:', err);
  });

  // sequelize database for chat


var message = sequelize.define('message', {
  chatMessage: Sequelize.STRING
});

sequelize
  .sync({ force: true })
  .then(function(err) {
    console.log('It worked!');
  }, function (err) { 
    console.log('An error occurred while creating the table:', err);
  });