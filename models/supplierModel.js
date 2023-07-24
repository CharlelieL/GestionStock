const { DataTypes } = require('sequelize');
const sequelize = require('../configs/dbConfig.js'); // Path to your Sequelize configuration file

const Supplier = sequelize.define('Supplier', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  siret: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mail: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Supplier.sync({ force: false })
  .then(() => {
    console.log('Supplier table created (if not existed)');
  })
  .catch((err) => console.error('Error creating Supplier table:', err));

module.exports = Supplier;