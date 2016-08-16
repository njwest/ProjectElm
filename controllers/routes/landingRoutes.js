var loginController = require('../login');

module.exports = function(app) {
    app.get('/', loginController.renderHome);
};
