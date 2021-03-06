const express = require('express');
const router = express.Router();
const request = require('request');

router.get('/', function(req, res, next) {
    res.render('index', {title: "Homework 1", yum: "This is the directory for homework 1. Please do /{year} for the JSON file of movies that released that year."})
})

router.param('string', function (req, res, next, value){
    req.params.string = value;
    req.params.len = value.length;
    res.json(req.params)
    next()
})

router.get('/:string', function(req, res, next){
    req.params.len = req.params.string.length;
    console.log(req.params); //gets all params
 //   res.send(req.params)
    res.json(req.params)
  });



router.post('/', function (req, res, next) {
    req.body.len = req.body.string.length
    console.log(req.body) //gets string params
    res.json(req.body)
    
    
})

module.exports = router;