const db = require('../DB/db');

let livelog = false;


function isset(obj) {
    return 'undefined' !== typeof(obj);
}

let log = function (name, str) {
    if (!isset(str)) {
        str = name;
        name = undefined;
    }
    if (livelog !== false && isset(LE)) {
        let uid = device.code;
        let obj = {'uid': uid, 'prefix': livelog};
        if (name) {
            obj.name = name;
            obj.val = str;
        } else {
            obj.log = str;
        }
        LE['log'](obj);
    }
    if (typeof str === typeof {})
        str = JSON.stringify(str);
    if (name)
        console.log(name + " : " + str);
    else
        console.log(str);

};
const logd = function (name, str) {

    let a = (new Error()).stack.match(/[a-zA-Z\.]+\:[0-9]+\:/g);
    a = a[1];
    a = a.split(':');
    let file = a[0];
    let line = a[1];

    log("--> " + file + ":" + line + "\t" + name, str);
};

function randomString(length) {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-';
    let result = '';
    for (let i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
}

function pi(k1, k2) {
    return (((k1 + k2) * (k1 + k2 + 1)) / 2) + k2
}

function hashMessageID(senderChatID, receivedChatID) {
    let k1 = senderChatID;
    let k2 = receivedChatID;
    if (k1 < k2) {
        //swaping
        k2 = [k1, k1 = k2][0]
    }
    return pi(k1, k2);
}

function pushToUserGenerater(orginalObject, pushData, userSessions, channel) {
    if (!orginalObject.hasOwnProperty('pushToUser')) {
        orginalObject.pushToUser = [];
    }
    for (let i = 0; i < userSessions; i++) {
        orginalObject.pushToUser.push({data: pushData, clientID: userSessions[i].socketID, channel: channel})
    }
}

async function pushToAllUser(orginalObject, chatID, event, channel) {
    let members;
    /*
    * do Mahdi Khazayi Nezhad 07/03/2019 (db) : #majid inja bayad behesh ye chatID midim
    * to array memberasho bargardoni
    * members = await db.getMembersChat(userChat.chatID)
    */
    members = await db.getMembersChat(chatID);
    members.forEach(member => {
        pushToUserGenerater(orginalObject, {data: orginalObject, event: event}, member._id, channel)
    });
}

logd("create Function", " hello");
exports.logd = logd;
exports.randomString = randomString;
exports.hashMessageID = hashMessageID;
exports.pushToAllUser = pushToAllUser;