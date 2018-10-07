const db = require("../../DB/db");
const logd = require("../../Other/Funcion").logd;
const randomString = require("../../Other/Funcion").randomString;
const pv = require("../../Other/PublicValue");

const setLinkApi=require('./getLinkApi');


function call(userChat, outputCallBack) {
    const link=randomString(40);
    setLinkApi.call(userChat,link,result=>{
        if (result.data.link){
            outputCallBack(result);
        } else{
            call(userChat,outputCallBack);
        }
    })
}

module.exports = {
    call: call
};