const { User, Post, Comment } = require('../config/sequelize');
const bcrypt = require('bcrypt');

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
            const saltRounds = 10;
            let { username, password, confirmPassword, firstName = null, lastName = null, email = null, phone = null } = req.body
            const createdAt = Date.now();
            const updatedAt = Date.now();
            const role = 'USER';
            const ban = 0;
            if (password !== confirmPassword) {
                return res.send('Password don\'t match!')
            }
            bcrypt.genSalt(saltRounds, (err, salt) => {
                if (err) { res.send(err); return; }
                bcrypt.hash(password, salt, (err, hash) => {
                    if (err) { res.send(err); return; }
                    password = hash;
                    const data = {
                        username,
                        password,
                        firstName,
                        lastName,
                        email,
                        phone,
                        role,
                        ban,
                        createdAt,
                        updatedAt
                    };
                    User.create(data)
                        .then(user => res.json(user))
                        .catch(err => {
                            if (err.name === 'SequelizeUniqueConstraintError' && err.parent.code === 'ER_DUP_ENTRY') {
                                return res.send('Username already taken!');
                            }
                        });
                    return;
                });
            });
        }
    }
};