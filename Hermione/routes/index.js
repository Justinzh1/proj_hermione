var express = require('express');
var router = express.Router();
var passport = require('passport');
var mongoose = require('mongoose');

var classSchema = mongoose.Schema({
    title: String,
    description: String,
    professors: [{ name: String }],
    videos: [{ title: String, id: Number, link: String, date: Date}],
    code: String
});

var ClassModel = mongoose.model('classes', classSchema);
var db = mongoose.model('classes');

/* GET home page. */
router.get('/', function(req, res) {
    if (req.isAuthenticated()) {
        res.render('index', {
            user : req.user
        });
    } else {
        res.render('index', {});
    }
});

// =====================================
// LOGIN ===============================
// =====================================
// show the login form
router.get('/login', function(req, res) {

    // render the page and pass in any flash data if it exists
    res.render('login', { message : req.flash('loginMessage') });
});

// process the login form
// app.post('/login', do all our passport stuff here);

// =====================================
// SIGNUP ==============================
// =====================================
// show the signup form
router.get('/signup', function(req, res) {

    // render the page and pass in any flash data if it exists
    res.render('signup', { message : req.flash('signupMessage') });
});

// process the signup form
// app.post('/signup', do all our passport stuff here);

// =====================================
// PROFILE SECTION =====================
// =====================================
// we will want this protected so you have to be logged in to visit
// we will use route middleware to verify this (the isLoggedIn function)
router.get('/profile', isLoggedIn, function(req, res) {
    // res.render('profile', {
    //     user : req.user // get the user out of session and pass to template
    // });
    // 
    var courses = req.user.local.Classes;
    courses = courses.map(function(c) { return c.class; });
    var enrolled = ClassModel.find({ title : {$in: courses} }, function(err, c) {
        // console.log(c);
        if (err || c == {}) {
            res.render('dashboard', {
                user: req.user
            });
        }
        res.render('dashboard', {
            user: req.user,
            role: req.user.local.role,
            classes: c
        });
    });
});

// =====================================
// CLASS SECTION  ======================
// =====================================
 
router.get('/profile/classes', function(req, res, next) {
    ClassModel.find({}, function(err, classes) {
        if (err) throw err;
        res.render('classes', { "classes" : classes });
    });
});


router.get('/profile/classes/new', isLoggedIn, function(req, res) {
    res.render('new_class', {});
});


router.post('/profile/classes/new', function(req, res, next) {
    var professors = req.body.professors.split(',');
    var alt_professors = req.body.professors.split(', ');
    if (alt_professors.length > professors.length) {
        professors = alt_professors;
    }
    // console.log(req.body);
    var new_class = new ClassModel({
        title : req.body.title,
        description : req.body.description,
        professors : [],
        videos : []
    });
    // console.log(new_class);
    new_class.save(function(err, post) {
        if (err) {
            return next(err);
        }
        // console.log('Saved class: ' + new_class);
        res.json(201, post);
    });
    // db.find({}, function(err, classes) {
    //     if (err) throw err;
    //     res.render('classes', { "classes" : classes });
    // });
});

router.get('/profile/classes/video/new', function(req,res) {
    res.render('video', {});
});

router.post('/profile/enroll', function(req,res) {
    // console.log("adding a class to profile " + req.body.code);
    ClassModel.find({code : req.body.code}, function(err, classes) {
        if (err) throw err;

        var user = req.user;
        classes = classes[0];
        if (classes) {
            // console.log({"class" : classes.title});
            user.local.Classes.push({"class" : classes.title });
            user.save(function(err) {               
            });
            // console.log("Added " + classes.title + " to \n " + user);
            res.redirect('/profile');
        } else {
            // console.log('class not found');
        }
    });
});

// =====================================
// LOGOUT ==============================
// =====================================
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.post('/signup',
    passport.authenticate('local-signup', {
        successRedirect : '/profile',
        failureRedirect : '/signup',
        failureFlash : true
}));

router.post('/login',
    passport.authenticate('local-login', {
        successRedirect : '/profile',
        failureRedirect : '/login',
        failureFlash : true
    }), 
    function(req, res) {
        req.session.save(() => {
            res.redirect('/profile');
        })
});      

router.get('/auth/google', passport.authenticate('google', {
    scope : ['profile', 'email']
}));

router.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect : '/profile',
        failureRedirect : '/'
}));

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    console.log(req);
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    console.log("User not logged in");
    res.redirect('/');
}


module.exports = router;
