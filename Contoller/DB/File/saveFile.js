"use strict";
const stream = require('stream');
var mongoUtil = require('../mongoUtil');
var mongodb = require('mongodb');
var assert = require('assert');
var fs = require('fs');
var logd = require('../../Other/Funcion').logd;

function saveFile(image) {
    return new Promise((resolve, reject) => {


        var db = mongoUtil.getDb();
        var bucket = new mongodb.GridFSBucket(db);

        // fs.createReadStream('./kh.mp3').pipe(bucket.openUploadStream('meistersinger.mp3')).on('error', function (error) {
        //     assert.ifError(error);
        // }).on('finish', function () {
        //     console.log('done!');
        //     process.exit(0);
        // });
        // var stream = require('stream');

// Initiate the source
        var bufferStream = new stream.PassThrough();

// Write your buffer
        bufferStream.end(image.buffer);
        bufferStream.metadata = image.metadata;
        bufferStream.pipe(bucket.openUploadStream(image.originalname, image)).on('error', function (error) {
            reject(error);
            assert.ifError(error);

        }).on('finish', function (result) {
            const dataRe = {id: result._id};
            resolve(dataRe);
            console.log('done!');
        });
    })
}

module.exports = {
    saveFile: saveFile
};