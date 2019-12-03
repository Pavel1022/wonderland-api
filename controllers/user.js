const { User, Post, Comment } = require('../config/sequelize');
const bcrypt = require('bcrypt');
const utils = require('../utils/index');
const appConfig = require('../app-config');

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
        },
        logout: (req, res, next) => {
            res.clearCookie(appConfig.authCookieName);
        }
    },
    post: {
        register: (req, res, next) => {
            const saltRounds = 10;
            let { username, password, confirmPassword, firstName, lastName, email, phone, image = 'https://icon-library.net/images/no-profile-picture-icon-female/no-profile-picture-icon-female-0.jpg' } = req.body
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
                        image,
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
        },
        login: (req, res, next) => {
            const { username, password } = req.body;
            console.log(username);
            console.log(password);

            User.findOne({ where: { username } })
                .then(user => Promise.all([user, user.matchPassword(password)]))
                .then(([user, match]) => {
                    if (!match) {
                        res.send('Wrong password or username!');
                        return;
                    }
                    console.log(user.id);

                    const token = utils.jwt.createToken({ id: user.id });
                    res.cookie(appConfig.authCookieName, token).send(token);
                }).catch(err => {
                    res.send('Wrong password or username!');
                });
        },
        currentUser: (req, res, next) => {
            const { userId } = req.body;
            User.findByPk(userId).then(user => {
                res.json(user);
            })
        },
        editUser: (req, res, next) => {
            const { firstName, lastName, email, phone, image } = req.body;
            const userId = req.params.id;
            User.update({ firstName, lastName, email, phone, image }, { where: { id: userId } }).then(() => {
                res.send('SUCCESS');
            })
        },
        changePassword: (req, res, next) => {
            const { id, password, newPassword } = req.body;
            const saltRounds = 10;

            User.findOne({ where: { id } })
                .then(user => Promise.all([user, user.matchPassword(password)]))
                .then(([user, match]) => {
                    
                    if (!match) {
                        res.send('Passwords don\'t match!');
                        return;
                    }

                    bcrypt.genSalt(saltRounds, (err, salt) => {
                        if (err) { res.send(err); return; }
                        bcrypt.hash(newPassword, salt, (err, hash) => {
                            if (err) { res.send(err); return; }
                            User.update({ password: hash }, { where: { id } }).then(() => {
                                res.send('SUCCESS');
                            });
                        });
                    });
                });
        },
    }
};