var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = mongoose.connection;
var classes = require('../model/class');
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
    var classes = db.collection['Classes'];
    // console.log(db);
    res.render('classes', { "classes" : classes });
});

router.get('/new', isLoggedInAndTeacher, function(req, res, next) {
    res.render('new_class');
});

router.post('/new', function(req, res, next) {
    var professors = req.body.professors.split(',');
    var new_class = new classes({
        title : req.body.title,
        description : req.body.description,
        professors : professors
    });
    new_class.save(function(err, post) {
        if (err) {
            return next(err);
        }
        console.log('Saved class: ' + new_class);
        res.json(201, post);
    });
    res.render('new_class');
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
