"use strict";

const mongoUtil = require('../mongoUtil');
const logd = require('../../Other/Funcion').logd;

function insertLog(newlog) {
    return new Promise(async (resolve, reject) => {
        try {
            const logCollection = mongoUtil.getDb().collection("Logs");
            logCollection.insertOne(newlog, async function (err, res) {
                if (err) {
                    throw err;
                }
                if (!res) {
                    res = false;
                }
                return resolve(res.ops[0]);
            });
        } catch (e) {
            return reject(e);
        }


    });
}

module.exports.insertLog=insertLog;