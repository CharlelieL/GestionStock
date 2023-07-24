const { DataTypes } = require('sequelize');
const sequelize = require('../configs/dbConfig.js'); // Path to your Sequelize configuration file

const Company = sequelize.define('Company', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mail: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pwd: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Attribute1: {
    type: DataTypes.STRING, // Replace "STRING" with the appropriate data type for Attribute1
  },
  logo: {
    type: DataTypes.STRING,
  },
});

Company.sync({ force: false })
  .then(() => {
    console.log('Company table created (if not existed)');
  })
  .catch((err) => console.error('Error creating Company table:', err));

module.exports = Company;