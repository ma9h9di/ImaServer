var admin = require("firebase-admin");
var logd = require('./Funcion').logd;
module.exports = {
//     sendNotification1: function (token, body, title, MessageData = {}) {
//         return new Promise(async (resolve, reject) => {
//             const message = {
//                 data: JSON.stringify(MessageData),
//                 notification: {
//                     title: title,
//                     body: body
//                 },
//                 token: token
//             };
//
// // Send a message to devices subscribed to the combination of topics
// // specified by the provided condition.
//             try {
//                 let response = await admin.messaging().send(message);
//                 return resolve(response);
//             } catch (e) {
//                 logd('Error sending message:', e);
//                 return reject(false);
//             }
//
//
//         });
//     }
// ,
    sendNotification: function (token, body, title, MessageData = {}) {
        return new Promise(async (resolve, reject) => {
            const message = {
                data: MessageData,
                notification: {
                    title: title,
                    body: body
                }
            };

// Send a message to devices subscribed to the combination of topics
// specified by the provided condition.
            try {
                let response = await admin.messaging().sendToDevice(token,message);
                return resolve(response);
            } catch (e) {
                logd('Error sending message:', e);
                return reject(false);
            }


        });
    },
    sendData: function (token, MessageData = {}) {
        return new Promise(async (resolve, reject) => {
            const message = {
                data: MessageData
            };

// Send a message to devices subscribed to the combination of topics
// specified by the provided condition.
            try {
                let response = await admin.messaging().sendToDevice(token,message);
                return resolve(response);
            } catch (e) {
                logd('Error sending message:', e);
                return reject(false);
            }


        });
    }
};