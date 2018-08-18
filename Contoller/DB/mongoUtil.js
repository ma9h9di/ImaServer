"use strict";
var MongoClient = require( 'mongodb' ).MongoClient;

var _db;

function connectToServer( callback ) {
    // TODO Release: change develop user to release user
    var url = 'mongodb://develop:LlW06iTdiaG5OgerXT9uPbr6w@localhost:27017/ima';
    MongoClient.connect( url, function( err, db ) {
        _db = db;
        return callback( err );
    } );
}

module.exports = {

    connectToServer: connectToServer,

    getDb: function() {
        return _db;
    }
};