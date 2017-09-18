module.exports = function(app, db) {
    app.post('/control', (req,res) => {

        var details = { 'name' : 'Tom' };

        res.send(db.collection('users').findOne(details, (err, item) => {
            if (err) {
                return console.log(err);
            }
            
            res.send(item);
        }));
    });
};