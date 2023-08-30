const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('gestionprojet', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
    logging: console.log,
});

module.exports = sequelize;