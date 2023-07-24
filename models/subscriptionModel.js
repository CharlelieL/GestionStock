const { DataTypes } = require('sequelize');
const sequelize = require('../configs/dbConfig.js'); // Path to your Sequelize configuration file

const Subscription = sequelize.define('Subscription', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});

Subscription.sync({ force: false })
  .then(() => {
    console.log('Subscription table created (if not existed)');
  })
  .catch((err) => console.error('Error creating Subscription table:', err));

  module.exports = Subscription;