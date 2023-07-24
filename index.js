const express = require('express');
const app = express();
const PORT = 3000;
const db = require('./models/db.js'); // Path to your central Sequelize file (db.js)


app.get('/', (req, res) => {
    res.send('Bienvenue sur mon serveur Node.js!');
});

app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Quelque chose a mal tourné !');
});

// Function to create a new record for each class and test its functionality
async function testClasses() {
  try {
    // Test Company
    const newCompany = await db.Company.create({
      name: 'Example Company',
      mail: 'example@example.com',
      pwd: 'password123',
    });
    console.log('New company created:', newCompany.toJSON());

    // Test Good
    const newGood = await db.Good.create({
      label: 'Example Good',
      quantity: 10,
      priceHT: 29.99,
    });
    console.log('New good created:', newGood.toJSON());

    // Test Type
    const newType = await db.Type.create({
      label: 'Example Type',
    });
    console.log('New type created:', newType.toJSON());

    // Test Department
    const newDepartment = await db.Department.create({
      label: 'Example Department',
    });
    console.log('New department created:', newDepartment.toJSON());

    // Test Supplier
    const newSupplier = await db.Supplier.create({
      name: 'Example Supplier',
      siret: '123456789',
      mail: 'supplier@example.com',
      phone: '123-456-7890',
    });
    console.log('New supplier created:', newSupplier.toJSON());

    // Test Subscription
    const newSubscription = await db.Subscription.create();
    console.log('New subscription created:', newSubscription.toJSON());

    // Test Address
    const newAddress = await db.Address.create({
      number: '123',
      street: 'Example Street',
      'zip code': '12345',
      city: 'Example City',
      country: 'Example Country',
    });
    console.log('New address created:', newAddress.toJSON());

    // Test Sub-type relationship
    const parentType = await db.Type.create({ label: 'Parent Type' });
    const subType1 = await db.Type.create({ label: 'Sub-type 1', parentId: parentType.id });
    const subType2 = await db.Type.create({ label: 'Sub-type 2', parentId: parentType.id });
    console.log('Parent Type with Sub-types:', parentType.toJSON());
    console.log('Sub-type 1:', subType1.toJSON());
    console.log('Sub-type 2:', subType2.toJSON());
  } catch (error) {
    console.error('Error testing classes:', error);
  }
}

// Call the function to test classes
testClasses();