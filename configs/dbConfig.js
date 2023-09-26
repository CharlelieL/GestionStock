const { Sequelize } = require('sequelize');
const fs = require('fs');

console.log("DB User:", process.env.DATABASE_USER);
console.log("DB Password:", process.env.DATABASE_PASSWORD);
console.log("DB Host:", process.env.DATABASE_HOST);
console.log("DB Port:", process.env.DATABASE_PORT);
console.log("DB Name:", process.env.DATABASE_NAME);

const sequelize = new Sequelize({
    username: `${process.env.DATABASE_USER}@${process.env.DATABASE_HOST}`,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialect: 'mysql',
    logging: console.log,
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false,
            ca: fs.readFileSync(__dirname + '/../ssl/DigiCertGlobalRootCA.crt.pem')
        }
    }
});

module.exports = sequelize;