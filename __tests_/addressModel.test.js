const { Sequelize, DataTypes } = require('sequelize');
const Address = require('../models/addressModel');
const RealCompany = jest.requireActual('../models/companyModel'); // Import the real Company model
RealCompany.sync = jest.fn(); // Mock the sync function

const mockCreate = jest.fn();

// Mock the Company model
jest.mock('../models/companyModel', () => {
  return {
    create: mockCreate,
    // Add other methods if necessary
  };
});

describe('Registration Process', () => {
  let Company; // declare the Company variable

  beforeEach(() => {
    Company = require('../models/companyModel'); // require the mocked Company model here
    mockCreate.mockClear();
  });

  test('registers a new company', async () => {
    const companyData = {
      name: 'Test Company',
      mail: 'test@test.com',
      pwd: 'test1234'  // Note: In actual scenarios, you'd hash this before saving
    };

    // Mock successful creation
    mockCreate.mockResolvedValueOnce(companyData);

    // Simulate registration (this part will vary based on your registration logic)
    const registeredCompany = await Company.create(companyData);

    // Check if the create method was called
    expect(mockCreate).toHaveBeenCalled();

    // Check if the right data was saved
    expect(registeredCompany.name).toBe(companyData.name);
    expect(registeredCompany.mail).toBe(companyData.mail);
    // Add more assertions for other fields

    // Note: You might also want to test error scenarios, like if the email already exists
  });

  // Add more tests for other scenarios, like failed registration due to validation errors
});


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

describe('Company Model Validity', () => {
  test('should not create a company without a name', async () => {
    expect.assertions(1);

    try {
      await RealCompany.create({
        mail: 'no-name@test.com',
        pwd: 'test1234'
      });
    } catch (error) {
      expect(error.message).toContain('Company.name cannot be null');
    }
  });

  test('should not create a company without an email', async () => {
    expect.assertions(1);

    try {
      await RealCompany.create({
        name: 'No Email Co.',
        pwd: 'test1234'
      });
    } catch (error) {
      expect(error.message).toContain('Company.mail cannot be null');
    }
  });

  test('should not create a company without a password', async () => {
    expect.assertions(1);

    try {
      await RealCompany.create({
        name: 'No Password Co.',
        mail: 'no-pwd@test.com'
      });
    } catch (error) {
      expect(error.message).toContain('Company.pwd cannot be null');
    }
  });
});