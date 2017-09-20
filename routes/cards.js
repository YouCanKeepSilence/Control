var express = require('express');
var router = express.Router();
var MongoDb = require('mongodb')
// connect to database;
var MongoClient    = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/card';

var db = MongoClient.connect(url , (err , res) => {
    if(err){
        return console.log(err);
    }
    db = res;
    console.log('Legion always watch');
});

// get all cards for this login
router.get('/GetAllCards/:login', (req, res) => {
    var whatToFind = {'login' : req.params.login};
    console.log(whatToFind);
    db.collection('cards').find(whatToFind).toArray((err, result) => {
        if(err){
            res.json(err);
        }
        res.json(result)
    });
})

// remove card for this date and login
router.delete('/Remove' , (req , res) => {
    var login = req.body.login;
    var date = new Date(req.body.date);
    
    var whatToRemove = {'login' : login , 'date' : date};
    console.log(whatToRemove);
    db.collection('cards').deleteOne(whatToRemove , function(err , result){
        if(err){ 
            res.json(err);
        }    
        res.json(result);
    });
})
// didn't work. Doesn't catch by server...
router.delete('/NewRemove/:id' , (req , res) => {
    console.log('tut')
    console.log("id is " + req.params.id);
    console.log(ObjectId("507f1f77bcf86cd799439011"));
    db.collection('cards').deleteOne({_id : req.params.id} , (err , result) => {
        if(err){
            res.json(err)
        }
        res.json(result)
    })
})

//router.post('/Add')



module.exports = router;