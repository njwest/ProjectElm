var homeController = require('../home');

module.exports = function(app) {
    //Landing Page _________________________________/
    app.get('/', homeController.renderLanding);
    //Login _________________________________/
    app.get('/login', homeController.renderLogin);
    app.post('/something/login',homeController.postLogin);

    //Registration _________________________________/
    app.get('/registration', homeController.renderRegistration);
    app.post('/new_user/profile', homeController.postUser);

    //Profile _________________________________/
    app.get('/users/:username', homeController.renderProfile);
    app.post('/users/:username', homeController.submitButton);

    app.get('/compare', homeController.compareTime);
    app.post('/reset', homeController.resetStreak);
    app.post('/update', homeController.updateStreak);
};