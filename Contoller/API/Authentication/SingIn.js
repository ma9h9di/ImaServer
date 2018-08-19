var crypto = require('crypto');
var biguint = require('biguint-format');
var pv = require('../../Other/PublicValue');
var logd = require('../../Other/Funcion').logd;


module.exports = function (user,outputCallBack) {
    var result={};
    function addSession(device,app) {
        return require('../../Model/session').CreateNewSession(device,app,'',user.session.length()+1);
    }

    return {

        call: function (data) {
            if (user.status === 'active') {
                var session=addSession(data.device,data.app);
                user.session.push(session);
                result.message=pv.string[user.language].singUpTrue;
                result.successful=true;
                result.token=session.token;

            }else{
                result.message=pv.string[user.language].singUpFalse;
                result.successful=false;
                result.token="";
            }
            outputCallBack(result);
        }

    }
};