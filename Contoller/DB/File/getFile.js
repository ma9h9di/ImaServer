"use strict";

var mongoUtil = require('../mongoUtil');
var mongodb = require('mongodb');
var assert = require('assert');
var logd = require('../../Other/Funcion').logd;
var ObjectID = require('mongodb').ObjectID;

function getFile(file_id) {
    return new Promise((resolve) => {
        var db = mongoUtil.getDb();
        var bucket = new mongodb.GridFSBucket(db, {
            chunkSizeBytes: 1024,
        });

        console.log("inside");

        var out = bucket.openDownloadStream(new ObjectID(file_id));
        resolve(out);
        console.log("hello");
    });
}

module.exports = {
    getFile: getFile
};