var homeController = require('../home');

module.exports = function(app) {
    //Landing Page _________________________________/
    app.get('/', homeController.renderLanding);
    //Login _________________________________/
    app.get('/login', homeController.renderLogin);
    app.post('/login',homeController.postLogin);

    //Registration _________________________________/
    app.get('/registration', homeController.renderRegistration);
    app.post('/register', homeController.postUser);

    //button Test____________________________________/
    // app.get('/compare', homeController.compareTime);
    // app.post('/reset', homeController.resetStreak);
    // app.post('/update', homeController.updateStreak);
    // app.get('/progress', homeController.progressBar);

    //Profile _________________________________/
    app.get('/users/:username', homeController.isAuthenticated, homeController.renderProfile);
    app.post('/users/:username', homeController.submitButton);
    app.get('/profile', homeController.renderProfile);
    app.get('/tips', homeController.renderTips)

    //Logout ____________________________________/
    app.get('/logout', homeController.logout);
    app.get('/dashboard', homeController.dashboard)
};
