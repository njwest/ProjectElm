var homeController = require('../home');
module.exports = function(app) {
    //Landing Page _________________________________/
    app.get('/', homeController.renderLanding);
    //Login _________________________________/
    app.get('/login', homeController.renderLogin);
    app.post('/login', homeController.postLogin);

    //Registration _________________________________/
    app.get('/registration', homeController.renderRegistration);
    app.post('/new_user/profile', homeController.postUser);

    //Profile _________________________________/
    app.get('/:username/profile', homeController.renderProfile);
    app.post('/:username/profile', homeController.submitButton)
};
