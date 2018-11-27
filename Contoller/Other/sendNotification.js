var admin = require("firebase-admin");
var logd = require('./Funcion').logd;
module.exports = {
    sendNotification: function (token, body, title) {
        return new Promise((resolve, reject) => {

            const message = {
                notification: {
                    title: title,
                    body: body
                },
                token: token
            };

// Send a message to devices subscribed to the combination of topics
// specified by the provided condition.
            try {
                admin.messaging().send(message)
                    .then((response) => {
                        // Response is a message ID string.
                        logd('Successfully sent message:', response);
                        resolve(response);
                    })
                    .catch((error) => {
                        logd('Error sending message:', error);
                        reject(false);
                    });
            }catch (e) {
                logd('Error sending message:', e);
                reject(false);
            }


        });
    }
}