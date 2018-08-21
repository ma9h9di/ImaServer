"use strict";

var getUser = require('./Users/getUser');
var setUser = require('./Users/setUser');
var setDevice = require('./Device/setDevice');
var getDevice = require('./Device/getDevice');
var saveFile = require('./File/saveFile');
var getFile = require('./File/getFile');


module.exports = {
    getUserByPhoneNumber: getUser.getUserByPhoneNumber,
    insertUser: setUser.insertUser,
    updateUserByMongoID: setUser.updateUserByMongoID,
    updateUserByPhoneNumber: setUser.updateUserByPhoneNumber,
    getDevice: getDevice.getDevice,
    insertDevice: setDevice.insertDevice,
    updateDevice: setDevice.updateDevice,
    saveFile: saveFile.saveFile,
    getFile: getFile.getFile

};

