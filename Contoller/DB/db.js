"use strict";

var getUser = require('./Users/getUser');
var setUser = require('./Users/setUser');
var setDevice = require('./Device/setDevice');
var getDevice = require('./Device/getDevice');
var saveFile = require('./File/saveFile');
var getFile = require('./File/getFile');
var getAllContacts = require('./Contact/getAllContacts');
var addContacts = require('./Contact/addContacts');
var updateContact = require('./Contact/updateContact');

module.exports = {
    getUserByPhoneNumber: getUser.getUserByPhoneNumber,
    getUserByPhoneNumber_promise:getUser.getUserByPhoneNumber_promise,
    getUserByToken: getUser.getUserByToken,
    insertUser: setUser.insertUser,
    updateUserByMongoID: setUser.updateUserByMongoID,
    updateUserByPhoneNumber: setUser.updateUserByPhoneNumber,

    getDevice: getDevice.getDevice,
    insertDevice: setDevice.insertDevice,
    updateDevice: setDevice.updateDevice,

    saveFile: saveFile.saveFile,
    getFile: getFile.getFile,

    getAllContacts: getAllContacts.getAllContacts,
    addContacts: addContacts.addContacts,
    updateContact: updateContact.updateContact
};

