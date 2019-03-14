const getChatsApi = require('../../API/Chat/getChatsApi');

const err = require('../../Model/error');
const pv = require('../../Other/PublicValue');

module.exports = {
    check: function (data, user, userHasThisChat) {
        return new Promise(async (resolve, reject) => {
            if (!data.hasOwnProperty('chatIDs')) {
                return reject(new err(pv.errCode.arguments_not_found, undefined, {params: ['chatIDs']}).jsonErr());
            }
            try {
                const getChats = await getChatsApi.call(data.chatIDs, user, userHasThisChat);
                return resolve(getChats)
            } catch (e) {
                return reject(e);
            }

        });

    }
};