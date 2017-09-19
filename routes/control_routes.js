module.exports = function(app, db) {
    app.post('/control', (req,res) => {
        console.log('biba');
        var details = { 'name' : 'Tom' };
        //res.send("Superrrrr");
        var collection = db.collection("users");
        res.send(collection.insertOne(details, function(err, result){
            
           if(err){ 
               return console.log(err);
           }
           console.log(result.ops);
            }));


    app.get('/ziga' , (req,res) => {
        console.log('biba');
        var details = { 'name' : 'Jerry', 'nation' : 'nigga' };
        //res.send("Superrrrr");
        var collection = db.collection("users");
        res.send(collection.insertOne(details, function(err, result){
            
           if(err){ 
               return console.log(err);
           }
           console.log(result.ops);
            }))});
    });
};