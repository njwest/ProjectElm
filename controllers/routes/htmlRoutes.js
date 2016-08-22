var homeController = require('../home');

module.exports = function(app) {
    //Landing Page _________________________________/
    app.get('/', homeController.renderLanding);
    //Login _________________________________/
    app.get('/login', homeController.renderLogin);
    app.post('/login',homeController.postLogin);

    //Registration _________________________________/
    app.get('/registration', homeController.renderRegistration);
    app.post('/new_user/profile', homeController.postUser);

    //Profile _________________________________/
    app.get('/users/:username', homeController.isAuthenticated, homeController.renderProfile);
    app.post('/users/:username', homeController.submitButton);
    app.get('/profile', homeController.renderProfile);
    app.get('/dashboard', homeController.renderDashboard);
};
