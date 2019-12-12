const { Post, User, Comment } = require('../config/sequelize');
const fs = require('fs');

module.exports = {
    get: {
        getAll: (req, res, next) => {
            Post.findAll({ include: [User] }).then(posts => {
                res.json(posts);
            });
        },
        deletePost: (req, res, next) => {
            const id = req.params.id;

            Post.findByPk(id).then(post => {
                fs.unlinkSync(__basedir + '/public/post/' + post.image + '.jpg');
                Comment.destroy({ where: { postId: post.id } }).then(() => {
                    Post.destroy({ where: { id } }).then(() => {
                        res.send('SUCCESS');
                    })
                });
            });
        }
    },
    post: {
        createPost: (req, res, next) => {
            const { title, description, userId } = req.body;
            const date = new Date();
            let image;
            if (req.file) {
                image = req.file.filename.replace('.jpg', '');
            }
            if (req.body.image) {
                image = req.body.image;
            }

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
        editPost: (req, res, next) => {
            const { title, description } = req.body;
            const id = req.params.id;

            let image;
            if (req.file) {
                image = req.file.filename.replace('.jpg', '');

                Post.findByPk(id).then(post => {
                    fs.unlinkSync(__basedir + '/public/post/' + post.image + '.jpg');
                });
            }
            if (req.body.image) {
                image = req.body.image;
            }

            console.log(req.body);
            

            Post.update({ title, description, image }, { where: { id } }).then(() => {
                res.send('SUCCESS');
            });
        }
    }
}