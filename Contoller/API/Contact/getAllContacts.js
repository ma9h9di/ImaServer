var db = require("../../DB/db");
const err = require('../../Model/error');

function getAllContacts(timeStart,user) {
    return new Promise(async (resolve) => {
        try {
            let result = await db.getAllContacts(user,timeStart);

            result = result.contacts;
            let inImaContact = [];
            let contact = [];
            for (let i = 0; i < result.length; i++) {
                if (result[i].userID)
                    inImaContact.push(result[i]);
                else
                    contact.push(result[i]);
            }
            const reData = {
                inImaContact: inImaContact,
                outImaContact: contact,
            };
            return resolve({data: reData});
        } catch (e) {
            return resolve(new err(pv.errCode.internal_err).jsonErr());

        }


    });
}

module.exports = {
    getAllContacts: getAllContacts
};