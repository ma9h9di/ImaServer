const db = require("../../DB/db");
const logd = require("../../Other/Funcion").logd;
const pv = require("../../Other/PublicValue");


function call(userChat, link, outputCallBack) {
    const checkLinkPromise = db.checkChannelUsername(link, 'link');
    checkLinkPromise.then(value => {
        if (value) {
            //linke vojod dashte bayad err bedim
            outputCallBack({data: {link: false}})
        } else {
            const updateLinkPromise = db.updateChannelUsername(userChat.chatID,value, 'link');
            updateLinkPromise.then(value1 => {
                outputCallBack({data: {link: value}})

            })
        }
    })

}

module.exports = {
    call: call
};