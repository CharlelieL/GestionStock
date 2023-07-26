const { Sequelize, DataTypes } = require('sequelize');
const Address = require('../models/addressModel');

// Mock Sequelize instance and model
jest.mock('sequelize', () => {
  const actualSequelize = jest.requireActual('sequelize');
  const mockSequelize = new actualSequelize('testdb', 'charlelie', '', {
    dialect: 'mysql',
    host: 'localhost', // Change to your MySQL host
    logging: false
  });
  return {
    ...jest.requireActual('sequelize'),
    Sequelize: function () {
      return mockSequelize;
    },
  };
});

// Mock actual synchronization method to prevent actual database operations
Sequelize.prototype.sync = () => Promise.resolve();

describe('Address Model', () => {
  test('creates and saves a new Address instance', async () => {
    const addressData = {
      number: '123',
      street: 'Main Street',
      'zip code': '12345',
      city: 'Example City',
      country: 'Example Country',
    };

    const address = await Address.create(addressData);
    expect(address).toBeTruthy();
    expect(address.number).toBe(addressData.number);
    expect(address.street).toBe(addressData.street);
    expect(address['zip code']).toBe(addressData['zip code']);
    expect(address.city).toBe(addressData.city);
    expect(address.country).toBe(addressData.country);
  });

  // Add more tests for other Address model functionalities (updating, querying, etc.)
});
