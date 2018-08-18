module.exports = {
    CreateNewUser: function (phone_number) {
        const date = new Date();
        return {
            status: 'deactivate',
            phone_number: phone_number ,
            lastActivityTime: date.getTime(),
            lastProfileChange: date.getTime(),
            dataUsage: {   // df: 0 for all
                useDataInDay: 0,
                useDataInMonth: 0,
                useDataInTotal: 0
            },
        };
    }
}