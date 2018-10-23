const getFullUserInfoApi = require('../../API/User/getFullUserInfoApi');

const err = require('../../Model/error');
const pv = require('../../Other/PublicValue');
const db = require('../../DB/db');

module.exports = {
    check: function (data, outputCallBack) {

        if (!data.hasOwnProperty('userIDs')) {
            outputCallBack(new err(pv.errCode.arguments_not_found, undefined, {params: ['userIDs']}).jsonErr());
            return;
        }

        let userIDs = data.userIDs;
        getFullUserInfoApi.call(userIDs,outputCallBack);

    }
};