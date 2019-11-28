module.exports = (sequelize, type) => {
    return sequelize.define('users', {
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
        role: {
            type: type.STRING
        },
        ban: {
            type: type.INTEGER
        }
    }, {
        timestamps: true
    });
};