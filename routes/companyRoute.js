const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');

router.get('/', companyController.index);
router.get(REGISTER_URL, companyController.showRegister);
router.post(REGISTER_URL, companyController.register);
router.get(LOGIN_URL, companyController.showLogin);
router.post(LOGIN_URL, companyController.login);
router.get('/logout', companyController.logout);

module.exports = router;