// routes/dashboard.js
const express = require('express');
const goodController = require('../controllers/goodController');
const router = express.Router();


// Dashboard route handler
router.get('/dashboard', (req, res) => {
  // Check if the user is authenticated using Passport's isAuthenticated() method
  if (req.isAuthenticated()) {
    // Render the dashboard view
    goodController.showALL(req,res)
    //res.render('dashboard'); // Assuming you have a file named "dashboard.ejs" in the views folder
  } else {
    // Redirect unauthenticated users to the login page
    res.redirect('/login'); // Change this to match the actual URL for your login page
  }
});

module.exports = router;
