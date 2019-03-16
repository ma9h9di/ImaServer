const logd = require('../../Other/Funcion').logd;
const pushToUserGenerater = require('../../Other/Funcion').pushToUserGenerater;
const db = require('../../DB/db');


module.exports = function (user) {


    return {

        call: function (data) {
            return new Promise(async resolve => {
                user.session[0].lastActive = new Date().getTime();
                user.status = 'active';
                user.firstName = data.first_name;
                user.lastName = data.last_name;
                user.email = data.email;
/*
* todo Mahdi Khazayi Nezhad 16/03/2019 (logic) :
*/
                // new contact event
                // let userSessions = await db.getUsersInfo(memberFormat, {session: 1, _id: 0, userID: 1});
                // for (let i = 0; i < userSessions.length; i++) {
                //     await pushToUserGenerater(orginalObject, {data: pushData, event: event}, userSessions[i].session);
                // }
                return resolve({'data': {successful: true}});
            })


        }

    }
};