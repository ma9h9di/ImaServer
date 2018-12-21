const getUsersInfoApi = require('../../API/User/getUsersInfoApi');

const err = require('../../Model/error');
const pv = require('../../Other/PublicValue');
const db = require('../../DB/db');

module.exports = {
    check: function (data) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!data.hasOwnProperty('userIDs')) {
                    reject(new err(pv.errCode.arguments_not_found, undefined, {params: ['userIDs']}).jsonErr());
                    return;
                }

                let userIDs = data.userIDs;
                const getUsersInfo = await getUsersInfoApi.call(userIDs);
                resolve(getUsersInfo);
            } catch (e) {
                reject(e);
            }
        });


    }
};