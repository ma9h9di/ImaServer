"use strict";

var getUser = require('./Users/getUser');
var setUser = require('./Users/setUser');


module.exports = {
    getUserByPhoneNumber: getUser.getUserByPhoneNumber,
    insertUser: setUser.insertUser,
    updateUserByMongoID: setUser.updateUserByMongoID,
    updateUserByPhoneNumber: setUser.updateUserByPhoneNumber
};

