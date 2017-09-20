var express = require('express');
var router = express.Router();

// connect to database;
var MongoClient    = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/card';
var db = MongoClient.connect(url , (err , res) => {
    if(err){
        return console.log(err);
    }
    db = res;
    console.log('Db connected');
});

router.post('/GetAllCards', (req, res) => {
    console.log('here');
    var whatToFind = {'login' : req.body.login};
    console.log(whatToFind);
    db.collection('cards').find(whatToFind).toArray((err, result) => {
        if(err){
            console.log('error here')
            return console.log(err);
        }
        console.log(result);
        
        res.json(result)
    });
})


module.exports = router;