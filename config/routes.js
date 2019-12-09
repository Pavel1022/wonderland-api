const userController = require('../controllers/user');
const postController = require('../controllers/post');
const commentController = require('../controllers/comment');
const multer = require('multer');
const crypto = require('crypto');
const storageUser = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/user/');
    },
    filename: function(req, file, cb) {
        cb(null, crypto.createHash('md5').update(file.originalname).digest("hex") + '.jpg');
    }
});

const storagePost = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/post/');
    },
    filename: function(req, file, cb) {
        cb(null, crypto.createHash('md5').update(file.originalname).digest("hex") + '.jpg');
    }
});

const uploadUser = multer({storage: storageUser});
const uploadPost = multer({storage: storageUser});
module.exports = (app) => {
    // ******************** USER ********************
    // USER GETS
    app.get('/api/users', userController.get.user);
    app.get('/api/user/:id', userController.get.user);

    // USER POSTS
    app.post('/api/register/user', userController.post.register);
    app.post('/api/login/user', userController.post.login);
    app.post('/api/current/user', userController.post.currentUser);
    app.post('/api/edit/user/:id',uploadUser.single('image'), userController.post.editUser);
    app.post('/api/user/password/change', userController.post.changePassword);
    app.post('/api/user/ban', userController.post.banUser);
    app.post('/api/user/unban', userController.post.unBanUser);

    // ******************** POST ********************
    // POST GET
    app.get('/api/post/all', postController.get.getAll);
    // POST POST
    app.post('/api/post/create', postController.post.createPost);
    app.post('/api/post/mypost', postController.post.myPosts);
    app.post('/api/current/post', postController.post.currentPost);

    // ******************** COMMENT ********************
    //COMMENT GET
    app.get('/api/all/comments', commentController.get.allComments);
    //COMMENT POST
    app.post('/api/comment/create', commentController.post.createComment);
    app.post('/api/comment/all', commentController.post.getPostComments);
};