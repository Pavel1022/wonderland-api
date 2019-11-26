const userController = require('../controllers/user');

module.exports = (app) => {
    app.get('/api/users', userController.get.home);
};