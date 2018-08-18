"use strict";

var MongoClient = require('mongodb').MongoClient;
var getUser = require('Users/getUser');



// TODO Release: change develop user to release user
var url = 'mongodb://develop:LlW06iTdiaG5OgerXT9uPbr6w@localhost:27017/ima';

var DBConnection;

function connectDB(callback){
    MongoClient.connect(url, function (err, db) {
        if (err) {
            throw err;
        }
        var dbo = db.db("ima");
        DBConnection = dbo;
        callback();
    });

}





modules.exports = {DBConnection: DBConnection, connectToDB: connectDB, };

