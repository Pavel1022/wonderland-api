const Sequelize = require('sequelize');
const UserModel = require('../models/User');
const PostModel = require('../models/Post');
const CommentModel = require('../models/Comment');
const RoleModel = require('../models/Role');
const UserRoleModel = require('../models/User-Role');

const sequelize = new Sequelize('wonderland-js', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

const User = UserModel(sequelize, Sequelize);
const Post = PostModel(sequelize, Sequelize);
const Comment = CommentModel(sequelize, Sequelize);
const Role = RoleModel(sequelize, Sequelize);
const UserRole = UserRoleModel(sequelize);

User.hasMany(Post);
Post.belongsTo(User);
User.hasMany(Comment);
Comment.belongsTo(User);
Post.hasMany(Comment);
Comment.belongsTo(Post);
User.hasOne(UserRole);
UserRole.belongsTo(User);
Role.hasOne(UserRole);
UserRole.belongsTo(Role);

sequelize.sync({ force: false })
    .then(() => {
        console.log('\x1b[36m%s\x1b[0m', "*** DATABASE IS READY TO WORK! ***");
    });

module.exports = {
    User,
    Post,
    Comment
}