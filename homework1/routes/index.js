var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  let nums = ['all', 'good', 'dogs']
  res.render('index', { title: 'CS591', nums: nums });
  // res.render('index', { title: 'Express' });
});

module.exports = router;
