//App depencencies -----------------------------------------/
var express = require('express');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var methodOverride = require('method-override');
var app = express();
// require('dotenv').config();

//App middleware -------------------------------------------/
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(express.static(process.cwd() + "/public"));

//Handlebars config ---------------------------------------/
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//Routes_____________________________________________________/
//serves static pages in the public folder
app.use(express.static('public'));
//Landing Page route
app.get('/', function(req, res) {
    res.render('landing');
});
//Login
app.get('/login', function(req, res) {
    res.render('login');
});

app.post('/login', function(req, res) {
    connection.query('INSERT INTO plans (plan) VALUES (?)', [req.body.plan], function(err, result) {
      if (err) throw err;
      res.redirect('/');
    });
});

app.get('/:username/profile', function(req, res){
    res.render('profile', {username: name });
})

//Registration
app.get('/registration', function(req, res){
    res.render('registration');
});

app.post('/registration', function(req, res) {
    'user strict';
    User.create({ username: 'barfooz', email: 'test', password: 'password' }, { fields: [ 'username', 'email', 'password' ] }).then(function(user) {
      console.log(user.get({
        plain: true
      }))
    })
});
//Account routes
app.get('/user/:username', function(req, res) {
    res.render('profile');
})

app.post('/user/:username', function(req, res){
    'use strict';
})

//Database config ---------------------------------------/
global.db = require('./models');

//Port config ---------------------------------------------------/
var PORT = process.env.PORT || 3000;

//Starting the server, syncing our models ------------------------------------/
db.sequelize.sync().then(function() {
    app.listen(PORT, function(err) {
        if (err) {
            console.error(err);
        } else {
            console.info("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
        }
    });
});
