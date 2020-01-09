var User = require('../models/user');
var passport = require('passport');

//root route
function root(req, res) {
    res.render('index');
};

//register form
function registerForm(req, res) {
    res.render('register');
};

//register logic
function registerLogic(req, res) {
    var newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            // console.log(err.message);
            req.flash('error', err.message);
            return res.redirect('/register');
        }
        passport.authenticate('local')(req, res, function () {
            req.flash('success', 'Welcome ' + user.username);
            res.redirect('/courses');
        });
    });
};

//login form
function loginForm(req, res) {
    res.render('login');
};


//login logic
function loginLogic(req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) { return next(err); }
        if (!user) { return res.redirect('/login'); }
        req.logIn(user, function (err) {
            if (err) { return next(err); }
            var redirectTo;
            if (req.session.redirectTo) {
                redirectTo = req.session.redirectTo;
            } else {
                req.flash('success', 'Welcome back ' + user.username);
                redirectTo = '/courses';
            }
            delete req.session.redirectTo;
            res.redirect(redirectTo);
        });
    })(req, res, next);
};

//logout route
function logout(req, res) {
    req.logout();
    req.flash('success', 'successfully logged out!');
    res.redirect('/courses');
};

module.exports = {
    root,
    registerForm,
    registerLogic,
    loginForm,
    loginLogic,
    logout
};