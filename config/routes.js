const userController = require('../controllers/user');

module.exports = (app) => {
    app.get('/api/users', userController.get.user);
    app.get('/api/users/:id', userController.get.user);
    app.post('/api/users', userController.post.user);
};