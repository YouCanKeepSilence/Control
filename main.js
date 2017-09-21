var express        = require('express');
var path           = require('path');

var bodyParser     = require('body-parser');
var app            = express();

var index          = require('./routes/index')
var cards          = require('./routes/cards')
var cors           = require('./routes/cors');
var port = 8080;
app.use(bodyParser.urlencoded( {extended : true} ));

app.use('/api', cards);

//view 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.static(path.join(__dirname, 'client')));

app.listen(port ,() => {
    console.log('Legion never sleep');
});


app.use(cors.permission)

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'views' ,'index.html')); 
  });