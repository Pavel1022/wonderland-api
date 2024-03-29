const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        port: process.env.PORT || 3100
    },
    production: {}
};

module.exports = config[env];