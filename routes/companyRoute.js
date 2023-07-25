'use strict';

var express = require('express');
var router = express.Router();
var database = require('../config/dbConfig.js');

var CompanyController = require('../controller/companyController.js');

router.get('/', CompanyController.index);

router.get('/register', CompanyController.showRegister);

router.post('/register', CompanyController.register);

router.get('/login', CompanyController.showLogin);

router.post('/login', CompanyController.login);

router.get('/logout', CompanyController.logout);

module.exports = router;
