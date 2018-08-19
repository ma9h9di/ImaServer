var pv = require('../../Other/PublicValue');
var logd = require('../../Other/Funcion').logd;


module.exports = function (user) {
    return {
        call: function (outputCallBack) {
            require('./SendSmS')(user).checkNeedNewVerifyCode();
            //sendCode to app
            outputCallBack({'data': {'successful': true}});
        },


    }
};