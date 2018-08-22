var admin = require("firebase-admin");
var logd=require('./Funcion').logd;
module.exports = {
    sendNotification:function(token,message,title,callback){
        var message = {
            notification: {
                title: title,
                body: message
            },
            token:token
        };

// Send a message to devices subscribed to the combination of topics
// specified by the provided condition.
        admin.messaging().send(message)
            .then((response) => {
                // Response is a message ID string.
                logd('Successfully sent message:', response);
                callback(response);
            })
            .catch((error) => {
                logd('Error sending message:', error);
                callback(false);
            });

    }
}