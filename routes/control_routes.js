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
};