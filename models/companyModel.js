const { DataTypes } = require('sequelize');
const sequelize = require('../configs/dbConfig.js'); // Path to your Sequelize configuration file
const bcrypt = require('bcrypt');

let Company = sequelize.define('Company', {
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
  logo: {
    type: DataTypes.STRING,
  },
});

if (process.env.NODE_ENV !== 'test') {
  Company.prototype.generateHash = function (pwd) {
    return bcrypt.hashSync(pwd, bcrypt.genSaltSync(8), null);
  };

  Company.prototype.validPassword = function (pwd) {
    return bcrypt.compareSync(pwd, this.pwd);
  };
}

Company.sync({ force: false })
  .then(() => {
    console.log('Company table created (if not existed)');
  })
  .catch((err) => console.error('Error creating Company table:', err));




module.exports = Company;