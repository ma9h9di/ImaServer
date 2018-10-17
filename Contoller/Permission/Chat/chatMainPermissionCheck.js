const getFullChatPermission = require('./getFullChatPermission');
const getChatsPermission = require('./getChatsPermission');
const getSortedUpdatedChatListPermission = require('./getSortedUpdatedChatListPermission');
const checkChannelUsernamePermission = require('./checkChannelUsernamePermission');
const updateChannelUsernamePermission = require('./updateChannelUsernamePermission');
const setChatInfoPermission = require('./setChatInfoPermission');
const addChatUserPermission = require('./addChatUserPermission');
const removeUserPermission = require('./removeUserPermission');
const deleteChatPermission = require('./deleteChatPermission');
const createGroupPermission = require('./createGroupPermission');
const createChannelPermission = require('./createChannelPermission');
const createShopPermission = require('./createShopPermission');
const setLinkPermission = require('./setLinkPermission');
const getLinkPermission = require('./getLinkPermission');
const getPinPermission = require('./getPinPermission');
const setPinPermission = require('./setPinPremission');

const err = require('../../Model/error');
const logd = require('../../Other/Funcion').logd;
const pv = require('../../Other/PublicValue');
const ObjectID = require('mongodb').ObjectID;


function userHasThisChat(chatID, chats, accessLevel) {
    accessLevel = accessLevel ? accessLevel : pv.support.access.member;
    return new Promise((resolve, reject) => {
        for (let i = 0; i < chats.length; i++) {
            if (chats[i].chatID.equals(chatID)) {
                if (pv.support.access.accessLevel.indexOf(chats[i].post) < pv.support.access.accessLevel.indexOf(accessLevel)) {
                    reject(new err(pv.errCode.chat.access_denied_chat).jsonErr());
                } else {
                    resolve(chats[i]);
                }
                return;
            }
        }
        reject(new err(pv.errCode.chat.access_denied_chat).jsonErr());
    });

}

function findMethodPermission(input, user, myCallBack) {
    let data = input.data;
    switch (input.method) {
        case pv.api.chat.getFullChat://test
            getFullChatPermission.check(data, user, myCallBack, userHasThisChat);
            break;
        case pv.api.chat.getChats://test
            getChatsPermission.check(data, myCallBack);
            break;
        case pv.api.chat.getSortedUpdatedChatList:
            getSortedUpdatedChatListPermission.check(user, myCallBack);
            break;
        case pv.api.chat.checkChannelUsername://test
            checkChannelUsernamePermission.check(data, user, myCallBack, userHasThisChat);
            break;
        case pv.api.chat.updateChannelUsername://test
            updateChannelUsernamePermission.check(data, user, myCallBack, userHasThisChat);
            break;
        case pv.api.chat.setChatInfo://test
            setChatInfoPermission.check(data, user, myCallBack, userHasThisChat);
            break;
        case pv.api.chat.addChatUser://test
            addChatUserPermission.check(data, user, myCallBack, userHasThisChat);
            break;
        case pv.api.chat.removeUser://test
            removeUserPermission.check(data, user, myCallBack, userHasThisChat);
            break;
        case pv.api.chat.deleteChat:
            //TODO : deleteChat nemidonm in chi kar mikone dobare behem tozih bedin
            deleteChatPermission.check(data, user, myCallBack);
            break;
        case pv.api.chat.createGroup://tested
            createGroupPermission.check(data, user, myCallBack);
            break;
        case pv.api.chat.createChannel://tested
            createChannelPermission.check(data, user, myCallBack);
            break;
        case pv.api.chat.createShop://tested
            createShopPermission.check(data, user, myCallBack);
            break;
        case pv.api.chat.setLink:
            setLinkPermission.check(data, user, myCallBack);
            break;
        case pv.api.chat.getLink:
            getLinkPermission.check(data, user, myCallBack);
            break;
        case pv.api.chat.getPin:
            getPinPermission.check(user, myCallBack);
            break;
        case pv.api.chat.setPin:
            setPinPermission.check(data, user, myCallBack);
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


    },
    userHasThisChat: userHasThisChat
};

