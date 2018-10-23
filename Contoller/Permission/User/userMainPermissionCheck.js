const getChatsInfoPermission = require('./getChatsInfoPermission');
const getFullUserInfoPermission = require('./getFullUserInfoPermission');

const err = require('../../Model/error');
const logd = require('../../Other/Funcion').logd;
const pv = require('../../Other/PublicValue');
const ObjectID = require('mongodb').ObjectID;


function findMethodPermission(input, user, myCallBack) {
    let data = input.data;
    switch (input.method) {
        case pv.api.user.getUsersInfo:
            getChatsInfoPermission.check(data,myCallBack);
            return;
        case pv.api.user.getFullUserInfo:
            getFullUserInfoPermission.check(data,myCallBack);
            return;
        default:
            myCallBack(new err(pv.errCode.method_not_found).jsonErr());
            return;

    }
}

module.exports = {

    check: function (input, user, outputCallBack) {

        //todo check koliat az ghabil in ke in methode vojod dare age nadare
        //todo * getDevice from db and check dont use authecion methods more than 20 from  hours
        //todo #DB

        user.changeAttribute = [];
        findMethodPermission(input, user, outputCallBack);


    },
};

