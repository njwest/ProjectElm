//App depencencies -----------------------------------------/
var express         = require('express');
var bodyParser      = require('body-parser');
var exphbs          = require('express-handlebars');
var methodOverride  = require('method-override');
var app             = express();
var Habits          = require('./models')['Habits'];
var Achievements    = require('./models')['Achievements'];
var Users           = require('./models')['User'];
var UserHabits      = require('./models')['Userhabits'];
require('dotenv').config({silent: true});

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
//serves static pages
// var htmlRoutes = require('./controllers/routes/htmlRoutes')(app);
// var apiRoutes = require('./controllers/routes/apiRoutes')(app);
// var landingPage = require('./controllers/routes/landingRoutes')(app);
// var login = require('./controllers/routes/loginRoutes')(app);


//serves static pages in the public folder
// app.use(express.static('public'));
app.use('/', express.static(__dirname + '/public'));
//Landing Page route
app.get('/', function(req, res) {
    res.render('landing');
});

//Login _________________________________/
app.get('/login', function(req, res) {
    res.render('login');
});

app.post('/login', function(req, res) {
    // connection.query('INSERT INTO plans (plan) VALUES (?)', [req.body.plan], function(err, result) {
    //   if (err) throw err;
    //   res.redirect('/');
    // });
});


//Profile _________________________________/
app.get('/:username/profile', function(req, res){
    res.render('profile');
})

//Registration
app.get('/registration', function(req, res){
    Habits.findAll({}).then(function(results){
        console.log(results[0].habit);
        return res.render('registration', {
            habits: results
        });
    });
})
app.get('/api/registration', function(req, res){
    Habits.findAll({}).then(function(results){
        // console.log(results);
        return res.json(results);
    });
})

app.post('/registration', function(req, res) {
    'user strict';
    // User.create({ username: 'barfooz', email: 'test', password: 'password' }, { fields: [ 'username', 'email', 'password' ] }).then(function(user) {
    //   console.log(user.get({
    //     plain: true
    //   }))
    // })
    var user = req.body;

    User.create({
        email: user.email,
        name: user.name,
        //Julian work your magic here
        password: user.password,
        habit: user.habit,
    }).then(function(insertedUser){
        console.log(insertedUser.dataValues)
    });
});
//Account routes
app.get('/user/:username', function(req, res) {
    res.render('profile');
})

app.post('/user/:username', function(req, res){
    'use strict';
    userHabit.update({
        //update logic here
    })
})

//Database config ---------------------------------------/
global.db = require('./models')

//Port config ---------------------------------------------------/
var PORT = process.env.PORT || 3000;

//Starting the server, syncing our models ------------------------------------/
db.sequelize.sync().then(function() {
    // return Habits.create({
    //     habit: 'Smoking'
    // })
    app.listen(PORT, function(err) {
        if (err) {
            console.error(err);
        } else {
            console.info("==> Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
        }
    });
});
