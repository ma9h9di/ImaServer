const db = require("../../DB/db");
const logd = require("../../Other/Funcion").logd;

function call(contacts, user) {
    //todo if contact change bayad baghie session ha ham befann
    return new Promise(async (resolve) => {
        let promise = [];
        let lookedUpContacts = [];
        // TODO optimise query
        logd('in addContact Api');
        for (let i = 0; i < contacts.length; i++) {
            promise.push(db.getUserByPhoneNumber_promise(contacts[i].phone_number));
        }
        logd('in addContact after all promise add', promise.length);
        values = await Promise.all(promise);

        logd('in addContact in then promise', values.length);
        for (let i = 0; i < values.length; i++) {
            if (values[i]) {
                contacts[i].userID = values[i].userID;
            }
            lookedUpContacts.push(contacts[i]);
        }
        logd('in addContact in then promise', lookedUpContacts.length);
        const result=await db.addContacts(user, lookedUpContacts);
        resolve({data: result});

    });


}

module.exports = {
    call: call
};