"use strict";

var MongoClient = require('mongodb').MongoClient;
var getUser = require('Users/getUser');


modules.exports = {getUserByPhoneNumber: getUser.getUserByPhoneNumber};

