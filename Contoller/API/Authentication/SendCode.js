var pv = require('../../Other/PublicValue');
var logd = require('../../Other/Funcion').logd;


module.exports = function (user) {
    return {
        call: function () {
            require('./SendSmS')(user).checkNeedNewVerifyCode();
            //sendCode to app
            return {'data': {'successful': true}};
        },


    }
};