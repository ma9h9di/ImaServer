"use strict";
var MongoClient = require('mongodb').MongoClient;
var logd = require('../Other/Funcion').logd;

var _db=false;

function connectToServer(errcallback) {
    // TODO Release: change develop user to release user
    var url = 'mongodb://majeed:majeedbluerian@localhost:27017/ima';
    if (!_db) {

        MongoClient.connect(url, function (err, db) {
            if (db) {
                logd('mogo Connect db ');
                _db = db;
            }
            logd('mogo Connect err :', err);

            return errcallback(err);
        });
    }
}

module.exports = {

    connectToServer: connectToServer,

    getDb: function () {
        return _db;
    }
};