var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../models/user');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
},
function(accessToken, refreshToken, profile, cb) {
    // a user has logged in via OAuth!
    User.findOne({ googleId: profile.id })
        .then(user => {
            if (user) {
            return user;
            }

            return User.create({
            username: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id
            });
        })
        .then(user => cb(null, user))
        .catch(err => cb(err));
    }
    )
);

passport.serializeUser(function(user, done) {
    done(null, user._id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
    done(err, user);
    });
});