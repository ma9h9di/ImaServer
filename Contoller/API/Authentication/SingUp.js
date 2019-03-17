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
                * todo Mahdi Khazayi Nezhad 16/03/2019 (logic) : newContact event
                */
                // new contact event
                let orginalObject = {'data': {successful: true}};
                await db.updateContactPhoneNumber(user.phone_number, user.userID);
                let userSessions = await db.getUsersInfoByContactPhoneNumber(user.phone_number, {
                    session: 1,
                    _id: 0,
                    userID: 1
                });
                for (let i = 0; i < userSessions.length; i++) {
                    await pushToUserGenerater(orginalObject, {
                        data: {
                            phone_number: user.phone_number,
                            userID: user.userID
                        },
                        event: 'contact_event'
                    }, userSessions[i].session);
                }
                return resolve(orginalObject);
            })


        }

    }
};