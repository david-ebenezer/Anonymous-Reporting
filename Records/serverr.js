const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const uri = "YOURURI";

const app = express();

MongoClient.connect(uri, { useNewUrlParser: true }, function(err, client) {
    if (err) throw err;
    
    const db = client.db('test');
    const collection = db.collection('users');
    app.get('/records', function(req, res) {
        collection.find().toArray(function(err, result) {
            if (err) throw err;
            res.send(result);
            client.close();
        });
    });
});

app.listen(2900, function() {
    console.log('Server listening on port 2900');
});
