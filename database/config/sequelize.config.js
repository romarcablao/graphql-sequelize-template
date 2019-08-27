const Sequelize = require('sequelize');

const sequelize = new Sequelize('nodejs_test_db', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '+08:00',
    dialectOptions: {
        dateStrings: true,
        typeCast: true,
        timezone: "+08:00"
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});
module.exports = sequelize;
