var authenticationPremission = require('./Authentication/AuthenticationMainPremissionCheck');
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
		user=DB.getUserByPhoneNumber(data.data.phone_number);//
		switch (data.method) {
			case 'chackPhone':
			case 'sendCode':
			case 'sendSms':
			case 'signUp':
			case 'signIn':
			case 'logOut':
			case 'removeSession':
				return authenticationPremission.check(data,user)

        }
		console.log(data);
    }
}