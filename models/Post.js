module.exports = (sequelize, type) => {
    return sequelize.define('posts', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        post: {
            type: type.STRING
        }
    }, {
        timestamps: false
    });
}

