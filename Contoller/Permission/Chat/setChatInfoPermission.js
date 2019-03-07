const setChatInfoApi = require('../../API/Chat/setChatInfoApi');

const err = require('../../Model/error');
const pv = require('../../Other/PublicValue');
const db = require('../../DB/mongoUtil');

module.exports = {
    check: function (data, user, userHasThisChat) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!data.hasOwnProperty('chatID')) {
                    reject(new err(pv.errCode.arguments_not_found, undefined, {params: ['chatID']}).jsonErr());
                }
                if (!data.hasOwnProperty('title')) {
                    // reject(new err(pv.errCode.arguments_not_found, undefined, {params: ['title']}).jsonErr());
                    // return;
                } else if ((data.title + '').length < pv.support.minTitleSize) {

                    reject(new err(pv.errCode.chat.title_size_problem).jsonErr());
                }

                if (!data.hasOwnProperty('description')) {
                    // reject(new err(pv.errCode.arguments_not_found, undefined, {params: ['description']}).jsonErr());
                    // return;
                } else
                    data.description = data.description.substring(0, pv.defaultValue.descriptionLength);

                if (!data.hasOwnProperty('accessModifier')) {
                    // reject(new err(pv.errCode.arguments_not_found, undefined, {params: ['accessModifier']}).jsonErr());
                    // return;
                } else
                    data.accessModifier = data.accessModifier === pv.support.accessModifier.public ? data.accessModifier : pv.support.accessModifier.private;
                try {
                    let userHaveChat = await userHasThisChat(data.chatID, user.chats, pv.support.access.superAdmin);
                    data.chatID = userHaveChat.chatID;
                    const setChatInfo = await setChatInfoApi.call(data);
                    resolve(setChatInfo);
                } catch (e) {
                    reject(e);
                }

            } catch (e) {
                reject(e);
            }
        });


    }
};