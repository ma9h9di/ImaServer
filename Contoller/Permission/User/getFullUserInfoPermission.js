const getFullUserInfoApi = require('../../API/User/getFullUserInfoApi');

const err = require('../../Model/error');
const pv = require('../../Other/PublicValue');
const db = require('../../DB/db');

module.exports = {
    check: function (data) {
        return new Promise(async (resolve, reject) => {
            try {

                if (!data.hasOwnProperty('userID')) {
                    return reject(new err(pv.errCode.arguments_not_found, undefined, {params: ['userID']}).jsonErr());

                }

                let userID = data.userID;
                const getFullUserInfo = await getFullUserInfoApi.call(userID);
                return resolve(getFullUserInfo);
            } catch (e) {
                return reject(e);
            }
        });


    }
};