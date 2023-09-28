const express = require('express');
const session = require('express-session');
const redis = require('redis');
const RedisStore = require('connect-redis').default;

const app = express();
const PORT = 3000 + (process.env.NODE_APP_INSTANCE ? Number(process.env.NODE_APP_INSTANCE) : 0); //Dynamic PORT for each Cluster
const db = require('./models/db.js');
const sequelize = require('./configs/dbConfig.js');
const { Company, Good, Type, Department, Supplier, Subscription, Address } = require('./models/db');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const path = require('path');
const flash = require('connect-flash');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
require('./configs/passport.js')(passport);
require('dotenv').config();
const redisurl= process.env.REDDIS_URL;
console.log(redisurl);
// Initialize and connect Redis Client
const redisClient = redis.createClient({
url: redisurl,
tls: {
  rejectUnauthorized: false
},
socket_keepalive: true,
  socket_initial_delay: 5 * 60 * 1000 // 5 minutes
});

redisClient.on('error', (err) => {
  console.error('Redis error:', err);
});

redisClient.connect().catch(console.error);


// Initialize the Redis store
const redisStore = new RedisStore({
  client: redisClient,
  prefix: 'myapp:'
});

// Using Redis as session store
app.use(session({
  store: redisStore,
  resave: false, // force lightweight session keep alive (touch)
  saveUninitialized: false, // only save session when data exists
  secret: 'shhsecret',
  cookie: {
      secure: false, // set to true if using HTTPS
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
}));


app.get('/', (req, res) => {
  res.redirect('/login');
});

//Passport
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Controllers
const companyController = require('./controllers/companyController');
app.get('/', companyController.index);
app.get('/showRegister', companyController.showRegister);
app.post('/register', companyController.register);
app.get('/showLogin', companyController.showLogin);
app.get('/logout', companyController.logout);

//Routes
app.use('/', require('./routes/login'));
app.use('/', require('./routes/register'));
app.use('/', require('./routes/dashboard'));
app.use('/', require('./routes/error'));
app.use('/', require('./routes/goodForm'))

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
  res.status(500).render('error');
  next();
});


//Syncing process to database
Type.sync()
  .then(() => Supplier.sync())
  .then(() => Address.sync())
  .then(() => Company.sync())
  .then(() => Department.sync())
  .then(() => Good.sync())
  .then(() => Subscription.sync())
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started on http://localhost:${PORT}`);
    });
  })
  .catch(error => {
    console.error("Error syncing models:", error);
  });
  