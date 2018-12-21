const db = require("../../DB/db");
const logd = require("../../Other/Funcion").logd;
const pv = require("../../Other/PublicValue");

function call(userChat,user) {
return new Promise(async (resolve) => {
    //todo nemidonm inja bayad che konm
    userChat.limitShowMessageCount=userChat.lastAvalebalMessage;
    try {
        const value=await db.deleteDataChatUser(userChat,user.userID);
        resolve({data:{successful:true}});

    } catch (e){
        resolve({data:{successful:false}});
    }

});

}

module.exports = {
    call: call
};