const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('gestionProjet', 'charlelie', '', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
    logging: console.log,
});

module.exports = sequelize;