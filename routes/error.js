const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/error', (req, res) => {
    console.log('GET /error route accessed');
    res.render('error', { action: '/error', operation: 'Login' }); // Assuming you have an EJS template for the login form
});

module.exports = router;