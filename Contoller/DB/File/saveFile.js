"use strict";

var mongoUtil = require('../mongoUtil');
var mongodb = require('mongodb');
var assert = require('assert');
var fs = require('fs');
var logd = require('../../Other/Funcion').logd;

function saveFile(/*file, callback*/) {

    var db = mongoUtil.getDb();
    var bucket = new mongodb.GridFSBucket(db);

    fs.createReadStream('./kh.mp3').pipe(bucket.openUploadStream('meistersinger.mp3')).on('error', function (error) {
        assert.ifError(error);
    }).on('finish', function () {
        console.log('done!');
        process.exit(0);
    });
}

module.exports = {
    saveFile: saveFile
};