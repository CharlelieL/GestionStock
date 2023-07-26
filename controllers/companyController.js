'use strict';

const passport = require('passport');
const companyModel = require('../models/companyModel.js');
const LOGIN_URL = "/login";
const REGISTER_URL = "/register";
const FORM_VIEW = "/form";

class CompanyController {
    index(request, response) {
        response.render('index');
    }

    showRegister(request, response) {
        if (request.isAuthenticated()) {
            response.redirect('/');
        } else {
            response.render(FORM_VIEW, {
                message: request.flash('error-register'),
                type: "alert-danger",
                operation: "Register",
                action: REGISTER_URL
            });
        }
    }

    register(request, response, next) {
        passport.authenticate('register', {
            successRedirect: '/',
            failureRedirect: REGISTER_URL,
            failureFlash: true,
            operation: "Register",
            action: REGISTER_URL,
        })(request, response, next);
    }

    showLogin(request, response) {
        if (request.isAuthenticated()) {
            response.redirect('/');
        } else {
            response.render(FORM_VIEW, {
                message: request.flash('error-login'),
                type: "alert-danger",
                operation: "Login",
                action: LOGIN_URL
            });
        }
    }

    login(request, response, next) {
        passport.authenticate('login', {
            successRedirect: '/',
            failureRedirect: LOGIN_URL,
            failureFlash: true,
        })(request, response, next);
    }

    logout(request, response) {
        request.logout();
        response.redirect('/');
    }
}

module.exports = new CompanyController();