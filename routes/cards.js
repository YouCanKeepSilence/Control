/*
    API declaration : 
    '/:xxx' - means that you need to attach info in format ('api/card/MY_INFO')
    GET('api/cards/:login') - get all cards drom DB for login
    GET('api/card/:id) - get ONE card from DB by id
    GET('api/card) - get card from DB by login and date (need to attach this info in body of request 'login' and 'date')
    POST('api/card') - add new card to DB , you need attach all card info into body of request
    PUT('api/card') - update card into DB info by login and date . which must be attach to body of request (new info must be attched too)
    PUT('api/card/:id') - do the same thing but find card by id, you also need to attach new info in body of request
    DELETE('api/card') - delete card from DB by login and date , you need attach it to body of request
    DELETE('api/card/:id') - delete card from DB by id
*/
var express = require('express');
var router = express.Router();
// var MongoDb = require('mongodb')
// Connect to database;
var MongoClient    = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
// var url = 'mongodb://localhost:27017/card';      local url
var url = 'mongodb://silence:KeepSilence@ds147964.mlab.com:47964/mycards_silence'

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
        // res.setHeader('Access-Control-Allow-Origin','*') 
        res.json(result)
    });
})

// Add card function.
router.post('/card' , (req , res) => {
    var whatToAdd = req.body;
    // console.log(req.body.works)
    whatToAdd.works = req.body.works
    var realDate = new Date(whatToAdd);
    whatToAdd.date = new Date(realDate.getFullYear , realDate.getMonth , realDate.getDay);
    db.collection('cards').insertOne(whatToAdd , (err, result) => {
        if(err){
            res.json(err)
        }
        //console.log(whatToAdd);
        var answer ={'result' : result , 'id' :  whatToAdd._id};
        // result['id'] = whatToAdd._id;
        // console.log(result.id);
        res.json(answer);
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
        // res.setHeader('Access-Control-Allow-Origin','*') 
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
    var newInfo = req.body;      // Такое себе.
    newInfo.date = new Date(req.body.date);
    delete newInfo._id;
    // console.log(' NEW INFO ' + newInfo);
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
        // res.setHeader('Access-Control-Allow-Origin','*') 
        res.json(result)
    })
})

router.post('/login' , (req, res) => {
    var authInfo = req.body;
    db.collection('usersHash').findOne(authInfo , (err , result) => {
        if(err){
            res.json(err)
        }
        var answer = {'success' : (result === null && result.username !== '') ? false : true}  //  Если такой пользователь есть то успех
        if(answer.success){
            answer.username = result.username;
        }   
        console.log(result);
        res.json(answer);
    })
})

router.post('/register' , (req , res) => {
    var userToAdd = {'authHash' : req.body.authHash , 'username' : req.body.username};
    db.collection('usersHash').insertOne(userToAdd , (err , result) => {
        if(err){
            res.json(err)
        }
        if(result === null){
            res.json({'success' : false});
        }
        else {
            res.json({'success' : true});
        }
    })
})
module.exports = router;