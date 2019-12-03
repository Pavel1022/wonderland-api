const jwt = require('./jwt');
const appConfig = require('../app-config');
const User = require('../models/User');

function auth(redirectUnauthenticated = true) {
  return function (req, res, next) {
    const token = req.cookies[appConfig.authCookieName] || '';
    console.log("++++++++++++++++++++++++++");
    console.log(req.cookies);
    console.log("++++++++++++++++++++++++++");
    Promise.all([
      jwt.verifyToken(token)
    ]).then(([data]) => {
      User.findByPk(data.id).then(user => {
        req.user = user;
        next();
    });
    }).catch(err => {
      if (!redirectUnauthenticated) { next(); return; }
      next(err);
    });
  };
}

module.exports = auth