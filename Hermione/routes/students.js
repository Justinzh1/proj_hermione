var express = require('express');
var router = express.Router();
var passportGoogle = require('../auth/google');

/* GET home page. */
router.get('/login', function(req, res, next) {
    res.render('login', { title: 'Express' });
});


/* Temp placeholder for user page*/
router.get('/logged-in', function(req, res, next) {
    res.render('students');
})

module.exports = router;
