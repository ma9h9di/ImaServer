"use strict";

var mongoUtil = require('../mongoUtil');
var logd = require('../../Other/Funcion').logd;


function insertDevice(device) {
    return new Promise(async (resolve,reject) => {
        try {
            var deviceCollection = mongoUtil.getDb().collection("Devices");
            deviceCollection.insertOne(device, function (err, res) {
                if (err) {
                    throw err;
                }
                resolve(res.ops[0]);
            });
        } catch (e) {
            logd(e);
            reject(e)
        }
    });

}

function updateDevice(device) {
    return new Promise(async (resolve,reject) => {
        try {
            var deviceCollection = mongoUtil.getDb().collection("Devices");
            deviceCollection.updateMany({unique_device_key: device.unique_device_key}, {$set: device}, function (err, res) {
                if (err) {
                    throw err;
                }
                resolve({});
            });
        } catch (e) {
            logd(e);
            reject(e)
        }
    });

}


module.exports =
    {
        insertDevice: insertDevice,
        updateDevice: updateDevice
    }
;