"use strict";

var MongoClient = require('mongodb').MongoClient;
var getUser = require('./Users/getUser');


module.exports = {getUserByPhoneNumber: getUser.getUserByPhoneNumber};

