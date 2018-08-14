var checkPhonePremission = require('./checkPhonePremissionCheck');
module.exports = {
    check: function (data,user) {
        //todo check koliat az ghabil in ke in methode vojod dare age nadare
        //todo * getDevice from db and check dont use authecion methods more than 20 from  hours
        //todo #DB
        switch (data.method) {
            case 'chackPhone':
                return checkPhonePremission.check(data,user);
            case 'sendCode':
            case 'sendSms':
            case 'signUp':
            case 'signIn':
            case 'logOut':
            case 'removeSession':

        }
        logd(data);
    }
}
