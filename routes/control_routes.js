module.exports = function(app, db) {
    app.post('/control', (req,res) => {
        var details = { 'name' : 'Tom' };
        var collection = db.collection("users");
        res.send(collection.insertOne(details, function(err, result){
            
           if(err){ 
               return console.log(err);
           }
           console.log(result.ops);
            }));


    app.get('/ziga' , (req,res) => {
        var details = { 'name' : 'Jerry', 'nation' : 'nigga' };
        var collection = db.collection("users");
        res.send(collection.insertOne(details, function(err, result){
            
           if(err){ 
               return console.log(err);
           }
           console.log(result.ops);
            }))});
    });


    app.get('/Tom' , (req,res) => {
        var details = { 'name' : 'Tom'};
        var collection = db.collection("users");
        res.send(collection.aggregate([{ $match : 'Tom'}], function(err, result){
            
           if(err){ 
               return console.log(err);
           }
           
           console.log(result);
        }))});

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
    
    app.post('/Remove' , (req , res) => {
        var login = req.body.login;
        var date = new Date(req.body.date);
        var collection = db.collection('cards');
        var whatToFind = {'login' : login , 'date' : date};
        //find( whatToFind);
        res.send(collection.findOne(whatToFind , function(err, res) {
            if(err){ 
                return console.log(err);
            }
            console.log(res);
            collection.remove(res , function(err , res){
                if(err){ 
                    return console.log(err);
                }
                
            });
        }))
        /*res.send(collection.remove(find(whatToFind) , function(err , res){
            if(err){
                return console.log(err);
            }
        }))*/
    })

    var find = function(whatFind)
    {
        var result;
        result = db.collection('cards').findOne(whatFind , function(err, res) {
            if(err){ 
                return console.log(err);
            }
            
            console.log('FIND FUNC ' + res);
            return res;
        });
        console.log(result);
        return result;
    }
    
    app.post('/Ask' , (req , res) => {
        var whatToFind ={'login' : req.body.login , 'date' : req.body.date};
        console.log(whatToFind);
        console.log("find " + find(whatToFind));
    })
};
