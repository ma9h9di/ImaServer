//create by Mahdi Khazayi Nezhad at 05/03/2019 07:04 PM
const createPrivateChatApi = require('../../API/Chat/createPrivateChatApi');

const err = require('../../Model/error');
const pv = require('../../Other/PublicValue');
const db = require('../../DB/db');

module.exports = {
    check: function (data, user, userHasThisChat) {
        return new Promise(async (resolve, reject) => {
            try {
                //write your code Mahdi Khazayi Nezhad ...
                if (!data.hasOwnProperty('userID')) {
                    return reject(new err(pv.errCode.arguments_not_found, undefined, {params: ['userID']}).jsonErr());
                }
                if (data.userID===user.userID){
                    return reject(new err(pv.errCode.chat.your_self_user, undefined, {params: ['userID']}).jsonErr());
                }
                const targetUser = await db.getUserByID(data.userID);

                const createPrivateChat = await createPrivateChatApi.call(targetUser, user, userHasThisChat);
                return resolve(createPrivateChat);
            } catch (e) {
                return reject(e);
            }
        });
    }
};