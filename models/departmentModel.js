const { DataTypes } = require('sequelize');
const sequelize = require('../configs/dbConfig.js'); // Path to your Sequelize configuration file

const Department = sequelize.define('Department', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  label: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Department.sync({ force: false })
  .then(() => {
    console.log('Department table created (if not existed)');
  })
  .catch((err) => console.error('Error creating Department table:', err));

module.exports = Department;