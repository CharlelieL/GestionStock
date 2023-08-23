let LocalStrategy = require('passport-local').Strategy;
let UserModel = require('../models/companyModel.js');
const bcrypt = require('bcrypt');

let localStrategy = {
    usernameField: 'mail',
    passwordField: 'pwd',
    nameField: 'name',
    passReqToCallback: true,
};

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        UserModel.findByPk(id)
            .then((user) => {
                done(null, user);
            })
            .catch((error) => {
                done(error, null);
            });
    });

    passport.use('register',
        new LocalStrategy(localStrategy,
            (request, mail, pwd, done) => {
                console.log('Inside register strategy,');
                console.log('Received credentials:', mail, pwd);

                process.nextTick(() => {
                    console.log('Before calling findOne');
                    
                    UserModel.findOne({ where: { mail: mail } })
                        .then(user => {
                            console.log('Checked for existing user.');
                
                            if (user) {
                                console.log('User already exists with this email.');
                                return done(null, false, request.flash('error-register', 'Mail "' + mail + '" is already in use.'));
                            }
                
                            console.log('Creating new user.');
                            var newUser = new UserModel();
                            newUser.mail = mail;
                            newUser.name = request.body.name;
                            newUser.pwd = newUser.generateHash(pwd);                            
                            newUser.save()
                                .then(() => {
                                    console.log('New user created.');
                                    return done(null, newUser);
                                })
                                .catch(error => {
                                    console.error('Error saving new user:', error);
                                    return done(error);
                                });
                        })
                        .catch(error => {
                            console.error('Error checking for existing user:', error);
                            return done(error);
                        });
                    
                    console.log('After calling findOne');
                });
            }
        )
    );

    passport.use('login',
        new LocalStrategy(localStrategy,
            (request, mail, pwd, done) => {
                console.log('Inside login strategy:')
                console.log('Received credentials:', mail, pwd);
                if (!mail || !pwd) {
                    console.error('Undefined credentials:', mail, pwd);
                    return done(null, false, request.flash('error-login', 'Missing credentials.'));
                }
                UserModel.findOne({ where: { mail: mail } })
                    .then((user) => {
                        console.log('User found:', user);
                        if (!user) {
                            console.log('User not found in the database.');
                            return done(null, false,
                                request.flash('error-login',
                                    'No mail "' + mail + '" found.'));
                        }

                        if (!user.validPassword(pwd)) {
                            console.log('Password does not match.');
                            return done(null, false,
                                request.flash('error-login',
                                    'Wrong mail/password combination.'));
                        }

                        console.log('Login successful for user:', user.mail);
                        return done(null, user);
                    })
                    .catch((error) => {
                        console.error('Error finding user:', error);
                        return done(error); // Use the "error" parameter here
                    });
            }
        )
    );
};
