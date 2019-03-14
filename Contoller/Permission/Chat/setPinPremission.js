const setPinApi = require('../../API/Chat/setPinApi');

const userHasThisChat = require('./chatMainPermissionCheck').userHasThisChat;

const err = require('../../Model/error');
const pv = require('../../Other/PublicValue');

module.exports = {
    check: function (data, user) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!data.hasOwnProperty('chatID')) {
                    return reject(new err(pv.errCode.arguments_not_found, undefined, {params: ['chatID']}).jsonErr());
                }
                if (!data.hasOwnProperty('pinState')) {
                    return reject(new err(pv.errCode.arguments_not_found, undefined, {params: ['pinState']}).jsonErr());
                }
                let value = await userHasThisChat(data.chatID, user.chats);
                const setPin = await setPinApi.call(value, user);
                return resolve(setPin);
            } catch (e) {
                return reject(e);
            }
        });


    }
};