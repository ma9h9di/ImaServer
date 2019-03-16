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

// function pi(k1, k2) {
//     return -((((k1 + k2) * (k1 + k2 + 1)) / 2) + k2)
// }
const MaxNumberUser = 10000000;

function pi(k1, k2) {
    return -(k1 + k2 * MaxNumberUser)
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

function getPiMax(hashID, k1) {
    return (-hashID - k1) / MaxNumberUser;
}

function getPiMin(hashID, k2) {
    return (-hashID - k2 * MaxNumberUser)
}

function deHashMessageID(hashID, k) {
    if (hashID < 0) {
        const pmax = getPiMax(hashID, k);
        if (pmax < k)
            return pmax;
        else return getPiMin(hashID, k);
    } else return hashID


}

async function pushToUserGenerater(orginalObject, pushData, userSessions) {
    return new Promise(async resolve => {


        if (!orginalObject.hasOwnProperty('pushToUser')) {
            orginalObject.pushToUser = [];
        }
        for (let i = 0; i < userSessions.length; i++) {
            orginalObject.pushToUser.push({data: pushData, clientID: userSessions[i].socketID})
        }
        resolve();
    });
}

async function pushToAllUser(orginalObject, chatID, event, pushData = undefined) {
    return new Promise(async resolve => {
        let members;
        if (pushData === undefined) {
            pushData = orginalObject;
        }
        /*
        * do Mahdi Khazayi Nezhad 07/03/2019 (db) : #majid inja bayad behesh ye chatID midim
        * to array memberasho bargardoni
        * members = await db.getMembersChat(userChat.chatID)
        */
        const db = require('../DB/db');
        members = await db.getMembersChat(chatID);
        let memberFormat = [];
        for (let i = 0; i < members.length; i++) {
            memberFormat.push(members[i]._id);
        }
        let userSessions = await db.getUsersInfo(memberFormat, {session: 1, _id: 0, userID: 1});
        for (let i = 0; i < userSessions.length; i++) {
            let cloneData = JSON.parse(JSON.stringify(pushData));

            if (cloneData.hasOwnProperty("data") && cloneData.data.hasOwnProperty('chatID')) {
                cloneData.data.chatID = deHashMessageID(cloneData.data.chatID, userSessions[i].userID)
            }
            if (cloneData.hasOwnProperty("chatID")) {
                cloneData.chatID = deHashMessageID(cloneData.chatID, userSessions[i].userID)
            }
            await pushToUserGenerater(orginalObject, {data: cloneData, event: event}, userSessions[i].session);
        }
        resolve(userSessions);
    });
}

logd("create Function", " hello");
exports.logd = logd;
exports.randomString = randomString;
exports.hashMessageID = hashMessageID;
exports.deHashMessageID = deHashMessageID;
exports.pushToAllUser = pushToAllUser;
exports.pushToUserGenerater = pushToUserGenerater;