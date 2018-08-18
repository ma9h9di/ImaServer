var checkPhonePermission = require('./checkPhonePermissionCheck');
var err = require('../../Model/error');
var Device = require('../../Model/device');
var logd = require('../../Other/Funcion').logd;
var pv = require('../../Other/PublicValue');


module.exports = {

    check: function (input, user, client) {
        //todo check koliat az ghabil in ke in methode vojod dare age nadare
        //todo * getDevice from db and check dont use authecion methods more than 20 from  hours
        //todo #DB
        var data = input.data;
        var device;
        if (!data.includes('device')) {
            return new err(pv.errCode.authentication.device_invalid, 'device argument not found', {'params': ['device']}).jsonErr();
        } else {
            if (!data.device.includes('platform')) {
                return new err(pv.errCode.authentication.device_invalid, 'device argument not found', {'params': ['device']}).jsonErr();
            }
            if (!data.device.includes('unique_device_key')) {
                return new err(pv.errCode.authentication.device_invalid, 'unique_device_key in device argument not found', {'params': ['unique_device_key']}).jsonErr();
            }
            if (!data.device.includes('platform_versions')) {
                return new err(pv.errCode.authentication.device_invalid, 'platform_versions argument in device not found', {'params': ['platform_versions']}).jsonErr();
            }
            if (!data.device.includes('model')) {
                return new err(pv.errCode.authentication.device_invalid, 'model argument in device not found', {'params': ['model']}).jsonErr();
            }

        }
        // device=db.getDevice(data.device);
        device = Device.CreateNewDevice(data.device);
        var address = client.handshake.address;
        if (device.IP.includes(address.address)) {
            if (device.IP[address.address].includes(address.port)) {
                device.IP[address.address][address.port] = device.IP[address.address][address.port] + 1;
            } else {
                device.IP[address.address][address.port] = 1;
            }
        } else {
            device.IP[address.address][address.port] = 1;
        }
        device.authentication.totalCount = device.authentication.totalCount + 1;
        var date = new Date();
        if (device.authentication.totalCount % pv.permission.NumberOfAuthenticationReq === 0) {
            var extraTime = Math.pow(6000, device.authentication.totalCount / pv.permission.NumberOfAuthenticationReq);
            device.authentication.nextAccessTime = device.authentication.nextAccessTime + extraTime;
        } else if (device.authentication.nextAccessTime > date.getTime())
            return new err(pv.errCode.authentication.device_spam).jsonErr();

        // db,updateDevice(device);

        switch (input.method) {
            case pv.api.authentication.checkPhone:
                return checkPhonePermission.check(data, user);
            case pv.api.authentication.sendCode:
            case pv.api.authentication.sendSms:
            case pv.api.authentication.signIn:
            case pv.api.authentication.signUp:
            case pv.api.authentication.logOut:
            case pv.api.authentication.removeSession:
            default:
                return new err(pv.errCode.method_not_found).jsonErr();

        }
        logd(input);
    }
};

