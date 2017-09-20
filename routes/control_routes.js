module.exports = function(app, db) {

    app.post('/Add' , (req , res) => {
        var user = req.body;
        user.date = new Date(req.body.date);

        res.send(db.collection('cards').insertOne(user , function(err, res){
            if(err){ 
                return console.log(err);
            }

            console.log(res.ops);
        }));
        console.log(user);
    });

    app.post('/Update' , (req, res) => {
        var newInfo = req.body      // Такое себе.
        console.log(newInfo)
        var key = {'login' : req.body.login , 'date' : new Date(req.body.date)}
        db.collection('cards').updateOne(key , newInfo, (err , result) => {
            if(err){
                return console.log(err)
            }
            res.send(result);
        })
    })

    app.post('/Ask' , (req , res) => {
        var whatToFind ={'login' : req.body.login , 'date' : new Date(req.body.date)};
        console.log(whatToFind);
        console.log("find " + find(whatToFind));
    })
};
