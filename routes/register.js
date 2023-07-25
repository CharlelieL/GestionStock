const express = require('express');
const passport = require('passport');
const router = express.Router();

// GET route to render the registration form
router.get('/register', (req, res) => {
  res.render('../views/register.ejs'); // Assuming you have an EJS template for the registration form
});

// POST route to handle registration form submission
router.post('/register', passport.authenticate('register', {
  successRedirect: '/dashboard', // Replace with your desired success redirect URL
  failureRedirect: '/register', // Replace with your desired failure redirect URL
  failureFlash: true, // Enable flash messages for failed registration attempts
}));

module.exports = router;