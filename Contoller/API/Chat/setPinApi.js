const db = require("../../DB/db");
const logd = require("../../Other/Funcion").logd;
const pv = require("../../Other/PublicValue");
const err = require('../../Model/error');


function call(value, user) {
    //todo db setPin majid
    return new Promise(async (resolve) => {
        resolve('todo');
    });
}

module.exports = {
    call: call
};