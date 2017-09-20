var express = require('express');
var router = express.Router();
var MongoDb = require('mongodb')
// Connect to database;
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

// Get all cards for this login
router.get('/cards/:login', (req, res) => {
    var whatToFind = {'login' : req.params.login};
    console.log(whatToFind);
    db.collection('cards').find(whatToFind).toArray((err, result) => {
        if(err){
            res.json(err);
        }
        res.json(result)
    });
})

// Add card function.
router.post('/card' , (req , res) => {
    var whatToAdd = req.body;
    whatToAdd.date = new Date(whatToAdd.date);
    db.collection('cards').insertOne(whatToAdd , (err, result) => {
        if(err){
            res.json(err)
        }
        res.json(result);
    })
})
//Get card by login and date
router.get('/card' , (req , res) => {
    var whatToGet = {'login' : req.body.login , 'date' : new Date(req.body.date)}
    db.collection('cards').findOne(whatToGet , (err , result) => {
        if(err){
            res.json(err)
        }
        res.json(result);
    })
})
// Update function by login and date. WARNING : Full replace ALL fields of component
router.put('/card' , (req , res) => {
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

// Remove card for this date and login
router.delete('/card' , (req , res) => {
    var login = req.body.login;
    var date = new Date(req.body.date);
    var whatToRemove = {'login' : login , 'date' : date};
    db.collection('cards').deleteOne(whatToRemove , function(err , result){
        if(err){ 
            res.json(err);
        }    
        res.json(result);
    });
})

//----------------------------------------------------------------------

//Get card by id
router.get('/card/:id' , (req , res) => {
    var idForGet = ObjectID(req.params.id);
    db.collection('cards').findOne({_id : idForGet} , (err , result) => {
        if(err){
            res.json(err)
        }
        res.json(result);
    })
})
// Update card by id
router.put('/card/:id' , (req , res) => {
    var newInfo = req.body      // Такое себе.
    newInfo.date = new Date(req.body.date);
    db.collection('cards').updateOne({_id : ObjectID(req.params.id)} , newInfo, (err , result) => {
        if(err){
            res.json(err)
        }
        res.json(result);
    })
})

// Remove by id
router.delete('/card/:id' , (req , res) => {
    db.collection('cards').deleteOne({_id : ObjectID(req.params.id)} , (err , result) => {
        if(err){
            res.json(err)
        }
        res.json(result)
    })
})
module.exports = router;