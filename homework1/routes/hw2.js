const express = require('express');
const router = express.Router();
const request = require('request');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/hw2');
mongoose.Promise = global.Promise;

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connection successful.')
});

const Schema = mongoose.Schema;

const stringSchema = new Schema({
    string: String,
    length: String
})

var longString = mongoose.model('Long', stringSchema);

router.get('/', function(req, res, next) {
    //res.render('index', {title: "Homework 2", yum: "This is the directory for homework 2. Please type a string into the URI."})
    longString.find({}, '-_id -__v', function(err, results) {
        if (err) return console.error("Nuh-uh");
        console.log(results)
        res.json(results)
    })        

})

router.param('longstring', function (req, res, next, value){
    req.params.string = value;
    req.params.length = value.length;
    next()
})

router.get('/:longstring', function(req, res, next){

    longString.findOne({string: req.params.string}, { _id: 0, string: 1, length:1}, function(err, results){
        if(err){
            console.log("Nope.")
        }

        if(!results) {
            console.log("Object not found; making new instance...")
            newString = new longString({string: req.params.string, length: req.params.length})

            console.log(newString)

            newString.save( function(err, newString){
                if(err) return console.error("Error when saving")
                returnObj = {
                    name: newString.string,
                    length: newString.length
                }
                console.log("Saved")
                res.json(returnObj)
            })

        }

        else{
            console.log("Object found.")
            res.json(results)
        }

    })

    
  });

router.post('/', function (req, res, next) {
    console.log(req.body)
    if(!req.body){
        console.error("Please input a string")
        res.json("Please input a string")
    }
    else{
        req.body.len = req.body.string.length

        longString.findOne({string: req.body.string}, { _id: 0, string: 1, length:1}, function(err, results){
            if(err){
                console.log("Nope.")
            }

            if(!results) {
                console.log("Object not found; making new instance...")
                newString = new longString({string: req.body.string, length: req.body.len})

                console.log(newString)

                newString.save( function(err, newString){
                    if(err) return console.error("Error when saving")
                    returnObj = {
                        name: newString.string,
                        length: newString.length
                    }
                    console.log("Saved")
                    res.json(returnObj)
                })

            }

            else{
                console.log("Object found.")
                res.json(results)
            }

        })
    }


})

router.delete('/:del', function (req, res, next) {
    longString.findOneAndRemove({string: req.params.del}, function (err, result) {
        if(!result) {res.json({message: 'String not found!'})}

        if(err) {res.json({message: 'Something went wrong while deleting'});}
        
        else {res.json({message: 'Successfully deleted.'});}
      })
})

module.exports = router;