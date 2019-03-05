const getFullChatPermission = require('./getFullChatPermission');
const getChatsPermission = require('./getChatsPermission');
const getSortedUpdatedChatListPermission = require('./getSortedUpdatedChatListPermission');
const checkChannelUsernamePermission = require('./checkChannelUsernamePermission');
const updateChannelUsernamePermission = require('./updateChannelUsernamePermission');
const setChatInfoPermission = require('./setChatInfoPermission');
const addChatUserPermission = require('./addChatUserPermission');
const removeUserPermission = require('./removeUserPermission');
const deleteChatPermission = require('./deleteChatPermission');
const createPrivateChatPermission = require('./createPrivateChatPermission');
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

let userHasThisChat;

function findMethodPermission(input, user) {
    return new Promise(async (resolve, reject) => {
        let checkPerAnswer;
        let data = input.data;
        try {
            switch (input.method) {
                case pv.api.chat.getFullChat://test
                    checkPerAnswer = await getFullChatPermission.check(data, user, userHasThisChat);
                    break;
                case pv.api.chat.getChats://test
                    checkPerAnswer = await getChatsPermission.check(data, user, userHasThisChat);
                    break;
                case pv.api.chat.getSortedUpdatedChatList:
                    checkPerAnswer = await getSortedUpdatedChatListPermission.check(user);
                    break;
                case pv.api.chat.checkChannelUsername://test
                    checkPerAnswer = await checkChannelUsernamePermission.check(data, user, userHasThisChat);
                    break;
                case pv.api.chat.updateChannelUsername://test
                    checkPerAnswer = await updateChannelUsernamePermission.check(data, user, userHasThisChat);
                    break;
                case pv.api.chat.setChatInfo://test
                    checkPerAnswer = await setChatInfoPermission.check(data, user, userHasThisChat);
                    break;
                case pv.api.chat.addChatUser://test
                    checkPerAnswer = await addChatUserPermission.check(data, user, userHasThisChat);
                    break;
                case pv.api.chat.removeUser://test
                    checkPerAnswer = await removeUserPermission.check(data, user, userHasThisChat);
                    break;
                case pv.api.chat.deleteChat:
                    //TODO : deleteChat nemidonm in chi kar mikone dobare behem tozih bedin
                    checkPerAnswer = await deleteChatPermission.check(data, user, userHasThisChat);
                    break;
                case pv.api.chat.createPrivateChat://tested
                    checkPerAnswer = await createPrivateChatPermission.check(data, user, userHasThisChat);
                    break;
                case pv.api.chat.createGroup://tested
                    checkPerAnswer = await createGroupPermission.check(data, user);
                    break;
                case pv.api.chat.createChannel://tested
                    checkPerAnswer = await createChannelPermission.check(data, user);
                    break;
                case pv.api.chat.createShop://tested
                    checkPerAnswer = await createShopPermission.check(data, user);
                    break;
                case pv.api.chat.setLink:
                    checkPerAnswer = await setLinkPermission.check(data, user);
                    break;
                case pv.api.chat.getLink:
                    checkPerAnswer = await getLinkPermission.check(data, user, userHasThisChat);
                    break;
                case pv.api.chat.getPin:
                    checkPerAnswer = await getPinPermission.check(user);
                    break;
                case pv.api.chat.setPin:
                    checkPerAnswer = await setPinPermission.check(data, user);
                    break;

                default:
                    reject(new err(pv.errCode.method_not_found).jsonErr());
                    return;

            }
        } catch (e) {
            reject(e);
        }

    });

}

module.exports = {

    check: function (input, user, userHasThisChat) {
        //todo check koliat az ghabil in ke in methode vojod dare age nadare
        //todo * getDevice from db and check dont use authecion methods more than 20 from  hours
        //todo #DB
        this.userHasThisChat = userHasThisChat;
        return new Promise(async (resolve, reject) => {
            try {
                user.changeAttribute = [];
                const findMethod = await findMethodPermission(input, user);
                resolve(findMethod);
            } catch (e) {
                reject(e);

            }
        });


    }
};

