var db = require("../../DB/db");

function getAllContacts(user, callback) {
    db.getAllContacts(user, (result)=>{
        result=result.contacts;
        let inImaContact=[];
        let contact=[];
        for (let i = 0; i < result.length; i++) {
            if (result[i].userID)
                inImaContact.push(result[i]);
            else
                contact.push(result[i]);
        }
        const reData={
            inImaContact:inImaContact,
            outImaContact:contact,
        };
        callback({data:reData});
    });
}

module.exports = {
    getAllContacts: getAllContacts
};