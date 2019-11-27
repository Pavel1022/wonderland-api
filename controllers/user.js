const { User, Post, Comment } = require('../config/sequelize')

module.exports = {
    get: {
        user: (req, res, next) => {
            const id = req.params.id;
            if (id) {
                User.findByPk(id).then(user => {
                    if (user) {
                        return res.json(user);
                    }
                    return res.send('Wrong user!');
                });
            }
            User.findAll().then(users => {
                if (users.length > 0) {
                    return res.json(users);
                }
                return res.send('No users!');
            });
        }
    },
    post: {
        user: (req, res, next) => {
            const data = req.body
            console.log(data);
            
            res.json(data)
        }
    }
};