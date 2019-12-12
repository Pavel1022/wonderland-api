const { User, Post, Comment } = require('../config/sequelize');

module.exports = {
    get: {
        allComments: (req, res, next) => {
            Comment.findAll({ include: [User, Post] }).then(comments => {
                res.json(comments);
            });
        },
        deleteComment: (req, res, next) => {
            const id = req.params.id;

            Comment.destroy({ where: { id } }).then(() => {
                res.send('SUCCESS');
            });
        }
    },

    post: {
        createComment: (req, res, next) => {
            const { comment, userId, postId } = req.body;
            const date = new Date();

            Comment.create({ comment, userId, postId, createdAt: date, updatedAt: date }).then(
                res.send('SUCCESS')
            );
        },
        getPostComments: (req, res, next) => {
            const { postId } = req.body;

            Comment.findAll({ where: { postId }, include: [User, Post] }).then(comments => {
                res.json(comments);
            })
        }
    }
}