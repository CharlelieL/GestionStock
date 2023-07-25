const express = require('express');
const passport = require('passport');
const router = express.Router();

// GET route to render the login form
router.get('/login', (req, res, next) => {
  console.log('GET /login route accessed');
  res.render('loginView', { action: '/login', operation: 'Login' }); // Assuming you have an EJS template for the login form
});

// POST route to handle login form submission
router.post('/login', (req, res, next) => {
    console.log('POST /login route accessed');
    passport.authenticate('login', (err, user, info) => {
        if (err) {
            console.error('Error in passport.authenticate:', err);
            return next(err);
        }
        if (!user) {
            console.log('Authentication failed:', info.message);
            return res.redirect('/error');
        }
        req.logIn(user, (err) => {
            if (err) {
                console.error('Error logging in:', err);
                return next(err);
            }
            return res.redirect('/dashboard');
        });
    })(req, res, next);
});

module.exports = router;