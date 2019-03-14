const getUsersInfoApi = require('../../API/User/getUsersInfoApi');

const err = require('../../Model/error');
const pv = require('../../Other/PublicValue');
const db = require('../../DB/db');

module.exports = {
    check: function (data) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!data.hasOwnProperty('userIDs')) {
                    return reject(new err(pv.errCode.arguments_not_found, undefined, {params: ['userIDs']}).jsonErr());

                }

                let userIDs = data.userIDs;
                const getUsersInfo = await getUsersInfoApi.call(userIDs);
                return resolve(getUsersInfo);
            } catch (e) {
                return reject(e);
            }
        });


    }
};