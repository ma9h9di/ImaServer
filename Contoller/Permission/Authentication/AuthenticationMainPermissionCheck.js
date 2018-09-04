var checkPhonePermission = require('./checkPhonePermissionCheck');
var sendSmsPermission = require('./sendSmsPermissionCheck');
var sendCodePermissionCheck = require('./sendCodePermissionCheck');
var singInPermissionCheck = require('./singInPermissionCheck');
var singUpPermissionCheck = require('./singUpPermissionCheck');
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
        var address = client.request.connection.remoteAddress.split(".").join("-");
        if (!data.hasOwnProperty('device')) {
            outputCallBack(new err(pv.errCode.authentication.device_argument, 'device argument not found', {'params': ['device']}).jsonErr());
            return;
        } else {
            if (!data.device.hasOwnProperty('platform')) {
                outputCallBack(new err(pv.errCode.authentication.device_argument, 'device argument not found', {'params': ['device']}).jsonErr());
                return;
            }
            if (!data.device.hasOwnProperty('unique_device_key')) {
                outputCallBack(new err(pv.errCode.authentication.device_argument, 'unique_device_key in device argument not found', {'params': ['unique_device_key']}).jsonErr());
                return;
            }
            if (!data.device.hasOwnProperty('platform_version')) {
                outputCallBack(new err(pv.errCode.authentication.device_argument, 'platform_versions argument in device not found', {'params': ['platform_versions']}).jsonErr());
                return;
            }
            if (!data.device.hasOwnProperty('model')) {
                outputCallBack(new err(pv.errCode.authentication.device_argument, 'model argument in device not found', {'params': ['model']}).jsonErr());
                return;
            }

        }
        // device=db.getDevice(data.device);
        db.getDevice(data.device.unique_device_key, (newDevice) => {

            var device = !newDevice ? Device.CreateNewDevice(data.device) : newDevice;

            if (device.IP.hasOwnProperty(address)) {
                device.IP[address]++;
            } else {
                device.IP[address] = 1;
            }
            // logd('insert Device IP ', device);
            device.authentication.totalCount = device.authentication.totalCount + 1;
            if (pv.permission.notNeedTokenApi.indexOf((input.method)) > -1) {
                var date = new Date();
                logd('device.authentication.totalCount :', device.authentication.totalCount);
                if (device.authentication.totalCount % pv.permission.NumberOfAuthenticationReq === 0) {
                    var extraTime = Math.pow(1 * 60 * 1000, device.authentication.totalCount / pv.permission.NumberOfAuthenticationReq);
                    device.authentication.nextAccessTime = date.getTime() + extraTime;
                    logd('device.authentication.nextAccessTime :', device.authentication.nextAccessTime);
                } else if (device.authentication.nextAccessTime > date.getTime()) {
                    outputCallBack(new err(pv.errCode.authentication.device_spam, undefined, {'next_active_time': device.authentication.nextAccessTime}).jsonErr());
                    return;
                }

            }
            findMethodPermission((result) => {
                if (result.hasOwnProperty(data) && result.data.hasOwnProperty('deviceAuthenticationRest')) {
                    device.authentication.totalCount -= device.authentication.totalCount % pv.permission.NumberOfAuthenticationReq;
                    device.authentication.totalCount = Math.max(device.authentication.totalCount - 2 * pv.permission.NumberOfAuthenticationReq, 0);
                    device.authentication.nextAccessTime = (new Date()).getTime();
                    delete result.data.device;
                }
                if (!newDevice) {
                    logd('insertDevice ', device);
                    db.insertDevice(device, (e) => {
                    });
                }
                else {
                    db.updateDevice(device, (e) => {
                    });
                }
                outputCallBack(result);
            });
            // data.device.IP = address;

        });

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

