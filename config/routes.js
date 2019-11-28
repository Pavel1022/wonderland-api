const userController = require('../controllers/user');

module.exports = (app) => {
    app.get('/api/users', userController.get.user);
    app.get('/api/user/:id', userController.get.user);
    app.post('/api/register/user', userController.post.user);
};