const { DataTypes } = require('sequelize');
const sequelize = require('../configs/dbConfig.js'); // Path to your Sequelize configuration file

const Good = sequelize.define('Good', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  label: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  priceHT: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  Attribute1: {
    type: DataTypes.STRING, // Replace "STRING" with the appropriate data type for Attribute1
  },
});

Good.sync({ force: false })
  .then(() => {
    console.log('Good table created (if not existed)');
  })
  .catch((err) => console.error('Error creating Good table:', err));

  module.exports = Good;

/*    TEST
const { DataTypes } = require('sequelize');
const sequelize = require('../configs/dbConfig'); // Path to your Sequelize configuration file

const Good = sequelize.define('Good', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  label: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1, // Set a default value for quantity if not provided
  },
  priceHT: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

// This will create the "Good" table in the database if it doesn't exist
Good.sync({ force: false })
  .then(() => {
    console.log('Good table created (if not existed)');
  })
  .catch((err) => console.error('Error creating Good table:', err));

module.exports = Good;
*/
