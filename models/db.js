
// Import all the model files
const Company = require('./companyModel.js');
const Good = require('./goodModel.js');
const Type = require('./typeModel.js');
const Department = require('./departmentModel.js');
const Supplier = require('./supplierModel.js');
const Subscription = require('./subscriptionModel.js');
const Address = require('./addressModel.js');

// Define the relationships between models
console.log(Company);
console.log(Department);

// Company-Department (Many-to-Many) Relationship
Company.belongsToMany(Department, { through: 'CompanyDepartment' });
Department.belongsToMany(Company, { through: 'CompanyDepartment' });

// Company-Address (Many-to-Many) Relationship
Company.belongsToMany(Address, { through: 'CompanyAddress' });
Address.belongsToMany(Company, { through: 'CompanyAddress' });

// Good-Type (Many-to-One) Relationship
Good.belongsTo(Type, { foreignKey: 'typeId' });

// Good-Supplier (Many-to-One) Relationship
Good.belongsTo(Supplier, { foreignKey: 'supplierId' });

// Department-Good (One-to-Many) Relationship
Department.hasMany(Good, { foreignKey: 'departmentId' });

// Subscription-Company (Many-to-Many) Relationship
Subscription.belongsToMany(Company, { through: 'SubscriptionCompany' });
Company.belongsToMany(Subscription, { through: 'SubscriptionCompany' });

// Address-Supplier (Many-to-Many) Relationship
Address.belongsToMany(Supplier, { through: 'AddressSupplier' });
Supplier.belongsToMany(Address, { through: 'AddressSupplier' });
// Export all the models
module.exports = {
  Company: Company,
  Good: Good,
  Type: Type,
  Department: Department,
  Supplier: Supplier,
  Subscription: Subscription,
  Address: Address,
};