const getFullChatPermission = require('./getFullChatPermission');
const getChatsPermission = require('./getChatsPermission');
const checkChannelUsernamePermission = require('./checkChannelUsernamePermission');
const updateChannelUsernamePermission = require('./updateChannelUsernamePermission');
const setChatInfoPermission = require('./setChatInfoPermission');
const addChatUserPermission = require('./addChatUserPermission');
const removeUserPermission = require('./removeUserPermission');
const deleteChatPermission = require('./deleteChatPermission');
const createGroupPermission = require('./createGroupPermission');

const err = require('../../Model/error');
const logd = require('../../Other/Funcion').logd;
const pv = require('../../Other/PublicValue');

function findMethodPermission(input, user, myCallBack) {
    let data = input.data;
    switch (input.method) {
        case pv.api.chat.getFullChat:
            getFullChatPermission.check(data, user, myCallBack);
            break;
        case pv.api.chat.getChats:
            getChatsPermission.check(data, user, myCallBack);
            break;
        case pv.api.chat.checkChannelUsername:
            checkChannelUsernamePermission.check(data, myCallBack);
            break;
        case pv.api.chat.updateChannelUsername:
            updateChannelUsernamePermission.check(data, user, myCallBack);
            break;
        case pv.api.chat.setChatInfo:
            setChatInfoPermission.check(data, user, myCallBack);
            break;
        case pv.api.chat.addChatUser:
            addChatUserPermission.check(data, user, myCallBack);
            break;
        case pv.api.chat.removeUser:
            removeUserPermission.check(data, user, myCallBack);
            break;
        case pv.api.chat.deleteChat:
            deleteChatPermission.check(data, user, myCallBack);
            break;
        case pv.api.chat.createGroup:
            createGroupPermission.check(data, user, myCallBack);
            break;
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


    }
};

