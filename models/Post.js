module.exports = (sequelize, type) => {
    return sequelize.define('posts', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        title: {
            type: type.STRING
        },
        description: {
            type: type.TEXT('long')
        },
        image: {
            type: type.TEXT('long')
        }
    }, {
        timestamps: true
    });
};