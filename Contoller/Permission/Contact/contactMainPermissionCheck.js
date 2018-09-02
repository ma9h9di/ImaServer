var err = require('../../Model/error');
var Device = require('../../Model/device');
var logd = require('../../Other/Funcion').logd;
var pv = require('../../Other/PublicValue');
var db = require('../../DB/db');


module.exports = {

    check: function (input, user, client, outputCallBack) {
        //todo check koliat az ghabil in ke in methode vojod dare age nadare
        //todo * getDevice from db and check dont use authecion methods more than 20 from  hours
        //todo #DB
        var data = input.data;

       

        function findMethodPermission(myCallBack) {
            data.device.IP = address;
            switch (input.method) {
                case pv.api.authentication.checkPhone:
                    checkPhonePermission.check(data, user, myCallBack);
                    break;
                case pv.api.authentication.sendCode:
                    sendCodePermissionCheck.check(data, user, myCallBack);
                    break;
                case pv.api.authentication.sendSms:
                    sendSmsPermission.check(data, user, myCallBack);
                    break;
                case pv.api.authentication.signIn:
                    singInPermissionCheck.check(data, user, myCallBack);
                    break;
                case pv.api.authentication.signUp:
                    singUpPermissionCheck.check(data, user, myCallBack);
                    break;
                case pv.api.authentication.logOut:
                    break;
                case pv.api.authentication.removeSession:
                    break;
                default:
                    myCallBack(new err(pv.errCode.method_not_found).jsonErr());
                    return;

            }
        }


    }
};

