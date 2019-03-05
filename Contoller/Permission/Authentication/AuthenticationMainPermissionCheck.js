let checkPhonePermission = require('./checkPhonePermissionCheck');
let sendSmsPermission = require('./sendSmsPermissionCheck');
let sendCodePermissionCheck = require('./sendCodePermissionCheck');
let singInPermissionCheck = require('./singInPermissionCheck');
let singUpPermissionCheck = require('./singUpPermissionCheck');
let err = require('../../Model/error');
let Device = require('../../Model/device');
let logd = require('../../Other/Funcion').logd;
let pv = require('../../Other/PublicValue');
let db = require('../../DB/db');


module.exports = {

    check: function (input, user, client) {
        //todo check koliat az ghabil in ke in methode vojod dare age nadare
        //todo * getDevice from db and check dont use authecion methods more than 20 from  hours
        //todo #DB
        return new Promise(async (resolve, reject) => {
            let data = input.data;
            let address = client.request.connection.remoteAddress.split(".").join("-");
            if (!data.hasOwnProperty('device')) {
                reject(new err(pv.errCode.authentication.device_argument, 'device argument not found', {'params': ['device']}).jsonErr());
            } else {
                if (!data.device.hasOwnProperty('platform')) {
                    reject(new err(pv.errCode.authentication.device_argument, 'device argument not found', {'params': ['device']}).jsonErr());
                }
                if (!data.device.hasOwnProperty('unique_device_key')) {
                    reject(new err(pv.errCode.authentication.device_argument, 'unique_device_key in device argument not found', {'params': ['unique_device_key']}).jsonErr());
                }
                if (!data.device.hasOwnProperty('platform_version')) {
                    reject(new err(pv.errCode.authentication.device_argument, 'platform_versions argument in device not found', {'params': ['platform_versions']}).jsonErr());
                }
                if (!data.device.hasOwnProperty('model')) {
                    reject(new err(pv.errCode.authentication.device_argument, 'model argument in device not found', {'params': ['model']}).jsonErr());
                }

            }
            // device=db.getDevice(data.device);
            const newDevice = await db.getDevice(data.device.unique_device_key);
            let device = !newDevice ? Device.CreateNewDevice(data.device) : newDevice;

            if (device.IP.hasOwnProperty(address)) {
                device.IP[address]++;
            } else {
                device.IP[address] = 1;
            }
            // logd('insert Device IP ', device);
            device.authentication.totalCount = device.authentication.totalCount + 1;
            if (pv.permission.notNeedTokenApi.indexOf((input.method)) > -1) {
                let date = new Date();
                logd('device.authentication.totalCount :', device.authentication.totalCount);
                if (device.authentication.totalCount % pv.permission.NumberOfAuthenticationReq === 0) {
                    let extraTime = Math.pow(1 * 60 * 1000, device.authentication.totalCount / pv.permission.NumberOfAuthenticationReq);
                    device.authentication.nextAccessTime = date.getTime() + extraTime;
                    logd('device.authentication.nextAccessTime :', device.authentication.nextAccessTime);
                } else if (device.authentication.nextAccessTime > date.getTime()) {
                    reject(new err(pv.errCode.authentication.device_spam, undefined, {'next_active_time': device.authentication.nextAccessTime}).jsonErr());
                }

            }
            const result = await findMethodPermission();

            if (result.hasOwnProperty(data) && result.data.hasOwnProperty('deviceAuthenticationRest')) {
                device.authentication.totalCount -= device.authentication.totalCount % pv.permission.NumberOfAuthenticationReq;
                device.authentication.totalCount = Math.max(device.authentication.totalCount - 2 * pv.permission.NumberOfAuthenticationReq, 0);
                device.authentication.nextAccessTime = (new Date()).getTime();
                delete result.data.device;
            }
            if (!newDevice) {
                logd('insertDevice ', device);
                db.insertDevice(device);
            }
            else {
                db.updateDevice(device);
            }
            resolve(result);


            // data.device.IP = address;


            function findMethodPermission() {
                return new Promise(async (resolve, reject) => {
                    data.device.IP = address;
                    try {
                        let resultCheckPer;
                        switch (input.method) {
                            case pv.api.authentication.checkPhone:
                                resultCheckPer=await checkPhonePermission.check(data, user);
                                break;
                            case pv.api.authentication.sendCode:
                                resultCheckPer=await sendCodePermissionCheck.check(data, user);
                                break;
                            case pv.api.authentication.sendSms:
                                resultCheckPer=await sendSmsPermission.check(data, user);
                                break;
                            case pv.api.authentication.signIn:
                                resultCheckPer=await singInPermissionCheck.check(data, user);
                                break;
                            case pv.api.authentication.signUp:
                                resultCheckPer=await singUpPermissionCheck.check(data, user);
                                break;
                            case pv.api.authentication.logOut:
                                break;
                            case pv.api.authentication.removeSession:
                                break;
                            default:
                                reject(new err(pv.errCode.method_not_found).jsonErr());
                        }
                        resolve(resultCheckPer);
                    } catch (e) {
                        reject(e);

                    }

                });

            }

        });


    }
};

