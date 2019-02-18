"use strict";
var MongoClient = require('mongodb').MongoClient;

var _db;

function connectToServer(callback) {
    // TODO Release: change develop user to release user, change url to localhost
    console.log("before DB");
    const url = 'mongodb://mahdi:bfnvlndlfnlkd@198.143.180.99:27017/ima';
    MongoClient.connect(url, {useNewUrlParser: true}, function (err, client) {
        if (err)
            console.log(err);
        else
            console.log("connected to DB");
        _db = client.db('ima');
        return callback(err);
    });
}

function getNextSequenceValue(sequenceName) {
    return new Promise(async (resolve) => {
        const sequenceDocument = _db.collection("Counters").findAndModify(
            {_id: sequenceName}, [],
            {$inc: {sequence_value: 1}},
            {new: true},
            (err, sequenceDocument) => {
                resolve(sequenceDocument.value.sequence_value);
            });
    });


    // return sequenceDocument.sequence_value;
}

module.exports = {
    connectToServer: connectToServer,
    getNextSequenceValue: getNextSequenceValue,
    getDb: function () {
        return _db;
    }
};