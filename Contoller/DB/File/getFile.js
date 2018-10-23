"use strict";

var mongoUtil = require('../mongoUtil');
var mongodb = require('mongodb');
var assert = require('assert');
var logd = require('../../Other/Funcion').logd;
var ObjectID = require('mongodb').ObjectID;

function getFile(file_id,mCategory) {
    return new Promise((resolve,reject) => {
        try {
            const db = mongoUtil.getDb();
            const bucket = new mongodb.GridFSBucket(db, {
                chunkSizeBytes: 1024,

            });

            console.log("inside");

            const out = bucket.openDownloadStream({'metadata.category':mCategory,_id:new ObjectID(file_id)});
            resolve(out);
            console.log("hello");
        }catch (e) {
            reject(e)
        }

    });
}

module.exports = {
    getFile: getFile
};