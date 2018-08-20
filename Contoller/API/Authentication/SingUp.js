var crypto = require('crypto');
var biguint = require('biguint-format');
var pv = require('../../Other/PublicValue');
var logd = require('../../Other/Funcion').logd;


module.exports = function (user) {



    return {

        call: function (data, outputCallBack) {

            user.session[0].lastActive=new Date().getTime();
            user.status='active';
            user.firstName=data.first_name;
            user.lastName=data.last_name;
            user.email=data.email;

            outputCallBack({'data':{successful:true}});
        }

    }
};