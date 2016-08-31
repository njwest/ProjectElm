var testApiController = require('../testApi');
module.exports = function(app) {
    app.get('/api/user', testApiController.apiUsername);
    app.get('/api/tips', testApiController.renderTips)
};
