var authenticationPremission = require('./Authentication/AuthenticationMainPremissionCheck');
var Function=require('../Other/Funcion');
var PV=require('../Other/PublicValue');
var TAG="main";

// var DB = require('../DB/db');

// param: Decrypted data from main, token.
//
// check haye asli mesle:
// validate token
// token granted to access this method or not
//
//
//
//
//
//
// switch case(method name){
// 	case(getFelanInfo): Premission.User.getFullUserInfo
// 	.
// 	.
// 	.
// }

module.exports = {
    check:function (data) {
    	//todo check koliat az ghabil in ke in methode vojod dare age nadare
		//for authentication don`t need
		// user=DB.getUserByPhoneNumber(data.data.phone_number);//
        Function.logd(TAG,"check MainPremissionCheck")
		switch (data.method) {
			case 'chackPhone':
			case 'sendCode':
			case 'sendSms':
			case 'signUp':
			case 'signIn':
			case 'logOut':
			case 'removeSession':
				var authenticationPremissionResult = authenticationPremission.check(data,user)
                authenticationPremissionResult.type=PV.apiType.authentication
				return authenticationPremissionResult;

        }
    }
}