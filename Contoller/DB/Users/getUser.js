"use strict";

var mongoUtil = require('../mongoUtil');
var logd = require('../../Other/Funcion').logd;

function getUserByPhoneNumber(phone_number) {
    return new Promise(function (resolve, reject) {
        try {
            let userCollection = mongoUtil.getDb().collection("Users");
            logd('getUserByPhoneNumber_promise phoneNumber :', phone_number);
            userCollection.findOne({phone_number: {$eq: phone_number}}, function (err, res) {
                logd('getUserByPhoneNumber_promise err :', err);
                if (err) {
                    reject(err);
                }
                if (!res) {
                    res = false;
                }
                resolve(res);
            });
        } catch (e) {
            logd(e);
            reject(e);
        }
    });
}

function getUsersInfo(usersIDs, selectedField) {
    return new Promise((resolve, reject) => {
        try {
            const userCollection = mongoUtil.getDb().collection("Users");
            for (let i = 0; i < usersIDs; i++) {
                usersIDs[i]=parseInt(usersIDs[i]);
            }
            userCollection.find({userID: {$in: usersIDs}}).project(selectedField).toArray(function (err, result) {
                if (err) {
                    throw err;
                }
                if (!result) {
                    result = [];
                }
                let propArray = [];
                for (let i = 0; i < result.length; i++) {
                    // result[i].userID=result[i].userID!==null?result[i].userID:result[i]._id;
                    propArray.push(result[i]);
                }
                resolve(propArray);
            });
        } catch (e) {
            reject(e);
        }
    });
}

function getUserByID(id) {
    return new Promise(function (resolve, reject) {
        try {
            let userCollection = mongoUtil.getDb().collection("Users");
            logd('getUserByID userID :', id);
            id=parseInt(id);
            userCollection.findOne({userID: {$eq: id}}, function (err, res) {
                logd('getUserByID err :', err);
                if (err) {
                    reject(err);
                }
                if (!res) {
                    res = false;
                }
                //  res.userID=res.userID!==null?res.userID:res._id;

                resolve(res);
            });
        } catch (e) {
            logd(e);
            reject(e);
        }
    });
}

function getUserByToken(token) {
    return new Promise(async (resolve, reject) => {
        try {
            var userCollection = mongoUtil.getDb().collection("Users");
            logd('getUserByToken token :', token);
            userCollection.findOne({
                session: {
                    $elemMatch: {
                        token: token,
                    }
                }
            }, function (err, res) {
                if (err) {
                    logd('getUserByToken err :', err);
                    throw err;
                }
                if (!res) {
                    res = false;
                }
                resolve(res);
            });
        } catch (e) {
            logd(e);
            reject(e);
        }
    });

}

module.exports =
    {
        getUserByPhoneNumber: getUserByPhoneNumber,
        getUserByToken: getUserByToken,
        getUserByID: getUserByID,
        getUsersInfo: getUsersInfo

    }
;