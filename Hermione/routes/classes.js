var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = mongoose.connection;
var classes = require('../model/class');
var passport = require('passport');

var classSchema = mongoose.Schema({
    title: String,
    description: String,
    professors: [{ name: String }],
    videos: [{ title: String, id: Number, link: String, date: Date}]
});

var ClassModel = mongoose.model('classes', classSchema);
// var Class_Instance = new ClassModel(
//     { title: "CS61A",
//       description: "Structure and Interpretation of Computer Programs",
//       professors: [ { name: "John Denero" } ],
//       videos: [ { title: "Lecture 1", id: 1, link: "url1", date: null}]
//   });
// Class_Instance.save(function(err) {
//     if (err) return handleError(err);
//     console.log("Saved");
// });

module.exports = ClassModel;


/* GET home page. */
router.get('/', function(req, res, next) {
    ClassModel.find({}, function(err, classes) {
        if (err) throw err;
        // console.log(classes[0]);
        console.log(classes[0].title);
        res.render('classes', { "classes" : classes });
    });
});

router.get('/new', function(req, res, next) {
    if (req.isAuthenticated()) {
        res.render('new_class');
    }
    res.render('login');
});

router.post('/new', function(req, res, next) {
    console.log(req);
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
