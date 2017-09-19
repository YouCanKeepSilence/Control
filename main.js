// var mongoClient = require("mongodb").MongoClient;
 
// var url = "mongodb://localhost:27017/test";
// mongoClient.connect(url, function(err, db){
     
//     var collection = db.collection("users");
//     var user = {name: "Tom", age: 23, weight: 105};
//     collection.insertOne(user, function(err, result){
         
//         if(err){ 
//             return console.log(err);
//         }
//         console.log(result.ops);
//         db.close();
//     });
// });

const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const app            = express();
const url = 'mongodb://localhost:27017/card';
app.use(bodyParser.urlencoded( {extended : true} ));

MongoClient.connect(url, (err,db) => {
    if (err) {
        return console.log(err);
    }

    require('./routes')(app,db);
    
    app.listen(8080,() => {
        console.log('Legion never sleep');
    });
});