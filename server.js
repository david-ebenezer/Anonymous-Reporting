var express = require('express');
const crypto = require('crypto');
var axios = require('axios');
var app = express();
var bodyParser = require('body-parser');
const http = require('http');
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
const uri = "YOURURI";

app.use(bodyParser.urlencoded({extended: true}));



app.get('/reg', function(req, res){
   res.sendFile(__dirname + "/login-page-1/ind~ex.html");
});

app.get('/login', function(req, res){
    res.sendFile(__dirname + "/login-form-2/index.html");
});

app.post('/reg', function(req, res){
    async function getNews() {
        const response = await axios.get('https://checkip.amazonaws.com/');
        return response.data;
    }

    getNews().then(news => {
  
        const anip = news;
        var Date = req.body.Date;
        var Add = req.body.Add;
        var Pin = req.body.Pin;
        var Comp = req.body.Comp;
        const hash = crypto.createHash('sha256');
        hash.update(anip);
        const sha256 = hash.digest('hex');
        console.log(sha256);
        MongoClient.connect(uri, { useNewUrlParser: true }, function(err, client) {
            const db = client.db('test');
            const collection = db.collection('users');
            collection.insertOne({
                IP: sha256,
                Date: Date,
                Address: Add,
                PinCode: Pin,
                Complaint: Comp
            }, function(err, result) {
                console.log('Data inserted successfully');
                client.close();
            });
        });
        res.send("Submitted successfully!");
    });
});

app.listen(3000, function() {
    console.log('Server listening on port 3000');
});
