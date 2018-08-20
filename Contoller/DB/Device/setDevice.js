"use strict";

var mongoUtil = require('../mongoUtil');
var logd = require('../../Other/Funcion').logd;


function insertDevice(device, callback) {
    try {
        var deviceCollection = mongoUtil.getDb().collection("Devices");
        deviceCollection.insertOne(device, function (err, res) {
            if (err) {
                throw err;
            }
            callback(res.ops[0]);
        });
    } catch (e) {
        logd(e);
    }
}

function updateDevice(device, callback) {
    try {
        var deviceCollection = mongoUtil.getDb().collection("Devices");
        deviceCollection.update({unique_device_key: device.unique_device_key}, device, function (err, res) {
            if (err) {
                throw err;
            }
            callback({});
        });
    } catch (e) {
        logd(e);
    }
}


module.exports =
    {
        insertDevice: insertDevice,
        updateDevice: updateDevice
    }
;