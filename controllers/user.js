const { User, Post } = require('../config/sequelize')

module.exports = {
    get: {
        home: (req, res, next) => {
            Post.findAll({include: [User]}).then(posts => res.json(posts));
        }
    }
};