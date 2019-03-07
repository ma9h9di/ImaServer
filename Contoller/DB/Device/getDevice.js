"use strict";

var mongoUtil = require('../mongoUtil');
var logd = require('../../Other/Funcion').logd;

function getDevice(unique_device_key) {
    return new Promise(async (resolve, reject) => {
        try {
            var deviceCollection = mongoUtil.getDb().collection("Devices");
            logd('getDevice  :', unique_device_key);
            deviceCollection.findOne({unique_device_key: {$eq: unique_device_key}}, function (err, res) {
                logd('getDevice err :', err);
                if (err) {
                    throw err;
                }
                if (!res) {
                    res = false;
                    resolve(res);
                } else {
                    resolve(res);
                }
            });
        } catch (e) {
            logd(e);
            reject(e)
        }
    });

}


module.exports =
    {
        getDevice: getDevice
    }
;