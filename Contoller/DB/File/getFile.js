"use strict";

var mongoUtil = require('../mongoUtil');
var mongodb = require('mongodb');
var assert = require('assert');
var logd = require('../../Other/Funcion').logd;
var ObjectID = require('mongodb').ObjectID;

function getFile(file_id) {

    var db = mongoUtil.getDb();
    var bucket = new mongodb.GridFSBucket(db, {
        chunkSizeBytes: 1024,
    });

    console.log("inside");

    var out = bucket.openDownloadStream(ObjectID.createFromHexString(file_id));
    out.pipe(process.stdout);
    console.log("hello");

}

module.exports = {
    getFile: getFile
};