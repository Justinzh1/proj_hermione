var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = mongoose.connection;
var classes = require('../model/class');
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
    ClassModel.find({}, function(err, classes) {
        if (err) throw err;
        res.render('classes', { "classes" : classes });
    });
});


function isLoggedInAndTeacher(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    console.log("User not logged in");
    res.redirect('/');
}

module.exports = router;
