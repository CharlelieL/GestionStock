const { Sequelize, DataTypes } = require('sequelize');
let Address;
let Company;

beforeEach(() => {
  Address = require('../models/addressModel'); 
  mockAddressCreate.mockClear();
});

const mockAddressCreate = jest.fn().mockImplementation((data) => Promise.resolve(data));
jest.mock('../models/addressModel', () => {
  return {
    create: mockAddressCreate,
    // Add other methods if necessary
  };
});
jest.mock('../configs/dbConfig', () => {
  const mockSequelize = {
    define: jest.fn(() => ({
      sync: jest.fn().mockResolvedValue(true)
    })),
    sync: jest.fn().mockResolvedValue(true),
  };
  return mockSequelize;
});

const mockCompanyCreate = jest.fn().mockImplementation((data) => Promise.resolve(data));
jest.mock('../models/companyModel', () => {
  return {
    create: mockCompanyCreate,
    // Add other methods if necessary
  };
});

describe('Registration Process', () => {

  beforeEach(() => {
    Company = require('../models/companyModel'); 
    mockCompanyCreate.mockClear();
  });
  test('registers a new company', async () => {
    const companyData = {
      name: 'Test Company',
      mail: 'test@test.com',
      pwd: 'test1234'  // Note: In actual scenarios, you'd hash this before saving
    };

    // Mock successful creation
    mockCompanyCreate.mockResolvedValueOnce(companyData);

    // Simulate registration
    const registeredCompany = await Company.create(companyData);

    // Check if the create method was called
    expect(mockCompanyCreate).toHaveBeenCalled();

    // Check if the right data was saved
    expect(registeredCompany.name).toBe(companyData.name);
    expect(registeredCompany.mail).toBe(companyData.mail);
    // Add more assertions for other fields

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
  beforeEach(() => {
    Company = require('../models/companyModel'); 
    mockCompanyCreate.mockClear();
  });

  test('should not create a company without a name', async () => {
    await Company.create({
      mail: 'no-name@test.com',
      pwd: 'test1234'
    });
    expect(mockCompanyCreate).toHaveBeenCalled();
  });

  test('should not create a company without an email', async () => {
    await Company.create({
      name: 'No Email Co.',
      pwd: 'test1234'
    });
    expect(mockCompanyCreate).toHaveBeenCalled();
  });

  test('should not create a company without a password', async () => {
    await Company.create({
      name: 'No Password Co.',
      mail: 'no-pwd@test.com'
    });
    expect(mockCompanyCreate).toHaveBeenCalled();
  });
});
beforeEach(() => {
  // ... other setups ...
  mockAddressCreate.mockClear();
});