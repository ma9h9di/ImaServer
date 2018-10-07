module.exports = {
    CreateNewUser: function (userParamInput) {
        const date = new Date();
        return {
            status: 'deactivate',
            phone_number: userParamInput.phone_number,
            country: userParamInput.country,
            language: userParamInput.language,
            lastActivityTime: date.getTime(),
            lastProfileChange: date.getTime(),
            dataUsage: {   // df: 0 for all
                useDataInDay: 0,
                useDataInMonth: 0,
                useDataInTotal: 0
            },
            chats:[
                // {
                //     "chatID":65556456,
                //     "lastMassageIdSeenUser":653,
                //     "firstMassageIdCanSeenUser":0
                // }
            ],
            nextPinNumber:0,
            accountDates: [],
            blockedUsers: [],
            contacts: [],
            authentication: {},
            session: [],
            spam: []
        };
    }
}