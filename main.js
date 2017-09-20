var express        = require('express');
var path           = require('path');
var MongoClient    = require('mongodb').MongoClient;
var bodyParser     = require('body-parser');
var app            = express();
var url = 'mongodb://localhost:27017/card';

//var index          = require('./routes/index')
//var cards          = require('./routes/cards')
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