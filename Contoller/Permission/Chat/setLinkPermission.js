const setLinkApi = require('../../API/Chat/setLinkApi');

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
                if (!data.hasOwnProperty('link')) {
                    return reject(new err(pv.errCode.arguments_not_found, undefined, {params: ['link']}).jsonErr());
                }
                if ((data.link + '').length < pv.support.minLinkSize) {
                    return reject(new err(pv.errCode.chat.link_size_problem).jsonErr());
                }

                let userChat = await userHasThisChat(data.chatID, user.chats, pv.support.access.superAdmin);
                const setLink = await setLinkApi.call(userChat, data.link);
                return resolve(setLink);

            } catch (e) {
                return reject(e);
            }
        });


    }
};