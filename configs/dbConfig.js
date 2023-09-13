 const { Sequelize } = require('sequelize');
 const fs = require('fs');


console.log("DB User:", process.env.DATABASE_USER);
console.log("DB Password:", process.env.DATABASE_PASSWORD);
console.log("DB Host:", process.env.DATABASE_HOST);
console.log("DB Port:", process.env.DATABASE_PORT);
console.log("DB Name:", process.env.DATABASE_NAME);

const encodedUser = encodeURIComponent(process.env.DATABASE_USER);
const encodedPassword = encodeURIComponent(process.env.DATABASE_PASSWORD);

const dbConnectionString = `mysql://${encodedUser}:${encodedPassword}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}?sslca=${__dirname}/../ssl/DigiCertGlobalRootCA.crt.pem`;

console.log(dbConnectionString);

const sequelize = new Sequelize(dbConnectionString, {
    dialect: 'mysql',
    logging: console.log,
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
});

module.exports = sequelize;
