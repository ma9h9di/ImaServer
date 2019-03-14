const getChatsInfoPermission = require('./getChatsInfoPermission');
const getFullUserInfoPermission = require('./getFullUserInfoPermission');

const err = require('../../Model/error');
const logd = require('../../Other/Funcion').logd;
const pv = require('../../Other/PublicValue');
const ObjectID = require('mongodb').ObjectID;


function findMethodPermission(input, user) {
    return new Promise(async (resolve, reject) => {
        try {
            let data = input.data;
            let checkAnswer;
            switch (input.method) {
                case pv.api.user.getUsersInfo:
                    checkAnswer = await getChatsInfoPermission.check(data);
                    break;
                case pv.api.user.getFullUserInfo:
                    checkAnswer = await getFullUserInfoPermission.check(data);
                    break;
                default:
                    return reject(new err(pv.errCode.method_not_found).jsonErr());
                    break;

            }
            return resolve(checkAnswer);
        } catch (e) {
            return reject(e);
        }
    });


}

module.exports = {

    check: function (input, user) {

        //todo check koliat az ghabil in ke in methode vojod dare age nadare
        //todo * getDevice from db and check dont use authecion methods more than 20 from  hours
        //todo #DB
        return new Promise(async (resolve, reject) => {
            try {
                user.changeAttribute = [];
                const findMethodP = await findMethodPermission(input, user);
                return resolve(findMethodP);
            } catch (e) {
                return reject(e);
            }
        });


    },
};

