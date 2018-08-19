"use strict";

var getUser = require('./Users/getUser');
var setUser = require('./Users/setUser');


module.exports = {
    getUserByPhoneNumber: getUser.getUserByPhoneNumber,
    insertUser: setUser.insertUser
};

