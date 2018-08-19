var checkPhonePermission = require('./checkPhonePermissionCheck');
var sendSmsPermission = require('./sendSmsPermissionCheck');
var sendCodePermissionCheck = require('./sendCodePermissionCheck');
var singInPermissionCheck = require('./singInPermissionCheck');
var err=require('../../Model/error');
var Device=require('../../Model/device');
var logd=require('../../Other/Funcion').logd;
var pv=require('../../Other/PublicValue');


module.exports = {

    check: function (input, user,client,outputCallBack) {
        //todo check koliat az ghabil in ke in methode vojod dare age nadare
        //todo * getDevice from db and check dont use authecion methods more than 20 from  hours
        //todo #DB
        var data=input.data;
        var device;
        if (!data.hasOwnProperty('device')) {
            outputCallBack(new err(pv.errCode.authentication.device_argument,'device argument not found',{'params':['device']}).jsonErr());
            return;
        }else {
            if (!data.device.hasOwnProperty('platform')) {
                outputCallBack(new err(pv.errCode.authentication.device_argument, 'device argument not found', {'params': ['device']}).jsonErr());
                return;
            }if (!data.device.hasOwnProperty('unique_device_key')) {
                outputCallBack(new err(pv.errCode.authentication.device_argument, 'unique_device_key in device argument not found', {'params': ['unique_device_key']}).jsonErr());
                return;
            }if (!data.device.hasOwnProperty('platform_version')) {
                outputCallBack(new err(pv.errCode.authentication.device_argument, 'platform_versions argument in device not found', {'params': ['platform_versions']}).jsonErr());
                return;
            }if (!data.device.hasOwnProperty('model')) {
                outputCallBack(new err(pv.errCode.authentication.device_argument, 'model argument in device not found', {'params': ['model']}).jsonErr());
                return;
            }
            
        }
        // device=db.getDevice(data.device);
        device=Device.CreateNewDevice(data.device);
        var address=client.handshake.address;
        if (device.IP.hasOwnProperty(address.address)){
            if (device.IP[address.address].hasOwnProperty(address.port)){
                device.IP[address.address][address.port]++;
            } else {
                device.IP[address.address]={[address.port]:1};
            }
        }else{
            device.IP={[address.address]:{[address.port]:1}};
        }
        device.authentication.totalCount=device.authentication.totalCount+1;
        if  (pv.permission.notNeedTokenApi.indexOf((input.method)) > -1) {
            var date = new Date();
            if (device.authentication.totalCount % pv.permission.NumberOfAuthenticationReq === 0) {
                var extraTime = Math.pow(6000, device.authentication.totalCount / pv.permission.NumberOfAuthenticationReq);
                device.authentication.nextAccessTime = device.authentication.nextAccessTime + extraTime;
            } else if (device.authentication.nextAccessTime > date.getTime()) {
                outputCallBack(new err(pv.errCode.authentication.device_spam).jsonErr());
                return;
            }

        }
        // db,updateDevice(device);
        data.device.IP=address.address;
        switch (input.method) {
            case pv.api.authentication.checkPhone:
                checkPhonePermission.check(data, user,outputCallBack);
                break;
            case pv.api.authentication.sendCode:
                sendCodePermissionCheck.check(data, user,outputCallBack);
                break;
            case pv.api.authentication.sendSms:
                sendSmsPermission.check(data, user,outputCallBack);
                break;
            case pv.api.authentication.signIn:
                singInPermissionCheck.check(data, user,outputCallBack);
                break;
            case pv.api.authentication.signUp:
                break;
            case pv.api.authentication.logOut:
                break;
            case pv.api.authentication.removeSession:
                break;
            default:
                outputCallBack(new err(pv.errCode.method_not_found).jsonErr());
                return;

        }


    }
};

