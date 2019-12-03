const bcrypt = require('bcrypt');
'use strict';
module.exports = (sequelize, type) => {
    const model = sequelize.define('users', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: type.STRING,
            unique: true
        },
        password: {
            type: type.STRING
        },
        firstName: {
            type: type.STRING
        },
        lastName: {
            type: type.STRING
        },
        email: {
            type: type.STRING
        },
        phone: {
            type: type.STRING
        },
        image: {
            type: type.TEXT('long')
        },
        role: {
            type: type.STRING
        },
        ban: {
            type: type.INTEGER
        }
    }, {
        timestamps: true
    });
    model.prototype.matchPassword = function (password) {
        return bcrypt.compare(password, this.password);
    }
    return model;
};