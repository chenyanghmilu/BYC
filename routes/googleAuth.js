var router = require('express').Router();
var passport = require('passport');

router.get('/', function(req, res) {
    res.redirect('/courses');
});

// Google OAuth login route
router.get('/google',passport.authenticate(
    'google',
    { scope: ['profile', 'email'] }
));

router.get('/oauth2callback', passport.authenticate('google', {
    successRedirect: '/courses',
    failureRedirect: '/courses',
    })
);

module.exports = router;

