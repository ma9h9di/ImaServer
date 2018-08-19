"use strict";
var MongoClient = require('mongodb').MongoClient;

var _db;

function connectToServer(callback) {
    // TODO Release: change develop user to release user
    var url = 'mongodb://majeed:majeedbluerian@localhost:27017/ima';
    MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
        console.log("in connect");
        if (err)
            console.log(err);
        else
            console.log("connected to DB");
        _db = db;
        return callback(err);
    });
}

module.exports = {

    connectToServer: connectToServer,
    getDb: function () {
        return _db;
    }
};