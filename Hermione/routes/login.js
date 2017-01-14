var express = require('express');
var router = express.Router();
/* GET form page. */
router.get('/students', function(req, res, next) {
  res.render('login');
});


module.exports = router;
