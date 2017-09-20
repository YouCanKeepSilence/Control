var express = require('express');
var router = express.Router();
var MongoDb = require('mongodb')
// connect to database;
var MongoClient    = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
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
// remove by id
router.delete('/Remove/:id' , (req , res) => {
    db.collection('cards').deleteOne({_id : ObjectID(req.params.id)} , (err , result) => {
        if(err){
            res.json(err)
        }
        res.json(result)
    })
})

// Add function.
router.post('/Add' , (req , res) => {
    var whatToAdd = req.body;
    whatToAdd.date = new Date(whatToAdd.date);
    db.collection('cards').insertOne(whatToAdd , (err, result) => {
        if(err){
            res.json(err)
        }
        res.json(result);
    })
})

// Update function. WARNING : Full replace ALL fields of component
router.put('/Update' , (req , res) => {
    var newInfo = req.body      // Такое себе.
    newInfo.date = new Date(req.body.date);
    var key = {'login' : newInfo.login , 'date' : newInfo.date}
    db.collection('cards').updateOne(key , newInfo, (err , result) => {
        if(err){
            res.json(err)
        }
        res.json(result);
    })
})

router.get('/GetCard/:id' , (req , res) => {
    var idForGet = ObjectID(req.params.id);
    db.collection('cards').findOne({_id : idForGet} , (err , result) => {
        if(err){
            res.json(err)
        }
        res.json(result);
    })
})
module.exports = router;