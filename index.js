const express = require('express');
const app = express();
const PORT = 3000 + (process.env.NODE_APP_INSTANCE ? Number(process.env.NODE_APP_INSTANCE) : 0);
const db = require('./models/db.js'); // Path to your central Sequelize file (db.js)
const sequelize = require('./configs/dbConfig.js');
const { Company, Good, Type, Department, Supplier, Subscription, Address } = require('./models/db');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const path = require('path'); // Add this line to import the path module
const flash = require('connect-flash');
const session = require('express-session');


app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.set('view engine', 'ejs'); // This line is important to set EJS as the view engine
app.set('views', path.join(__dirname, 'views'));
require('./configs/passport.js')(passport);



app.get('/', (req, res) => {
  res.redirect('/login');
});


app.use(session({
  secret: 'shhsecret',
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


const companyController = require('./controllers/companyController');
app.get('/', companyController.index);
app.get('/showRegister', companyController.showRegister);
app.post('/register', companyController.register);
app.get('/showLogin', companyController.showLogin);
app.get('/logout', companyController.logout);


// Routes for login, register, dashboard and error
app.use('/', require('./routes/login'));
console.log("app.use('/', require('./routes/login'));")

app.use('/', require('./routes/register'));
console.log("app.use('/', require('./routes/register'));")

app.use('/', require('./routes/dashboard'));
console.log("app.use('/', require('./routes/dashboard'));")

app.use('/', require('./routes/error'));
console.log("app.use('/', require('./routes/error'));")


//Add a Sync route
// WARNING ! Going there *HARD RESET* DATABASE
// !!! WARNING ! REMOVE BEFORE PRODUCTION !!!
app.get('/sync', function (req, res) {
  sequelize.sync({ force: true }).then(() => {
      console.log('sync done');
      res.status(200).send('sync done');
  }).catch(error => {
      console.log('there was a problem:', error);
      res.status(500).send('there was a problem');
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error'); // Render the error.ejs page for internal server errors (500)
  next();
});

// Function to create a new record for each class and test its functionality
async function testClasses() {
  try {
    // Test Company
    let hashedPassword = db.Company.prototype.generateHash('password123'); //Don't forget to add the Hash during register
    console.log(hashedPassword);
    const newCompany = await db.Company.create({
      name: 'Example Company',
      mail: 'example@example.com',
      pwd: hashedPassword,
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
//testClasses();

// Syncing process
Type.sync()
  .then(() => Supplier.sync())
  .then(() => Address.sync())
  .then(() => Company.sync())
  .then(() => Department.sync())
  .then(() => Good.sync())
  .then(() => Subscription.sync())
  .then(() => {
// Start your server after syncing    
app.listen(PORT, () => {
      console.log(`Server started on http://localhost:${PORT}`);
    });
  })
  .catch(error => {
    console.error("Error syncing models:", error);
  });


