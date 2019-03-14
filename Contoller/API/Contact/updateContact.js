var db = require("../../DB/db");
const err = require('../../Model/error');

function updateContact(user, contact, operation, resolve) {
    //todo if contact change bayad baghie session ha ham befann
    return new Promise(async (resolve) => {
        try {
            switch (operation) {
                case 'update': {
                    await db.updateContact(user, contact,);
                    return resolve({data: {contact: contact}});
                    break;
                }
                case 'delete': {
                    await db.deleteContact(user, contact);
                    return resolve({data: {contact: contact}});
                    break;
                }
            }
        } catch (e) {
            return resolve(new err(pv.errCode.internal_err).jsonErr());
        }
    });

}

module.exports = {
    call: updateContact
};