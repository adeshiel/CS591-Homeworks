const express = require('express');
const router = express.Router();
const request = require('request');

router.get('/', function(req, res, next) {
    res.render('index', {title: "Homework 1", yum: "This is the directory for homoework 1. Please do /{year} for the JSON file of movies that released that year."})
})

router.param('year', function (req, res, next, year){
    req.year = year;
    next()
})

router.get('/:year', function(req, res, next){
    
    let movieYear = req.params.year;
    
    const options = { method: 'GET',
    url: 'https://api.themoviedb.org/3/discover/movie',
    qs: 
     { primary_release_year: movieYear,
       page: '1',
       include_video: 'false',
       include_adult: 'false',
       sort_by: 'popularity.desc',
       language: 'en-US',
       api_key: '4b324664e1d00a5cbbd7795669737e81' },
    body: '{}' };
  
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
  
    console.log(body);
    
    //res.render('movie', {movies: body})
    res.send(body)
    //res.json(body)
  });
    

});

router.post('/', function (req, res, next) {
    // const help = JSON.stringify(req.body)
    // const help2 = JSON.parse(help) 
    // console.log(help2.page) // undefined w send
    // console.log(help)    // {} w send
    // console.log(req.body) // {} w send

    console.log(req.body)
    // for (item in help.results) {
    //     console.log(item.title)
    // }
    
    // res.send(help.results[1].title)
    
    
})

module.exports = router;