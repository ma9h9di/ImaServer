const pv = require('./PublicValue');
const deHashMessageID = require('./Funcion').deHashMessageID;
const getNewMessageNotif = require('../Model/messageCreater').getNewMessageNotif;
const sendNotification = require('./sendNotification').sendNotification;
const sendData = require('./sendNotification').sendData;
hashTable = {};

function sendNotifMessage(newMessage, user, sessionUser,sesseionUserID) {
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
                chatID: deHashMessageID(newMessage.chatID, sesseionUserID) + "",
                messageID: newMessage.messageCount + ""
            }
        )
    })

}

function sendSeenMessage(seenData, user, sessionUser,sesseionUserID) {
    const fcmArrayTocken = [];
    for (let i = 0; i < sessionUser.length; i++) {
        fcmArrayTocken.push(sessionUser[i].device.notification.notification_token);
    }
    sendData(
        fcmArrayTocken,
        {
            chatID: deHashMessageID(seenData.chatID, sesseionUserID) + "",
            messageID: seenData.lastSeenMessageCount + "",
            work:'messageSeen'
        }
    )

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
                clearTimeout(hashTable[chatID][i]);
                delete hashTable[chatID][i];
            } else {
                break;
            }
        }
        clearSendNotif();
    }

}

module.exports.scheduleWork = scheduleWork;
module.exports.removeWork = removeWork;
module.exports.sendNotifMessage = sendNotifMessage;
module.exports.sendSeenMessage = sendSeenMessage;