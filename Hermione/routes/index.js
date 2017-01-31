var express = require('express');
var router = express.Router();
var passport = require('passport');
var mongoose = require('mongoose');
var model = require('../model/models');
var ClassModel = model.Class;

// var classSchema = mongoose.Schema({
//     title: String,
//     description: String,
//     professors: [{ name: String }],
//     videos: [{ 
//                 title: String, 
//                 id: Number, 
//                 link: String, 
//                 date: Date,
//                 timestamps : [{ time: Number, subject: String }]
//             }],
//     code: String,
//     year: String,
//     students: Number,
//     week: Number,
//     start: Date
// });

// var ClassModel = mongoose.model('classes', classSchema);
// var db = mongoose.model('classes');

/* GET home page. */
router.get('/', function(req, res) {
    if (req.isAuthenticated()) {
        res.render('index', {
            user : req.user
        });
    } else {
        res.render('index', {
            role : "debug"
        });
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
// SEE MORE [http://stackoverflow.com/questions/24922466/passing-variables-on-res-redirect]
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

// router.get('/ee16a', function(req,res) {
//     var courses = ["EE16A", "CS160"];
//     var enrolled = ClassModel.find({title : {$in : courses} }, function(err, c) {
//         if (err || c == {}) {
//             res.render('dashboard', {
//                 user: req.user
//             });
//         }
//         res.render('dashboard', {
//             role: "debug",
//             classes: c
//         });
//     });
// })

// router.get('/cs160', function(req,res) {
//     var courses = ["EE16A", "CS160"];
//     var enrolled = ClassModel.find({title : {$in : courses} }, function(err, c) {
//         if (err || c == {}) {
//             res.render('dashboardcs160', {
//                 user: req.user
//             });
//         }
//         res.render('dashboardcs160', {
//             role: "debug",
//             classes: c
//         });
//     });
// })

/** 
 * Class Section
 */
 
router.get('/profile/classes', function(req, res, next) {
    ClassModel.find({}, function(err, classes) {
        if (err) throw err;
        res.render('classes', { "classes" : classes });
    });
});


router.get('/profile/classes/new', isLoggedIn, function(req, res) {
    res.render('new_class', {});
});

/**
 * Functions
 */

function addController(req,res,next) {
    var professors = req.body.professors.split(',');
    var class_name = req.body.title;
    var professors_map = [];
    for (var i = 0; i < professors.length; i++ ) {
        professors_map.push({ name : professors[i] });
    }

    /** 
     * Find and Save Class
     */
    var user = req.user;
    user.local.Classes.push({"class" : class_name});
    user.save(function(err) {

    });
    var new_class = new ClassModel({
        title : req.body.title,
        description : req.body.description,
        professors : professors_map,
        videos : [],
        code : req.body.code,
        year : req.body.year
    });
    new_class.save(function(err, post) {
        if (err) {
            return next(err);
        }
        res.json(201, post);
        return next();
    });
}

function redirectController(req,res) {
    res.redirect('/profile');       
}

router.post('/profile/classes/new', addController, redirectController);

router.get('/profile/classes/video/new', function(req,res) {
    res.render('video', {});
});

router.post('/profile/enroll', function(req,res) {
    ClassModel.find({code : req.body.code}, function(err, classes) {
        if (err) throw err;

        var user = req.user;
        classes = classes[0];
        if (classes) {
            user.local.Classes.push({"class" : classes.title });
            user.save(function(err) {               
            });
            res.send({redirect : '/profile'});
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
