const { DataTypes } = require('sequelize');
const sequelize = require('../configs/dbConfig.js'); // Path to your Sequelize configuration file

const Address = sequelize.define('Address', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  street: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  'zip code': {
    type: DataTypes.STRING, // Replace "STRING" with the appropriate data type for zip code
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Address.sync({ force: false })
  .then(() => {
    console.log('Address table created (if not existed)');
  })
  .catch((err) => console.error('Error creating Address table:', err));

module.exports = Address;