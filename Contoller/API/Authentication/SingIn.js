const  pv = require('../../Other/PublicValue');
const  logd = require('../../Other/Funcion').logd;


module.exports = function (user) {
    let result = {};

    function addSession(device, app) {
        return require('../../Model/session').CreateNewSession(device, app, '', user.session.length + 1);
        // return '1111'
    }

    function currentVerifyCode(inputVerifyCode, userAuthentication) {
        let date = new Date();
        if (userAuthentication.validationCodeExpire > date.getTime()) {
            if (userAuthentication.validationCode === (inputVerifyCode + ''))
                return true;
        }
        return false;
    }

    return {

        call: function (data, outputCallBack) {
            if (user.status === 'active' || user.status === 'deactivate') {
                if (currentVerifyCode(data.verify_code, user.authentication)) {
                    //age taraf ghablan be in marhale reside on ghabliash gheyre faal mishan
                    if (user.status === 'deactivate')
                        user.session = [];
                    const  session = addSession(data.device, data.app);
                    user.session.push(session);
                    result.message = pv.string[user.language].singUpTrue;
                    result.successful = true;
                    user.authentication.validationCodeExpire = 0;
                    result.token = session.token;
                    result.deviceAuthenticationRest=true;//for delete kardan on totul attentication
                } else {
                    result.message = pv.string[user.language].singUpVerifyCodeErr;
                    result.successful = false;
                    result.token = "";
                }
            } else {
                result.message = pv.string[user.language].singUpFalse;
                result.successful = false;
                result.token = "";
            }
            outputCallBack({'data':result});
        }

    }
};