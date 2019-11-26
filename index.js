const config = require('./config/config');
const app = require('express')();

require('./config/express')(app);
require('./config/routes')(app);

app.use(function (err, req, res, next) {
  console.error(err);
});

app.listen(config.port, console.log('\x1b[32m%s\x1b[0m', `### Listening on port ${config.port}! ###`));