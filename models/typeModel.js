const { DataTypes } = require('sequelize');
const sequelize = require('../configs/dbConfig.js'); // Path to your Sequelize configuration file

const Type = sequelize.define('Type', {
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

// Self-referential relationship: Type (Parent) - Type (Sub-type)
Type.hasMany(Type, { foreignKey: 'parentId', as: 'subTypes' });

Type.sync({ force: false })
  .then(() => {
    console.log('Type table created (if not existed)');
  })
  .catch((err) => console.error('Error creating Type table:', err));

module.exports = Type;
/*
const { DataTypes } = require('sequelize');
const sequelize = require('./config'); // Path to your Sequelize configuration file

const Type = sequelize.define('Type', {
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

Type.sync({ force: false })
  .then(() => {
    console.log('Type table created (if not existed)');
  })
  .catch((err) => console.error('Error creating Type table:', err));

module.exports = Type;
*/