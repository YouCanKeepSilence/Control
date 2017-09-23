var express        = require('express');
var path           = require('path');

var bodyParser     = require('body-parser');
var app            = express();

var cards          = require(path.join(__dirname,'/routes/cards'))
var cors           = require(path.join(__dirname,'routes/cors'))
var port = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api', cards);

app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.static(path.join(__dirname, 'client')));

app.listen(port ,() => {
    console.log('Legion never sleep');
});



// app.use(cors.permission)

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname,'index.html')); 
});