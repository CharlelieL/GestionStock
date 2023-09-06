const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('gestionProjet', 'user', 'password', {
    host: 'db',
    dialect: 'mysql',
    port: 3306,
    logging: console.log,
});

module.exports = sequelize;