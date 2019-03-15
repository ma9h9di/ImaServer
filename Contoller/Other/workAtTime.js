const pv = require('./PublicValue');
const getNewMessageNotif = require('../Model/messageCreater').getNewMessageNotif;
const sendNotification = require('./sendNotification').sendNotification;
hashTable = {};

function sendNotifMessage(newMessage, user, sessionUser) {
    const messageNotif = getNewMessageNotif(newMessage, user);
    const fcmArrayTocken = [];
    for (let i = 0; i < sessionUser.length; i++) {
        fcmArrayTocken.push(sessionUser[i].device.notification.notification_token);
    }
    scheduleWork(newMessage.chatID, newMessage.messageCount, () => {
        sendNotification(
            fcmArrayTocken,
            messageNotif.body, messageNotif.title,
            {
                chatID: newMessage.chatID + "",
                messageID: newMessage.messageCount + ""
            }
        )
    })

}

function scheduleWork(chatID, messageID, work, timer = pv.defaultValue.timeToSendNotif) {
    hashTable[chatID] = hashTable[chatID] ? hashTable[chatID] : {};
    hashTable[chatID][messageID] = setTimeout(function () {
        work();
    }, timer);
}

function removeWork(chatID, messageID, clearSendNotif = () => {
}) {
    if (hashTable[chatID]) {
        for (let i = messageID; i > 0; i--) {
            if (hashTable[chatID][i] !== undefined) {
                clearTimeout(hashTable[key]);
                delete hashTable[chatID][i];
            } else {
                break;
            }
        }
        clearSendNotif();
    }
    if (hashTable[chatID].size() === 0) {
        delete hashTable[chatID];
    }
}

module.exports.scheduleWork = scheduleWork;
module.exports.removeWork = removeWork;
module.exports.sendNotifMessage = sendNotifMessage;