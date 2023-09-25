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
        console.log("etape franchi")
        // passport.authenticate('logout', (err, user, info) => {
        //     console.log("etape franchi")
        //     if (err) {
        //         console.error(err);
        //         return res.status(500).send('Erreur lors de la déconnexion');
        //     }
        request.logout(function (err) {
            if (err) {
              console.error(err);
              return response.status(500).send('Erreur lors de la déconnexion');
            }
            response.redirect('/login'); // Redirigez l'utilisateur vers la page de connexion après la déconnexion
          });
}
}

module.exports = new CompanyController();