const Sequelize = require('sequelize');
const UserModel = require('../models/User');
const PostModel = require('../models/Post');

const sequelize = new Sequelize('wonderland-js', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

const User = UserModel(sequelize, Sequelize);
const Post = PostModel(sequelize, Sequelize);

User.hasMany(Post);
Post.belongsTo(User);

sequelize.sync({ force: false })
    .then(() => {
        console.log('\x1b[36m%s\x1b[0m', "*** DATABASE IS READY TO WORK! ***");
    });

module.exports = {
    User,
    Post
}