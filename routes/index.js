/*const cardsRoutes = require('./control_routes');
module.exports = function(app, db) {
  cardsRoutes(app, db);
};*/
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
    res.render('index.html');
});

module.exports = router;