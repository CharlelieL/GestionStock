const { Sequelize } = require('sequelize');

const dbservice = process.env.DATABASE_HOST;
const dbport = process.env.DATABASE_PORT;
const dbname = process.env.DATABASE_NAME;
const dbuser = process.env.DATABASE_USER;
const dbPassword = process.env.DATABASE_PASSWORD;

const sequelize = new Sequelize(dbname, dbuser, dbPassword, {
    host: dbservice,
    dialect: 'mysql',
    port: dbport,
    logging: console.log,
});

module.exports = sequelize;