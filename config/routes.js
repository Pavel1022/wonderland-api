const userController = require('../controllers/user');
const { auth } = require('../utils');

module.exports = (app) => {
    app.get('/api/users', userController.get.user);
    app.get('/api/user/:id', userController.get.user);
    app.post('/api/register/user', userController.post.register);
    app.post('/api/login/user', userController.post.login);
    app.post('/api/current/user', userController.post.currentUser);
    app.post('/api/edit/user/:id', userController.post.editUser);
    app.post('/api/user/password/change', userController.post.changePassword);
};