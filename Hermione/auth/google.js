var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuthStrategy;

var user = require('../model/user');
var config = require('./_config.js');
var init = require('./init');

// passport.use(new GoogleStrategy({
//     returnURL: 'http://localhost:3000/student/auth/logged-in',
//     realm: 'http://localhost:3000/'
//     },
//     function(identifier, done) {
//         user.findByOpenID({ openId: identifier }, function (err, user) {
//             return done(err, user);
//         });
//     }
// ));

passport.use(new GoogleStrategy({
    clientID: config.googleAuth.clientID,
    clientSecret: config.googleAuth.clientSecret,
    consumerKey: config.googleAuth.clientID,
    consumerSecret: config.googleAuth.clientSecret,
    callbackURL: config.googleAuth.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {

        User.findOrCreate({ googleId: profile.id }, function(err, user) {
            return done(err, user);
        });
    }
));

init();

module.exports = passport;
