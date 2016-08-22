//App depencencies -----------------------------------------/
var express         = require('express');
var bodyParser      = require('body-parser');
var exphbs          = require('express-handlebars');
var methodOverride  = require('method-override');
var LocalStrategy   = require('passport-local');
var logger          = require('morgan');
var passport        = require('passport');
var session         = require('express-session');
var FileStore       = require('session-file-store')(session);
var app             = express();
require('dotenv').config({silent: true});

//App middleware -------------------------------------------/
app.use(logger('combined'));
// app.use(require('morgan')('dev'));
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'speakeasyconservatory',
  cookie: {
    maxAge: 60000 * 60 * 24 * 14
  }
}));

app.use(bodyParser.json());

//Handlebars config ---------------------------------------/
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//Routes_____________________________________________________/
//serves static pages
app.use('/', express.static(__dirname + '/public'));

//All Routes_____________________________________________________
var htmlRoutes = require('./controllers/routes/htmlRoutes')(app);
var apiRoutes = require('./controllers/routes/apiRoutes')(app);

//Database config ---------------------------------------/
global.db = require('./models');

//Port config ---------------------------------------------------/
var PORT = process.env.PORT || 3000;

//Starting the server, syncing our models ------------------------------------/
db.sequelize.sync({force:false}).then(function() {
    // return Habits.create({
    //     habit: 'Smoking'
    // })
    // return models.Habits.bulkCreate(
    //   [
    //     {habit: "Smoking"},
    //     {habit: "Nail-biting"},
    //     {habit: "Drinking"},
    //     {habit: "Being late"},
    //     {habit: "Fapping"},
    //     {habit: "Other"}
    //   ]
    // )
    app.listen(PORT, function(err) {
        if (err) {
            console.error(err);
        } else {
            console.info("==> Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
        }
    });
});
