'use strict';

var passport = require('passport');

var companyModel = require('../model/companyModel.js');
var constants = require('../config/constants');

const LOGIN_URL = "/login";
const REGISTER_URL = "/register";
const FORM_VIEW = "/form";

var companyController = {
    index: (request, response) => {
        response.render('index');
    },

    showRegister: (request, response) => {
        if(request.isAuthenticated()) {
            response.redirect('/');
        } else {
            response.render(FORM_VIEW, {
                message: request.flash('error-register'),
                type: "alert-danger",
                operation: "Register",
                action: REGISTER_URL
            });
        }
    },

    register: passport.authenticate('register', {
        successRedirect: '/',
        failureRedirect: REGISTER_URL,
        operation: "Register",
        action: REGISTER_URL,
        failureFlash: true,
    }),

    showLogin: (request, response) => {
        if(request.isAuthenticated()) {
            response.redirect('/');
        } else {
            response.render(FORM_VIEW, {
                message: request.flash('error-login'),
                type: "alert-danger",
                operation: "Login",
                action: LOGIN_URL
            });
        }
    },

    login: passport.authenticate('login', {
        successRedirect: '/',
        failureRedirect: LOGIN_URL,
        failureFlash: true,
    }),

    logout: (request, response) => {
        request.logout();
        response.redirect('/');
    }
};

module.exports = companyController;
