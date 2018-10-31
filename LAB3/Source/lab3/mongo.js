/**
 * Created by user on 23/10/2016.
 */
var MongoClient = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectId;
var assert = require('assert');
var chalk = require('chalk')；
var bodyParser = require("body-parser");
var port = process.env.PORT || 8080;
var express = require('express');
var cors = require('cors');
var app = express();
var url = 'mongodb://test123:test123@ds135233.mlab.com:35233/cs5551ase';
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'))
app.get('/',function(req,res){
    res.render('index')
})
app.post('/insert', function (req, res) {
    MongoClient.connect(url, function(err, db) {
        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        insertDocument(db, req.body, function() {
            res.write("Successfully inserted");
            res.end();
        });
    });
});
var insertDocument = function(db, data, callback) {
    db.collection('appadmin').insertOne( data, function(err, result) {
        if(err)
        {
            res.write("Adding items Failed, Error While adding");
            res.end();
        }
        console.log("Inserted a document into the appadmin collection.");
        callback();
    });
};
app.post('/search', function (req, res, next) {
    var resultArray = [];
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        var cursor = db.collection('appadmin').find(req.body);
        cursor.forEach(function(doc, err) {
            assert.equal(null, err);
            resultArray.push(doc)
        }, function () {
            db.close();
            res.send({items: resultArray});
        });
    });
});
app.post('/updata', function (req, res, next) {

    var item = {
        name: req.body.name,
        store: req.body.store,
        S: req.body.S,
        price: req.body.price
    };
    var id = req.body.id;
    MongoClient.connect(url, function(err, db){
        assert.equal(null, err);
        db.collection('appadmin').updateOne({"_id": objectId(id)},{$set:item}, function(err, result){
            assert.equal(null, err);
            console.log('Product updated')
            db.close();
        });
    })
});

app.post('/delete', function (req, res, next) {
    var id = req.body.id;

    MongoClient.connect(url, function(err, db){
        assert.equal(null, err);
        db.collection('appadmin').deleteOne({"_id": objectId(id)}, function(err, result){
            assert.equal(null, err);
            console.log('Product deleted')
            db.close();
        });
    })
});
app.listen(port,function () {
    console.log(chalk.rgb(123, 45, 67).underline("app running"))
});