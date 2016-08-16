var homeController = require('../home');
var Habits          = require('../../models')['Habits'];
var Achievements    = require('../../models')['Achievements'];
var Users           = require('../../models')['User'];
var UserHabits      = require('../../models')['Userhabits'];
module.exports = function(app) {
    //Landing Page _________________________________/
    app.get('/', homeController.renderLanding);
    //Login _________________________________/
    app.get('/login', homeController.renderLogin);
    app.post('/login', homeController.postLogin);

    //Profile _________________________________/
    app.get('/:username/profile', homeController.renderProfile);
    app.post('/:username/profile', homeController.submitButton)

    //Registration _________________________________/
    app.get('/registration', homeController.renderRegistration);
    app.post('/registration', homeController.postUser);
};
