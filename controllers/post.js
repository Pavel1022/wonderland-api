const { Post, User } = require('../config/sequelize');

module.exports = {
    get: {
        getAll: (req, res, next) => {
            Post.findAll({ include: [User] }).then(posts => {
                res.json(posts);
            });
        }
    },
    post: {
        createPost: (req, res, next) => {
            const { title, description, image, userId } = req.body;
            const date = new Date();
            Post.create({ title, description, image, userId, createdAt: date, updatedAt: date }).then(() => {
                res.send('SUCCESS');
            });
        },
        myPosts: (req, res, next) => {
            const userId = req.body.id;

            Post.findAll({ where: { userId } }).then(posts => {
                res.json(posts);
            });
        },
        currentPost: (req, res, next) => {
            const { id } = req.body;

            Post.findByPk(id, { include: [User] }).then(post => {
                res.json(post);
            });
        },
        uploadImage: (req, res, next) => {
            console.log(req.file);
        }
    }
}