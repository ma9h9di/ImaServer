const err = require('../../Model/error');
const addContacts = require('../../API/Contact/addContacts')
const pv = require('../../Other/PublicValue');

module.exports = {
    check: function (contacts, user) {
        return new Promise(async (resolve, reject) => {
            try {
                let date = new Date().getTime();
                if (user.spam.length > 0) {
                    for (let i = 0; i < user.spam.length; i++) {
                        if (user.spam[i].type === 'addContact_limitation') {
                            if (pv.defaultValue.addContactResetPeriod + user.spam[i].lastResetTime > date) {
                                user.spam[i].lastResetTime = date;
                                user.changeAttribute.push('spam');
                            }
                            if (contacts.length > pv.defaultValue.addContactLimitation) {
                                return reject(new err(pv.errCode.contact.add_contact_limitation_reached).jsonErr());
                            } else {
                                const addc = await addContacts.call(contacts, user);
                                return resolve(addc);
                            }
                        }
                    }
                }
                else {
                    const addc = await addContacts.call(contacts, user);
                    return resolve(addc);
                }
            } catch (e) {
                return reject(e);
            }
        });


    }
};
